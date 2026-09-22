const CATEGORY_FOLDERS = {
  'Ciencia y fe': 'ciencia-y-fe',
  'Historia bíblica': 'historia-biblica',
  'Jesús histórico': 'jesus-historico',
  'Sufrimiento y mal': 'sufrimiento-y-mal',
  'Existencia de Dios': 'existencia-de-dios',
  'Otras religiones': 'otras-religiones',
};

const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const article = (window.ARTICLE_INDEX || []).find((item) => item.slug === slug);
const elements = {
  page: document.querySelector('#article-page'),
  post: document.querySelector('#article-post'),
  cover: document.querySelector('#article-cover'),
  category: document.querySelector('#article-category'),
  date: document.querySelector('#article-date'),
  title: document.querySelector('#article-title'),
  description: document.querySelector('#article-description'),
  actions: document.querySelector('#article-actions'),
  content: document.querySelector('#article-content'),
};

function readFrontmatter(source) {
  source = source.replace(/\r\n?/g, '\n');
  const separator = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!separator) return { data: {}, body: source };
  const data = {};
  separator[1].split('\n').forEach((line) => {
    const match = /^([\w_]+):\s*(.*)$/.exec(line);
    if (!match) return;
    data[match[1]] = match[2].trim().replace(/^"|"$/g, '');
  });
  return { data, body: separator[2] };
}

function showMessage(title, message) {
  elements.post.innerHTML = `
    <div class="article-post__body article-reader-message">
      <p class="eyebrow eyebrow--turquoise">biblioteca de artículos</p>
      <h1>${title}</h1>
      <p class="article-post__lead">${message}</p>
      <a class="button button--secondary" href="index.html#articulos">Volver a artículos</a>
    </div>
  `;
  document.title = `${title} | Piedra Angular`;
}

function imageCandidates(currentSlug) {
  return ['jpg', 'jpeg', 'png', 'webp'].map((extension) => `FOTOS/articulos/${currentSlug}.${extension}`);
}

function loadCover(currentArticle, data) {
  const candidates = imageCandidates(currentArticle.slug);
  const tryImage = (index) => {
    if (index >= candidates.length) return;
    const image = new Image();
    image.onload = () => {
      elements.cover.style.backgroundImage = `url("${candidates[index]}")`;
      elements.cover.classList.add('article-cover--has-image');
      elements.cover.style.backgroundPosition = data.enfoque_imagen || 'center center';
    };
    image.onerror = () => tryImage(index + 1);
    image.src = candidates[index];
  };
  tryImage(0);
}

async function pdfExists(currentSlug) {
  const response = await fetch(`Artículos/${currentSlug}.pdf`, { method: 'HEAD' });
  return response.ok;
}

async function renderArticle() {
  if (!article || !CATEGORY_FOLDERS[article.category]) {
    showMessage('Artículo no encontrado', 'No pudimos encontrar ese texto en la biblioteca.');
    return;
  }

  const response = await fetch(`Artículos/${CATEGORY_FOLDERS[article.category]}/${article.slug}.md?v=${Date.now()}`);
  if (!response.ok) {
    showMessage('Artículo no disponible', 'Este texto todavía no está disponible en la biblioteca.');
    return;
  }

  const parsed = readFrontmatter(await response.text());
  const data = { ...article, ...parsed.data, slug: article.slug };
  if (data.estado !== 'publicado') {
    showMessage('Artículo en proceso', 'Este texto todavía está en preparación. Volvé pronto para leerlo.');
    return;
  }

  elements.category.textContent = data.tema;
  elements.date.textContent = data.fecha;
  elements.title.textContent = data.titulo;
  elements.description.textContent = data.descripcion;
  elements.content.innerHTML = marked.parse(parsed.body);
  document.title = `${data.titulo} | Piedra Angular`;
  loadCover(data, parsed.data);

  if (await pdfExists(data.slug)) {
    const pdfLink = document.createElement('a');
    pdfLink.className = 'button button--primary';
    pdfLink.href = `Artículos/${data.slug}.pdf`;
    pdfLink.target = '_blank';
    pdfLink.rel = 'noopener noreferrer';
    pdfLink.textContent = 'Descargar PDF';
    elements.actions.prepend(pdfLink);
  }
}

renderArticle().catch(() => showMessage('Artículo no disponible', 'No pudimos cargar este texto. Volvé a la biblioteca e intentá nuevamente.'));
