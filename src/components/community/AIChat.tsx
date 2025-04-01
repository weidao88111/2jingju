import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import Card, { CardBody, CardFooter } from '../ui/Card';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  apiEndpoint?: string;
  streamingEnabled?: boolean;
  maxTokens?: number;
  className?: string;
}

const DEFAULT_API_URL = 'https://api.jingju.weidaoo.me'; // 默认 API 地址

const AIChat: React.FC<AIChatProps> = ({
  apiEndpoint = DEFAULT_API_URL,
  streamingEnabled = true,
  maxTokens = 524,
  className = ''
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是京剧知识助手，请问有什么关于京剧的问题想咨询吗？',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // 组件卸载时中止任何正在进行的请求
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // 创建用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    // 添加用户消息到列表
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingMessage(''); // 重置流式消息

    // 创建请求的 AbortController，便于在需要时中止请求
    abortControllerRef.current = new AbortController();

    // 构建请求体
    const requestBody = {
      message: userMessage.content,
      ...(maxTokens !== 524 ? { max_tokens: maxTokens } : {}),
      ...(streamingEnabled !== true ? { stream: streamingEnabled } : {})
    };

    try {
      // 调试模式收集信息
      if (debugMode) {
        setDebugInfo(`正在连接: ${apiEndpoint}\n请求体: ${JSON.stringify(requestBody, null, 2)}`);
      }

      // 调用配置的 API 端点
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: abortControllerRef.current.signal,
      });

      // 记录响应状态和头信息
      if (debugMode) {
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        setDebugInfo(prev => `${prev}\n\n响应状态: ${response.status}\n响应头: ${JSON.stringify(headers, null, 2)}`);
      }

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('响应体为空');
      }

      // 如果启用了流式响应
      if (streamingEnabled) {
        // 处理流式响应
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiMessageContent = '';
        let buffer = ''; // 用于处理可能跨数据块的情况

        // 逐步读取流式数据
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // 解码数据块
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          
          // 按行处理，可能包含多个事件
          const lines = buffer.split('\n');
          
          // 保留最后一行，因为它可能不完整
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.trim() === '') continue; // 跳过空行
            
            if (line.startsWith('data: ')) {
              try {
                // 移除 'data: ' 前缀
                const jsonText = line.substring(6).trim();
                
                // 跳过空数据或结束标记
                if (!jsonText || jsonText === '[DONE]') continue;
                
                // 尝试解析 JSON
                const jsonData = JSON.parse(jsonText);
                
                // 处理不同响应格式
                if (jsonData && typeof jsonData === 'object') {
                  // 格式 1: { response: "文本" }
                  if (jsonData.response) {
                    aiMessageContent += jsonData.response;
                  } 
                  // 格式 2: { content: "文本" }
                  else if (jsonData.content) {
                    aiMessageContent += jsonData.content;
                  }
                  // 格式 3: { text: "文本" }
                  else if (jsonData.text) {
                    aiMessageContent += jsonData.text;
                  }
                  // 格式 4: 对应 Cloudflare AI 的消息格式
                  else if (jsonData.message && jsonData.message.content) {
                    aiMessageContent += jsonData.message.content;
                  }
                  
                  setStreamingMessage(aiMessageContent);
                }
              } catch (e) {
                // 记录错误但继续处理
                console.error('解析 SSE 数据失败:', e, '原始数据:', line.substring(6));
                
                if (debugMode) {
                  setDebugInfo(prev => `${prev}\n\n解析错误: ${e}\n原始数据: ${line.substring(6)}`);
                }
              }
            } else if (line.includes('"content":"') || line.includes('"response":"')) {
              // 作为备选，尝试直接提取 content 或 response 字段
              try {
                const contentMatch = line.match(/"content":"([^"]*)"/);
                const responseMatch = line.match(/"response":"([^"]*)"/);
                
                if (contentMatch && contentMatch[1]) {
                  aiMessageContent += contentMatch[1];
                  setStreamingMessage(aiMessageContent);
                } else if (responseMatch && responseMatch[1]) {
                  aiMessageContent += responseMatch[1];
                  setStreamingMessage(aiMessageContent);
                }
              } catch (e) {
                console.error('提取响应内容失败:', e);
                if (debugMode) {
                  setDebugInfo(prev => `${prev}\n\n提取失败: ${e}`);
                }
              }
            }
          }
        }

        // 流式响应结束后，添加完整的 AI 消息
        if (aiMessageContent) {
          const aiMessage: Message = {
            id: Date.now().toString(),
            content: aiMessageContent,
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiMessage]);
        }
      } else {
        // 如果不是流式响应，直接解析 JSON
        const data = await response.json();
        
        // 检查 data 是否包含 response 字段
        if (data && typeof data === 'object' && 'response' in data && typeof data.response === 'string') {
          const aiMessage: Message = {
            id: Date.now().toString(),
            content: data.response,
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiMessage]);
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('API 调用错误:', error);
        
        if (debugMode) {
          setDebugInfo(prev => `${prev}\n\nAPI错误: ${error.message}`);
        }
        
        // 添加错误消息
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            content: '抱歉，发生了一些问题，请稍后再试。',
            sender: 'ai',
            timestamp: new Date(),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      setStreamingMessage('');
      abortControllerRef.current = null;
    }
  };

  const handleCancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setStreamingMessage('');
      
      // 添加取消消息
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: '回答已取消。',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardBody className="flex-grow overflow-hidden flex flex-col mb-0 relative">
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-red-600 text-white rounded-tr-none'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-red-200'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {streamingMessage && (
            <div className="flex justify-start">
              <div className="max-w-[85%] sm:max-w-[75%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none">
                <div className="whitespace-pre-wrap break-words">{streamingMessage}</div>
                <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Loading indicator */}
        {isLoading && !streamingMessage && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-red-600 dark:bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-600 dark:bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-600 dark:bg-red-500 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Debug Info Panel */}
        {debugMode && debugInfo && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 text-xs font-mono overflow-auto max-h-40">
            <pre className="whitespace-pre-wrap break-words text-gray-600 dark:text-gray-400">
              {debugInfo}
            </pre>
          </div>
        )}
      </CardBody>

      <CardFooter className="mt-auto border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="w-full flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入您的问题..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              type="submit"
              variant="primary"
              className="whitespace-nowrap"
              disabled={isLoading || !input.trim()}
            >
              发送
            </Button>
            
            {isLoading && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancelRequest}
                className="whitespace-nowrap"
              >
                取消
              </Button>
            )}
            
            {/* 调试模式切换 */}
            <div className="flex items-center ml-2">
              <button
                type="button"
                onClick={() => setDebugMode(!debugMode)}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {debugMode ? '关闭调试' : '调试'}
              </button>
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIChat; 