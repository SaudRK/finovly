
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import CategoryTag from './CategoryTag.jsx';

function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className="block group h-full">
      <div className="card-bento overflow-hidden flex flex-col h-full p-0">
        <div className="relative h-44 overflow-hidden">
          <img src={post.featuredImage} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
          <div className="absolute top-3 left-3"><CategoryTag category={post.category} /></div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mb-3">
            <span>{new Date(post.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-current" />
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-[hsl(var(--accent))] transition-colors duration-300 line-clamp-2 leading-snug">{post.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">{post.excerpt}</p>
          <span className="inline-flex items-center text-[13px] font-semibold gap-1 text-foreground group-hover:text-[hsl(var(--accent))] transition-colors">
            Read <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
