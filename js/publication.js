async function loadPublications() {
  try {
    const response = await fetch('./publication.json');
    const data = await response.json();
    const publications = data.publications;

    const pubsContainer = document.createElement('div');
    pubsContainer.className = 'content anchor';
    pubsContainer.id = 'publications';
    pubsContainer.setAttribute('data-scroll-id', 'publications');
    pubsContainer.setAttribute('tabindex', '-1');
    pubsContainer.style.outline = 'none';

    // Add header
    const header = document.createElement('div');
    header.className = 'text';
    header.style.zIndex = '1';
    header.style.position = 'relative';
    header.innerHTML = '<h3 style="margin-bottom:0em">Research</h3><br>';
    pubsContainer.appendChild(header);

    // Create publications container
    const pubsList = document.createElement('div');
    pubsList.id = 'pubs';

    // Add each publication
    publications.forEach(pub => {
      const pubDiv = document.createElement('div');
      pubDiv.className = 'publication';

      // Add image
      const imgDiv = document.createElement('div');
      imgDiv.className = 'img';
      imgDiv.innerHTML = `<img class="img_responsive" src="${pub.img}" alt="${pub.img_alt}">`;
      pubDiv.appendChild(imgDiv);

      // Add text content
      const textDiv = document.createElement('div');
      textDiv.className = 'text';

      // Add title
      const titleDiv = document.createElement('div');
      titleDiv.className = 'title';
      titleDiv.textContent = pub.title;
      textDiv.appendChild(titleDiv);

      // Add authors
      const authorsDiv = document.createElement('div');
      authorsDiv.className = 'authors';
      
      pub.authors.forEach((author, index) => {
        const span = document.createElement('span');
        span.className = `author${author.is_self ? ' self' : ''}`;
        
        if (author.url) {
          span.innerHTML = `<a href="${author.url}">${author.name}</a>`;
        } else {
          span.innerHTML = `<a>${author.name}</a>`;
        }
        
        authorsDiv.appendChild(span);
        
        if (index < pub.authors.length - 1) {
          authorsDiv.appendChild(document.createTextNode(', '));
        }
      });

      if (pub.author_note) {
        authorsDiv.appendChild(document.createElement('br'));
        authorsDiv.appendChild(document.createTextNode(pub.author_note));
      }

      textDiv.appendChild(authorsDiv);

      // Add links
      const linksDiv = document.createElement('div');
      linksDiv.className = 'publinks';
      
      pub.links.forEach((link, index) => {
        if (index > 0) {
          linksDiv.appendChild(document.createTextNode(' / '));
        }
        const span = document.createElement('span');
        span.className = 'tag';
        if (link.url) {
          span.innerHTML = `<a href="${link.url}">${link.text}</a>`;
        } else {
          span.innerHTML = `<a>${link.text}</a>`;
        }
        linksDiv.appendChild(span);
      });

      textDiv.appendChild(linksDiv);
      pubDiv.appendChild(textDiv);
      pubsList.appendChild(pubDiv);
    });

    pubsContainer.appendChild(pubsList);

    // Replace existing publications section
    const existingPubs = document.getElementById('publications');
    if (existingPubs) {
      existingPubs.replaceWith(pubsContainer);
    } else {
      document.querySelector('.container.body').appendChild(pubsContainer);
    }

  } catch (error) {
    console.error('Error loading publications:', error);
  }
}

// Call when DOM is loaded
document.addEventListener('DOMContentLoaded', loadPublications);
