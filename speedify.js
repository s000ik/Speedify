(function spotifyOptimizer() {
  if (!document.body) {
    setTimeout(spotifyOptimizer, 100);
    return;
  }

  // Performance CSS optimizations
  const style = document.createElement('style');
  style.innerHTML = `
    /* Hardware acceleration for scrollable elements */
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

    /* Optimize animations */
    .animation-sprite {
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  // Optimize scrollable elements
  const optimizeScrolling = () => {
    const elements = document.querySelectorAll('*');
    
    elements.forEach(element => {
      const style = window.getComputedStyle(element);
      const isScrollable = ['auto', 'scroll'].includes(style.overflow) || 
                          ['auto', 'scroll'].includes(style.overflowY);
      
      // Skip special UI elements
      const isSpecialElement = element.closest('#context-menu') ||
                              element.classList.contains('popup') ||
                              element.getAttribute('role') === 'dialog' ||
                              element.getAttribute('aria-haspopup') === 'true';

      if (isScrollable && !isSpecialElement && !element.hasAttribute('data-optimized')) {
        element.style.willChange = 'transform';
        element.style.transform = 'translate3d(0, 0, 0)';
        element.style.backfaceVisibility = 'hidden';
        element.setAttribute('data-optimized', 'true');
      }
    });
  };

  // Watch for DOM changes
  const observer = new MutationObserver(optimizeScrolling);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(optimizeScrolling, 100);
  };

  window.addEventListener('popstate', () => setTimeout(optimizeScrolling, 100));

  // Memory optimization
  const clearCaches = () => {
    document.querySelectorAll('img').forEach(img => {
      if (img.complete && !img.isConnected) {
        img.src = '';
      }
    });
  };

  // Performance optimizations for background tabs
  let focused = true;
  window.addEventListener('focus', () => {
    focused = true;
    document.body.style.animationPlayState = 'running';
  });
  
  window.addEventListener('blur', () => {
    focused = false;
    document.body.style.animationPlayState = 'paused';
    clearCaches();
  });

  // Initial optimization
  optimizeScrolling();
})();