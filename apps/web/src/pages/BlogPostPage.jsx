
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronRight, Clock, Calendar, User } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CategoryTag from '@/components/CategoryTag.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import { blogPosts } from '@/data/blogPosts.js';

function BlogPostPage() {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter(p => post.relatedPostIds.includes(p.id)).slice(0, 3);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
    alert('Subscribed successfully!');
  };

  // Split content by double newlines to render paragraphs
  const paragraphs = post.content.split('\n\n');

  const canonicalUrl = `https://finovly.com/blog/${post.id}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": post.title,
    "image": [post.featuredImage],
    "datePublished": post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Finovly",
      "logo": {
        "@type": "ImageObject",
        "url": "https://finovly.com/finovly-icon.svg"
      }
    },
    "description": post.excerpt
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finovly.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://finovly.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Finovly`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Finovly`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={post.featuredImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Finovly`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.featuredImage} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-muted-foreground mb-8">
              <Link to="/" className="hover:text-[hsl(var(--accent))] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/blog" className="hover:text-[hsl(var(--accent))] transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-foreground truncate max-w-[200px] sm:max-w-md">{post.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Article Content */}
              <article className="lg:w-2/3 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-8 md:p-10 border-b border-border">
                  <div className="mb-6">
                    <CategoryTag category={post.category} />
                  </div>
                  <h1 className="text-[32px] md:text-[44px] font-extrabold text-foreground leading-tight mb-6 tracking-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-[hsl(var(--accent))]">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-foreground/80 font-bold">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.datePublished).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[400px] md:h-[500px]">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-10 prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-[hsl(var(--accent))]">
                  {paragraphs.map((para, idx) => (
                    <p key={idx} className="mb-6 text-[17px] text-foreground/80 leading-[1.8]">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Author Bio */}
                <div className="bg-background grain-overlay p-8 m-8 rounded-xl border border-border flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex-shrink-0 flex items-center justify-center text-card-foreground text-xl font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Written by {post.author}</h4>
                    <p className="text-muted-foreground text-[15px] leading-relaxed">
                      Personal finance expert and contributor at Finovly. Dedicated to helping readers make informed decisions about investing, budgeting, and building long-term wealth.
                    </p>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:w-1/3 space-y-8">
                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <h3 className="text-[20px] font-bold text-foreground mb-6 border-b border-border pb-2">Related Articles</h3>
                    <div className="space-y-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="flex gap-4 group">
                          <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedPost.featuredImage} 
                              alt={relatedPost.title} 
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground/80 group-hover:text-[hsl(var(--accent))] transition-colors leading-snug text-sm mb-1 line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <span className="text-xs text-muted-foreground font-medium">{relatedPost.readTime}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter Signup */}
                <div className="bg-card border border-border rounded-xl p-8 shadow-sm sticky top-28">
                  <h3 className="text-[20px] font-bold text-foreground mb-3">Never Miss an Update</h3>
                  <p className="text-[15px] text-muted-foreground mb-6">
                    Get our best financial guides and tool updates delivered straight to your inbox.
                  </p>
                  <form className="space-y-4" onSubmit={handleSubscribe}>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address" 
                      className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground/80 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
                      required
                    />
                    <button type="submit" className="w-full bg-primary text-card-foreground hover:bg-[hsl(var(--primary-hover))] transition-colors font-medium rounded-md py-3 shadow-sm">
                      Subscribe
                    </button>
                  </form>
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

export default BlogPostPage;
