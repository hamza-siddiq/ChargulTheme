class Cart{constructor(){this.container=document.getElementById("Cart"),this.setupEventListeners()}onChange(e){"number"==e.target.type?this.updateQuantity(e.target.dataset.index,e.target.value):"CartSpecialInstructions"==e.target.getAttribute("id")&&this.saveNotes()}saveNotes(){fetch(theme.routes.cart_update_url+".js",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({note:document.getElementById("CartSpecialInstructions").value})})}setupEventListeners(){this.removeProductEvent(),this.debouncedOnChange=debounce(e=>{this.onChange(e)},300),document.addEventListener("cart:refresh",e=>{this.refresh()}),this.container.addEventListener("change",this.debouncedOnChange.bind(this)),this.termsCheckbox()}getSectionsToRender(){return[{id:"Cart",section:"main-cart",selector:".thb-cart-form"},{id:"cart-drawer-toggle",section:"cart-bubble",selector:".thb-item-count"}]}displayErrors(e,t){var r=document.getElementById("Line-item-error-"+e)||document.getElementById("CartDrawer-LineItemError-"+e);r&&(r.removeAttribute("hidden"),r.querySelector(".cart-item__error-text").innerHTML=t,this.container.querySelector("#CartItem-"+e).classList.remove("loading"))}getSectionInnerHTML(e,t){return(new DOMParser).parseFromString(e,"text/html").querySelector(t).innerHTML}updateQuantity(t,r){this.container.classList.add("cart-disabled"),t&&this.container.querySelector("#CartItem-"+t).classList.add("loading");var e=JSON.stringify({line:t,quantity:r,sections:this.getSectionsToRender().map(e=>e.section),sections_url:window.location.pathname});dispatchCustomEvent("line-item:change:start",{quantity:r}),fetch(""+theme.routes.cart_change_url,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:e}).then(e=>e.text()).then(e=>{e=JSON.parse(e);e.errors?(this.displayErrors(t,e.errors),this.container.classList.remove("cart-disabled")):(this.renderContents(e,t),this.container.classList.remove("cart-disabled"),dispatchCustomEvent("line-item:change:end",{quantity:r,cart:e}))})}refresh(){this.container.classList.add("cart-disabled");fetch(window.location.pathname+"?sections=main-cart").then(e=>e.text()).then(e=>{e=JSON.parse(e);e.errors?this.displayErrors(line,e.errors):this.renderContents(e,!1,!0),this.container.classList.remove("cart-disabled")})}termsCheckbox(){let t=this.container.querySelector("#CartTerms"),e=this.container.querySelector(".button.checkout-button");t&&e&&(t.setCustomValidity(theme.strings.requiresTerms),e.addEventListener("click",function(e){t.checked||(t.reportValidity(),t.focus(),e.preventDefault())}))}removeProductEvent(){this.container.querySelectorAll(".remove").forEach(e=>{e.addEventListener("click",e=>{this.updateQuantity(e.target.dataset.index,"0"),e.preventDefault()})})}renderContents(r,n,i){this.getSectionsToRender().forEach(e=>{var t=document.getElementById(e.id).querySelector(e.selector)||document.getElementById(e.id);i?r[e.section]&&(t.innerHTML=this.getSectionInnerHTML(r[e.section],e.selector)):t.innerHTML=this.getSectionInnerHTML(r.sections[e.section],e.selector),this.removeProductEvent(),n&&this.container.querySelector("#CartItem-"+n)&&this.container.querySelector("#CartItem-"+n).classList.remove("loading"),this.termsCheckbox()})}}window.addEventListener("load",()=>{void 0!==Cart&&new Cart});