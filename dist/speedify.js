(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(t=>setTimeout(t,10));var t=Object.create,a=Object.defineProperty,n=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,e=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty;o={"src/app.ts"(){(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(t=>setTimeout(t,10));var t=document.createElement("style");t.innerHTML=`
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
  `,document.head.appendChild(t);let n=["auto","scroll"],e=()=>{document.querySelectorAll("*").forEach(t=>{var e,o,i,r,a;t instanceof HTMLElement&&(t.hasAttribute("data-optimized")||({overflow:e,overflowY:o}=window.getComputedStyle(t),e=n.includes(e)||n.includes(o),o=t.closest("#context-menu"),i=t.classList.contains("popup"),r="dialog"===t.getAttribute("role"),a="true"===t.getAttribute("aria-haspopup"),!e)||o||i||r||a||(t.style.willChange="transform",t.style.transform="translate3d(0,0,0)",t.style.backfaceVisibility="hidden",t.style.perspective="1000px",t.style.contain="content",t.setAttribute("data-optimized","true"),t.classList.contains("os-viewport")&&(t.style.overflowY="scroll",t.style.scrollBehavior="smooth")))})},o=()=>{document.hidden||requestAnimationFrame(e)},i=(new MutationObserver(o).observe(document.body,{childList:!0,subtree:!0}),history.pushState);history.pushState=function(...t){i.apply(this,t),setTimeout(o,100)},window.addEventListener("popstate",()=>setTimeout(o,100)),window.addEventListener("visibilitychange",()=>{document.hidden||o()}),e()})()}},r=function(){return i||(0,o[s(o)[0]])((i={exports:{}}).exports,i),i.exports}(),t=null!=r?t(e(r)):{};var o,i,r,l,p=((e,o,i,r)=>{if(o&&"object"==typeof o||"function"==typeof o)for(let t of s(o))c.call(e,t)||t===i||a(e,t,{get:()=>o[t],enumerable:!(r=n(o,t))||r.enumerable});return e})(!l&&r&&r.__esModule?t:a(t,"default",{value:r,enumerable:!0}),r);(async()=>{await(0,p.default)()})()})();