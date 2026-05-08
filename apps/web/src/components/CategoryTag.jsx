
import React from 'react';

function CategoryTag({ category, className = "" }) {
  return (
    <span className={`inline-block px-3 py-1 bg-[#3260A8] text-white text-xs font-bold rounded-full uppercase tracking-wide ${className}`}>
      {category}
    </span>
  );
}

export default CategoryTag;
