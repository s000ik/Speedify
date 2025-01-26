// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Hardware-accelerated smooth scrolling for Spotify client

(async () => {
  // Wait for Spicetify to initialize
  while (!Spicetify.React || !Spicetify.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

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
        element.style.willChange = "transform";
        element.style.transform = "translate3d(0,0,0)";
        element.setAttribute("data-optimized", "true");
      }
    });
  };

  // Watch for new elements
  const observer = new MutationObserver(applyScrolling);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(applyScrolling, 100);
  };

  window.addEventListener("popstate", () => setTimeout(applyScrolling, 100));

  // Initial application
  applyScrolling();
})();