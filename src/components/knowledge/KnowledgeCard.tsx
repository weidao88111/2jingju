import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card, { CardBody, CardFooter } from '../ui/Card';

interface KnowledgeCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  readMoreUrl: string;
}

const KnowledgeCard = ({
  id,
  title,
  description,
  imageUrl,
  category,
  readMoreUrl,
}: KnowledgeCardProps) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      {imageUrl && (
        <div className="relative w-full h-52 overflow-hidden group">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60"></div>
          <div className="absolute bottom-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100/90 text-red-800 dark:bg-red-900/90 dark:text-red-200 backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
      )}
      <CardBody className="flex-grow">
        {!imageUrl && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              {category}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">{description}</p>
      </CardBody>
      <CardFooter className="bg-transparent border-t-0">
        <Link
          href={readMoreUrl}
          className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium group"
        >
          <span>阅读更多</span>
          <svg 
            className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default KnowledgeCard; 