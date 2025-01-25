// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Hardware-accelerated performance optimization for Spotify client

(async () => {
  while (!Spicetify.React || !Spicetify.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  // GPU-accelerated element detection
  const compositeLayerValues = ["auto", "scroll"];
  const isCompositeCandidate = (element: HTMLElement) => {
    const { overflow, overflowY } = window.getComputedStyle(element);
    const needsCompositing = compositeLayerValues.includes(overflow) || compositeLayerValues.includes(overflowY);

    const isOverlayMenu = element.closest("#context-menu");
    const isFloatingLayer = element.classList.contains("popup");
    const isModalLayer = element.getAttribute("role") === "dialog";
    const isDynamicPopup = element.getAttribute("aria-haspopup") === "true";

    return needsCompositing && !isOverlayMenu && !isFloatingLayer && !isModalLayer && !isDynamicPopup;
  };

  // Apply GPU acceleration and composite layers
  const applyHardwareAcceleration = () => {
    const elements = document.querySelectorAll<HTMLElement>("*");

    elements.forEach((element) => {
      const needsAcceleration = isCompositeCandidate(element);
      const isAccelerated = element.hasAttribute("data-gpu-optimized");

      if (needsAcceleration && !isAccelerated) {
        element.style.willChange = "transform";
        element.style.transform = "translate3d(0, 0, 0)";
        element.setAttribute("data-gpu-optimized", "true");
      }
    });
  };

  // Monitor DOM for new composite candidates
  const compositeObserver = new MutationObserver(applyHardwareAcceleration);
  compositeObserver.observe(document.body, { childList: true, subtree: true });

  // Handle SPA navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(applyHardwareAcceleration, 100);
  };

  window.addEventListener("popstate", () => setTimeout(applyHardwareAcceleration, 100));

  // Initialize GPU acceleration
  applyHardwareAcceleration();
})();