const searchInput = document.querySelector('#searchInput');
const cards = [...document.querySelectorAll('.service-card')];
const filterButtons = [...document.querySelectorAll('.filter-pill')];
const resultCount = document.querySelector('#resultCount');
const emptyState = document.querySelector('#emptyState');
let activeFilter = 'all';

function updateCards() {
  const query = (searchInput?.value || '').trim().toLocaleLowerCase('ru');
  let visible = 0;
  cards.forEach(card => {
    const matchesQuery = (card.dataset.search + ' ' + card.innerText).toLocaleLowerCase('ru').includes(query);
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'official' && card.dataset.category === 'official') ||
      (activeFilter === 'check' && card.dataset.category === 'check');
    const show = matchesQuery && matchesFilter;
    card.hidden = !show;
    if (show) visible++;
  });
  resultCount.textContent = visible;
  emptyState.hidden = visible !== 0;
}
searchInput?.addEventListener('input', updateCards);
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  updateCards();
}));
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = '☰';
}));
document.querySelector('#year').textContent = new Date().getFullYear();
updateCards();