// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Hardware-accelerated performance optimization for Spotify client

(async () => {
  while (!Spicetify.React || !Spicetify.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  const optimization = () => {
    const elements = document.querySelectorAll<HTMLElement>("*");

    elements.forEach((element) => {
      const { overflow, overflowY } = window.getComputedStyle(element);
      const isScrollable = ["auto", "scroll"].includes(overflow) || 
                          ["auto", "scroll"].includes(overflowY);
      
      const isContextMenu = element.closest("#context-menu");
      const isPopup = element.classList.contains("popup");
      const isDialog = element.getAttribute("role") === "dialog";
      const isAriaHasPopup = element.getAttribute("aria-haspopup") === "true";

      if (isScrollable && !isContextMenu && !isPopup && !isDialog && !isAriaHasPopup) {
        if (!element.hasAttribute("data-optimized")) {
          element.style.willChange = "transform";
          element.style.transform = "translate3d(0, 0, 0)";
          element.style.backfaceVisibility = "hidden";
          element.style.perspective = "1000px";
          element.setAttribute("data-optimized", "true");
        }
      }
    });
  };

  // Add enhanced CSS optimizations
  const style = document.createElement('style');
  style.innerHTML = `
    /* Optimize main containers */
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

    /* Optimize image loading */
    img {
      content-visibility: auto;
      contain: paint;
    }

    /* Optimize animations */
    .main-view-container__scroll-node {
      scroll-behavior: smooth;
      overflow-x: hidden !important;
    }

    /* Reduce paint operations */
    .main-topBar-background,
    .main-entityHeader-overlay,
    .main-actionBarBackground-background {
      contain: paint;
    }

    /* Optimize large lists */
    .main-trackList-trackList,
    .main-rootlist-rootlist {
      contain: content;
      content-visibility: auto;
    }
  `;
  document.head.appendChild(style);

  // Background optimization
  let focused = true;
  window.addEventListener('focus', () => {
    focused = true;
    document.body.style.animationPlayState = 'running';
  });
  
  window.addEventListener('blur', () => {
    focused = false;
    document.body.style.animationPlayState = 'paused';
    // Clear unnecessary resources
    performance.clearResourceTimings();
    if ((window as any).gc) (window as any).gc();
  });

  // Optimize image loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target instanceof HTMLImageElement) {
        if (entry.isIntersecting) {
          entry.target.loading = 'eager';
        } else {
          entry.target.loading = 'lazy';
        }
      }
    });
  });

  // Watch for DOM changes
  const observer = new MutationObserver((mutations) => {
    if (focused) {
      optimization();
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            const images = node.getElementsByTagName('img');
            Array.from(images).forEach(img => imageObserver.observe(img));
          }
        });
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    if (focused) setTimeout(optimization, 100);
  };

  window.addEventListener("popstate", () => {
    if (focused) setTimeout(optimization, 100);
  });

  // Initial optimization
  optimization();

  // Optimize all existing images
  document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
})();