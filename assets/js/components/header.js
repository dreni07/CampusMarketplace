// The links of the mobile menu. icon is the name of a Lucide icon.
const MENU_LINKS = [
  { label: 'Browse', href: '#browse', icon: 'search' },
  { label: 'Sell', href: '#sell', icon: 'tag' },
  { label: 'Swap', href: '#swap', icon: 'arrow-left-right' },
  { label: 'How it works', href: '#how', icon: 'circle-help' }
];

const menuButton = document.querySelector('.header-menu-btn');
const mobileMenu = document.querySelector('#mobile-menu');
const menuCloseButton = document.querySelector('.mobile-menu-close');
const menuLinkList = document.querySelector('.mobile-menu-links');

// Turns one link object into the HTML of one menu row
const menuRow = (link) => `
  <li>
    <a class="mobile-menu-link" href="${link.href}">
      <span class="icon-box mobile-menu-icon"><i class="icon-${link.icon}" aria-hidden="true"></i></span>
      <span class="mobile-menu-label">${link.label}</span>
      <i class="icon-chevron-right mobile-menu-arrow" aria-hidden="true"></i>
    </a>
  </li>
`;

menuLinkList.innerHTML = MENU_LINKS.map(menuRow).join('');

const openMenu = () => {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('menu-open');
  menuButton.setAttribute('aria-expanded', 'true');
  menuCloseButton.focus();
};

const closeMenu = () => {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
};

const isMenuOpen = () => mobileMenu.classList.contains('is-open');

menuButton.addEventListener('click', openMenu);

menuCloseButton.addEventListener('click', () => {
  closeMenu();
  menuButton.focus();
});

// Choosing a link closes the menu, and the page jumps to that section
document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// A click on the dimmed area around the panel closes the menu too
mobileMenu.addEventListener('click', (event) => {
  if (event.target === mobileMenu) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isMenuOpen()) {
    closeMenu();
    menuButton.focus();
  }
});
