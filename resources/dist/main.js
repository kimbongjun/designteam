"use strict";window.udtt=function(e,l){if(void 0===window.udtt)window.udtt={};document.addEventListener("DOMContentLoaded",function(){u.init(),t.init(),l(window).trigger("resize")});var n,u=e.Util={init:function(){this.Set()},cacheDom:function(){return{cacheDomEls:{html:document.getElementsByTagName("html")[0],body:document.getElementsByTagName("body")[0],menu:document.querySelector(".global_menu_nav"),w:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,h:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,hamburger:document.querySelector("#hamburger"),header:document.querySelector(".site-header"),$slider:l(".visual-slider"),modalBtn:document.querySelectorAll(".modal-btn")}}},screen:function(e){return window.matchMedia?window.matchMedia("(max-width:"+e+"px)").matches:window.innerWidth<=e},userAgent:function(){var e={Android:function(){return null!=navigator.userAgent.match(/Android/i)},BlackBerry:function(){return null!=navigator.userAgent.match(/BlackBerry/i)},IOS:function(){return null!=navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return null!=navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return null!=navigator.userAgent.match(/IEMobile/i)},any:function(){return e.Android()||e.BlackBerry()||e.IOS()||e.Opera()||e.Windows()}};return{UAChk:function(){return e}}},Set:function(){var e,n={mobFunc:function(){return"none"==l(".global_menu_btn_wrap").css("display")?e="mobile":"block"==l(".global_menu_btn_wrap").css("display")&&(e="pc"),e}};return{MobileChk:function(){return n}}}},t=e.UI={init:function(){this.resize(),this.gallery(),this.video(),this.svg(),t.navigation().onLoading()},barba:(n=function(){var t={},o={};if("scrollRestoration"in history&&(history.scrollRestoration="manual"),"history"in window&&"pushState"in history){if("undefined"==barba)return;l("body").hasClass("admin-bar")&&l("#wpadminbar a").each(function(){l(this).attr("data-barba-prevent",!0)}),l("a[href]").not("#logo a").on("click",function(e){l(this).hasClass("main-menu-link")||e.currentTarget.href===window.location.href&&(e.preventDefault(),e.stopPropagation())});barba.init(),barba.hooks.leave(function(e){return new Promise(function(e,n){l("html").hasClass("mobile")?new TweenMax.to("#barba-wrapper",.2,{autoAlpha:0,onComplete:function(){e()}}):(TweenMax.set(".transition_mask",{y:"-100%"}),t.restart(),t.eventCallback("onComplete",function(){e()}))})}),barba.hooks.enter(function(e){var n=l(e.next.container),t=l(e.current.container);n.css({visibility:"hidden"});var a=e.next.html.replace(/(<\/?)body( .+?)?>/gi,"$1notbody$2>",e.next.html);l(a).filter("notbody").attr("class"),l("body").hasClass("admin-bar")&&(l("#wpadminbar").replaceWith(l(a).find("#wpadminbar")),l("#wpadminbar a").each(function(){l(this).attr("data-barba-prevent",!0)})),l("html").hasClass("ie")?TweenMax.set(".global_menu_btn_line",{backgroundColor:"#1e39b4"}):TweenMax.set(".global_menu_btn_line",{backgroundColor:"#ceb238"}),TweenMax.set(".global_menu_btn_line_01, .global_menu_btn_line_03",{y:0,x:0,rotation:0}),TweenMax.set(".global_menu_btn_line_02",{width:"100%"}),console.log(n,t,e.current.container),n.imagesLoaded(function(){n.css({visibility:"visible"}),l("html").hasClass("mobile")?new TweenMax.to("#barba-wrapper",.2,{autoAlpha:1}):o.restart()})})}var e=l("#transition_container"),n=l(".transition_mask"),a=l("#transition_layer"),i=l("#transition_layer_path");(t=new TimelineMax({paused:!0})).fromTo(n,.5,{y:"-100%"},{y:"0%",ease:Power3.easeOut,onStart:function(){TweenMax.set(e,{autoAlpha:1})}}),(o=new TimelineMax({paused:!0})).fromTo(i,.3,{autoAlpha:0},{autoAlpha:1,delay:.05,ease:Power2.easeOut,onStart:function(){TweenMax.set(a,{height:l(window).height()}),TweenMax.set(i,{morphSVG:"#transition_layer_start"}),i.show(),TweenMax.fromTo("#transition_layer_svg",.3,{scale:0},{scale:1,transformOrigin:"50% 50%",ease:Power2.easeOut}),TweenMax.to(i,.45,{morphSVG:"#transition_layer_end",ease:Power2.easeOut,delay:.05})}}).to(n,.5,{y:"100%",ease:Power2.easeOut,delay:.45,onStart:function(){TweenMax.to(a,.5,{height:0,ease:Power2.easeOut})},onComplete:function(){TweenMax.set(e,{autoAlpha:0})}})},a.toString=function(){return n.toString()},a),resize:function(){l(window).on("resize",function(){t.navigation().resizing()})},screen:function(e){return l(window).matchMedia?l(window).matchMedia("(max-width:"+e+"px)").matches:l(window).innerWidth<=e},svg:function(){if(!l("html").hasClass("mobile")){var o=l("#udtt_svg"),e=o.find(".cls-1");e.each(function(e,n){var t=n.getTotalLength();n.style.strokeDasharray=t+" "+t,n.style.strokeDashoffset=t,TweenMax.to(l(n),1,{strokeDashoffset:"0",onComplete:function(){function e(a){o.find(".cls-1").each(function(e,n){var t=n.getTotalLength();n.style.strokeDasharray=t+" "+t,n.style.strokeDashoffset=t,TweenMax.to(l(n),1,{strokeDashoffset:"0",autoRound:!1,ease:Linear.easeNone,stroke:a},5.5)})}o.on({mouseenter:function(){e("#ff0")},mouseleave:function(){e("#fff")}})}},5.5)})}},video:function(){if(!l("html").hasClass("mainpage"))return!1;(new Bideo).init({videoEl:document.querySelector("#myVideo"),container:document.querySelector("body"),resize:!0,isMobile:window.matchMedia("(max-width: 768px)").matches,src:[{src:"/wp-content/uploads/sites/427/2019/12/IMG_5935.mp4",type:"video/mp4"}],onLoad:function(){document.querySelector("#video_cover").style.display="none"}})},gallery:function(){l("a[rel^='prettyPhoto']").prettyPhoto({social_tools:!1,allow_resize:!0,theme:"facebook",slideshow:5e3,autoplay_slideshow:!1});var e=l(".grid").imagesLoaded(function(){e.isotope({itemSelector:".grid-item",percentPosition:!0,masonry:{columnWidth:".grid-sizer"},onLayout:function(){forceLoad()}})});l(".video_fullscreen").on("click",function(e){e.preventDefault()})},navigation:function(){u.cacheDom().cacheDomEls.hamburger;var n=u.cacheDom().cacheDomEls.header,t=(u.cacheDom().cacheDomEls.body,u.cacheDom().cacheDomEls.html),a=l(".global_menu_btn_line"),o=(u.Set().MobileChk().mobFunc(),l(".global_menu_btn_line_01")),i=l(".global_menu_btn_line_02"),r=l(".global_menu_btn_line_03"),s=l("#transition_container");l(".global_menu_btn_inner");window.addEventListener("scroll",function(e){300<=window.pageYOffset?n.classList.add("on-scroll"):n.classList.remove("on-scroll")});return{resizing:function(){u.screen(800)||(hamburger.checked&&(hamburger.checked=!1),l(".menu-gnb-container>ul>li").removeAttr("style"),l(".global_menu_btn_line").removeAttr("style"),TweenMax.killTweensOf(l(".menu-gnb-container>ul>li")),TweenMax.killTweensOf(l(".global_menu_btn_line")),l("html").hasClass("gnb-open")&&!u.screen(800)&&(l("html").removeClass("gnb-open"),TweenMax.fromTo(s,1,{autoAlpha:1},{autoAlpha:0,onComplete:function(){l(".menu-gnb-container>ul>li").removeAttr("style")}})))},onLoading:function(){hamburger.addEventListener("change",function(e){console.log(hamburger.checked),hamburger.checked?(function(){t.classList.add("gnb-open");TweenMax.set(a,{backgroundColor:"#fff"}),TweenMax.fromTo(o,.3,{y:0,x:0,rotation:0,ease:Quad.easeInOut},{delay:.2,y:13,rotation:45,ease:Quad.easeInOut}),TweenMax.fromTo(i,.3,{delay:.2,width:"100%",ease:Quad.easeInOut},{width:0,ease:Quad.easeInOut}),TweenMax.fromTo(r,.3,{y:0,x:0,rotation:0,ease:Quad.easeInOut},{delay:.2,y:-13,rotation:-45,ease:Quad.easeInOut}),TweenMax.fromTo(s,.5,{autoAlpha:0,onComplete:function(){l(".global_menu_nav").show(),TweenMax.staggerFromTo(l("#menu>li"),1,{y:20,autoAlpha:0},{css:{autoAlpha:1,y:0},ease:Back.easeOut.config(2),delay:.1},.1)}},{autoAlpha:1})}(),hamburger.classList.add("open")):(t.classList.remove("gnb-open"),TweenMax.fromTo(s,1,{autoAlpha:1,onComplete:function(){l(".global_menu_nav").hide(),TweenMax.staggerFromTo(l("#menu>li"),1,{y:0,autoAlpha:1},{css:{autoAlpha:0,y:20},ease:Back.easeOut.config(2),delay:.1},.1)}},{autoAlpha:0}),l("html").hasClass("ie")?TweenMax.to(a,.3,{backgroundColor:"#1e39b4"}):TweenMax.to(a,.3,{backgroundColor:"#ceb238"}),TweenMax.fromTo(o,.3,{delay:.2,y:13,rotation:45,ease:Quad.easeInOut},{y:0,x:0,rotation:0,ease:Quad.easeInOut}),TweenMax.fromTo(i,.3,{width:0,ease:Quad.easeInOut},{delay:.2,width:"100%",ease:Quad.easeInOut}),TweenMax.fromTo(r,.3,{delay:.2,y:-13,rotation:-45,ease:Quad.easeInOut},{y:0,x:0,rotation:0,ease:Quad.easeInOut}),hamburger.classList.remove("open"))})}}}};function a(){return n.apply(this,arguments)}}(window.udtt||{},jQuery);