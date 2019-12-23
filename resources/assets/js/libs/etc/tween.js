(function ($) {
    "use strict";

    function initFade() {
        var controller = new ScrollMagic.Controller();
        $('.fadeIn, .fadeUp, .fadeDown, .fadeLeft, .fadeRight').each(function (index, elem) {
            var $this = $(this);
            var zDuration = 0.8;
            var zEase = 'Back.easeOut.config(2)';
            var yValue = 0,
                xValue = 0;
            var zDelay = 0;
            if ($this.hasClass('fadeIn')) {
                yValue = xValue = 0;
            } else if ($this.hasClass('fadeUp')) {
                yValue = 20;
            } else if ($this.hasClass('fadeDown')) {
                yValue = -20;
            } else if ($this.hasClass('fadeLeft')) {
                xValue = 20;
            } else if ($this.hasClass('fadeRight')) {
                xValue = -20;
            }
            if ($this.hasClass('slow')) {
                zDuration = 1.6;
                zEase = 'Power4.easeOut';
                var tween = TweenMax.staggerTo($('.slow'), 1, {
                    css: {
                        autoAlpha: 1
                    },
                    delay: 0.15
                }, 0.6);
            } else {
                var tween1 = new TweenMax.to(elem, zDuration, {
                    css: {
                        autoAlpha: 0,
                        y: yValue,
                        x: xValue
                    }
                });
                var tween2 = new TweenMax.fromTo(elem, zDuration, {
                    css: {
                        autoAlpha: 0,
                        y: yValue,
                        x: xValue
                    }
                }, {
                    css: {
                        autoAlpha: 1,
                        y: 0,
                        x: 0
                    },
                    ease: zEase
                });
            }
            var scene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 'onEnter',
                offset: 100
            }).setTween(tween2).addTo(controller)
        });
    };
    $(document).ready(function () {
        initFade();
    });
})(jQuery);