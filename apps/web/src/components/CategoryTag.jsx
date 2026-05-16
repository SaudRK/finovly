
import React from 'react';

function CategoryTag({ category, className = "" }) {
  return (
    <span className={`inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wide ${className}`}>
      {category}
    </span>
  );
}

export default CategoryTag;
