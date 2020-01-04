/* Custom JS */
"use strict";

window.udtt = ((udtt, $, undefined) => {
  if ("undefined" === typeof window.udtt) {
    const udtt = (window.udtt = {});
  }

  document.addEventListener("DOMContentLoaded", () => {
    Util.init();
    UI.init();
    $(window).trigger("resize");
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
          hamburger: document.querySelector("#hamburger"),
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
            if ($(".global_menu_btn_wrap").css("display") == "none") {
              isMobile = "mobile";
            } else if ($(".global_menu_btn_wrap").css("display") == "block") {
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
        this.two();
        this.svg();
        UI.navigation().onLoading();
        //this.barba();
      },
      two() {
        const html = Util.cacheDom().cacheDomEls.html;
        const body = Util.cacheDom().cacheDomEls.body;
        const target = document.querySelector(".two-wrap");
        if (
          body.classList.contains("home") &&
          !html.classList.contains("mobile")
        ) {
          var type = /(canvas|webgl)/.test(url.type) ? url.type : "svg";
          var two = new Two({
            type: Two.Types[type],
            fullscreen: true,
            autostart: true
          }).appendTo(target);

          var amt = 64;
          var path = two.makeCurve(
            _.map(_.range(amt), function (i) {
              var pct = i / (amt - 1);
              var theta = pct * Math.PI * 8;
              var r = pct * Math.min(two.height, two.width);
              var x = r * Math.cos(theta);
              var y = r * Math.sin(theta);
              return new Two.Anchor(x, y);
            }),
            true
          );
          // Two.js colors from main.css
          var colors = ["#f09dba", "#b781d6", "#8981e6"];
          colors.index = 0;

          var linearGradient = two.makeLinearGradient(
            two.width / 2,
            -two.height / 2,
            two.width / 2,
            two.height / 2,
            new Two.Stop(0, colors[0]),
            new Two.Stop(1, colors[1]),
            new Two.Stop(1, colors[2])
          );

          path.noFill().linewidth = 25;
          path.cap = path.join = "round";
          path.stroke = linearGradient;

          var cursor = two.makeCircle(0, 0, 25);
          cursor.fill = cursor.stroke = linearGradient;
          cursor.linewidth = 10;
          cursor.cap = cursor.join = "round";


          var mass = 10;
          var radius = two.height / 5;
          var strength = 0.0625;
          var drag = 0.0;

          var background = two.makeGroup();
          var foreground = two.makeGroup();

          var physics = new Physics();
          var points = [];
          var i = 0;

          for (i = 0; i < Two.Resolution; i++) {
            var pct = i / Two.Resolution;
            var theta = pct * Math.PI * 2;

            var ax = radius * Math.cos(theta);
            var ay = radius * Math.sin(theta);

            var variance = Math.random() * 0.5 + 0.5;
            var bx = variance * ax;
            var by = variance * ay;

            var origin = physics.makeParticle(mass, ax, ay);
            var particle = physics.makeParticle(
              Math.random() * mass * 0.66 + mass * 0.33,
              bx,
              by
            );
            var spring = physics.makeSpring(
              particle,
              origin,
              strength,
              drag,
              0
            );

            origin.makeFixed();

            particle.shape = two.makeCircle(
              particle.position.x,
              particle.position.y,
              5
            );
            particle.shape.noStroke().fill = "#fff";
            particle.position = particle.shape.translation;

            foreground.add(particle.shape);
            points.push(particle.position);
          }

          var outer = new Two.Path(points, true, true);
          var color = getRandomColor();
          outer.stroke = color.toString();
          outer.fill = color.toString(0.5);
          outer.scale = 1.75;
          outer.linewidth = 10;



          var inner = new Two.Path(points, true, true);
          inner.noStroke();
          inner.fill = getRandomColor().toString();
          inner.scale = 1.25;

          background.add(outer);
          background.add(inner);




          function getRandomColor() {
            var color = {
              r: Math.floor(Math.random() * 255),
              g: Math.floor(Math.random() * 255),
              b: Math.floor(Math.random() * 255),
              toString: function (a) {
                if (a) {
                  return (
                    "rgba(" +
                    color.r +
                    "," +
                    color.g +
                    "," +
                    color.b +
                    "," +
                    a +
                    ")"
                  );
                }
                return "rgb(" + color.r + "," + color.g + "," + color.b + ")";
              }
            };
            return color;
          }

          var rotating = false;

          $(window).bind("click", function (e) {
            rotating = !rotating;
          });

          two.scene.translation.set(two.width / 2, two.height / 2);

          two
            .bind("update", function () {
              if (rotating) {
                two.scene.rotation += Math.PI / 64;
                physics.update();
              }

            })
            .bind("resize", function () {
              two.scene.translation.set(two.width / 2, two.height / 2);
            });
        }
      },
      resize() {
        $(window).on("resize", () => {
          UI.navigation().resizing();
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
      svg() {
        if (!$("html").hasClass("mobile")) {
          let svg = $("#udtt_svg");
          let pathes = svg.find(".cls-1");
          let onColor = "#ff0";
          let offColor = "#fff";
          pathes.each(function (i, path) {
            // 1번 부분

            var total_length = path.getTotalLength();
            // 2번 부분
            path.style.strokeDasharray = total_length + " " + total_length;
            // 3번 부분
            path.style.strokeDashoffset = total_length;
            // 4번 부분
            TweenMax.to(
              $(path),
              1, {
                strokeDashoffset: "0",
                onComplete: function () {
                  let onoffColor = color => {
                    let pathes = svg.find(".cls-1");
                    pathes.each(function (i, path) {
                      // 1번 부분
                      var total_length = path.getTotalLength();

                      // 2번 부분
                      path.style.strokeDasharray =
                        total_length + " " + total_length;
                      // 3번 부분
                      path.style.strokeDashoffset = total_length;
                      // 4번 부분
                      TweenMax.to(
                        $(path),
                        1, {
                          strokeDashoffset: "0",
                          autoRound: false,
                          ease: Linear.easeNone,
                          stroke: color
                        },
                        5.5
                      );
                    });
                  };
                  svg.on({
                    mouseenter: function () {
                      onoffColor(onColor);
                    },
                    mouseleave: function () {
                      onoffColor(offColor);
                    }
                  });
                }
              },
              5.5
            );
          });
        }
      },
      video() {
        if ($("html").hasClass("mainpage")) {
          var bv = new Bideo();
          bv.init({
            // Video element
            videoEl: document.querySelector("#myVideo"),

            // Container element
            container: document.querySelector("body"),

            // Resize
            resize: true,

            // autoplay: false,

            isMobile: window.matchMedia("(max-width: 768px)").matches,

            // playButton: document.querySelector('#play'),
            // pauseButton: document.querySelector('#pause'),

            // Array of objects containing the src and type
            // of different video formats to add
            src: [{
              src: "/wp-content/uploads/sites/427/2019/12/IMG_5935.mp4",
              type: "video/mp4"
            }],

            // What to do once video loads (initial frame)
            onLoad: function () {
              document.querySelector("#video_cover").style.display = "none";
            }
          });
        } else {
          return false;
        }
      },
      gallery() {

        $(".grid").isotope({
          itemSelector: ".grid-item",
          percentPosition: true,
          masonry: {
            columnWidth: ".grid-sizer"
          },
          onLayout: function () {
            forceLoad();
          }
        });
      },
      navigation() {
        const toggleBtn = Util.cacheDom().cacheDomEls.hamburger;
        const header = Util.cacheDom().cacheDomEls.header;
        const body = Util.cacheDom().cacheDomEls.body;
        const html = Util.cacheDom().cacheDomEls.html;
        let check = true;
        let $button_line = $(".global_menu_btn_line");
        let isMobile = Util.Set()
          .MobileChk()
          .mobFunc();
        let $button_line_01 = $(".global_menu_btn_line_01");
        let $button_line_02 = $(".global_menu_btn_line_02");
        let $button_line_03 = $(".global_menu_btn_line_03");
        let $container = $("#transition_container");
        let $menu_container_inner = $(".global_menu_btn_inner");

        window.addEventListener("scroll", e => {
          window.pageYOffset >= 300 ?
            header.classList.add("on-scroll") :
            header.classList.remove("on-scroll");
        });

        // ON Navigation
        let NavigationEvent = () => {
          html.classList.add("gnb-open");
          // Start
          let y_position = 13;
          TweenMax.set($button_line, {
            backgroundColor: "#fff"
          });
          TweenMax.fromTo(
            $button_line_01,
            0.3, {
              y: 0,
              x: 0,
              rotation: 0,
              ease: Quad.easeInOut
            }, {
              delay: 0.2,
              y: y_position,
              rotation: 45,
              ease: Quad.easeInOut
            }
          );
          TweenMax.fromTo(
            $button_line_02,
            0.3, {
              delay: 0.2,
              width: "100%",
              ease: Quad.easeInOut
            }, {
              width: 0,
              ease: Quad.easeInOut
            }
          );
          TweenMax.fromTo(
            $button_line_03,
            0.3, {
              y: 0,
              x: 0,
              rotation: 0,
              ease: Quad.easeInOut
            }, {
              delay: 0.2,
              y: -y_position,
              rotation: -45,
              ease: Quad.easeInOut
            }
          );
          TweenMax.fromTo(
            $container,
            0.5, {
              autoAlpha: 0,
              onComplete: function () {
                $(".global_menu_nav").show();
                TweenMax.staggerFromTo(
                  $("#menu>li"),
                  1, {
                    y: 20,
                    autoAlpha: 0
                  }, {
                    css: {
                      autoAlpha: 1,
                      y: 0
                    },
                    ease: Back.easeOut.config(2),
                    delay: 0.1
                  },
                  0.1
                );
              }
            }, {
              autoAlpha: 1
            }
          );
        };
        // Off Navigation
        let NavigationEventDisable = () => {
          let y_position = 13;
          html.classList.remove("gnb-open");
          TweenMax.fromTo(
            $container,
            1, {
              autoAlpha: 1,
              onComplete: function () {
                $(".global_menu_nav").hide();
                TweenMax.staggerFromTo(
                  $("#menu>li"),
                  1, {
                    y: 0,
                    autoAlpha: 1
                  }, {
                    css: {
                      autoAlpha: 0,
                      y: 20
                    },
                    ease: Back.easeOut.config(2),
                    delay: 0.1
                  },
                  0.1
                );
              }
            }, {
              autoAlpha: 0
            }
          );
          if ($("html").hasClass("ie")) {
            TweenMax.to($button_line, 0.3, {
              backgroundColor: "#1e39b4"
            });
          } else {
            TweenMax.to($button_line, 0.3, {
              backgroundColor: "#ceb238"
            });
          }
          TweenMax.fromTo(
            $button_line_01,
            0.3, {
              delay: 0.2,
              y: y_position,
              rotation: 45,
              ease: Quad.easeInOut
            }, {
              y: 0,
              x: 0,
              rotation: 0,
              ease: Quad.easeInOut
            }
          );
          TweenMax.fromTo(
            $button_line_02,
            0.3, {
              width: 0,
              ease: Quad.easeInOut
            }, {
              delay: 0.2,
              width: "100%",
              ease: Quad.easeInOut
            }
          );
          TweenMax.fromTo(
            $button_line_03,
            0.3, {
              delay: 0.2,
              y: -y_position,
              rotation: -45,
              ease: Quad.easeInOut
            }, {
              y: 0,
              x: 0,
              rotation: 0,
              ease: Quad.easeInOut
            }
          );
        };
        let desktop = () => {
          if ($("html").hasClass("gnb-open") && !Util.screen(800)) {
            $("html").removeClass("gnb-open");
            // TweenMax.to($button_line_01, .3, {
            //   y: 0,
            //   x: 0,
            //   rotation: 0,
            //   ease: Quad.easeInOut
            // });
            // TweenMax.to($button_line_02, .3, {
            //   delay: .2,
            //   width: '100%',
            //   ease: Quad.easeInOut
            // });
            // TweenMax.to($button_line_03, .3, {
            //   y: 0,
            //   x: 0,
            //   rotation: 0,
            //   ease: Quad.easeInOut
            // });
            TweenMax.fromTo(
              $container,
              1, {
                autoAlpha: 1
              }, {
                autoAlpha: 0,
                onComplete: function () {
                  $(".menu-gnb-container>ul>li").removeAttr("style");
                }
              }
            );
          }
        };
        let onLoading = () => {
          hamburger.addEventListener("change", event => {
            if (hamburger.checked) {
              NavigationEvent();
              hamburger.classList.add("open");
            } else {
              NavigationEventDisable();
              hamburger.classList.remove("open");
            }
          });
        };

        let resizing = () => {
          if (!Util.screen(800)) {
            if (hamburger.checked) hamburger.checked = false;
            $(".menu-gnb-container>ul>li").removeAttr("style");
            $(".global_menu_btn_line").removeAttr("style");
            TweenMax.killTweensOf($(".menu-gnb-container>ul>li"));
            TweenMax.killTweensOf($(".global_menu_btn_line"));
            desktop();
          }
        };
        return {
          resizing: resizing,
          onLoading: onLoading
        };
      }
    });
})(window.udtt || {}, jQuery);