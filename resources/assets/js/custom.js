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
        this.wheel();
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
        if (!$("html").hasClass("mobile") && !$("html").hasClass("ie")) {
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
      wheel() {
        var venues = {
          "0": "전체선택",
          "1": "풀떼기",
          "2": "곰탕",
          "4": "짜장면",
          "5": "햄버거",
          "6": "시래기",
          "7": "순두부",
          "8": "쌈밥",
          "9": "국밥",
          "10": "파스타or피자"
        };
        var wheel = {
          timerHandle: 0,
          timerDelay: 33,

          angleCurrent: 0,
          angleDelta: 0,

          size: 290,

          canvasContext: null,
          colors: ["#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177",
            "#0d5ac1", "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2",
            "#6119d0", "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e",
            "#cd2f00", "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473",
            "#75d89e", "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751",
            "#7e50a8", "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1",
            "#2f1179", "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc",
            "#0cd36d", "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397",
            "#880977", "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b",
            "#e1cf3b", "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c",
            "#088baf", "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0",
            "#802234", "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941",
            "#41d158", "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534",
            "#d36647", "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a",
            "#ea24a3", "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57",
            "#fa06ec", "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534",
            "#d36647", "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a",
            "#ea24a3", "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57",
            "#fa06ec", "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48",
            "#9ab9b7", "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d",
            "#792ed8", "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57",
            "#f1ae16", "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473",
            "#e7dbce", "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee",
            "#0f5997", "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582",
            "#ce00be", "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a",
            "#6995ba", "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e",
            "#d00043", "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052",
            "#e08c56", "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c",
            "#a84a8f", "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730",
            "#30cc49", "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b",
            "#406df9", "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4",
            "#00efd4", "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c",
            "#dc1c06", "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f",
            "#1a806a", "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101",
            "#ff065", "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893",
            "#3cec35", "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4",
            "#e4ac44", "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c",
            "#25b67", "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e",
            "#0ec0ff", "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb",
            "#8a96c6", "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a",
            "#77ecca"
          ],


          //segments : [ 'Andrew', 'Bob', 'Fred', 'John', 'China', 'Steve', 'Jim', 'Sally', 'Andrew', 'Bob', 'Fred', 'John', 'China', 'Steve', 'Jim'],
          segments: [],

          seg_colors: [], // Cache of segments to colors

          maxSpeed: Math.PI / 16,

          upTime: 1000, // How long to spin up for (in ms)
          downTime: 10000, // How long to slow down for (in ms)

          spinStart: 0,

          frames: 0,
          maxLength: 0,

          centerX: 300,
          centerY: 300,
          Inputbox: function () {
            var venueContainer = $("#venues ul");
            $.each(venues, function (key, item) {
              venueContainer.append(
                $(document.createElement("li"))
                .append(
                  $(document.createElement("input"))
                  .attr({
                    id: "venue-" + key,
                    name: item,
                    value: item,
                    type: "checkbox",
                    checked: false
                  })
                  .change(function (e) {
                    // const allcheck = document.querySelector('input[id=venue-0]');
                    // if (allcheck.checked) {
                    //   $("input[id*=venue-]").prop('checked', true);
                    // } else {
                    //   $("input[id*=venue-]").prop('checked', false);
                    // }
                    //var siblings = t => [...t.parentElement.children].filter(e => e != t);                    
                    // var one = $(this);
                    // console.log(siblings(one));

                    var cbox = $(this)[0];
                    var segments = wheel.segments;
                    var i = segments.indexOf(cbox.value);
                    if (cbox.id != "venue-0" && cbox.checked && i == -1) {
                      segments.push(cbox.value);
                    } else if (!cbox.checked && i != -1) {
                      segments.splice(i, 1);
                      $("input[id*=venue-0]").prop('checked', false);
                    } else if (cbox.id == "venue-0" && cbox.checked && i == -1) { //전체선택                                                                
                      $("input[id*=venue-]").not('[id*=venue-0]').each(function (i, el) {
                        var cbox = $(this)[0];
                        $(this).prop('checked', true);
                        if ($.inArray(cbox.value, segments) === -1) segments.push(cbox.value);
                      });
                    } else if (cbox.id == "venue-0" && !cbox.checked && i == -1) { // 전체해제
                      $("input[id*=venue-]").not('[id*=venue-0]').each(function () {
                        var cbox = $(this)[0];
                        var i = segments.indexOf(cbox.value);
                        $(this).prop('checked', false);
                        segments.splice(i, 1);
                      });
                    }

                    segments.sort();
                    wheel.update();
                    wheel.maxLength = segments.length;
                  })
                )
                .append(
                  $(document.createElement("label"))
                  .attr({
                    for: "venue-" + key
                  })
                  .text(item)
                )
              );
            });

            $("#venues ul>li").tsort("input", {
              attr: "id"
            });
          },
          handleInsert: function () {
            document.getElementById("myForm").onsubmit = function (e) {
              var values = $("input[name='address']").val();
              $("input[name='address']").focus();
              e.target.reset();
              var venueContainer = $("#venues ul");
              var segments = wheel.segments;
              var i = segments.indexOf(values);

              if (values != "") {
                segments.push(values);
              }
              segments.sort();
              wheel.update();

              wheel.maxLength = segments.length;
              return false;
            };
          },
          spin: function () {
            // Start the wheel only if it's not already spinning
            if (wheel.timerHandle == 0 && wheel.maxLength > 1) {
              wheel.spinStart = new Date().getTime();
              wheel.maxSpeed = Math.PI / (16 + Math.random()); // Randomly vary how hard the spin is
              wheel.frames = 0;
              wheel.sound.play();

              wheel.timerHandle = setInterval(
                wheel.onTimerTick,
                wheel.timerDelay
              );
            } else {
              if (wheel.frames == 0) {
                alert("밥 먹기 싫어요?");
              } else {
                alert("'한솥도시락' 가기 전에 클릭 한 번만 해요.^^");
              }
            }
          },
          initAudio: function () {
            var sound = document.createElement("audio");
            sound.setAttribute(
              "src",
              "/wp-content/themes/designteam/resources/assets/mp3/If_I_Had_a_Chicken.mp3"
            );
            wheel.sound = sound;
          },
          onTimerTick: function () {
            wheel.frames++;

            wheel.draw();

            var duration = new Date().getTime() - wheel.spinStart;
            var progress = 0;
            var finished = false;

            if (duration < wheel.upTime) {
              progress = duration / wheel.upTime;
              wheel.angleDelta =
                wheel.maxSpeed * Math.sin((progress * Math.PI) / 2);
            } else {
              progress = duration / wheel.downTime;
              wheel.angleDelta =
                wheel.maxSpeed *
                Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
              if (progress >= 1) finished = true;
            }

            wheel.angleCurrent += wheel.angleDelta;
            while (wheel.angleCurrent >= Math.PI * 2)
              // Keep the angle in a reasonable range
              wheel.angleCurrent -= Math.PI * 2;
            if (finished) {
              clearInterval(wheel.timerHandle);
              wheel.timerHandle = 0;
              wheel.angleDelta = 0;
              wheel.sound.pause();
              var i =
                wheel.segments.length -
                Math.floor(
                  (wheel.angleCurrent / (Math.PI * 2)) * wheel.segments.length
                ) -
                1;
              if (wheel.segments[i] == "그냥 굶는다.") {
                $("#counter").html(
                  '<h2 style="margin-top: 1rem; text-align: center;">' +
                  "오늘은 굶어요.^^" +
                  "</h2>"
                );
                $("#result").html(
                  '<button type="button" class="reject" title="기회 구걸">거절한다.</button>'
                );
              } else {
                $("#counter").html(
                  '<h2 style="margin-top: 1rem; text-align: center;">' +
                  '무적권&nbsp;"' +
                  wheel.segments[i] +
                  '"&nbsp;갑시다 ㅇㅈ?' +
                  "</h2>"
                );
                $("#result").html(
                  '<button type="button" class="reject" title="기회 구걸">거절한다.</button>'
                );
              }
              var reject = document.querySelector(".reject");
              $(".reject").on("click", function () {
                wheel.spin();
              });
            }
          },

          init: function (optionList) {
            try {
              wheel.initWheel();
              wheel.initAudio();
              wheel.initCanvas();
              wheel.draw();
              wheel.handleInsert();
              wheel.Inputbox();
              $.extend(wheel, optionList);
            } catch (exceptionData) {
              alert("Wheel is not loaded " + exceptionData);
            }
          },

          initCanvas: function () {
            var canvas = $("#wheel #canvas").get(0);
            var reject = document.querySelector(".selector");
            if ($.browser.msie) {
              canvas = document.createElement("canvas");
              $(canvas)
                .attr("width", 800)
                .attr("height", 600)
                .attr("id", "canvas")
                .appendTo(".wheel");
              canvas = G_vmlCanvasManager.initElement(canvas);
            }
            canvas.addEventListener("click", wheel.spin, false);
            wheel.canvasContext = canvas.getContext("2d");
          },

          initWheel: function () {
            shuffle(wheel.colors);
          },

          // Called when segments have changed
          update: function () {
            // Ensure we start mid way on a item
            //var r = Math.floor(Math.random() * wheel.segments.length);
            var r = 0;
            wheel.angleCurrent =
              ((r + 0.5) / wheel.segments.length) * Math.PI * 2;

            var segments = wheel.segments;
            var len = segments.length;
            var colors = wheel.colors;
            var colorLen = colors.length;

            // Generate a color cache (so we have consistant coloring)
            var seg_color = new Array();
            for (var i = 0; i < len; i++)
              seg_color.push(colors[segments[i].hashCode().mod(colorLen)]);

            wheel.seg_color = seg_color;

            wheel.draw();
          },

          draw: function () {
            wheel.clear();
            wheel.drawWheel();
            wheel.drawNeedle();
          },

          clear: function () {
            var ctx = wheel.canvasContext;
            ctx.clearRect(0, 0, 1000, 800);
          },

          drawNeedle: function () {
            var ctx = wheel.canvasContext;
            var centerX = wheel.centerX;
            var centerY = wheel.centerY;
            var size = wheel.size;

            ctx.lineWidth = 1;

            // 화살표
            ctx.strokeStyle = "#000000";
            ctx.fileStyle = "#ffffff";

            ctx.beginPath();

            ctx.moveTo(centerX + size - 40, centerY);
            ctx.lineTo(centerX + size + 20, centerY - 10);
            ctx.lineTo(centerX + size + 20, centerY + 10);
            ctx.closePath();

            ctx.stroke();
            ctx.fill();

            // Which segment is being pointed to?
            var i =
              wheel.segments.length -
              Math.floor(
                (wheel.angleCurrent / (Math.PI * 2)) * wheel.segments.length
              ) -
              1;

            // 결과명
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#f00000";
            ctx.font = "2em BMEULJIRO";
            ctx.fillText(wheel.segments[i], centerX + size + 25, centerY);
          },

          drawSegment: function (key, lastAngle, angle) {
            var ctx = wheel.canvasContext;
            var centerX = wheel.centerX;
            var centerY = wheel.centerY;
            var size = wheel.size;

            var segments = wheel.segments;
            var len = wheel.segments.length;
            var colors = wheel.seg_color;

            var value = segments[key];

            ctx.save();
            ctx.beginPath();

            // Start in the centre
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, size, lastAngle, angle, false); // Draw a arc around the edge
            ctx.lineTo(centerX, centerY); // Now draw a line back to the centre

            // Clip anything that follows to this area
            //ctx.clip(); // It would be best to clip, but we can double performance without it
            ctx.closePath();

            ctx.fillStyle = colors[key];
            ctx.fill();
            ctx.stroke();

            // Now draw the text
            ctx.save(); // The save ensures this works on Android devices
            ctx.translate(centerX, centerY);
            ctx.rotate((lastAngle + angle) / 2);

            ctx.fillStyle = "#000000";
            ctx.fillText(value.substr(0, 20), size / 2 + 20, 0);
            ctx.restore();

            ctx.restore();
          },

          drawWheel: function () {
            var ctx = wheel.canvasContext;

            var angleCurrent = wheel.angleCurrent;
            var lastAngle = angleCurrent;

            var segments = wheel.segments;
            var len = wheel.segments.length;
            var colors = wheel.colors;
            var colorsLen = wheel.colors.length;

            var centerX = wheel.centerX;
            var centerY = wheel.centerY;
            var size = wheel.size;

            var PI2 = Math.PI * 2;

            // 가운데 원 + 라인
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = "1.4em BMEULJIRO";

            for (var i = 1; i <= len; i++) {
              var angle = PI2 * (i / len) + angleCurrent;
              wheel.drawSegment(i - 1, lastAngle, angle);
              lastAngle = angle;
            }
            // Draw a center circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, 20, 0, PI2, false);
            ctx.closePath();

            ctx.fillStyle = "#ffffff";
            //ctx.strokeStyle = '#000000';
            ctx.fill();
            ctx.stroke();

            // 큰 원
            ctx.beginPath();
            ctx.arc(centerX, centerY, size, 0, PI2, false);
            ctx.closePath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#000000";
            ctx.stroke();
          }
        };

        window.onload = function () {
          if (document.querySelectorAll("#wheel").length != 0) {
            wheel.init();
            var segments = new Array();
            var comment = "그냥 굶는다.";
            segments.push(comment);
            wheel.segments = segments;
            wheel.update();

            setTimeout(function () {
              window.scrollTo(0, 1);
            }, 0);
          } else {
            return false;
          }
        };
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