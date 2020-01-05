"use strict";window.udtt=function(e,A){if(void 0===window.udtt)window.udtt={};document.addEventListener("DOMContentLoaded",function(){P.init(),t.init(),A(window).trigger("resize")});var P=e.Util={init:function(){this.Set()},cacheDom:function(){return{cacheDomEls:{html:document.getElementsByTagName("html")[0],body:document.getElementsByTagName("body")[0],menu:document.querySelector(".global_menu_nav"),w:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,h:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,hamburger:document.querySelector("#hamburger"),header:document.querySelector(".site-header"),$slider:A(".visual-slider"),modalBtn:document.querySelectorAll(".modal-btn")}}},screen:function(e){return window.matchMedia?window.matchMedia("(max-width:"+e+"px)").matches:window.innerWidth<=e},userAgent:function(){var e={Android:function(){return null!=navigator.userAgent.match(/Android/i)},BlackBerry:function(){return null!=navigator.userAgent.match(/BlackBerry/i)},IOS:function(){return null!=navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return null!=navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return null!=navigator.userAgent.match(/IEMobile/i)},any:function(){return e.Android()||e.BlackBerry()||e.IOS()||e.Opera()||e.Windows()}};return{UAChk:function(){return e}}},Set:function(){var e,t={mobFunc:function(){return"none"==A(".global_menu_btn_wrap").css("display")?e="mobile":"block"==A(".global_menu_btn_wrap").css("display")&&(e="pc"),e}};return{MobileChk:function(){return t}}}},t=e.UI={init:function(){this.resize(),this.gallery(),this.video(),this.two(),this.svg(),t.navigation().onLoading(),this.wheel()},two:function(){var e=P.cacheDom().cacheDomEls.html,t=P.cacheDom().cacheDomEls.body,n=document.querySelector(".two-wrap");if(t.classList.contains("home")&&!e.classList.contains("mobile")){var a=function(){var t={r:Math.floor(255*Math.random()),g:Math.floor(255*Math.random()),b:Math.floor(255*Math.random()),toString:function(e){return e?"rgba("+t.r+","+t.g+","+t.b+","+e+")":"rgb("+t.r+","+t.g+","+t.b+")"}};return t},o=/(canvas|webgl)/.test(url.type)?url.type:"svg",r=new Two({type:Two.Types[o],fullscreen:!0,autostart:!0}).appendTo(n),i=r.makeCurve(_.map(_.range(64),function(e){var t=e/63,n=t*Math.PI*8,a=t*Math.min(r.height,r.width),o=a*Math.cos(n),i=a*Math.sin(n);return new Two.Anchor(o,i)}),!0),c=["#f09dba","#b781d6","#8981e6"];c.index=0;var d=r.makeLinearGradient(r.width/2,-r.height/2,r.width/2,r.height/2,new Two.Stop(0,c[0]),new Two.Stop(1,c[1]),new Two.Stop(1,c[2]));i.noFill().linewidth=25,i.cap=i.join="round",i.stroke=d;var l=r.makeCircle(0,0,25);l.fill=l.stroke=d,l.linewidth=10,l.cap=l.join="round";var s=r.height/5,u=r.makeGroup(),f=r.makeGroup(),h=new Physics,m=[],b=0;for(b=0;b<Two.Resolution;b++){var g=b/Two.Resolution*Math.PI*2,w=s*Math.cos(g),p=s*Math.sin(g),v=.5*Math.random()+.5,y=v*w,T=v*p,M=h.makeParticle(10,w,p),x=h.makeParticle(10*Math.random()*.66+10*.33,y,T);h.makeSpring(x,M,.0625,0,0);M.makeFixed(),x.shape=r.makeCircle(x.position.x,x.position.y,5),x.shape.noStroke().fill="#fff",x.position=x.shape.translation,f.add(x.shape),m.push(x.position)}var k=new Two.Path(m,!0,!0),I=a();k.stroke=I.toString(),k.fill=I.toString(.5),k.scale=1.75,k.linewidth=10;var S=new Two.Path(m,!0,!0);S.noStroke(),S.fill=a().toString(),S.scale=1.25,u.add(k),u.add(S);var C=!1;A(window).bind("click",function(e){C=!C}),r.scene.translation.set(r.width/2,r.height/2),r.bind("update",function(){C&&(r.scene.rotation+=Math.PI/64,h.update())}).bind("resize",function(){r.scene.translation.set(r.width/2,r.height/2)})}},resize:function(){A(window).on("resize",function(){t.navigation().resizing()})},screen:function(e){return A(window).matchMedia?A(window).matchMedia("(max-width:"+e+"px)").matches:A(window).innerWidth<=e},svg:function(){if(!A("html").hasClass("mobile")&&!A("html").hasClass("ie")){var o=A("#udtt_svg"),e=o.find(".cls-1");e.each(function(e,t){var n=t.getTotalLength();t.style.strokeDasharray=n+" "+n,t.style.strokeDashoffset=n,TweenMax.to(A(t),1,{strokeDashoffset:"0",onComplete:function(){function e(a){o.find(".cls-1").each(function(e,t){var n=t.getTotalLength();t.style.strokeDasharray=n+" "+n,t.style.strokeDashoffset=n,TweenMax.to(A(t),1,{strokeDashoffset:"0",autoRound:!1,ease:Linear.easeNone,stroke:a},5.5)})}o.on({mouseenter:function(){e("#ff0")},mouseleave:function(){e("#fff")}})}},5.5)})}},video:function(){if(!A("html").hasClass("mainpage"))return!1;(new Bideo).init({videoEl:document.querySelector("#myVideo"),container:document.querySelector("body"),resize:!0,isMobile:window.matchMedia("(max-width: 768px)").matches,src:[{src:"/wp-content/uploads/sites/427/2019/12/IMG_5935.mp4",type:"video/mp4"}],onLoad:function(){document.querySelector("#video_cover").style.display="none"}})},gallery:function(){A(".grid").isotope({itemSelector:".grid-item",percentPosition:!0,masonry:{columnWidth:".grid-sizer"},onLayout:function(){forceLoad()}})},wheel:function(){var e={1:"스윗밸런스",2:"곰탕집",3:"내여자",4:"중국집",5:"패스트푸드",6:"순남시래기"},s={timerHandle:0,timerDelay:33,angleCurrent:0,angleDelta:0,size:290,canvasContext:null,colors:["#63b598","#ce7d78","#ea9e70","#a48a9e","#c6e1e8","#648177","#0d5ac1","#f205e6","#1c0365","#14a9ad","#4ca2f9","#a4e43f","#d298e2","#6119d0","#d2737d","#c0a43c","#f2510e","#651be6","#79806e","#61da5e","#cd2f00","#9348af","#01ac53","#c5a4fb","#996635","#b11573","#4bb473","#75d89e","#2f3f94","#2f7b99","#da967d","#34891f","#b0d87b","#ca4751","#7e50a8","#c4d647","#e0eeb8","#11dec1","#289812","#566ca0","#ffdbe1","#2f1179","#935b6d","#916988","#513d98","#aead3a","#9e6d71","#4b5bdc","#0cd36d","#250662","#cb5bea","#228916","#ac3e1b","#df514a","#539397","#880977","#f697c1","#ba96ce","#679c9d","#c6c42c","#5d2c52","#48b41b","#e1cf3b","#5be4f0","#57c4d8","#a4d17a","#225b8","#be608b","#96b00c","#088baf","#f158bf","#e145ba","#ee91e3","#05d371","#5426e0","#4834d0","#802234","#6749e8","#0971f0","#8fb413","#b2b4f0","#c3c89d","#c9a941","#41d158","#fb21a3","#51aed9","#5bb32d","#807fb","#21538e","#89d534","#d36647","#7fb411","#0023b8","#3b8c2a","#986b53","#f50422","#983f7a","#ea24a3","#79352c","#521250","#c79ed2","#d6dd92","#e33e52","#b2be57","#fa06ec","#1bb699","#6b2e5f","#64820f","#1c271","#21538e","#89d534","#d36647","#7fb411","#0023b8","#3b8c2a","#986b53","#f50422","#983f7a","#ea24a3","#79352c","#521250","#c79ed2","#d6dd92","#e33e52","#b2be57","#fa06ec","#1bb699","#6b2e5f","#64820f","#1c271","#9cb64a","#996c48","#9ab9b7","#06e052","#e3a481","#0eb621","#fc458e","#b2db15","#aa226d","#792ed8","#73872a","#520d3a","#cefcb8","#a5b3d9","#7d1d85","#c4fd57","#f1ae16","#8fe22a","#ef6e3c","#243eeb","#1dc18","#dd93fd","#3f8473","#e7dbce","#421f79","#7a3d93","#635f6d","#93f2d7","#9b5c2a","#15b9ee","#0f5997","#409188","#911e20","#1350ce","#10e5b1","#fff4d7","#cb2582","#ce00be","#32d5d6","#17232","#608572","#c79bc2","#00f87c","#77772a","#6995ba","#fc6b57","#f07815","#8fd883","#060e27","#96e591","#21d52e","#d00043","#b47162","#1ec227","#4f0f6f","#1d1d58","#947002","#bde052","#e08c56","#28fcfd","#bb09b","#36486a","#d02e29","#1ae6db","#3e464c","#a84a8f","#911e7e","#3f16d9","#0f525f","#ac7c0a","#b4c086","#c9d730","#30cc49","#3d6751","#fb4c03","#640fc1","#62c03e","#d3493a","#88aa0b","#406df9","#615af0","#4be47","#2a3434","#4a543f","#79bca0","#a8b8d4","#00efd4","#7ad236","#7260d8","#1deaa7","#06f43a","#823c59","#e3d94c","#dc1c06","#f53b2a","#b46238","#2dfff6","#a82b89","#1a8011","#436a9f","#1a806a","#4cf09d","#c188a2","#67eb4b","#b308d3","#fc7e41","#af3101","#ff065","#71b1f4","#a2f8a5","#e23dd0","#d3486d","#00f7f9","#474893","#3cec35","#1c65cb","#5d1d0c","#2d7d2a","#ff3420","#5cdd87","#a259a4","#e4ac44","#1bede6","#8798a4","#d7790f","#b2c24f","#de73c2","#d70a9c","#25b67","#88e9b8","#c2b0e2","#86e98f","#ae90e2","#1a806b","#436a9e","#0ec0ff","#f812b3","#b17fc9","#8d6c2f","#d3277a","#2ca1ae","#9685eb","#8a96c6","#dba2e6","#76fc1b","#608fa4","#20f6ba","#07d7f6","#dce77a","#77ecca"],segments:[],seg_colors:[],maxSpeed:Math.PI/16,upTime:1e3,downTime:17e3,spinStart:0,frames:0,maxLength:0,centerX:300,centerY:300,Inputbox:function(){var n=A("#venues ul");A.each(e,function(e,t){n.append(A(document.createElement("li")).append(A(document.createElement("input")).attr({id:"venue-"+e,name:t,value:t,type:"checkbox",checked:!1}).change(function(){var e=A(this)[0],t=s.segments,n=t.indexOf(e.value);e.checked&&-1==n?t.push(e.value):e.checked||-1==n||t.splice(n,1),t.sort(),s.update(),s.maxLength=t.length})).append(A(document.createElement("label")).attr({for:"venue-"+e}).text(t)))}),A("#venues ul>li").tsort("input",{attr:"value"})},handleInsert:function(){document.getElementById("myForm").onsubmit=function(e){var t=A("input[name='address']").val();A("input[name='address']").focus(),e.target.reset();A("#venues ul");var n=s.segments;n.indexOf(t);return""!=t&&n.push(t),n.sort(),s.update(),s.maxLength=n.length,!1}},spin:function(){0==s.timerHandle&&1<s.maxLength?(s.spinStart=(new Date).getTime(),s.maxSpeed=Math.PI/(16+Math.random()),s.frames=0,s.sound.play(),s.timerHandle=setInterval(s.onTimerTick,s.timerDelay)):0==s.frames?alert("밥 먹기 싫어요?"):alert("'한솥도시락' 가기 전에 클릭 한 번만 해요.^^")},initAudio:function(){var e=document.createElement("audio");e.setAttribute("src","/wp-content/themes/designteam/resources/assets/mp3/If_I_Had_a_Chicken.mp3"),s.sound=e},onTimerTick:function(){s.frames++,s.draw();var e=(new Date).getTime()-s.spinStart,t=0,n=!1;for(e<s.upTime?(t=e/s.upTime,s.angleDelta=s.maxSpeed*Math.sin(t*Math.PI/2)):(t=e/s.downTime,s.angleDelta=s.maxSpeed*Math.sin(t*Math.PI/2+Math.PI/2),1<=t&&(n=!0)),s.angleCurrent+=s.angleDelta;s.angleCurrent>=2*Math.PI;)s.angleCurrent-=2*Math.PI;if(n){clearInterval(s.timerHandle),s.timerHandle=0,s.angleDelta=0,s.sound.pause();var a=s.segments.length-Math.floor(s.angleCurrent/(2*Math.PI)*s.segments.length)-1;"그냥 굶는다."==s.segments[a]?A("#counter").html('<h2 style="margin-top: 1rem; text-align: center;">오늘은 굶어요.^^</h2>'):A("#counter").html('<h2 style="margin-top: 1rem; text-align: center;">무적권&nbsp;"'+s.segments[a]+'"&nbsp;갑시다 ㅇㅈ?</h2>')}},init:function(e){try{s.initWheel(),s.initAudio(),s.initCanvas(),s.draw(),s.handleInsert(),s.Inputbox(),A.extend(s,e)}catch(e){alert("Wheel is not loaded "+e)}},initCanvas:function(){var e=A("#wheel #canvas").get(0);A.browser.msie&&(e=document.createElement("canvas"),A(e).attr("width",800).attr("height",600).attr("id","canvas").appendTo(".wheel"),e=G_vmlCanvasManager.initElement(e)),e.addEventListener("click",s.spin,!1),s.canvasContext=e.getContext("2d")},initWheel:function(){shuffle(s.colors)},update:function(){s.angleCurrent=.5/s.segments.length*Math.PI*2;for(var e=s.segments,t=e.length,n=s.colors,a=n.length,o=new Array,i=0;i<t;i++)o.push(n[e[i].hashCode().mod(a)]);s.seg_color=o,s.draw()},draw:function(){s.clear(),s.drawWheel(),s.drawNeedle()},clear:function(){s.canvasContext.clearRect(0,0,1e3,800)},drawNeedle:function(){var e=s.canvasContext,t=s.centerX,n=s.centerY,a=s.size;e.lineWidth=1,e.strokeStyle="#000000",e.fileStyle="#ffffff",e.beginPath(),e.moveTo(t+a-40,n),e.lineTo(t+a+20,n-10),e.lineTo(t+a+20,n+10),e.closePath(),e.stroke(),e.fill();var o=s.segments.length-Math.floor(s.angleCurrent/(2*Math.PI)*s.segments.length)-1;e.textAlign="left",e.textBaseline="middle",e.fillStyle="#f00000",e.font="2em BMEULJIRO",e.fillText(s.segments[o],t+a+25,n)},drawSegment:function(e,t,n){var a=s.canvasContext,o=s.centerX,i=s.centerY,r=s.size,c=s.segments,d=(s.segments.length,s.seg_color),l=c[e];a.save(),a.beginPath(),a.moveTo(o,i),a.arc(o,i,r,t,n,!1),a.lineTo(o,i),a.closePath(),a.fillStyle=d[e],a.fill(),a.stroke(),a.save(),a.translate(o,i),a.rotate((t+n)/2),a.fillStyle="#000000",a.fillText(l.substr(0,20),r/2+20,0),a.restore(),a.restore()},drawWheel:function(){var e=s.canvasContext,t=s.angleCurrent,n=t,a=(s.segments,s.segments.length),o=(s.colors,s.colors.length,s.centerX),i=s.centerY,r=s.size,c=2*Math.PI;e.lineWidth=1,e.strokeStyle="#000000",e.textBaseline="middle",e.textAlign="center",e.font="1.4em BMEULJIRO";for(var d=1;d<=a;d++){var l=d/a*c+t;s.drawSegment(d-1,n,l),n=l}e.beginPath(),e.arc(o,i,20,0,c,!1),e.closePath(),e.fillStyle="#ffffff",e.fill(),e.stroke(),e.beginPath(),e.arc(o,i,r,0,c,!1),e.closePath(),e.lineWidth=10,e.strokeStyle="#000000",e.stroke()}};window.onload=function(){if(0==document.querySelectorAll("#wheel").length)return!1;s.init();var e=new Array;e.push("그냥 굶는다."),s.segments=e,s.update(),setTimeout(function(){window.scrollTo(0,1)},0)}},navigation:function(){P.cacheDom().cacheDomEls.hamburger;var t=P.cacheDom().cacheDomEls.header,n=(P.cacheDom().cacheDomEls.body,P.cacheDom().cacheDomEls.html),a=A(".global_menu_btn_line"),o=(P.Set().MobileChk().mobFunc(),A(".global_menu_btn_line_01")),i=A(".global_menu_btn_line_02"),r=A(".global_menu_btn_line_03"),c=A("#transition_container");A(".global_menu_btn_inner");window.addEventListener("scroll",function(e){300<=window.pageYOffset?t.classList.add("on-scroll"):t.classList.remove("on-scroll")});return{resizing:function(){P.screen(800)||(hamburger.checked&&(hamburger.checked=!1),A(".menu-gnb-container>ul>li").removeAttr("style"),A(".global_menu_btn_line").removeAttr("style"),TweenMax.killTweensOf(A(".menu-gnb-container>ul>li")),TweenMax.killTweensOf(A(".global_menu_btn_line")),A("html").hasClass("gnb-open")&&!P.screen(800)&&(A("html").removeClass("gnb-open"),TweenMax.fromTo(c,1,{autoAlpha:1},{autoAlpha:0,onComplete:function(){A(".menu-gnb-container>ul>li").removeAttr("style")}})))},onLoading:function(){hamburger.addEventListener("change",function(e){hamburger.checked?(function(){n.classList.add("gnb-open");TweenMax.set(a,{backgroundColor:"#fff"}),TweenMax.fromTo(o,.3,{y:0,x:0,rotation:0,ease:Quad.easeInOut},{delay:.2,y:13,rotation:45,ease:Quad.easeInOut}),TweenMax.fromTo(i,.3,{delay:.2,width:"100%",ease:Quad.easeInOut},{width:0,ease:Quad.easeInOut}),TweenMax.fromTo(r,.3,{y:0,x:0,rotation:0,ease:Quad.easeInOut},{delay:.2,y:-13,rotation:-45,ease:Quad.easeInOut}),TweenMax.fromTo(c,.5,{autoAlpha:0,onComplete:function(){A(".global_menu_nav").show(),TweenMax.staggerFromTo(A("#menu>li"),1,{y:20,autoAlpha:0},{css:{autoAlpha:1,y:0},ease:Back.easeOut.config(2),delay:.1},.1)}},{autoAlpha:1})}(),hamburger.classList.add("open")):(n.classList.remove("gnb-open"),TweenMax.fromTo(c,1,{autoAlpha:1,onComplete:function(){A(".global_menu_nav").hide(),TweenMax.staggerFromTo(A("#menu>li"),1,{y:0,autoAlpha:1},{css:{autoAlpha:0,y:20},ease:Back.easeOut.config(2),delay:.1},.1)}},{autoAlpha:0}),A("html").hasClass("ie")?TweenMax.to(a,.3,{backgroundColor:"#1e39b4"}):TweenMax.to(a,.3,{backgroundColor:"#ceb238"}),TweenMax.fromTo(o,.3,{delay:.2,y:13,rotation:45,ease:Quad.easeInOut},{y:0,x:0,rotation:0,ease:Quad.easeInOut}),TweenMax.fromTo(i,.3,{width:0,ease:Quad.easeInOut},{delay:.2,width:"100%",ease:Quad.easeInOut}),TweenMax.fromTo(r,.3,{delay:.2,y:-13,rotation:-45,ease:Quad.easeInOut},{y:0,x:0,rotation:0,ease:Quad.easeInOut}),hamburger.classList.remove("open"))})}}}}}(window.udtt||{},jQuery);