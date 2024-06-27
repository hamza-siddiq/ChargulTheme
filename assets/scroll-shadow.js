let template=`
  <style>
  :host {
    display: inline-block;
    position: relative;
  }
  :host([hidden]) {
    display: none;
  }
  s {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
		z-index: 5;
    pointer-events: none;
    background:
      var(--scroll-shadow-top, radial-gradient(farthest-side at 50% 0%, rgba(0,0,0,.2), rgba(0,0,0,0))) top/100% var(--top),
      var(--scroll-shadow-bottom, radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0))) bottom/100% var(--bottom),
      var(--scroll-shadow-left, radial-gradient(farthest-side at 0%, rgba(0,0,0,.2), rgba(0,0,0,0))) left/var(--left) 100%,
      var(--scroll-shadow-right, radial-gradient(farthest-side at 100%, rgba(0,0,0,.2), rgba(0,0,0,0))) right/var(--right) 100%;
    background-repeat: no-repeat;
  }
  </style>
  <slot></slot>
  <s></s>
`,updaters=new WeakMap;class ScrollShadowElement extends HTMLElement{static get observedAttributes(){return["el"]}get el(){return this.getAttribute("el")}set el(t){this.setAttribute("el",t)}constructor(){super(),this.attachShadow({mode:"open"}).innerHTML=template,updaters.set(this,new Updater(this.shadowRoot.lastElementChild))}connectedCallback(){this.shadowRoot.querySelector("slot").addEventListener("slotchange",()=>this.start()),this.start()}disconnectedCallback(){updaters.get(this).stop()}attributeChangedCallback(t,e,s){e!==s&&(this.scrollEl=s?this.querySelector(s):null,this.start())}start(){var t=this.scrollEl||this.firstElementChild;updaters.get(this).start(t,this.scrollEl?this.firstElementChild:null)}}class Updater{constructor(t){t=this.update.bind(this,t,getComputedStyle(t));this.handleScroll=throttle(t),this.resizeObserver=new ResizeObserver(t)}start(t,e){this.el&&this.stop(),t&&(t.addEventListener("scroll",this.handleScroll),this.resizeObserver.observe(t),this.el=t),e&&(this.resizeObserver.observe(e),this.rootEl=e)}stop(){this.el&&(this.el.removeEventListener("scroll",this.handleScroll),this.resizeObserver.disconnect(),this.el=null,this.rootEl=null)}update(t,e){var{el:s,rootEl:l}=this;if(s){var r,e=Number(e.getPropertyValue("--scroll-shadow-size")||14),o={"--top":clamp(s.scrollTop,0,e),"--bottom":clamp(s.scrollHeight-s.offsetHeight-s.scrollTop,0,e),"--left":clamp(s.scrollLeft,0,e),"--right":clamp(s.scrollWidth-s.offsetWidth-s.scrollLeft,0,e)};for(r in l&&(e=s.getBoundingClientRect(),s=l.getBoundingClientRect(),Object.assign(o,{top:clamp(e.top-s.top),bottom:clamp(s.bottom-e.bottom),left:clamp(e.left-s.left),right:clamp(s.right-e.right)})),o)t.style.setProperty(r,o[r]+"px")}}}function clamp(t,e=0,s){return t<e?e:s<t?s:t}function throttle(t){let e=null;return()=>{e=e||requestAnimationFrame(()=>{t(),e=null})}}"customElements"in window&&"ResizeObserver"in window&&customElements.define("scroll-shadow",ScrollShadowElement);export{ScrollShadowElement};