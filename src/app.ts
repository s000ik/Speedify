// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Hardware-accelerated performance optimization for Spotify client

(async () => {
  while (!Spicetify.React || !Spicetify.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  const allowedOverflow = ["auto", "scroll"] as const;

  // Add global styles for smooth page transitions
  const style = document.createElement("style");
  style.innerHTML = `
    .Root__main-view {
      transition: opacity 200ms ease-in-out !important;
    }
    .Root__main-view--loading {
      opacity: 0 !important;
    }
  `;
  document.head.appendChild(style);

  // Optimized debounce with proper typing
  const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
    immediate = false
  ) => {
    let timeoutId: NodeJS.Timeout | undefined;
    return (...args: Parameters<T>) => {
      const callNow = immediate && !timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        if (!immediate) fn(...args);
      }, delay);
      if (callNow) fn(...args);
    };
  };

  const optimization = () => {
    // Simplified selector that matches all scrollable elements
    document.querySelectorAll("*").forEach(element => {
      if (!(element instanceof HTMLElement)) return;
      if (element.hasAttribute("data-optimized")) return;

      const { overflow, overflowY } = window.getComputedStyle(element);
      const isScrollable = allowedOverflow.includes(overflow as any) || 
                          allowedOverflow.includes(overflowY as any);
      
      // Skip optimization for special elements
      const isContextMenu = element.closest("#context-menu");
      const isPopup = element.classList.contains("popup");
      const isDialog = element.getAttribute("role") === "dialog";
      const isAriaHasPopup = element.getAttribute("aria-haspopup") === "true";

      if (isScrollable && !isContextMenu && !isPopup && !isDialog && !isAriaHasPopup) {
        // Apply minimal GPU acceleration
        element.style.willChange = "transform";
        element.style.transform = "translate3d(0,0,0)";
        
        // Enable smooth scrolling
        element.style.scrollBehavior = "smooth";
        
        // Mark as optimized
        element.setAttribute("data-optimized", "true");
      }
    });
  };

  // Handle page transitions
  const handlePageTransition = () => {
    const mainView = document.querySelector(".Root__main-view");
    if (mainView) {
      mainView.classList.add("Root__main-view--loading");
      setTimeout(() => {
        mainView.classList.remove("Root__main-view--loading");
        optimization();
      }, 100);
    }
  };

  // Optimize mutation observer
  const debouncedOptimization = debounce(optimization, 100, true);
  const observer = new MutationObserver((mutations) => {
    if (mutations.some(m => m.addedNodes.length > 0)) {
      debouncedOptimization();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle navigation with transitions
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    handlePageTransition();
  };

  window.addEventListener("popstate", handlePageTransition);

  // Initial optimization
  optimization();
})();