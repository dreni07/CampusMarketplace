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
const formatStat = (stat) => stat.prefix + stat.value.toLocaleString('en-US') + stat.suffix;

const statCard = (stat) => `
  <li class="stat-card">
    <div class="stat-top">
      <span class="stat-icon"><i class="icon-${stat.icon}" aria-hidden="true"></i></span>
      <span class="stat-trend">${stat.trend}</span>
    </div>
    <span class="stat-value">${formatStat(stat)}</span>
    <div class="stat-text">
      <span class="stat-label">${stat.label}</span>
      <span class="stat-note">${stat.note}</span>
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

// ---------- Reveal on scroll ----------

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
