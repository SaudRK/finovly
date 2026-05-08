
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
        <Mail className="w-6 h-6 text-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Get Smarter with Money</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Join 50,000+ subscribers getting our weekly financial tips and tool updates.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Subscribe
        </Button>
      </form>
    </div>
  );
}

export default NewsletterSignup;
