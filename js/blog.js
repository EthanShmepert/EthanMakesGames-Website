fetch('https://github.com/EthanShmepert/EthanMakesGames-Website/tree/main/Data/posts.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('blog-container');

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card'; // use custom class instead of Bootstrap grid

      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="card-body">
          <h3>${post.title}</h3>
          <p class="text-muted mb-2">${new Date(post.date).toDateString()}</p>
          <p>${post.excerpt}</p>
          <a href="post.html?slug=${post.slug}" class="btn btn-outline-primary mt-3">Read More</a>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading posts:', err));
