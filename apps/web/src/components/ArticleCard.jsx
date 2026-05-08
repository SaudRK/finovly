
import React from 'react';
import { Link } from 'react-router-dom';

function ArticleCard({ title, excerpt, category, link = "#" }) {
  return (
    <Link to={link} className="block group h-full">
      <div className="card-white h-full p-6 flex flex-col transition-all duration-300">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#EEF4FF] text-[#3260A8] text-xs font-semibold rounded-full uppercase tracking-wide">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#1B3E6F] mb-3 group-hover:text-[#3260A8] transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-[#5285C9] text-[15px] line-clamp-3 mb-6 flex-1">
          {excerpt}
        </p>
        <div className="text-primary font-medium text-sm flex items-center mt-auto">
          Read Article <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
