// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Hardware-accelerated performance optimization for Spotify client

(async () => {
  // Wait for Spicetify to be ready
  while (!Spicetify.React || !Spicetify.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  // Optimization function
  const optimization = () => {
    const elements = document.querySelectorAll<HTMLElement>("*");

    elements.forEach((element) => {
      // Use the same scrollable detection logic
      const { overflow, overflowY } = window.getComputedStyle(element);
      const isScrollable = ["auto", "scroll"].includes(overflow) || 
                          ["auto", "scroll"].includes(overflowY);
      
      // Skip special UI elements that shouldn't be optimized
      const isContextMenu = element.closest("#context-menu");
      const isPopup = element.classList.contains("popup");
      const isDialog = element.getAttribute("role") === "dialog";
      const isAriaHasPopup = element.getAttribute("aria-haspopup") === "true";

      if (isScrollable && !isContextMenu && !isPopup && !isDialog && !isAriaHasPopup) {
        if (!element.hasAttribute("data-optimized")) {
          // Apply GPU acceleration
          element.style.willChange = "transform";
          element.style.transform = "translate3d(0, 0, 0)";
          element.style.backfaceVisibility = "hidden";
          element.style.perspective = "1000px";
          element.setAttribute("data-optimized", "true");
        }
      }
    });
  };

  // Watch for DOM changes to optimize new elements
  const observer = new MutationObserver(optimization);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle SPA navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(optimization, 100);
  };

  window.addEventListener("popstate", () => setTimeout(optimization, 100));

  // Add global CSS optimizations
  const style = document.createElement('style');
  style.innerHTML = `
    .Root__main-view, 
    .Root__nav-bar, 
    .Root__right-sidebar,
    .main-view-container__scroll-node,
    .os-viewport,
    .main-trackList-trackList,
    [role="grid"],
    .contentSpacing {
      transform: translate3d(0, 0, 0);
      will-change: transform;
      backface-visibility: hidden;
      perspective: 1000px;
    }
  `;
  document.head.appendChild(style);

  // Initial optimization
  optimization();
})();