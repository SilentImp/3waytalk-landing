"use strict";
(function() {
    class Contacts {
        /**
         * @description Start initialization on domload
         * @constructor
         */
        constructor() {
            let ready = new Promise((resolve, reject) => {
                if (document.readyState != "loading") return resolve();
                document.addEventListener("DOMContentLoaded", () => resolve());
            });
            ready.then(this.init.bind(this));
        }

        /**
         * @description Adding events and properties
         */
        init() {
            this.map = document.querySelector('.contact__map');
            if(this.map != null) {
                this.map.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - document.querySelector('.contact__wrapper').offsetHeight - document.querySelector('.footer').offsetHeight - document.querySelector('.header').offsetHeight - 52 + "px";
                window.addEventListener('resize', this.resize.bind(this));
            }
        }

        resize () {
            if(this.map != null) {
                this.map.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - document.querySelector('.contact__wrapper').offsetHeight - document.querySelector('.footer').offsetHeight - document.querySelector('.header').offsetHeight - 52 + "px";
            }
        }
    }
    new Contacts;
})();
