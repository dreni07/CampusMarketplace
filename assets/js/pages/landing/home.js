// ========================================
// Swap, don't spend (#swap)
// Fade the box in when you scroll to it
// ========================================

// 1. Find the box on the page
const swapBox = document.querySelector('.swap-box');

// 2. Make an observer. It tells us when the box comes onto the screen.
const swapObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // isIntersecting is true when the box is visible on the screen
    if (entry.isIntersecting) {
      swapBox.classList.add('show');     // the CSS for .show makes it fade in
      swapObserver.unobserve(swapBox);   // only do it once
    }
  });
}, { threshold: 0.2 });                  // 0.2 = when 20% of the box is visible

// 3. Start watching the box
swapObserver.observe(swapBox);
