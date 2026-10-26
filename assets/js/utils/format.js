const formatNumber = (number) => number.toLocaleString('en-US');

const formatPrice = (price) => `€${formatNumber(price)}`;

const timeAgo = (timestamp) => {
  const hours = Math.floor((Date.now() - timestamp) / (60 * 60 * 1000));
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return days === 1 ? 'Yesterday' : `${days} days ago`;
};
