
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

function ArticleCard({ title, excerpt, category, link = "#" }) {
  return (
    <Link to={link} className="block group h-full">
      <div className="card-bento h-full flex flex-col">
        <div className="mb-4">
          <span className="badge-accent">{category}</span>
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[hsl(var(--accent))] transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {excerpt}
        </p>
        <span className="inline-flex items-center text-[13px] font-semibold gap-1 text-foreground group-hover:text-[hsl(var(--accent))] transition-colors mt-auto">
          Read <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
      </div>
    </Link>
  );
}

export default ArticleCard;
