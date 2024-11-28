import React from 'react';
import { format } from 'date-fns';

interface NewsCardProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

export default function NewsCard({ title, description, url, imageUrl, source, publishedAt }: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-news.jpg';
          }}
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            {title}
          </a>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{source}</span>
          <time dateTime={publishedAt}>
            {format(new Date(publishedAt), 'MMM d, yyyy')}
          </time>
        </div>
      </div>
    </article>
  );
}