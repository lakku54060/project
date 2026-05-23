import React from "react";

function BlogSection({ posts }) {
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const sidePosts = posts.filter((post) => post.id !== featuredPost.id);

  return (
    <section className="hp-blog-section" id="blog">
      <div className="hp-blog-section__heading">
        <p className="hp-section-kicker">From Our Journal</p>
        <h2>Recently Our Posts</h2>
      </div>

      <div className="hp-blog-section__layout">
        <article className="hp-blog-card hp-blog-card--featured">
          <img src={featuredPost.image} alt={featuredPost.title} />
          <div className="hp-blog-card__overlay">
            <span>{featuredPost.meta}</span>
            <h3>{featuredPost.title}</h3>
            <p>{featuredPost.excerpt}</p>
          </div>
        </article>

        <div className="hp-blog-section__stack">
          {sidePosts.map((post) => (
            <article key={post.id} className="hp-blog-card hp-blog-card--side">
              <img src={post.image} alt={post.title} />
              <div className="hp-blog-card__content">
                <span>{post.meta}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;

