(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var e=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,t=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty;i={"src/app.ts"(){(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));let t=()=>{document.querySelectorAll("*").forEach(e=>{var{overflow:t,overflowY:i}=window.getComputedStyle(e),t=["auto","scroll"].includes(t)||["auto","scroll"].includes(i),i=e.closest("#context-menu"),a=e.classList.contains("popup"),o="dialog"===e.getAttribute("role"),n="true"===e.getAttribute("aria-haspopup");!t||i||a||o||n||e.hasAttribute("data-optimized")||(e.style.willChange="transform",e.style.transform="translate3d(0, 0, 0)",e.style.backfaceVisibility="hidden",e.style.perspective="1000px",e.setAttribute("data-optimized","true"))})};var e=document.createElement("style");e.innerHTML=`
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
  `,document.head.appendChild(e);let i=!0,a=(window.addEventListener("focus",()=>{i=!0,document.body.style.animationPlayState="running"}),window.addEventListener("blur",()=>{i=!1,document.body.style.animationPlayState="paused",performance.clearResourceTimings(),window.gc&&window.gc()}),new IntersectionObserver(e=>{e.forEach(e=>{e.target instanceof HTMLImageElement&&(e.isIntersecting?e.target.loading="eager":e.target.loading="lazy")})})),o=(new MutationObserver(e=>{i&&(t(),e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e=e.getElementsByTagName("img"),Array.from(e).forEach(e=>a.observe(e)))})}))}).observe(document.body,{childList:!0,subtree:!0}),history.pushState);history.pushState=function(...e){o.apply(this,e),i&&setTimeout(t,100)},window.addEventListener("popstate",()=>{i&&setTimeout(t,100)}),t(),document.querySelectorAll("img").forEach(e=>a.observe(e))})()}},o=function(){return a||(0,i[s(i)[0]])((a={exports:{}}).exports,a),a.exports}(),e=null!=o?e(t(o)):{};var i,a,o,l,d=((t,i,a,o)=>{if(i&&"object"==typeof i||"function"==typeof i)for(let e of s(i))c.call(t,e)||e===a||n(t,e,{get:()=>i[e],enumerable:!(o=r(i,e))||o.enumerable});return t})(!l&&o&&o.__esModule?e:n(e,"default",{value:o,enumerable:!0}),o);(async()=>{await(0,d.default)()})()})();