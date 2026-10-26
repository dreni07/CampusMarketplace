const setText = (selector, text) => {
  document.querySelector(selector).textContent = text;
};

const setVisible = (selector, visible) => {
  document.querySelector(selector).hidden = !visible;
};

const showListing = (item) => {
  const photo = document.querySelector('.listing-photo');

  if (item.image) {
    photo.src = LISTING_PHOTO_DIR + item.image;
    photo.alt = item.alt;
  } else {
    photo.hidden = true;
  }

  document.title = `${item.title} · CampusSwap`;
  setText('.detail-cat', item.cat);
  setText('#detail-title', item.title);
  setText('.badge-cond', item.cond);
  setText('.detail-price', formatPrice(item.price));
  setText('.detail-desc', item.description);
  setText('.detail-buy', `Buy for ${formatPrice(item.price)}`);
  setText('.spec-cond', item.cond);
  setText('.spec-cat', item.cat);
  setText('.spec-swap', item.swap ? 'Open to swaps' : 'Sale only');
  setText('.spec-where', item.where);
  setText('.spec-posted', timeAgo(item.posted));
  setText('.spec-status', item.sold ? 'Sold' : 'Available');

  setVisible('.badge-swap', item.swap);
  setVisible('.detail-swap', item.swap);
  setVisible('.detail-sold', item.sold);
  setVisible('.detail-actions', !item.sold);
  setVisible('.detail-sold-note', item.sold);
};

const listingId = Number(new URLSearchParams(window.location.search).get('id'));
const listing = loadFromStorage('listings').find((item) => item.id === listingId);

if (listing) {
  showListing(listing);
} else {
  setVisible('.detail', false);
  setVisible('.detail-missing', true);
}
