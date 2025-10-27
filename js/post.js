const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const container = document.getElementById('post-container');

fetch('data/posts.json')
  .then(res => res.json())
  .then(posts => {
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      container.innerHTML = `<h2>Post not found</h2>`;
      return;
    }

    // Fetch the .txt or .md file
    fetch(`Data/posts/${post.slug}.txt`)
      .then(res => res.text())
      .then(content => {
        // Optional: convert Markdown to HTML (if desired)
        // For now we’ll just wrap in <p> tags and replace line breaks
        const html = content
          .split('\n\n')
          .map(p => `<p>${p.trim()}</p>`)
          .join('');

        container.innerHTML = `
          <article class="post-article mx-auto my-5 p-4 rounded" style="max-width: 800px; background: rgba(30,30,47,0.85);">
          <h1 class="fw-bold mb-3">${post.title}</h1>
          <p class="text-muted mb-3">${new Date(post.date).toDateString()}</p>
          <img src="${post.image}" class="img-fluid rounded mb-4" alt="${post.title}">
          ${html}
          <a href="blog.html" class="btn btn-outline-secondary mt-4">← Back to Blog</a>
          </article>
        `;
      })
      .catch(() => {
        container.innerHTML = `<h2>Could not load post content.</h2>`;
      });
  })
  .catch(() => {
    container.innerHTML = `<h2>Error loading post list.</h2>`;
  });
