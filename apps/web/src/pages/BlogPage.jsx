
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import CategoryTag from '@/components/CategoryTag.jsx';
import { blogPosts } from '@/data/blogPosts.js';

function BlogPage() {
  const [email, setEmail] = useState('');

  // Sort by views to get popular posts
  const sortedByViews = [...blogPosts].sort((a, b) => b.views - a.views);
  const featuredPost = sortedByViews[0];
  const popularPosts = sortedByViews.slice(1, 6);
  
  // Remaining posts for the grid
  const gridPosts = blogPosts.filter(post => post.id !== featuredPost.id);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Placeholder for actual subscribe logic
    setEmail('');
    alert('Subscribed successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Personal Finance Blog & Guides | Finovly</title>
        <meta name="description" content="Expert articles on investing, budgeting, credit, and retirement to help you master your money." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Personal Finance Blog & Guides | Finovly" />
        <meta property="og:description" content="Expert articles on investing, budgeting, credit, and retirement to help you master your money." />
        <meta property="og:url" content="https://finovly.com/blog" />
        <meta property="og:image" content="https://finovly.com/images/blog-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Personal Finance Blog & Guides | Finovly" />
        <meta name="twitter:description" content="Expert articles on investing, budgeting, credit, and retirement to help you master your money." />
        <meta name="twitter:image" content="https://finovly.com/images/blog-og.png" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Finovly Blog",
          "description": "Expert articles on investing, budgeting, credit, and retirement to help you master your money.",
          "url": "https://finovly.com/blog"
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-12 text-center md:text-left">
              <h1 className="text-[40px] md:text-[48px] font-extrabold text-foreground mb-4 tracking-tight">Financial Guides</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Expert advice on investing, budgeting, and mastering your money.
              </p>
            </div>

            {/* Featured Hero Section */}
            <Link to={`/blog/${featuredPost.id}`} className="block group mb-16">
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row">
                <div className="md:w-3/5 relative h-64 md:h-auto overflow-hidden">
                  <img 
                    src={featuredPost.featuredImage} 
                    alt={featuredPost.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <CategoryTag category={featuredPost.category} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-[hsl(var(--accent))] transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium mt-auto">
                    <span className="text-foreground/80 font-bold">{featuredPost.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredPost.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Main Content Grid */}
              <div className="lg:w-2/3">
                <h3 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Latest Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {gridPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:w-1/3 space-y-8">
                {/* Newsletter Signup */}
                <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                  <h3 className="text-[20px] font-bold text-foreground mb-3">Get Smarter with Money</h3>
                  <p className="text-[15px] text-muted-foreground mb-6">
                    Join 50,000+ subscribers getting our weekly financial tips and tool updates.
                  </p>
                  <form className="space-y-4" onSubmit={handleSubscribe}>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address" 
                      className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground/80 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#3260A8]"
                      required
                    />
                    <button type="submit" className="w-full bg-primary text-card-foreground hover:bg-[hsl(var(--primary-hover))] transition-colors font-medium rounded-md py-3 shadow-sm">
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Most Popular */}
                <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                  <h3 className="text-[20px] font-bold text-foreground mb-6 border-b border-border pb-2">Most Popular</h3>
                  <div className="space-y-6">
                    {popularPosts.map((post, index) => (
                      <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-4 group cursor-pointer">
                        <div className="text-3xl font-extrabold text-[#EEF4FF] group-hover:text-[#D6E4F5] transition-colors">
                          0{index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground/80 group-hover:text-[hsl(var(--accent))] transition-colors leading-snug mb-1">
                            {post.title}
                          </h4>
                          <div className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default BlogPage;
