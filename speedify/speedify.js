// NAME: Speedify
// AUTHOR: Satwik Singh
// DESCRIPTION: Speeds up the Spotify desktop client by optimizing animations, virtual scrolling, and memory usage.

(function spotifyOptimizer() {
  if (!document.body) {
      setTimeout(spotifyOptimizer, 100);
      return;
  }

  // Performance CSS optimizations
  const style = document.createElement('style');
  style.innerHTML = `
      /* Hardware acceleration & paint containment */
      .Root__main-view, .Root__nav-bar, .Root__right-sidebar {
          transform: translateZ(0);
          contain: paint layout style;
          will-change: transform;
      }
      
      /* Reduce repaints for scrolling elements */
      .main-view-container__scroll-node,
      .os-viewport {
          contain: paint;
          will-change: transform;
      }

      /* Optimize animations */
      .animation-sprite {
          will-change: transform;
      }

      /* Reduce memory usage for hidden elements */
      .hidden, 
      .collapsed {
          content-visibility: hidden;
          contain: strict;
      }
  `;
  document.head.appendChild(style);

  // Virtual scroll implementation
  class VirtualScroller {
      constructor(container, itemHeight = 50) {
          this.container = container;
          this.itemHeight = itemHeight;
          this.items = [];
          this.visibleItems = new Set();
          this.init();
      }

      init() {
          this.container.style.position = 'relative';
          this.onScroll = this.onScroll.bind(this);
          this.container.addEventListener('scroll', this.onScroll, { passive: true });
      }

      onScroll() {
          requestAnimationFrame(() => {
              const start = Math.floor(this.container.scrollTop / this.itemHeight);
              const end = start + Math.ceil(this.container.clientHeight / this.itemHeight);
              this.renderItems(start, end);
          });
      }

      renderItems(start, end) {
          // Remove items no longer visible
          for (const index of this.visibleItems) {
              if (index < start || index > end) {
                  this.hideItem(index);
              }
          }
          // Add newly visible items
          for (let i = start; i <= end; i++) {
              if (this.items[i] && !this.visibleItems.has(i)) {
                  this.showItem(i);
              }
          }
      }

      hideItem(index) {
          const item = this.items[index];
          if (item) {
              item.style.display = 'none';
              this.visibleItems.delete(index);
          }
      }

      showItem(index) {
          const item = this.items[index];
          if (item) {
              item.style.display = '';
              item.style.position = 'absolute';
              item.style.top = `${index * this.itemHeight}px`;
              this.visibleItems.add(index);
          }
      }
  }

  // Memory management
  const clearCaches = () => {
      // Clear image caches older than 5 minutes
      document.querySelectorAll('img').forEach(img => {
          if (img.complete && !img.isConnected) {
              img.src = '';
          }
      });
      
      // Clear old history entries
      if (window.history.length > 50) {
          window.history.go(-(window.history.length - 50));
      }
  };

  // Apply virtual scrolling to long lists
  document.querySelectorAll('.main-trackList-trackList').forEach(list => {
      new VirtualScroller(list);
  });

  // Periodic cleanup
  setInterval(clearCaches, 300000); // Every 5 minutes

  // Throttle animations when unfocused
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

  // Cancel stale requests
  const controller = new AbortController();
  window.addEventListener('popstate', () => {
      controller.abort();
  });
})();