
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function SearchBar({ placeholder = "What are you looking for? (calculators, credit cards, mortgages...)" }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic would go here
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base rounded-full bg-card border-border shadow-sm"
        />
      </div>
      <Button type="submit" className="h-12 px-6 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
