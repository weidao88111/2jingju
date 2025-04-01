import React, { useState, useRef, useEffect } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

interface ResourcePlayerProps {
  id: string;
  title: string;
  description: string;
  type: 'audio' | 'video';
  src: string;
  author?: string;
  date?: string;
  playable?: boolean;
}

const ResourcePlayer = ({
  id,
  title,
  description,
  type,
  src,
  author,
  date,
  playable = true,
}: ResourcePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mediaSource, setMediaSource] = useState(src);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  
  // 预检查媒体文件是否存在
  useEffect(() => {
    const checkMediaExists = async () => {
      try {
        // 使用HEAD请求检查文件是否存在
        const response = await fetch(src, { method: 'HEAD' });
        if (!response.ok) {
          // 如果文件不存在，设置错误状态
          setError(`${type === 'video' ? '视频' : '音频'}资源不存在或无法访问`);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error checking media:', err);
        // 不设置错误状态，因为有些浏览器可能不允许HEAD请求
        // 我们将依赖媒体元素的错误事件
      }
    };
    
    // 检查路径是否为绝对路径
    if (src && (src.startsWith('http') || src.startsWith('/'))) {
      checkMediaExists();
    }
  }, [src, type]);
  
  // 处理媒体加载状态
  const handleLoadedData = () => {
    setIsLoading(false);
    setError(null);
  };
  
  // 处理媒体加载错误
  const handleError = () => {
    setIsLoading(false);
    
    // 如果路径中包含"resources"目录但该目录可能不存在，尝试从media目录加载
    if (src.includes('/resources/') && type === 'audio') {
      const newSrc = src.replace('/resources/audio/', '/media/audio/');
      setMediaSource(newSrc);
      return;
    } else if (src.includes('/resources/') && type === 'video') {
      const newSrc = src.replace('/resources/video/', '/media/videos/');
      setMediaSource(newSrc);
      return;
    }
    
    setError(`无法加载${type === 'video' ? '视频' : '音频'}，请稍后再试。`);
  };
  
  // 尝试重新加载媒体
  const handleRetry = () => {
    if (mediaRef.current) {
      setIsLoading(true);
      setError(null);
      mediaRef.current.load();
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <h3 className="text-xl font-bold">{title}</h3>
        {(author || date) && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            {author && <span className="mr-3">{author}</span>}
            {date && <span>{date}</span>}
          </div>
        )}
      </CardHeader>
      
      <CardBody>
        {type === 'video' ? (
          <div className="relative aspect-video w-full rounded-md overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4 text-center">
                <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  重试
                </Button>
              </div>
            )}
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={mediaSource}
              controls
              className="w-full h-full"
              poster="/images/video-placeholder.jpg"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedData={handleLoadedData}
              onError={handleError}
            />
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <svg className="w-12 h-12 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{error}</p>
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  重试
                </Button>
              </div>
            )}
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={mediaSource}
              controls
              className={`w-full ${error ? 'hidden' : ''}`}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedData={handleLoadedData}
              onError={handleError}
            />
            {!isLoading && !error && (
              <div className="mt-3 text-gray-700 dark:text-gray-300">
                <p>{description}</p>
              </div>
            )}
          </div>
        )}
        
        {type === 'video' && !isLoading && !error && (
          <div className="mt-3">
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>
        )}
      </CardBody>
      
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            分享
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            收藏
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          ID: {id}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourcePlayer; 