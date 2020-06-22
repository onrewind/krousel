!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Krousel=e()}(this,function(){var t={SLIDE:"slide",FADE:"fade"},e={appendArrows:null,appendDots:null,arrows:!0,autoplay:!1,autoplaySpeed:3e3,dots:!0,infinite:!0,nextArrow:null,pauseOnHover:!0,prevArrow:null,responsive:null,slidesToShow:1,slidesToScroll:1,speed:300,swipe:!0,transition:t.SLIDE,_forceAppendPrevArrow:!1,_forceAppendNextArrow:!1,draggable:!0,rtl:!1},i=function(t){function e(e){t.call(this),this.errorCode=e}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),s={className:"class"},o=function(t,e,i){void 0===e&&(e={}),void 0===i&&(i=null);var o=document.createElement(t);return Object.entries(e).forEach(function(t){var e=t[0];o.setAttribute(s[e]||e,t[1])}),i&&(i instanceof Array?i.forEach(function(t){return o.appendChild(t)}):o.appendChild(i)),o};function r(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return t.filter(function(t){return!!t}).join(" ")}var n={};n[t.SLIDE]="k-tr-slide",n[t.FADE]="k-tr-fade";var a=function(t,e){return t instanceof e},h=Object.values(t),u=["slidesToShow","slidesToScroll","infinite"];function _(t){return t.touches?"touchend"===t.type?t.changedTouches[0].clientX:t.touches[0].clientX:t.clientX}function d(t){t.preventDefault()}var l=function(t,s){this._setupOptions=function(t){var i=Object.assign({},t),s=function(t,e,i){return console.warn("Krousel - Invalid option '"+t+"' will be ignored. Expected "+e+", got: "+i)},o=t.appendDots,r=t.transition;o&&!a(o,HTMLElement)&&(s("appendDots","HTMLElement",o.constructor&&o.constructor.name||o.prototype&&o.prototype.name||o),delete i.appendDots),r&&!h.includes(r)&&(s("transition","oneOf "+h.join("|"),r),delete i.transition);var n=Object.assign({},e,i);return n.responsive&&n.responsive.sort(function(t,e){return t.breakpoint-e.breakpoint}),n}(s),this._target=function(t){var e=t;if("string"==typeof t)e=document.getElementById(t);else{if(!a(t,HTMLElement))throw new i(1);e=t}return e}(t),this._initialized=!1,this._currentPage=0,this._dragInitialOffset=0,this._showPrev=this._showPrev.bind(this),this._showNext=this._showNext.bind(this),this._enableTransition=this._enableTransition.bind(this),this._handleResize=this._handleResize.bind(this),this._stopAutoplay=this._stopAutoplay.bind(this),this._startAutoplay=this._startAutoplay.bind(this),this._resumeAutoplay=this._resumeAutoplay.bind(this),this._pauseAutoplay=this._pauseAutoplay.bind(this),this._doAutoplay=this._doAutoplay.bind(this),this._requestNext=this._requestNext.bind(this),this._requestPrev=this._requestPrev.bind(this),this._requestGoTo=this._requestGoTo.bind(this),this._startDragging=this._startDragging.bind(this),this._onDragMouseMove=this._onDragMouseMove.bind(this),this._endDragging=this._endDragging.bind(this),this._handleClickOnSlide=this._handleClickOnSlide.bind(this),this._computeOptions(),this._computeProps(),this._setupDOM(),this._initialized=!0,this._startAutoplay()};return l.prototype._computeOptions=function(){var t,e,i={},s=function(t){var e,i=t.responsive,s=null;if(i){for(var o=0,r=i;o<r.length;o+=1){var n=r[o];if(window.innerWidth<=n.breakpoint){s=n;break}}s&&(s.settings=(e=s.settings,u.reduce(function(t,i){return e.hasOwnProperty(i)&&(t[i]=e[i]),t},{})))}return s}(this._setupOptions);if(s!==this._breakpoint){var o=Object.assign({},this._setupOptions,s&&s.settings);this._options&&(t=this._options,e=o,i=Array.from(new Set(Object.keys(t).concat(Object.keys(e)))).reduce(function(i,s){return t[s]!==e[s]&&(i[s]=e[s]),i},{})),this._breakpoint=s,this._options=o}return i},l.prototype._setCssVar=function(t,e){this._target.style.setProperty(t,e)},l.prototype._computeProps=function(){var e=this._options,i=e.infinite,s=e.slidesToShow,o=e.slidesToScroll,r=e.transition;this._slideCount=this._initialized?this._track.querySelectorAll(".k-slide:not(.k-slide-cloned)").length:this._target.childElementCount,this._pageCount=Math.ceil((this._slideCount+o-s)/o),this._currentPage=Math.min(this._currentPage,this._pageCount-1),this._hasClones=i&&r===t.SLIDE,this._clonePerSide=this._hasClones?2*s:0},l.prototype._setupDOM=function(){var t,e=this,i=this._options,s=i.transition,a=i.speed,h=Array.from(this._target.children);this._target.classList.add("krousel"),this._track=o("div",{className:r("k-track",n[s]),style:(t={transitionDuration:a+"ms"},Object.entries(t).map(function(t){var e=t[1];return t[0].replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})+":"+e}).join(";"))}),this._disableTransition(),this._trackContainer=o("div",{className:"k-track-container"},this._track),this._target.appendChild(this._trackContainer),this._setupArrowsDOM(),this._setupDotsDOM(),this._setCssVar("--slide-didx",this._clonePerSide),this._computeSize(),h.forEach(function(t){t instanceof HTMLElement&&(t.classList.add("k-slide"),e._track.appendChild(t))}),this._hasClones&&this._setupInfiniteDOM(),this._computeSlidesClasses(0),this.__forceReflow(),this._enableTransition(),this._setupListeners()},l.prototype._setupInfiniteDOM=function(){for(var t=this,e=Array.from(this._track.querySelectorAll(".k-slide")),i=this._track.firstChild,s=e;s.length<this._clonePerSide;)s=s.concat(e);var o=s.slice(-this._clonePerSide).map(function(t){var e=t.cloneNode(!0);return e.classList.add("k-slide-cloned"),e});s.slice(0,this._clonePerSide).forEach(function(e){var i=e.cloneNode(!0);i.classList.add("k-slide-cloned"),t._track.appendChild(i)}),o.forEach(function(e){return t._track.insertBefore(e,i)})},l.prototype._setupArrowsDOM=function(){var t=this._options,e=t._forceAppendPrevArrow,i=t._forceAppendNextArrow,s=t.appendArrows,r=t.nextArrow;if(t.arrows){this._prevArrow=t.prevArrow||o("div"),this._prevArrow.classList.add("k-arrow-left"),this._nextArrow=r||o("div"),this._nextArrow.classList.add("k-arrow-right");var n=s||this._trackContainer;!e&&this._prevArrow.isConnected||(n.childElementCount>0?n.insertBefore(this._prevArrow,n.firstChild):n.appendChild(this._prevArrow)),!i&&this._nextArrow.isConnected||n.appendChild(this._nextArrow)}},l.prototype._setupDotsDOM=function(){var t=this._options,e=t.appendDots;if(t.dots){this._dots&&this._dots.remove();var i=new Array(this._pageCount).fill(null).map(function(t){return o("div",{className:"k-dot"})});this._dots=o("div",{className:"k-dots"},i),(e||this._target).appendChild(this._dots)}},l.prototype._setupListeners=function(){var t,e,i,s=this,o=this._options,r=o.arrows,n=o.dots,a=o.autoplay,h=o.pauseOnHover,u=o.swipe;if(window.addEventListener("resize",(t=this._handleResize,e=100,function(){for(var s=[],o=arguments.length;o--;)s[o]=arguments[o];clearTimeout(i),i=setTimeout.apply(void 0,[t,e].concat(s))})),this._track.querySelectorAll(".k-slide").forEach(function(t){return t.addEventListener("click",s._handleClickOnSlide,{capture:!0})}),r&&(this._prevArrow.addEventListener("click",this._requestPrev),this._nextArrow.addEventListener("click",this._requestNext)),n&&this._dots.querySelectorAll(".k-dot").forEach(function(t,e){return t.addEventListener("click",function(){return s._requestGoTo(e)})}),a){var _=this._track.querySelectorAll(".k-slide"),l=function(t){!t.currentTarget.contains(t.relatedTarget)&&s._resumeAutoplay()};h&&_.forEach(function(t){t.addEventListener("mouseenter",s._pauseAutoplay),t.addEventListener("mouseout",l)})}if(u){var p=function(t){window.removeEventListener("mousemove",s._onDragMouseMove),window.removeEventListener("touchmove",s._onDragMouseMove),window.removeEventListener("mouseup",p),window.removeEventListener("touchend",p),s._track.querySelectorAll(".k-slide").forEach(function(t){return t.removeEventListener("dragstart",d)}),s._endDragging(t)},c=function(t){window.addEventListener("mouseup",p),window.addEventListener("touchend",p),window.addEventListener("mousemove",s._onDragMouseMove),window.addEventListener("touchmove",s._onDragMouseMove),s._track.querySelectorAll(".k-slide").forEach(function(t){return t.addEventListener("dragstart",d)}),s._startDragging(t)};this._track.addEventListener("mousedown",c),this._track.addEventListener("touchstart",c)}},l.prototype._handleClickOnSlide=function(t){this._isDragging&&(d(t),this._isDragging=!1)},l.prototype._computeSlideIdxFromDragX=function(e){var i=this._options,s=i.transition,o=i.slidesToShow,r=Math.round(-e/this._slideWidth-this._clonePerSide);return s!==t.SLIDE&&(r+=this._currentPage*o),r},l.prototype._computeDragAmplitude=function(t){return _(t)-this._dragStartX},l.prototype._computeDragX=function(t){var e=this._dragInitialOffset+t;return this._options.infinite||(e=Math.min(Math.max(e,-this._slideWidth*(this._slideCount-1)),0)),e},l.prototype._startDragging=function(e){var i=this._options.transition===t.SLIDE;this._dragStartX=_(e),this._dragStartTime=Date.now(),this._dragInitialOffset=i?new DOMMatrix(getComputedStyle(this._track).transform).m41:0,this._pauseAutoplay(),i&&this._disableTransition()},l.prototype._onDragMouseMove=function(e){var i=this._options.transition,s=this._computeDragAmplitude(e);!this._isDragging&&Math.abs(s)>50&&(this._isDragging=!0);var o=this._computeDragX(s);i===t.SLIDE&&this._track.style.setProperty("--dX",o+"px");var r=this._computeSlideIdxFromDragX(o);this._computeSlidesClasses(r)},l.prototype._endDragging=function(t){var e=this,i=this._options,s=i.slidesToScroll,o=i.slidesToShow,r=this._computeDragAmplitude(t),n=this._computeDragX(r);setTimeout(function(){e._isDragging=!1},250),this._enableTransition(),this._track.style.removeProperty("--dX");var a=this._computeSlideIdxFromDragX(n),h=Math.round(a/s);if(h===this._currentPage){var u=Date.now()-this._dragStartTime,_=Math.abs(r),d=o*this._slideWidth;u<500&&_>.3*d&&_<d&&(h=this._currentPage-Math.sign(r))}this._goToPage(h),this._resumeAutoplay()},l.prototype._startAutoplay=function(){this._options.autoplay&&(this._apStopped=!1,this._resumeAutoplay())},l.prototype._pauseAutoplay=function(){clearTimeout(this._autoplayTimer)},l.prototype._resumeAutoplay=function(){var t=this._options,e=t.autoplaySpeed;t.autoplay&&!this._apStopped&&(clearTimeout(this._autoplayTimer),this._autoplayTimer=setTimeout(this._doAutoplay,e))},l.prototype._stopAutoplay=function(){this._apStopped=!0,this._pauseAutoplay()},l.prototype._doAutoplay=function(){var t=this._options,e=t.speed,i=t.autoplaySpeed;this._showNext(),this._autoplayTimer=setTimeout(this._doAutoplay,i+e)},l.prototype._handleResize=function(){var t=this._options.responsive;if(this._disableTransition(),t){var e=this._computeOptions();this._computeProps(),this._processOptionsChange(e)}this._computeSize(),t&&(this._setupDotsDOM(),this._goToPage(this._currentPage)),this.__forceReflow(),this._enableTransition()},l.prototype._processOptionsChange=function(t){["infinite","slidesToShow"].some(function(e){return t.hasOwnProperty(e)})&&(this._track.querySelectorAll(".k-slide-cloned").forEach(function(t){return t.remove()}),this._hasClones&&this._setupInfiniteDOM())},l.prototype._cleanUpDOM=function(){},l.prototype._computeSlidesClasses=function(t){for(var e=this._options,i=e.dots,s=e.slidesToShow,o=[],r=t;r<t+s;r++){var n=r+this._clonePerSide;o.push(n),r<0?o.push(n+this._slideCount):r>=this._slideCount&&o.push(n-this._slideCount)}if(this._track.querySelectorAll(".k-slide").forEach(function(t,e){o.includes(e)?t.classList.add("k-slide-visible"):t.classList.remove("k-slide-visible")}),this._computeArrowClasses(),i){var a=this._dots.querySelectorAll(".k-dot");a.forEach(function(t){return t.classList.remove("k-current")}),a.length>0&&a[this._currentPage].classList.add("k-current")}},l.prototype._computeArrowClasses=function(){var t=this._options;t.arrows&&(t.infinite?(this._prevArrow.classList.remove("k-arrow-disabled"),this._nextArrow.classList.remove("k-arrow-disabled")):(0===this._currentPage?this._prevArrow.classList.add("k-arrow-disabled"):this._prevArrow.classList.remove("k-arrow-disabled"),this._currentPage===this._pageCount-1?this._nextArrow.classList.add("k-arrow-disabled"):this._nextArrow.classList.remove("k-arrow-disabled")))},l.prototype._goToPage=function(t){var e=this;if(this.__goToPage_defer)return this.__goToPage_defer(),void this._goToPage(t);var i,s=this._options,o=s.slidesToShow,r=s.slidesToScroll,n=s.speed,a=!1,h=t;t>=this._pageCount?(h=0,a=!0):t<0&&(h=this._pageCount-1,a=!0),this._currentPage=h,i=t>=this._pageCount?this._slideCount:t<0?-o:t*r,t===this._pageCount-1&&i>this._slideCount-o&&(i=this._slideCount-o),i=Math.min(Math.max(i,-o),this._slideCount),this._computeSlidesClasses(i),this._setCssVar("--slide-didx",i+this._clonePerSide),a&&(this.__goToPage_defer=function(){delete e.__goToPage_defer,clearTimeout(e.__goToPage_timer),e._disableTransition(),e._goToPage(h),e.__forceReflow(),e._enableTransition()},this.__goToPage_timer=setTimeout(this.__goToPage_defer,n))},l.prototype.__forceReflow=function(){this._reflowTrash=this._track.offsetHeight},l.prototype._enableTransition=function(){this._track.classList.remove("k-no-transition")},l.prototype._disableTransition=function(){this._track.classList.add("k-no-transition")},l.prototype._computeSize=function(){var e=this._options,i=e.transition,s=2*this._clonePerSide;this._slideWidth=this._trackContainer.clientWidth/e.slidesToShow,this._setCssVar("--slide-width",this._slideWidth+"px"),i===t.SLIDE&&(this._track.style.width=(s+this._slideCount)*this._slideWidth+1e3+"px")},l.prototype._showNext=function(){(this._options.infinite||this._currentPage<this._pageCount-1)&&this._goToPage(this._currentPage+1)},l.prototype._showPrev=function(){(this._options.infinite||this._currentPage>0)&&this._goToPage(this._currentPage-1)},l.prototype._requestNext=function(){this._stopAutoplay(),this._showNext()},l.prototype._requestPrev=function(){this._stopAutoplay(),this._showPrev()},l.prototype._requestGoTo=function(t){this._stopAutoplay(),this._goToPage(t)},l});
//# sourceMappingURL=krousel.umd.js.map
