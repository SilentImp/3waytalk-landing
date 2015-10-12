"use strict";
(function () {

    /**
     * @class Popup
     */
    class Popup {
        /**
         * @description Adding events and properties
         * @constructor
         */
        constructor (popup) {
            this.popup = popup;
            popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
            this.popup.close = this.close.bind(this);
            this.popup.open = this.open.bind(this);
            this.popup.show = this.show.bind(this);
            this.status = false;
            this.jamping = false;
        }

        show () {
            this.popup.style.display = "block";
            this.popup.style[Modernizr.prefixed('transform')] = "rotateX(0)";
            this.status = true;
        }

        hide () {
            this.popup.style.display = "none";
            this.popup.style[Modernizr.prefixed('transform')] = "rotateX(180deg)";
            this.status = false;
            Velocity(this.popup, "stop");
        }

        close () {
            if (this.jamping) {
                return;
            }
            if (!this.status) {
                return;
            }
            Velocity(this.popup, "finish");
            Velocity(this.popup, {
                rotateX: "120deg"
            }, {
                duration: 500
                , begin: ()=> {
                    this.popup.style.display = "block";
                }
                , complete: ()=> {
                    this.status = false;
                }
            });
        }

        open () {
            if (this.jamping) {
                return;
            }
            if (this.status) {
                this.jump();
                return;
            }
            this.jamping = true;
            Velocity(this.popup, "finish");
            Velocity(this.popup, {
                rotateX: "0deg"
            }, {
                duration: 500
                , begin: ()=> {
                    this.popup.style.display = "block";
                }
                , complete: ()=> {
                    this.status = true;
                }
            });
            Velocity(this.popup, {rotateX: "20deg"}, 150);
            Velocity(this.popup, {rotateX: "0deg"}, 125);
            Velocity(this.popup, {rotateX: "10deg"}, 200);
            Velocity(this.popup, {rotateX: "0deg"}, {
                duration:175
                , complete: ()=> {
                    this.jamping = false;
                    }
                });
        }

        jump () {
            this.jamping = true;
            Velocity(this.popup, "finish");
            Velocity(this.popup, {rotateX: "35deg"}, 150);
            Velocity(this.popup, {rotateX: "0deg"}, 125);
            Velocity(this.popup, {rotateX: "20deg"}, 200);
            Velocity(this.popup, {rotateX: "0deg"}, 175);
            Velocity(this.popup, {rotateX: "15deg"}, 250);
            Velocity(this.popup, {rotateX: "0deg"}, {
                duration: 225
                , complete: ()=> {
                    this.jamping = false;
                    }
                });
        }

    }


    let ready = new Promise((resolve, reject)=>{
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", ()=> resolve());
    });

    ready.then(()=>{
        [].forEach.call(document.querySelectorAll('.popup_browser'), (popup) => {
            new Popup(popup);
        });
    });

})();
