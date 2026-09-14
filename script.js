const views = [...document.querySelectorAll('.view')];
const routeLinks = [...document.querySelectorAll('[data-route]')];
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const menuBackdrop = document.querySelector('.menu-backdrop');

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

setRoute(window.location.hash.slice(1) || 'inicio');
