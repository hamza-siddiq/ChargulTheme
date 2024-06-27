!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).noUiSlider={})}(this,function(ut){function n(t){return"object"==typeof t&&"function"==typeof t.to}function ct(t){t.parentElement.removeChild(t)}function pt(t){return null!=t}function ft(t){t.preventDefault()}function i(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function dt(t,e,r){0<r&&(gt(t,e),setTimeout(function(){bt(t,e)},r))}function ht(t){return Math.max(Math.min(t,100),0)}function mt(t){return Array.isArray(t)?t:[t]}function e(t){t=(t=String(t)).split(".");return 1<t.length?t[1].length:0}function gt(t,e){t.classList&&!/\s/.test(e)?t.classList.add(e):t.className+=" "+e}function bt(t,e){t.classList&&!/\s/.test(e)?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function vt(t){var e=void 0!==window.pageXOffset,r="CSS1Compat"===(t.compatMode||"");return{x:e?window.pageXOffset:(r?t.documentElement:t.body).scrollLeft,y:e?window.pageYOffset:(r?t.documentElement:t.body).scrollTop}}function s(t,e){return 100/(e-t)}function a(t,e,r){return 100*e/(t[r+1]-t[r])}function l(t,e){for(var r=1;t>=e[r];)r+=1;return r}function r(t,e,r){var n,i,o;return r>=t.slice(-1)[0]?100:(o=l(r,t),n=t[o-1],t=t[o],i=e[o-1],e=e[o],i+(o=r,a(r=[n,t],r[0]<0?o+Math.abs(r[0]):o-r[0],0)/s(i,e)))}function o(t,e,r,n){var i,o,s;return 100===n?n:(o=t[(i=l(n,t))-1],s=t[i],r?(s-o)/2<n-o?s:o:e[i-1]?t[i-1]+(r=n-t[i-1],s=e[i-1],Math.round(r/s)*s):n)}ut.PipsMode=void 0,(E=ut.PipsMode||(ut.PipsMode={})).Range="range",E.Steps="steps",E.Positions="positions",E.Count="count",E.Values="values",ut.PipsType=void 0,(E=ut.PipsType||(ut.PipsType={}))[E.None=-1]="None",E[E.NoValue=0]="NoValue",E[E.LargeValue=1]="LargeValue",E[E.SmallValue=2]="SmallValue";t.prototype.getDistance=function(t){for(var e=[],r=0;r<this.xNumSteps.length-1;r++)e[r]=a(this.xVal,t,r);return e},t.prototype.getAbsoluteDistance=function(t,e,r){var n=0;if(t<this.xPct[this.xPct.length-1])for(;t>this.xPct[n+1];)n++;else t===this.xPct[this.xPct.length-1]&&(n=this.xPct.length-2);r||t!==this.xPct[n+1]||n++;for(var i,o=1,s=(e=null===e?[]:e)[n],a=0,l=0,u=0,c=r?(t-this.xPct[n])/(this.xPct[n+1]-this.xPct[n]):(this.xPct[n+1]-t)/(this.xPct[n+1]-this.xPct[n]);0<s;)i=this.xPct[n+1+u]-this.xPct[n+u],100<e[n+u]*o+100-100*c?(a=i*c,o=(s-100*c)/e[n+u],c=1):(a=e[n+u]*i/100*o,o=0),r?(l-=a,1<=this.xPct.length+u&&u--):(l+=a,1<=this.xPct.length-u&&u++),s=e[n+u]*o;return t+l},t.prototype.toStepping=function(t){return t=r(this.xVal,this.xPct,t)},t.prototype.fromStepping=function(t){return e=this.xVal,r=this.xPct,100<=(t=t)?e.slice(-1)[0]:(o=l(t,r),n=e[o-1],e=e[o],i=r[o-1],r=r[o],(t-i)*s(i,r)*((o=[n,e])[1]-o[0])/100+o[0]);var e,r,n,i,o},t.prototype.getStep=function(t){return t=o(this.xPct,this.xSteps,this.snap,t)},t.prototype.getDefaultStep=function(t,e,r){var n=l(t,this.xPct);return(100===t||e&&t===this.xPct[n-1])&&(n=Math.max(n-1,1)),(this.xVal[n]-this.xVal[n-1])/r},t.prototype.getNearbySteps=function(t){t=l(t,this.xPct);return{stepBefore:{startValue:this.xVal[t-2],step:this.xNumSteps[t-2],highestStep:this.xHighestCompleteStep[t-2]},thisStep:{startValue:this.xVal[t-1],step:this.xNumSteps[t-1],highestStep:this.xHighestCompleteStep[t-1]},stepAfter:{startValue:this.xVal[t],step:this.xNumSteps[t],highestStep:this.xHighestCompleteStep[t]}}},t.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(e);return Math.max.apply(null,t)},t.prototype.hasNoSize=function(){return this.xVal[0]===this.xVal[this.xVal.length-1]},t.prototype.convert=function(t){return this.getStep(this.toStepping(t))},t.prototype.handleEntryPoint=function(t,e){t="min"===t?0:"max"===t?100:parseFloat(t);if(!i(t)||!i(e[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");this.xPct.push(t),this.xVal.push(e[0]);e=Number(e[1]);t?this.xSteps.push(!isNaN(e)&&e):isNaN(e)||(this.xSteps[0]=e),this.xHighestCompleteStep.push(0)},t.prototype.handleStepPoint=function(t,e){e&&(this.xVal[t]===this.xVal[t+1]?this.xSteps[t]=this.xHighestCompleteStep[t]=this.xVal[t]:(this.xSteps[t]=a([this.xVal[t],this.xVal[t+1]],e,0)/s(this.xPct[t],this.xPct[t+1]),e=(this.xVal[t+1]-this.xVal[t])/this.xNumSteps[t],e=Math.ceil(Number(e.toFixed(3))-1),e=this.xVal[t]+this.xNumSteps[t]*e,this.xHighestCompleteStep[t]=e))};var u=t;function t(e,t,r){this.xPct=[],this.xVal=[],this.xSteps=[],this.xNumSteps=[],this.xHighestCompleteStep=[],this.xSteps=[r||!1],this.xNumSteps=[!1],this.snap=t;var n,i=[];for(Object.keys(e).forEach(function(t){i.push([mt(e[t]),t])}),i.sort(function(t,e){return t[0][0]-e[0][0]}),n=0;n<i.length;n++)this.handleEntryPoint(i[n][1],i[n][0]);for(this.xNumSteps=this.xSteps.slice(0),n=0;n<this.xNumSteps.length;n++)this.handleStepPoint(n,this.xNumSteps[n])}var c={to:function(t){return void 0===t?"":t.toFixed(2)},from:Number},p={target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",touchArea:"touch-area",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",textDirectionLtr:"txt-dir-ltr",textDirectionRtl:"txt-dir-rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"},St={tooltips:".__tooltips",aria:".__aria"};function f(t,e){if(!i(e))throw new Error("noUiSlider: 'step' is not numeric.");t.singleStep=e}function d(t,e){if(!i(e))throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");t.keyboardPageMultiplier=e}function h(t,e){if(!i(e))throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");t.keyboardMultiplier=e}function m(t,e){if(!i(e))throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");t.keyboardDefaultStep=e}function g(t,e){if("object"!=typeof e||Array.isArray(e))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===e.min||void 0===e.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");t.spectrum=new u(e,t.snap||!1,t.singleStep)}function b(t,e){if(e=mt(e),!Array.isArray(e)||!e.length)throw new Error("noUiSlider: 'start' option is incorrect.");t.handles=e.length,t.start=e}function v(t,e){if("boolean"!=typeof e)throw new Error("noUiSlider: 'snap' option must be a boolean.");t.snap=e}function S(t,e){if("boolean"!=typeof e)throw new Error("noUiSlider: 'animate' option must be a boolean.");t.animate=e}function x(t,e){if("number"!=typeof e)throw new Error("noUiSlider: 'animationDuration' option must be a number.");t.animationDuration=e}function P(t,e){var r,n=[!1];if("lower"===e?e=[!0,!1]:"upper"===e&&(e=[!1,!0]),!0===e||!1===e){for(r=1;r<t.handles;r++)n.push(e);n.push(!1)}else{if(!Array.isArray(e)||!e.length||e.length!==t.handles+1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");n=e}t.connect=n}function C(t,e){switch(e){case"horizontal":t.ort=0;break;case"vertical":t.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function y(t,e){if(!i(e))throw new Error("noUiSlider: 'margin' option must be numeric.");0!==e&&(t.margin=t.spectrum.getDistance(e))}function N(t,e){if(!i(e))throw new Error("noUiSlider: 'limit' option must be numeric.");if(t.limit=t.spectrum.getDistance(e),!t.limit||t.handles<2)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.")}function V(t,e){var r;if(!i(e)&&!Array.isArray(e))throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(e)&&2!==e.length&&!i(e[0])&&!i(e[1]))throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==e){for(Array.isArray(e)||(e=[e,e]),t.padding=[t.spectrum.getDistance(e[0]),t.spectrum.getDistance(e[1])],r=0;r<t.spectrum.xNumSteps.length-1;r++)if(t.padding[0][r]<0||t.padding[1][r]<0)throw new Error("noUiSlider: 'padding' option must be a positive number(s).");var e=e[0]+e[1],n=t.spectrum.xVal[0];if(1<e/(t.spectrum.xVal[t.spectrum.xVal.length-1]-n))throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.")}}function A(t,e){switch(e){case"ltr":t.dir=0;break;case"rtl":t.dir=1;break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function k(t,e){if("string"!=typeof e)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var r=0<=e.indexOf("tap"),n=0<=e.indexOf("drag"),i=0<=e.indexOf("fixed"),o=0<=e.indexOf("snap"),s=0<=e.indexOf("hover"),a=0<=e.indexOf("unconstrained"),l=0<=e.indexOf("drag-all"),e=0<=e.indexOf("smooth-steps");if(i){if(2!==t.handles)throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");y(t,t.start[1]-t.start[0])}if(a&&(t.margin||t.limit))throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");t.events={tap:r||o,drag:n,dragAll:l,smoothSteps:e,fixed:i,snap:o,hover:s,unconstrained:a}}function M(t,e){if(!1!==e)if(!0===e||n(e)){t.tooltips=[];for(var r=0;r<t.handles;r++)t.tooltips.push(e)}else{if((e=mt(e)).length!==t.handles)throw new Error("noUiSlider: must pass a formatter for all handles.");e.forEach(function(t){if("boolean"!=typeof t&&!n(t))throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")}),t.tooltips=e}}function U(t,e){if(e.length!==t.handles)throw new Error("noUiSlider: must pass a attributes for all handles.");t.handleAttributes=e}function D(t,e){if(!n(e))throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");t.ariaFormat=e}function O(t,e){if(!n(r=e)||"function"!=typeof r.from)throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");var r;t.format=e}function L(t,e){if("boolean"!=typeof e)throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");t.keyboardSupport=e}function T(t,e){t.documentElement=e}function j(t,e){if("string"!=typeof e&&!1!==e)throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");t.cssPrefix=e}function z(e,r){if("object"!=typeof r)throw new Error("noUiSlider: 'cssClasses' must be an object.");"string"==typeof e.cssPrefix?(e.cssClasses={},Object.keys(r).forEach(function(t){e.cssClasses[t]=e.cssPrefix+r[t]})):e.cssClasses=r}function xt(e){var r={margin:null,limit:null,padding:null,animate:!0,animationDuration:300,ariaFormat:c,format:c},n={step:{r:!1,t:f},keyboardPageMultiplier:{r:!1,t:d},keyboardMultiplier:{r:!1,t:h},keyboardDefaultStep:{r:!1,t:m},start:{r:!0,t:b},connect:{r:!0,t:P},direction:{r:!0,t:A},snap:{r:!1,t:v},animate:{r:!1,t:S},animationDuration:{r:!1,t:x},range:{r:!0,t:g},orientation:{r:!1,t:C},margin:{r:!1,t:y},limit:{r:!1,t:N},padding:{r:!1,t:V},behaviour:{r:!0,t:k},ariaFormat:{r:!1,t:D},format:{r:!1,t:O},tooltips:{r:!1,t:M},keyboardSupport:{r:!0,t:L},documentElement:{r:!1,t:T},cssPrefix:{r:!0,t:j},cssClasses:{r:!0,t:z},handleAttributes:{r:!1,t:U}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:p,keyboardPageMultiplier:5,keyboardMultiplier:1,keyboardDefaultStep:10},t=(e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(n).forEach(function(t){if(pt(e[t])||void 0!==i[t])n[t].t(r,(pt(e[t])?e:i)[t]);else if(n[t].r)throw new Error("noUiSlider: '"+t+"' is required.")}),r.pips=e.pips,document.createElement("div")),o=void 0!==t.style.msTransform,t=void 0!==t.style.transform;r.transformRule=t?"transform":o?"msTransform":"webkitTransform";return r.style=[["left","top"],["right","bottom"]][r.dir][r.ort],r}function H(t,f,o){var i,l,a,n,s,u=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},j=window.CSS&&CSS.supports&&CSS.supports("touch-action","none")&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),c=t,S=f.spectrum,p=[],d=[],h=[],m=0,g={},b=t.ownerDocument,v=f.documentElement||b.documentElement,x=b.body,z="rtl"===b.dir||1===f.ort?0:100;function y(t,e){var r=b.createElement("div");return e&&gt(r,e),t.appendChild(r),r}function H(t,c){var e,t=y(t,f.cssClasses.origin),r=y(t,f.cssClasses.handle);return y(r,f.cssClasses.touchArea),r.setAttribute("data-handle",String(c)),f.keyboardSupport&&(r.setAttribute("tabindex","0"),r.addEventListener("keydown",function(t){var e=c;if(!_()&&!w(e)){var r,n=["Left","Right"],i=["Down","Up"],o=["PageDown","PageUp"],s=["Home","End"],a=(f.dir&&!f.ort?n.reverse():f.ort&&!f.dir&&(i.reverse(),o.reverse()),t.key.replace("Arrow","")),l=a===o[0],o=a===o[1],u=a===i[0]||a===n[0]||l,i=a===i[1]||a===n[1]||o,n=a===s[0],a=a===s[1];if(!(u||i||n||a))return!0;if(t.preventDefault(),i||u){s=u?0:1,n=ot(e)[s];if(null===n)return!1;!1===n&&(n=S.getDefaultStep(d[e],u,f.keyboardDefaultStep)),n*=o||l?f.keyboardPageMultiplier:f.keyboardMultiplier,n=Math.max(n,1e-7),n*=u?-1:1,r=p[e]+n}else r=a?f.spectrum.xVal[f.spectrum.xVal.length-1]:f.spectrum.xVal[0];U(e,S.toStepping(r),!0,!0),k("slide",e),k("update",e),k("change",e),k("set",e)}return!1})),void 0!==f.handleAttributes&&(e=f.handleAttributes[c],Object.keys(e).forEach(function(t){r.setAttribute(t,e[t])})),r.setAttribute("role","slider"),r.setAttribute("aria-orientation",f.ort?"vertical":"horizontal"),0===c?gt(r,f.cssClasses.handleLower):c===f.handles-1&&gt(r,f.cssClasses.handleUpper),t.handle=r,t}function F(t,e){return!!e&&y(t,f.cssClasses.connect)}function R(t,e){return!(!f.tooltips||!f.tooltips[e])&&y(t.firstChild,f.cssClasses.tooltip)}function _(){return c.hasAttribute("disabled")}function w(t){return l[t].hasAttribute("disabled")}function E(){s&&(r("update"+St.tooltips),s.forEach(function(t){t&&ct(t)}),s=null)}function B(){E(),s=l.map(R),e("update"+St.tooltips,function(t,e,r){s&&f.tooltips&&!1!==s[e]&&(t=t[e],!0!==f.tooltips[e]&&(t=f.tooltips[e].to(r[e])),s[e].innerHTML=t)})}function q(t,e){return t.map(function(t){return S.fromStepping(e?S.getStep(t):t)})}function X(d){var h=function(t){if(t.mode===ut.PipsMode.Range||t.mode===ut.PipsMode.Steps)return S.xVal;if(t.mode!==ut.PipsMode.Count)return t.mode===ut.PipsMode.Positions?q(t.values,t.stepped):t.mode===ut.PipsMode.Values?t.stepped?t.values.map(function(t){return S.fromStepping(S.getStep(S.toStepping(t)))}):t.values:[];if(t.values<2)throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");for(var e=t.values-1,r=100/e,n=[];e--;)n[e]=e*r;return n.push(100),q(n,t.stepped)}(d),m={},t=S.xVal[0],e=S.xVal[S.xVal.length-1],g=!1,b=!1,v=0;return(h=h.slice().sort(function(t,e){return t-e}).filter(function(t){return!this[t]&&(this[t]=!0)},{}))[0]!==t&&(h.unshift(t),g=!0),h[h.length-1]!==e&&(h.push(e),b=!0),h.forEach(function(t,e){var r,n,i,o,s,a,l,u,c=h[e+1],p=d.mode===ut.PipsMode.Steps,f=(f=p?S.xNumSteps[e]:f)||c-t;for(void 0===c&&(c=t),f=Math.max(f,1e-7),r=t;r<=c;r=Number((r+f).toFixed(7))){for(a=(s=(i=S.toStepping(r))-v)/(d.density||1),u=s/(l=Math.round(a)),n=1;n<=l;n+=1)m[(o=v+n*u).toFixed(5)]=[S.fromStepping(o),0];s=-1<h.indexOf(r)?ut.PipsType.LargeValue:p?ut.PipsType.SmallValue:ut.PipsType.NoValue,!e&&g&&r!==c&&(s=0),r===c&&b||(m[i.toFixed(5)]=[r,s]),v=i}}),m}function Y(i,o,s){var t,a=b.createElement("div"),n=((t={})[ut.PipsType.None]="",t[ut.PipsType.NoValue]=f.cssClasses.valueNormal,t[ut.PipsType.LargeValue]=f.cssClasses.valueLarge,t[ut.PipsType.SmallValue]=f.cssClasses.valueSub,t),l=((t={})[ut.PipsType.None]="",t[ut.PipsType.NoValue]=f.cssClasses.markerNormal,t[ut.PipsType.LargeValue]=f.cssClasses.markerLarge,t[ut.PipsType.SmallValue]=f.cssClasses.markerSub,t),u=[f.cssClasses.valueHorizontal,f.cssClasses.valueVertical],c=[f.cssClasses.markerHorizontal,f.cssClasses.markerVertical];function p(t,e){var r=e===f.cssClasses.value;return e+" "+(r?u:c)[f.ort]+" "+(r?n:l)[t]}return gt(a,f.cssClasses.pips),gt(a,0===f.ort?f.cssClasses.pipsHorizontal:f.cssClasses.pipsVertical),Object.keys(i).forEach(function(t){var e,r,n;r=i[e=t][0],t=i[t][1],(t=o?o(r,t):t)!==ut.PipsType.None&&((n=y(a,!1)).className=p(t,f.cssClasses.marker),n.style[f.style]=e+"%",t>ut.PipsType.NoValue)&&((n=y(a,!1)).className=p(t,f.cssClasses.value),n.setAttribute("data-value",String(r)),n.style[f.style]=e+"%",n.innerHTML=String(s.to(r)))}),a}function P(){n&&(ct(n),n=null)}function C(t){P();var e=X(t),r=t.filter,t=t.format||{to:function(t){return String(Math.round(t))}};return n=c.appendChild(Y(e,r,t))}function I(){var t=i.getBoundingClientRect(),e="offset"+["Width","Height"][f.ort];return 0===f.ort?t.width||i[e]:t.height||i[e]}function N(n,i,o,s){function e(t){var e,r;return!!(t=function(e,t,r){var n=0===e.type.indexOf("touch"),i=0===e.type.indexOf("mouse"),o=0===e.type.indexOf("pointer"),s=0,a=0;0===e.type.indexOf("MSPointer")&&(o=!0);if("mousedown"===e.type&&!e.buttons&&!e.touches)return!1;if(n){n=function(t){t=t.target;return t===r||r.contains(t)||e.composed&&e.composedPath().shift()===r};if("touchstart"===e.type){var l=Array.prototype.filter.call(e.touches,n);if(1<l.length)return!1;s=l[0].pageX,a=l[0].pageY}else{l=Array.prototype.find.call(e.changedTouches,n);if(!l)return!1;s=l.pageX,a=l.pageY}}t=t||vt(b),(i||o)&&(s=e.clientX+t.x,a=e.clientY+t.y);return e.pageOffset=t,e.points=[s,a],e.cursor=i||o,e}(t,s.pageOffset,s.target||i))&&!(_()&&!s.doNotReject||(e=c,r=f.cssClasses.tap,(e.classList?e.classList.contains(r):new RegExp("\\b"+r+"\\b").test(e.className))&&!s.doNotReject)||n===u.start&&void 0!==t.buttons&&1<t.buttons||s.hover&&t.buttons)&&(j||t.preventDefault(),t.calcPoint=t.points[f.ort],void o(t,s))}var r=[];return n.split(" ").forEach(function(t){i.addEventListener(t,e,!!j&&{passive:!0}),r.push([t,e])}),r}function W(t){var e,r,n=ht(100*(t-(t=i,n=f.ort,e=t.getBoundingClientRect(),r=(t=t.ownerDocument).documentElement,t=vt(t),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(t.x=0),n?e.top+t.y-r.clientTop:e.left+t.x-r.clientLeft))/I());return f.dir?100-n:n}function $(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&V(t,e)}function G(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return V(t,e);t=(f.dir?-1:1)*(t.calcPoint-e.startCalcPoint);Z(0<t,100*t/e.baseSize,e.locations,e.handleNumbers,e.connect)}function V(t,e){e.handle&&(bt(e.handle,f.cssClasses.active),--m),e.listeners.forEach(function(t){v.removeEventListener(t[0],t[1])}),0===m&&(bt(c,f.cssClasses.drag),et(),t.cursor)&&(x.style.cursor="",x.removeEventListener("selectstart",ft)),f.events.smoothSteps&&(e.handleNumbers.forEach(function(t){U(t,d[t],!0,!0,!1,!1)}),e.handleNumbers.forEach(function(t){k("update",t)})),e.handleNumbers.forEach(function(t){k("change",t),k("set",t),k("end",t)})}function A(t,e){var r,n,i,o;e.handleNumbers.some(w)||(1===e.handleNumbers.length&&(o=l[e.handleNumbers[0]].children[0],m+=1,gt(o,f.cssClasses.active)),t.stopPropagation(),n=N(u.move,v,G,{target:t.target,handle:o,connect:e.connect,listeners:r=[],startCalcPoint:t.calcPoint,baseSize:I(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:d.slice()}),i=N(u.end,v,V,{target:t.target,handle:o,listeners:r,doNotReject:!0,handleNumbers:e.handleNumbers}),o=N("mouseout",v,$,{target:t.target,handle:o,listeners:r,doNotReject:!0,handleNumbers:e.handleNumbers}),r.push.apply(r,n.concat(i,o)),t.cursor&&(x.style.cursor=getComputedStyle(t.target).cursor,1<l.length&&gt(c,f.cssClasses.drag),x.addEventListener("selectstart",ft,!1)),e.handleNumbers.forEach(function(t){k("start",t)}))}function J(t){t.stopPropagation();var i,o,s,e=W(t.calcPoint),r=(i=e,s=!(o=100),l.forEach(function(t,e){var r,n;!w(e)&&(r=d[e],(n=Math.abs(r-i))<o||n<=o&&r<i||100===n&&100===o)&&(s=e,o=n)}),s);!1!==r&&(f.events.snap||dt(c,f.cssClasses.tap,f.animationDuration),U(r,e,!0,!0),et(),k("slide",r,!0),k("update",r,!0),f.events.snap?A(t,{handleNumbers:[r]}):(k("change",r,!0),k("set",r,!0)))}function K(t){var t=W(t.calcPoint),t=S.getStep(t),e=S.fromStepping(t);Object.keys(g).forEach(function(t){"hover"===t.split(".")[0]&&g[t].forEach(function(t){t.call(T,e)})})}function e(t,e){g[t]=g[t]||[],g[t].push(e),"update"===t.split(".")[0]&&l.forEach(function(t,e){k("update",e)})}function r(t){var n=t&&t.split(".")[0],i=n?t.substring(n.length):t;Object.keys(g).forEach(function(t){var e=t.split(".")[0],r=t.substring(e.length);n&&n!==e||i&&i!==r||((e=r)!==St.aria&&e!==St.tooltips||i===r)&&delete g[t]})}function k(r,n,i){Object.keys(g).forEach(function(t){var e=t.split(".")[0];r===e&&g[t].forEach(function(t){t.call(T,p.map(f.format.to),n,p.slice(),i||!1,d.slice(),T)})})}function M(t,e,r,n,i,o,s){var a;return 1<l.length&&!f.events.unconstrained&&(n&&0<e&&(a=S.getAbsoluteDistance(t[e-1],f.margin,!1),r=Math.max(r,a)),i)&&e<l.length-1&&(a=S.getAbsoluteDistance(t[e+1],f.margin,!0),r=Math.min(r,a)),1<l.length&&f.limit&&(n&&0<e&&(a=S.getAbsoluteDistance(t[e-1],f.limit,!1),r=Math.min(r,a)),i)&&e<l.length-1&&(a=S.getAbsoluteDistance(t[e+1],f.limit,!0),r=Math.max(r,a)),f.padding&&(0===e&&(a=S.getAbsoluteDistance(0,f.padding[0],!1),r=Math.max(r,a)),e===l.length-1)&&(a=S.getAbsoluteDistance(100,f.padding[1],!0),r=Math.min(r,a)),!((r=ht(r=s?r:S.getStep(r)))===t[e]&&!o)&&r}function Q(t,e){var r=f.ort;return(r?e:t)+", "+(r?t:e)}function Z(t,r,n,e,i){var o=n.slice(),s=e[0],a=f.events.smoothSteps,l=[!t,t],u=[t,!t],c=(e=e.slice(),t&&e.reverse(),1<e.length?e.forEach(function(t,e){e=M(o,t,o[t]+r,l[e],u[e],!1,a);!1===e?r=0:(r=e-o[t],o[t]=e)}):l=u=[!0],!1);e.forEach(function(t,e){c=U(t,n[t]+r,l[e],u[e],!1,a)||c}),c&&(e.forEach(function(t){k("update",t),k("slide",t)}),null!=i)&&k("drag",s)}function tt(t,e){return f.dir?100-t-e:t}function et(){h.forEach(function(t){var e=50<d[t]?-1:1,e=3+(l.length+e*t);l[t].style.zIndex=String(e)})}function U(t,e,r,n,i,o){return!1!==(e=i?e:M(d,t,e,r,n,!1,o))&&(i=e,d[r=t]=i,p[r]=S.fromStepping(i),i="translate("+Q(tt(i,0)-z+"%","0")+")",l[r].style[f.transformRule]=i,rt(r),rt(r+1),!0)}function rt(t){var e,r;a[t]&&(r=100,e="translate("+Q(tt(e=(e=0)!==t?d[t-1]:e,r=(r=t!==a.length-1?d[t]:r)-e)+"%","0")+")",r="scale("+Q(r/100,"1")+")",a[t].style[f.transformRule]=e+" "+r)}function nt(t,e){return null===t||!1===t||void 0===t||("number"==typeof t&&(t=String(t)),!1===(t=!1!==(t=f.format.from(t))?S.toStepping(t):t))||isNaN(t)?d[e]:t}function D(t,e,r){var n,i=mt(t),t=void 0===d[0],o=(e=void 0===e||e,f.animate&&!t&&dt(c,f.cssClasses.tap,f.animationDuration),h.forEach(function(t){U(t,nt(i[t],t),!0,!1,r)}),1===h.length?0:1);for(t&&S.hasNoSize()&&(r=!0,d[0]=0,1<h.length)&&(n=100/(h.length-1),h.forEach(function(t){d[t]=t*n}));o<h.length;++o)h.forEach(function(t){U(t,d[t],!0,!0,r)});et(),h.forEach(function(t){k("update",t),null!==i[t]&&e&&k("set",t)})}function it(t){return(t=void 0!==t&&t)?1===p.length?p[0]:p.slice(0):1===(t=p.map(f.format.to)).length?t[0]:t}function ot(t){var e=d[t],r=S.getNearbySteps(e),t=p[t],n=r.thisStep.step,i=null;if(f.snap)return[t-r.stepBefore.startValue||null,r.stepAfter.startValue-t||null];!1!==n&&t+n>r.stepAfter.startValue&&(n=r.stepAfter.startValue-t),i=t>r.thisStep.startValue?r.thisStep.step:!1!==r.stepBefore.step&&t-r.stepBefore.highestStep,100===e?n=null:0===e&&(i=null);t=S.countStepDecimals();return null!==n&&!1!==n&&(n=Number(n.toFixed(t))),[i=null!==i&&!1!==i?Number(i.toFixed(t)):i,n]}gt(t=c,f.cssClasses.target),0===f.dir?gt(t,f.cssClasses.ltr):gt(t,f.cssClasses.rtl),0===f.ort?gt(t,f.cssClasses.horizontal):gt(t,f.cssClasses.vertical),gt(t,"rtl"===getComputedStyle(t).direction?f.cssClasses.textDirectionRtl:f.cssClasses.textDirectionLtr),i=y(t,f.cssClasses.base);var O,st=f.connect,at=i,lt=y(at,f.cssClasses.connects);l=[],(a=[]).push(F(lt,st[0]));for(var L=0;L<f.handles;L++)l.push(H(at,L)),h[L]=L,a.push(F(lt,st[L+1]));(O=f.events).fixed||l.forEach(function(t,e){N(u.start,t.children[0],A,{handleNumbers:[e]})}),O.tap&&N(u.start,i,J,{}),O.hover&&N(u.move,i,K,{hover:!0}),O.drag&&a.forEach(function(e,t){var r,n,i,o,s;!1!==e&&0!==t&&t!==a.length-1&&(r=l[t-1],n=l[t],i=[e],o=[r,n],s=[t-1,t],gt(e,f.cssClasses.draggable),O.fixed&&(i.push(r.children[0]),i.push(n.children[0])),O.dragAll&&(o=l,s=h),i.forEach(function(t){N(u.start,t,A,{handles:o,handleNumbers:s,connect:e})}))}),D(f.start),f.pips&&C(f.pips),f.tooltips&&B(),r("update"+St.aria),e("update"+St.aria,function(t,e,o,r,s){h.forEach(function(t){var e=l[t],r=M(d,t,0,!0,!0,!0),n=M(d,t,100,!0,!0,!0),i=s[t],t=String(f.ariaFormat.to(o[t])),r=S.fromStepping(r).toFixed(1),n=S.fromStepping(n).toFixed(1),i=S.fromStepping(i).toFixed(1);e.children[0].setAttribute("aria-valuemin",r),e.children[0].setAttribute("aria-valuemax",n),e.children[0].setAttribute("aria-valuenow",i),e.children[0].setAttribute("aria-valuetext",t)})});var T={destroy:function(){for(r(St.aria),r(St.tooltips),Object.keys(f.cssClasses).forEach(function(t){bt(c,f.cssClasses[t])});c.firstChild;)c.removeChild(c.firstChild);delete c.noUiSlider},steps:function(){return h.map(ot)},on:e,off:r,get:it,set:D,setHandle:function(t,e,r,n){if(!(0<=(t=Number(t))&&t<h.length))throw new Error("noUiSlider: invalid handle number, got: "+t);U(t,nt(e,t),!0,!0,n),k("update",t),r&&k("set",t)},reset:function(t){D(f.start,t)},disable:function(t){null!=t?(l[t].setAttribute("disabled",""),l[t].handle.removeAttribute("tabindex")):(c.setAttribute("disabled",""),l.forEach(function(t){t.handle.removeAttribute("tabindex")}))},enable:function(t){null!=t?(l[t].removeAttribute("disabled"),l[t].handle.setAttribute("tabindex","0")):(c.removeAttribute("disabled"),l.forEach(function(t){t.removeAttribute("disabled"),t.handle.setAttribute("tabindex","0")}))},__moveHandles:function(t,e,r){Z(t,e,d,r)},options:o,updateOptions:function(e,t){var r=it(),n=["margin","limit","padding","range","animate","snap","step","format","pips","tooltips"],i=(n.forEach(function(t){void 0!==e[t]&&(o[t]=e[t])}),xt(o));n.forEach(function(t){void 0!==e[t]&&(f[t]=i[t])}),S=i.spectrum,f.margin=i.margin,f.limit=i.limit,f.padding=i.padding,f.pips?C(f.pips):P(),(f.tooltips?B:E)(),d=[],D(pt(e.start)?e.start:r,t)},target:c,removePips:P,removeTooltips:E,getPositions:function(){return d.slice()},getTooltips:function(){return s},getOrigins:function(){return l},pips:C};return T}function w(t,e){if(!t||!t.nodeName)throw new Error("noUiSlider: create requires a single element, got: "+t);if(t.noUiSlider)throw new Error("noUiSlider: Slider was already initialized.");e=H(t,xt(e),e);return t.noUiSlider=e}var E={__spectrum:u,cssClasses:p,create:w};ut.create=w,ut.cssClasses=p,ut.default=E,Object.defineProperty(ut,"__esModule",{value:!0})});