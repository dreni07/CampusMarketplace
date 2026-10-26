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

const browseGrid = document.querySelector('.browse-grid');
freshListings.forEach((item) => browseGrid.append(listingCard(item)));

// ---------- CampusSwap in numbers ----------

// icon is the name of a Lucide icon
const STATS = [
  { icon: 'package', value: 4200, prefix: '', suffix: '+', label: 'items listed', note: '+310 new this month', trend: '↑ 12%' },
  { icon: 'users', value: 1850, prefix: '', suffix: '', label: 'active students', note: 'from 14 faculties', trend: '↑ 8%' },
  { icon: 'wallet', value: 38600, prefix: '€', suffix: '', label: 'saved vs. buying new', note: 'about €21 per item', trend: 'This year' },
  { icon: 'arrow-left-right', value: 640, prefix: '', suffix: '', label: 'swaps completed', note: 'no cash needed', trend: '↑ 24%' }
];

// shortLabel is used in the one-line legend on mobile
const TRADE_SPLIT = [
  { label: 'Books', shortLabel: 'Books', percent: 38 },
  { label: 'Electronics', shortLabel: 'Electronics', percent: 21 },
  { label: 'Notes', shortLabel: 'Notes', percent: 17 },
  { label: 'Everything else', shortLabel: 'Other', percent: 24 }
];

// 4200 becomes "4,200+" and 38600 becomes "€38,600"
const formatStat = (stat) => stat.prefix + formatNumber(stat.value) + stat.suffix;

const statCard = (stat) => `
  <li class="card card-dark stat-card">
    <div class="stat-top">
      <span class="icon-box icon-box-accent stat-icon"><i class="icon-${stat.icon}" aria-hidden="true"></i></span>
      <span class="badge stat-trend">${stat.trend}</span>
    </div>
    <span class="display-value">${formatStat(stat)}</span>
    <div class="stat-text">
      <span class="stat-label">${stat.label}</span>
      <span class="stat-note hide-mobile">${stat.note}</span>
    </div>
  </li>
`;

const tradePart = (item) => `<span class="trade-part" style="flex: ${item.percent}"></span>`;

const legendItem = (item) => `<li><span class="trade-swatch"></span>${item.label} ${item.percent}%</li>`;

document.querySelector('.stats-cards').innerHTML = STATS.map(statCard).join('');
document.querySelector('.trade-bar').innerHTML = TRADE_SPLIT.map(tradePart).join('');
document.querySelector('.trade-legend').innerHTML = TRADE_SPLIT.map(legendItem).join('');
document.querySelector('.trade-legend-short').textContent = TRADE_SPLIT
  .map((item) => `${item.shortLabel} ${item.percent}%`)
  .join(' · ');

// The parts of the bar should always add up to the whole bar
const tradeTotal = TRADE_SPLIT.reduce((sum, item) => sum + item.percent, 0);
if (tradeTotal !== 100) {
  console.warn(`The trade split adds up to ${tradeTotal}%, not 100%.`);
}

document.querySelector('#copyright-year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
