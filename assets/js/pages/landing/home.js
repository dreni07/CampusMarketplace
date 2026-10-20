const listingCard = (item) => {
  const card = document.querySelector('#listing-card').content.cloneNode(true);
  const photo = card.querySelector('.listing-photo');
  const link = card.querySelector('.listing-link');

  photo.src = LISTING_PHOTO_DIR + item.image;
  photo.alt = item.alt;
  link.href = `listing.html?id=${item.id}`;
  link.textContent = item.title;
  card.querySelector('.fav').setAttribute('aria-label', `Save ${item.title} to favorites`);
  card.querySelector('.listing-cat').textContent = item.cat;
  card.querySelector('.listing-time').textContent = timeAgo(item.posted);
  card.querySelector('.badge-cond').textContent = item.cond;
  card.querySelector('.listing-price').textContent = formatPrice(item.price);
  card.querySelector('.listing-where').textContent = item.where;

  if (!item.sold) {
    card.querySelector('.listing-dim').remove();
    card.querySelector('.listing-sold').remove();
  }
  if (!item.swap) card.querySelector('.badge-swap').remove();

  return card;
};

const freshListings = loadFromStorage('listings')
  .sort((a, b) => b.posted - a.posted)
  .slice(0, 8);

const grid = document.querySelector('.browse-grid');
freshListings.forEach((item) => grid.append(listingCard(item)));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
