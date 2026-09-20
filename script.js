const views = [...document.querySelectorAll('.view')];
const routeLinks = [...document.querySelectorAll('[data-route]')];
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const menuBackdrop = document.querySelector('.menu-backdrop');

const ARTICLE_CATEGORIES = ['todos', 'Ciencia y fe', 'Historia bíblica', 'Jesús histórico', 'Sufrimiento y mal', 'Existencia de Dios', 'Otras religiones'];
const articleLibrary = (window.ARTICLE_INDEX || []).map((article) => ({
  ...article,
  id: article.slug,
  coverClass: article.coverClass || 'default',
  url: article.status === 'publicado'
    ? article.slug === 'creacion-del-universo' ? 'Artículos/creacion-del-universo.html' : `leer.html?slug=${encodeURIComponent(article.slug)}`
    : '',
  file: article.status === 'publicado'
    ? article.slug === 'creacion-del-universo' ? 'Artículos/Creación del universo.pdf' : `Artículos/${article.slug}.pdf`
    : '',
}));
const CATEGORY_FOLDERS = {
  'Ciencia y fe': 'ciencia-y-fe',
  'Historia bíblica': 'historia-biblica',
  'Jesús histórico': 'jesus-historico',
  'Sufrimiento y mal': 'sufrimiento-y-mal',
  'Existencia de Dios': 'existencia-de-dios',
  'Otras religiones': 'otras-religiones',
};

const articleState = {
  query: '',
  category: 'todos',
};

function frontmatterValue(frontmatter, field) {
  frontmatter = frontmatter.replace(/\r\n?/g, '\n');
  const match = frontmatter.match(new RegExp(`^${field}:\\s*([\\s\\S]*?)\\s*$`, 'm'));
  return match ? match[1].replace(/^"|"$/g, '') : '';
}

async function loadArticleMetadata() {
  await Promise.all(articleLibrary.map(async (article) => {
    const folder = CATEGORY_FOLDERS[article.category];
    if (!folder) return;
    try {
      const response = await fetch(`Artículos/${folder}/${article.slug}.md`);
      if (!response.ok) return;
      const frontmatter = (await response.text()).split('---')[1] || '';
      article.title = frontmatterValue(frontmatter, 'titulo') || article.title;
      article.category = frontmatterValue(frontmatter, 'tema') || article.category;
      article.description = frontmatterValue(frontmatter, 'descripcion') || article.description;
      article.date = frontmatterValue(frontmatter, 'fecha') || article.date;
      article.status = frontmatterValue(frontmatter, 'estado') || article.status;
      article.imagePosition = frontmatterValue(frontmatter, 'enfoque_imagen') || 'center center';
      article.url = article.status === 'publicado'
        ? article.slug === 'creacion-del-universo' ? 'Artículos/creacion-del-universo.html' : `leer.html?slug=${encodeURIComponent(article.slug)}`
        : '';
      article.file = article.status === 'publicado'
        ? article.slug === 'creacion-del-universo' ? 'Artículos/Creación del universo.pdf' : `Artículos/${article.slug}.pdf`
        : '';
    } catch (error) {
    }
  }));
  renderFilters();
  renderArticleList();
}

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

  const sortedArticles = [...visibleArticles].sort((first, second) => Number(second.status === 'publicado') - Number(first.status === 'publicado'));
  articleGrid.innerHTML = sortedArticles.map((article) => `
    <article class="article-card ${article.status === 'en-proceso' ? 'article-card--draft' : ''}" data-article-id="${article.id}">
      <div class="article-cover article-cover--${article.coverClass}" data-image-slug="${article.slug}"><span>${article.category}</span></div>
      <div class="article-card__body">
        ${article.status === 'publicado' ? `<p class="article-date">${article.date}</p>` : '<p class="article-status">En proceso</p>'}
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        ${article.status === 'publicado' ? `<div class="article-card__footer"><a href="${article.url}">Leer artículo</a><a href="${article.file}" target="_blank" rel="noopener noreferrer">Descargar PDF</a></div>` : ''}
      </div>
    </article>
  `).join('');
  hydrateArticleImages();
}

function hydrateArticleImages() {
  document.querySelectorAll('[data-image-slug]').forEach((cover) => {
    const article = articleLibrary.find((item) => item.slug === cover.dataset.imageSlug);
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const tryImage = (index) => {
      if (index >= imageExtensions.length) return;
      const image = new Image();
      image.onload = () => {
        cover.style.backgroundImage = `url("FOTOS/articulos/${article.slug}.${imageExtensions[index]}")`;
        cover.classList.add('article-cover--has-image');
        cover.style.backgroundPosition = article.imagePosition || 'center center';
      };
      image.onerror = () => tryImage(index + 1);
      image.src = `FOTOS/articulos/${article.slug}.${imageExtensions[index]}`;
    };
    tryImage(0);
  });
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
loadArticleMetadata();
