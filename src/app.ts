// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Hardware-accelerated performance optimization for Spotify client

(async () => {
  while (!Spicetify.React || !Spicetify.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  const allowedOverflow = ["auto", "scroll"] as const;

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
    // Use a more specific selector for better performance
    const elements = document.querySelectorAll<HTMLElement>('[style*="overflow"],[style*="overflow-y"]');
    const elementsToOptimize: HTMLElement[] = [];

    elements.forEach((element) => {
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
        elementsToOptimize.push(element);
      }
    });

    if (elementsToOptimize.length > 0) {
      requestAnimationFrame(() => {
        elementsToOptimize.forEach(element => {
          // Enable smooth scrolling
          element.style.scrollBehavior = "smooth";
          
          // Add subtle hardware acceleration without affecting image loading
          element.style.backfaceVisibility = "hidden";
          element.style.perspective = "1000px";
          element.style.transform = "translate3d(0,0,0)";
          
          // Pre-load images in viewport
          const images = element.querySelectorAll<HTMLImageElement>("img");
          images.forEach(img => {
            if (!img.loading) {
              img.loading = "eager"; // Force eager loading
            }
            if (img.getAttribute("data-lazy")) {
              img.src = img.getAttribute("data-lazy")!;
              img.removeAttribute("data-lazy");
            }
          });

          // Mark as optimized
          element.setAttribute("data-optimized", "true");
        });
      });
    }
  };

  // Optimize mutation observer
  const debouncedOptimization = debounce(optimization, 100, true);
  const observer = new MutationObserver((mutations) => {
    if (mutations.some(m => {
      return m.addedNodes.length > 0 || 
             (m.type === "attributes" && 
              (m.attributeName === "style" || m.attributeName === "class"))
    })) {
      debouncedOptimization();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"]
  });

  // Handle navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    debouncedOptimization();
  };

  window.addEventListener("popstate", debouncedOptimization);

  // Initial optimization
  optimization();
})();