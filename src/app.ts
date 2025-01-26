// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Hardware-accelerated smooth scrolling for Spotify client

(async () => {
  // Wait for Spicetify to initialize
  while (!Spicetify.React || !Spicetify.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  // Add global CSS optimizations first
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
      transform: translate3d(0, 0, 0) !important;
      will-change: transform !important;
      backface-visibility: hidden !important;
      perspective: 1000px !important;
      contain: content !important;
    }

    /* Optimize scrollable containers */
    .os-viewport-native-scrollbars-overlaid {
      overflow-y: scroll !important;
      scroll-behavior: smooth !important;
    }
  `;
  document.head.appendChild(style);

  const allowedOverflow = ["auto", "scroll"] as const;

  const applyScrolling = () => {
    document.querySelectorAll("*").forEach(element => {
      if (!(element instanceof HTMLElement)) return;
      if (element.hasAttribute("data-optimized")) return;

      // Check if element is scrollable
      const { overflow, overflowY } = window.getComputedStyle(element);
      const isScrollable = allowedOverflow.includes(overflow as any) || 
                          allowedOverflow.includes(overflowY as any);
      
      // Skip special UI elements
      const isContextMenu = element.closest("#context-menu");
      const isPopup = element.classList.contains("popup");
      const isDialog = element.getAttribute("role") === "dialog";
      const isAriaHasPopup = element.getAttribute("aria-haspopup") === "true";

      if (isScrollable && !isContextMenu && !isPopup && !isDialog && !isAriaHasPopup) {
        // Apply more aggressive GPU acceleration
        element.style.willChange = "transform";
        element.style.transform = "translate3d(0,0,0)";
        element.style.backfaceVisibility = "hidden";
        element.style.perspective = "1000px";
        element.style.contain = "content";
        
        // Mark as optimized
        element.setAttribute("data-optimized", "true");

        // Improve scroll behavior
        if (element.classList.contains('os-viewport')) {
          element.style.overflowY = "scroll";
          element.style.scrollBehavior = "smooth";
        }
      }
    });
  };

  // Watch for new elements with improved throttling
  const throttledApplyScrolling = () => {
    if (!document.hidden) {
      requestAnimationFrame(applyScrolling);
    }
  };

  const observer = new MutationObserver(throttledApplyScrolling);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(throttledApplyScrolling, 100);
  };

  window.addEventListener("popstate", () => setTimeout(throttledApplyScrolling, 100));
  window.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      throttledApplyScrolling();
    }
  });

  // Initial application
  applyScrolling();
})();