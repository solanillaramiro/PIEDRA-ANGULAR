const views = [...document.querySelectorAll('.view')];
const routeLinks = [...document.querySelectorAll('[data-route]')];
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const menuBackdrop = document.querySelector('.menu-backdrop');

const ARTICLE_CATEGORIES = ['todos', 'Ciencia y fe', 'Historia bíblica', 'Jesús histórico', 'Sufrimiento y mal'];

const articleLibrary = [
  {
    id: 'creacion-del-universo',
    title: 'Creación del universo',
    category: 'Ciencia y fe',
    date: '15 de septiembre de 2026',
    coverClass: 'cosmovision',
    excerpt: 'Un recorrido para pensar el origen del universo desde la ciencia, la filosofía y la fe.',
    description: 'El origen del universo es una pregunta que toca la ciencia, la filosofía y la fe.',
    file: 'Artículos/Creación del universo.pdf',
    url: 'Artículos/creacion-del-universo.html',
  },
];

const articleState = {
  query: '',
  category: 'todos',
};

function getFilteredArticles() {
  const query = articleState.query.trim().toLowerCase();
  return articleLibrary.filter((article) => {
    const matchesCategory = articleState.category === 'todos' || article.category === articleState.category;
    const haystack = `${article.title} ${article.description} ${article.category}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });
}

function renderFilters() {
  const filters = document.querySelector('#article-filters');
  if (!filters) return;

  const categories = ARTICLE_CATEGORIES;
  filters.innerHTML = categories.map((category) => `
    <button type="button" class="article-filter ${articleState.category === category ? 'is-active' : ''}" data-category="${category}">
      ${category}
    </button>
  `).join('');
}

function renderArticleList() {
  const articleGrid = document.querySelector('#article-grid');
  if (!articleGrid) return;

  const visibleArticles = getFilteredArticles();
  if (!visibleArticles.length) {
    articleGrid.innerHTML = '<div class="article-empty">No encontramos artículos con ese criterio.</div>';
    return;
  }

  articleGrid.innerHTML = visibleArticles.map((article) => `
    <article class="article-card" data-article-id="${article.id}">
      <div class="article-cover article-cover--${article.coverClass}"><span>${article.category}</span></div>
      <div class="article-card__body">
        <p class="article-date">${article.date}</p>
        <h2>${article.title}</h2>
        <p>${article.excerpt}</p>
        <div class="article-card__footer">
          <a href="${article.url}">Leer artículo</a>
          <a href="${article.file}" target="_blank" rel="noopener noreferrer">Descargar PDF</a>
        </div>
      </div>
    </article>
  `).join('');
}

function attachArticleHandlers() {
  document.addEventListener('click', (event) => {
    const filterButton = event.target.closest('[data-category]');
    if (filterButton) {
      articleState.category = filterButton.dataset.category;
      renderFilters();
      renderArticleList();
      return;
    }
  });

  const searchInput = document.querySelector('#article-search');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      articleState.query = event.target.value;
      renderArticleList();
    });
  }
}

function closeMenu() {
  sidebar.classList.remove('is-open');
  menuBackdrop.classList.remove('is-visible');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function setRoute(route) {
  const target = document.querySelector(`[data-view="${route}"]`) || document.querySelector('[data-view="inicio"]');
  const activeRoute = target.dataset.view;

  views.forEach((view) => view.classList.toggle('is-visible', view === target));
  routeLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.route === activeRoute));
  document.title = activeRoute === 'inicio' ? 'Piedra Angular | Apologética para pensar la fe' : `${target.querySelector('h1')?.textContent || 'Piedra Angular'} | Piedra Angular`;
  closeMenu();
  document.querySelector('#main-content').focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
  const routeLink = event.target.closest('[data-route]');
  if (!routeLink) return;
  event.preventDefault();
  const route = routeLink.dataset.route;
  if (route === 'articulos' && routeLink.dataset.articleCategory) {
    articleState.category = routeLink.dataset.articleCategory;
    renderFilters();
    renderArticleList();
  }
  window.history.pushState({ route }, '', `#${route}`);
  setRoute(route);
});

window.addEventListener('popstate', () => setRoute(window.location.hash.slice(1) || 'inicio'));

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('is-open');
  menuBackdrop.classList.toggle('is-visible', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

menuBackdrop.addEventListener('click', closeMenu);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelector('#faq-search').addEventListener('input', (event) => {
  const search = event.target.value.trim().toLowerCase();
  document.querySelectorAll('#faq-list details').forEach((item) => {
    item.hidden = search !== '' && !item.textContent.toLowerCase().includes(search);
  });
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#form-message').textContent = 'Gracias. La pregunta quedó lista para enviar cuando conectemos el formulario.';
  event.target.reset();
});

renderFilters();
renderArticleList();
attachArticleHandlers();
setRoute(window.location.hash.slice(1) || 'inicio');
