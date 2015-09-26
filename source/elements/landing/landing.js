"use strict";

(function () {
    class Landging {
        /**
         * @description Start initialization on domload
         * @constructor
         */
        constructor () {
            let ready = new Promise((resolve, reject)=>{
                if (document.readyState != "loading") return resolve();
                document.addEventListener("DOMContentLoaded", ()=> resolve());
            });
            ready.then(this.init.bind(this));
        }

        /**
         * @description Adding events and properties
         */
        init () {
            let header = document.querySelector('.header')
                , clock = document.querySelector('.clock');
            $(".landing").fullpage({
                sectionSelector: ".landing__section"
                , navigation: true
                , afterRender: this.recountSlides.bind(this)
                , afterResize: this.recountSlides.bind(this)
                , onLeave: ( index, nextIndex, direction) => {
                    if(nextIndex == 1){
                        header.classList.toggle('header_open', false);
                    } else {
                        header.classList.toggle('header_open', true);
                    }

                    if(nextIndex == 6){
                        clock.classList.toggle('clock_visible', true);
                    } else {
                        clock.classList.toggle('clock_visible', false);
                    }
                }
            });
            document.querySelector(".footer__top").addEventListener("click", this.scrollToTop.bind(this));
        }


        recountSlides () {
            let clock = document.querySelector('.clock')
                , clock_slide = document.querySelector('.fp-slidesContainer')
                , title = clock_slide.querySelector('.slide__title')
                , text = clock_slide.querySelector('.slide__text')
                , height = Math.min(clock_slide.offsetHeight - title.offsetHeight - text.offsetHeight + 90, 702)
                , perc = height/702;

            if (clock_slide.offsetWidth <= 750) {
                clock.style[Modernizr.prefixed('transform')] = 'scale('+ perc +')';
                clock.style.margin = "0 0 0 -"+(clock.offsetWidth*perc)*0.33+"px";
                // clock.style.background = 'red';
            } else {
                clock.removeAttribute('style');
            }

        }


        scrollToTop (event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1,0);
        }
    }
  new Landging;
})();
