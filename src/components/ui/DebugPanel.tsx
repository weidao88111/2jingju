import React, { useState } from 'react';
import { useContent } from '../../lib/context/ContentContext';

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { articles, knowledgeItems } = useContent();
  
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
        >
          {isOpen ? 'Hide Debug' : 'Show Debug'}
        </button>
        
        {isOpen && (
          <div className="bg-gray-900 text-white p-4 rounded-md mt-2 max-w-md max-h-96 overflow-auto">
            <h3 className="text-lg font-bold mb-2">Context State</h3>
            <div className="mb-4">
              <h4 className="font-bold">Articles ({articles.length})</h4>
              <ul className="text-xs">
                {articles.map(article => (
                  <li key={article.id} className="mb-1">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      article.status === 'published' ? 'bg-green-500' : 
                      article.status === 'draft' ? 'bg-gray-500' : 'bg-yellow-500'
                    }`}></span>
                    {article.title} ({article.status})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Knowledge Items ({knowledgeItems.length})</h4>
              <ul className="text-xs">
                {knowledgeItems.map(item => (
                  <li key={item.id} className="mb-1">
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return null;
};

export default DebugPanel; 