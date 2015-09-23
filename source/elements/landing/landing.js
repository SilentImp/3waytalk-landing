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
            let header = document.querySelector('.header');
            $(".landing").fullpage({
                sectionSelector: ".landing__section"
                , navigation: true
                , onLeave: ( index, nextIndex, direction) => {
                    if(nextIndex == 1){
                        header.classList.toggle('header_open', false);
                    } else {
                        header.classList.toggle('header_open', true);
                    }
                }
            });
            document.querySelector(".footer__top").addEventListener("click", this.scrollToTop.bind(this));
        }


        scrollToTop (event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1,0);
        }
    }
  new Landging;
})();
