const views = [...document.querySelectorAll('.view')];
const routeLinks = [...document.querySelectorAll('[data-route]')];
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('.menu-toggle');

function setRoute(route) {
  const target = document.querySelector(`[data-view="${route}"]`) || document.querySelector('[data-view="inicio"]');
  const activeRoute = target.dataset.view;

  views.forEach((view) => view.classList.toggle('is-visible', view === target));
  routeLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.route === activeRoute));
  document.title = activeRoute === 'inicio' ? 'Piedra Angular | Apologética para pensar la fe' : `${target.querySelector('h1')?.textContent || 'Piedra Angular'} | Piedra Angular`;
  sidebar.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.querySelector('#main-content').focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
  const routeLink = event.target.closest('[data-route]');
  if (!routeLink) return;
  event.preventDefault();
  const route = routeLink.dataset.route;
  window.history.pushState({ route }, '', `#${route}`);
  setRoute(route);
});

window.addEventListener('popstate', () => setRoute(window.location.hash.slice(1) || 'inicio'));

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
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

setRoute(window.location.hash.slice(1) || 'inicio');
