/* Custom JS */
"use strict";

window.udtt = ((udtt, $, undefined) => {
  if ("undefined" === typeof window.udtt) {
    const udtt = (window.udtt = {});
  }

  document.addEventListener("DOMContentLoaded", () => {
    Util.init();
    UI.init();
  });
  const Util = (udtt.Util = {
      init() {
        this.Set();
      },
      cacheDom() {
        const cacheDomEls = {
          html: document.getElementsByTagName("html")[0],
          body: document.getElementsByTagName("body")[0],
          menu: document.querySelector(".global_menu_nav"),
          w: window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
          h: window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight,
          hamburger: document.querySelector("#global_menu_btn"),
          header: document.querySelector(".site-header"),
          $slider: $(".visual-slider"),
          modalBtn: document.querySelectorAll(".modal-btn")
        };
        return {
          cacheDomEls
        };
      },
      screen(max_width) {
        if (window.matchMedia) {
          return window.matchMedia("(max-width:" + max_width + "px)").matches;
        } else {
          return window.innerWidth <= max_width;
        }
      },
      userAgent() {
        const UA = {
          Android() {
            return navigator.userAgent.match(/Android/i) == null ? false : true;
          },
          BlackBerry() {
            return navigator.userAgent.match(/BlackBerry/i) == null ?
              false :
              true;
          },
          IOS() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ?
              false :
              true;
          },
          Opera() {
            return navigator.userAgent.match(/Opera Mini/i) == null ?
              false :
              true;
          },
          Windows() {
            return navigator.userAgent.match(/IEMobile/i) == null ?
              false :
              true;
          },
          any() {
            return (
              UA.Android() ||
              UA.BlackBerry() ||
              UA.IOS() ||
              UA.Opera() ||
              UA.Windows()
            );
          }
        };
        let UAChk = () => UA;
        return {
          UAChk: UAChk
        };
      },
      Set() {
        let isMobile;
        let getView = {
          mobFunc: function () {
            if ($(".site-navigation").css("display") == "none") {
              isMobile = "mobile";
            } else if ($(".site-navigation").css("display") == "block") {
              isMobile = "pc";
            }
            return isMobile;
          }
        };
        let MobileChk = function () {
          return getView;
        };
        return {
          MobileChk: MobileChk
        };
      }
    }),
    UI = (udtt.UI = {
      init() {
        this.resize();
        this.gallery();
        this.video();
      },
      resize() {
        $(window).on("load resize", function () {
          UI.navigation();
        });
      },
      screen(max_width) {
        if ($(window).matchMedia) {
          return $(window).matchMedia("(max-width:" + max_width + "px)")
            .matches;
        } else {
          return $(window).innerWidth <= max_width;
        }
      },
      video() {
        if ($("html").hasClass("mainpage")) {
          var bv = new Bideo();
          bv.init({
            // Video element
            videoEl: document.querySelector('#myVideo'),

            // Container element
            container: document.querySelector('body'),

            // Resize
            resize: true,

            // autoplay: false,

            isMobile: window.matchMedia('(max-width: 768px)').matches,

            // playButton: document.querySelector('#play'),
            // pauseButton: document.querySelector('#pause'),

            // Array of objects containing the src and type
            // of different video formats to add
            src: [{
              src: '/wp-content/uploads/sites/427/2019/12/IMG_5935.mp4',
              type: 'video/mp4'
            }],

            // What to do once video loads (initial frame)
            onLoad: function () {
              document.querySelector('#video_cover').style.display = 'none';
            }
          });
        } else {
          return false;
        }
      },
      gallery() {
        // TweenMax.staggerFromTo($('.grid-item'), 1, {
        //   y: 20
        // }, {
        //   css: {
        //     autoAlpha: 1,
        //     y: 0
        //   },
        //   ease: Back.easeOut.config(2),
        //   delay: 0.1
        // }, 0.1)


        $("a[rel^='prettyPhoto']").prettyPhoto({
          social_tools: false,
          allow_resize: true,
          theme: 'facebook',
          slideshow: 5000,
          autoplay_slideshow: false
        });

        var $grid = $('.grid').imagesLoaded(function () {
          $grid.isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
              columnWidth: '.grid-sizer',
            },
            onLayout: function () {
              forceLoad();
            }
          });
        });

        // $grid.imagesLoaded().always(function () {
        //   $grid.isotope('layout');
        // });
      },
      navigation() {
        const toggleBtn = Util.cacheDom().cacheDomEls.hamburger;
        const header = Util.cacheDom().cacheDomEls.header;
        const body = Util.cacheDom().cacheDomEls.body;
        const html = Util.cacheDom().cacheDomEls.html;
        let check = true;
        let $button_line = $('.global_menu_btn_line');
        let $button_line_01 = $('.global_menu_btn_line_01');
        let $button_line_02 = $('.global_menu_btn_line_02');
        let $button_line_03 = $('.global_menu_btn_line_03');
        let $container = $('#transition_container');
        let $menu_container_inner = $(".global_menu_btn_inner");

        window.addEventListener('scroll', e => {
          (window.pageYOffset >= 300) ? header.classList.add("on-scroll"): header.classList.remove("on-scroll")
        });

        // ON Navigation
        let NavigationEvent = () => {
          if (!html.classList.contains('gnb-open')) {
            html.classList.add('gnb-open');
            // Start          
            let y_position = 13;
            TweenMax.set($button_line, {
              backgroundColor: '#fff'
            });
            TweenMax.to($button_line_01, .3, {
              delay: .2,
              y: y_position,
              rotation: 45,
              ease: Quad.easeInOut
            });
            TweenMax.to($button_line_02, .3, {
              width: 0,
              ease: Quad.easeInOut
            });
            TweenMax.to($button_line_03, .3, {
              delay: .2,
              y: -y_position,
              rotation: -45,
              ease: Quad.easeInOut
            });
            TweenMax.fromTo($container, 0.5, {
              autoAlpha: 0,
              onComplete: function () {
                $(".global_menu_nav").show();
                TweenMax.staggerFromTo($('#menu>li'), 1, {
                  y: 20,
                  autoAlpha: 0
                }, {
                  css: {
                    autoAlpha: 1,
                    y: 0
                  },
                  ease: Back.easeOut.config(2),
                  delay: 0.1
                }, 0.1)
              }
            }, {
              autoAlpha: 1
            })
          }
        }
        // Off Navigation
        let NavigationEventDisable = () => {
          html.classList.remove('gnb-open');
          TweenMax.fromTo($container, 1, {
            autoAlpha: 1
          }, {
            autoAlpha: 0
          });
          TweenMax.fromTo($container, 1, {
            autoAlpha: 1,
            onComplete: function () {
              $(".global_menu_nav").hide();
              TweenMax.staggerFromTo($('#menu>li'), 1, {
                y: 0,
                autoAlpha: 1
              }, {
                css: {
                  autoAlpha: 0,
                  y: 20
                },
                ease: Back.easeOut.config(2),
                delay: 0.1
              }, 0.1)
            }
          }, {
            autoAlpha: 0,
          })
          if ($('html').hasClass('ie')) {
            TweenMax.to($button_line, .3, {
              backgroundColor: '#1e39b4'
            });
          } else {
            TweenMax.to($button_line, .3, {
              backgroundColor: '#ceb238'
            });
          }
          TweenMax.to($button_line_01, .3, {
            y: 0,
            x: 0,
            rotation: 0,
            ease: Quad.easeInOut
          });
          TweenMax.to($button_line_02, .3, {
            delay: .2,
            width: '100%',
            ease: Quad.easeInOut
          });
          TweenMax.to($button_line_03, .3, {
            y: 0,
            x: 0,
            rotation: 0,
            ease: Quad.easeInOut
          });
        }
        let desktop = () => {
          if ($("html").hasClass("gnb-open") && !Util.screen(800)) {
            $("html").removeClass("gnb-open");
            TweenMax.to($button_line_01, .3, {
              y: 0,
              x: 0,
              rotation: 0,
              ease: Quad.easeInOut
            });
            TweenMax.to($button_line_02, .3, {
              delay: .2,
              width: '100%',
              ease: Quad.easeInOut
            });
            TweenMax.to($button_line_03, .3, {
              y: 0,
              x: 0,
              rotation: 0,
              ease: Quad.easeInOut
            });
            TweenMax.fromTo($container, 1, {
              autoAlpha: 1
            }, {
              autoAlpha: 0,
              onComplete: function () {
                $('.menu-gnb-container>ul>li').removeAttr('style');
              }
            }, );
          }
          // TweenMax.fromTo($container, 1, {
          //   autoAlpha: 1,
          //   onComplete: function () {
          //     $(".global_menu_nav").hide();
          //     TweenMax.staggerFromTo($('#menu>li'), 1, {
          //       y: 0,
          //       autoAlpha: 1
          //     }, {
          //       css: {
          //         autoAlpha: 0,
          //         y: 20
          //       },
          //       ease: Back.easeOut.config(2),
          //       delay: 0.1
          //     }, 0.1)
          //   }
          // }, {
          //   autoAlpha: 0
          // })
        }
        if ($("html").hasClass("mobile") || Util.screen(800)) {
          toggleBtn.addEventListener("click", e => {
            e.preventDefault();
            if (check) {
              NavigationEvent();
              check = false;
            } else {
              check = true;
              NavigationEventDisable();
            }
          });
        } else {
          $('.menu-gnb-container>ul>li').removeAttr('style');
          TweenMax.killTweensOf($(".menu-gnb-container>ul>li"));
          desktop();
        }
      }
    });
})(window.udtt || {}, jQuery);