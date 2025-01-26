// // NAME: Speedify
// // AUTHOR: Satwik Singh
// // DESCRIPTION: Hardware-accelerated smooth scrolling for Spotify client

// (async () => {
//   // Wait for Spicetify to initialize
//   while (!Spicetify.React || !Spicetify.ReactDOM) {
//     await new Promise(resolve => setTimeout(resolve, 10));
//   }

//   const allowedOverflow = ["auto", "scroll"] as const;

//   const applyScrolling = () => {
//     document.querySelectorAll("*").forEach(element => {
//       if (!(element instanceof HTMLElement)) return;
//       if (element.hasAttribute("data-optimized")) return;

//       // Check if element is scrollable
//       const { overflow, overflowY } = window.getComputedStyle(element);
//       const isScrollable = allowedOverflow.includes(overflow as any) || 
//                           allowedOverflow.includes(overflowY as any);
      
//       // Skip special UI elements
//       const isContextMenu = element.closest("#context-menu");
//       const isPopup = element.classList.contains("popup");
//       const isDialog = element.getAttribute("role") === "dialog";
//       const isAriaHasPopup = element.getAttribute("aria-haspopup") === "true";

//       if (isScrollable && !isContextMenu && !isPopup && !isDialog && !isAriaHasPopup) {
//         element.style.willChange = "transform";
//         element.style.transform = "translate3d(0,0,0)";
//         element.setAttribute("data-optimized", "true");
//       }
//     });
//   };

//   // Watch for new elements
//   const observer = new MutationObserver(applyScrolling);
//   observer.observe(document.body, {
//     childList: true,
//     subtree: true
//   });

//   // Handle navigation
//   const originalPushState = history.pushState;
//   history.pushState = function(...args) {
//     originalPushState.apply(this, args);
//     setTimeout(applyScrolling, 100);
//   };

//   window.addEventListener("popstate", () => setTimeout(applyScrolling, 100));

//   // Initial application
//   applyScrolling();
// })();

// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Hardware-accelerated smooth scrolling and performance optimization

(async () => {
  // Wait for Spicetify to initialize
  while (!Spicetify.React || !Spicetify.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  const allowedOverflow = ["auto", "scroll"] as const;

  // Cache management
  const pageCache = new Map<string, { content: Element; timestamp: number }>();
  const maxCacheAge = 30 * 60 * 1000; // 30 minutes
  const imageCache = new Map<string, HTMLImageElement>();

  // Preload common routes
  const commonRoutes = [
    "/search",
    "/collection/playlists",
    "/collection/tracks",
    "/collection/albums",
    "/collection/artists"
  ];

  const preloadRoute = async (route: string) => {
    try {
      const mainView = document.querySelector(".main-view-container__scroll-node");
      if (mainView && !pageCache.has(route)) {
        pageCache.set(route, {
          content: mainView.cloneNode(true) as Element,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error("Failed to preload route:", error);
    }
  };

  // Cleanup old cache entries
  const cleanupCache = () => {
    const now = Date.now();
    pageCache.forEach((value, key) => {
      if (now - value.timestamp > maxCacheAge) {
        pageCache.delete(key);
      }
    });
  };

  // Cache currently visible images
  const cacheVisibleImages = () => {
    const images = document.querySelectorAll<HTMLImageElement>("img[src]:not([data-cached])");
    images.forEach(img => {
      if (!imageCache.has(img.src)) {
        imageCache.set(img.src, img);
        img.setAttribute("data-cached", "true");
      }
    });
  };

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
        element.style.willChange = "transform";
        element.style.transform = "translate3d(0,0,0)";
        element.setAttribute("data-optimized", "true");

        // Cache images in scrollable containers
        const images = element.querySelectorAll<HTMLImageElement>("img[src]:not([data-cached])");
        images.forEach(img => {
          if (!imageCache.has(img.src)) {
            const clone = new Image();
            clone.src = img.src;
            imageCache.set(img.src, clone);
            img.setAttribute("data-cached", "true");
          }
        });
      }
    });
  };

  // Watch for new elements
  const observer = new MutationObserver((mutations) => {
    applyScrolling();
    cacheVisibleImages();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"]
  });

  // Handle navigation with caching
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    const newPath = args[2] as string;
    originalPushState.apply(this, args);
    
    setTimeout(() => {
      applyScrolling();
      // Cache current route
      preloadRoute(newPath);
      // Preload adjacent routes
      commonRoutes.forEach(route => {
        if (route !== newPath) {
          preloadRoute(route);
        }
      });
    }, 100);
  };

  window.addEventListener("popstate", () => {
    setTimeout(() => {
      applyScrolling();
      const currentPath = window.location.pathname;
      preloadRoute(currentPath);
    }, 100);
  });

  // Periodic cache cleanup
  setInterval(cleanupCache, maxCacheAge);

  // Initial setup
  applyScrolling();
  cacheVisibleImages();
  commonRoutes.forEach(preloadRoute);
})();