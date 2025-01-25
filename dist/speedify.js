(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var e=Object.create,i=Object.defineProperty,s=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,t=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty;r={"src/app.ts"(){(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));let t=()=>{document.querySelectorAll("*").forEach(e=>{var{overflow:t,overflowY:r}=window.getComputedStyle(e),t=["auto","scroll"].includes(t)||["auto","scroll"].includes(r),r=e.closest("#context-menu"),o=e.classList.contains("popup"),a="dialog"===e.getAttribute("role"),i="true"===e.getAttribute("aria-haspopup");!t||r||o||a||i||e.hasAttribute("data-optimized")||(e.style.willChange="transform",e.style.transform="translate3d(0, 0, 0)",e.style.backfaceVisibility="hidden",e.style.perspective="1000px",e.setAttribute("data-optimized","true"))})};new MutationObserver(t).observe(document.body,{childList:!0,subtree:!0});let r=history.pushState;history.pushState=function(...e){r.apply(this,e),setTimeout(t,100)},window.addEventListener("popstate",()=>setTimeout(t,100));var e=document.createElement("style");e.innerHTML=`
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
  `,document.head.appendChild(e),t()})()}},a=function(){return o||(0,r[n(r)[0]])((o={exports:{}}).exports,o),o.exports}(),e=null!=a?e(t(a)):{};var r,o,a,l,p=((t,r,o,a)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let e of n(r))c.call(t,e)||e===o||i(t,e,{get:()=>r[e],enumerable:!(a=s(r,e))||a.enumerable});return t})(!l&&a&&a.__esModule?e:i(e,"default",{value:a,enumerable:!0}),a);(async()=>{await(0,p.default)()})()})();