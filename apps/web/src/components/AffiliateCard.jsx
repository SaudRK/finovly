
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';

function AffiliateCard({ name, description, url, featured = false }) {
  return (
    <Card className={`h-full flex flex-col transition-all duration-300 ${
      featured 
        ? 'ring-2 ring-primary scale-105 shadow-xl bg-accent' 
        : 'hover:shadow-lg hover:-translate-y-1'
    }`}>
      <CardHeader>
        {featured && (
          <div className="flex items-center gap-1 text-primary text-sm font-medium mb-2">
            <Star className="w-4 h-4 fill-primary" />
            <span>Most Popular</span>
          </div>
        )}
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="flex-1 leading-relaxed">
          {description}
        </CardDescription>
        <Button 
          asChild
          className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
        >
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            Get Started
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default AffiliateCard;
