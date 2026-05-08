
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

function CalculatorCard({ icon: Icon, title, description, link = "#", featured = false, tag }) {
  return (
    <Link to={link} className="block group h-full">
      <div className="card-bento h-full flex flex-col min-h-[180px]">
        {tag && <span className="badge-accent mb-3">{tag}</span>}
        <div className="flex items-start justify-between mb-auto">
          <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center group-hover:border-[hsl(var(--accent)/0.4)] group-hover:bg-[hsl(var(--accent)/0.06)] transition-all duration-500">
            <Icon className="w-5 h-5 text-foreground group-hover:text-[hsl(var(--accent))] transition-colors duration-500" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <div className="mt-auto pt-6">
          <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default CalculatorCard;
