
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Info, ExternalLink } from 'lucide-react';

function ProductCard({ name, description, rating, features, affiliateUrl }) {
  return (
    <Card className="relative overflow-hidden border-border/50 hover:shadow-md transition-all">
      <div className="absolute top-0 right-0 bg-muted px-3 py-1 rounded-bl-lg text-[10px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
        <Info className="w-3 h-3" /> Advertiser Disclosure
      </div>
      <CardContent className="p-6 pt-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">{name}</h3>
              <div className="flex items-center bg-accent/10 px-2 py-1 rounded text-accent text-sm font-medium">
                <Star className="w-4 h-4 fill-accent mr-1" />
                {rating}/5
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, idx) => (
                <span key={idx} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-2 min-w-[200px]">
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                Our Partner <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <p className="text-[10px] text-center text-muted-foreground">
              We may earn a commission
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
