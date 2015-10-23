"use strict";
(function () {

    /**
     * @class Popup
     */
    class Alert {
        /**
         * @description Adding events and properties
         * @constructor
         */
        constructor (alert) {
            this.alert = alert;
            this.alert.querySelector('.alert__close').addEventListener('click', this.close.bind(this));
            this.alert.close = this.close.bind(this);
            this.alert.open = this.open.bind(this);
            this.status = false;
        }

        close () {
            if (!this.status) {
                return;
            }
            Velocity(this.alert, "finish");
            Velocity(this.alert, {
                translateY: 0
            }, {
                duration: 250
                , complete: ()=> {
                    this.status = false;
                }
            });
        }

        open () {
            if (this.status) {
                return;
            }

            Velocity(this.alert, "finish");
            Velocity(this.alert, {
                translateY: this.alert.offsetHeight + "px"
            }, {
                duration: 250
                , complete: ()=> {
                    this.status = true;
                }
            });
        }
    }

    let ready = new Promise((resolve, reject)=>{
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", ()=> resolve());
    });

    ready.then(()=>{
        [].forEach.call(document.querySelectorAll('.alert'), (alert) => {
            new Alert(alert);
            if (alert.classList.contains('alert_open')){
                alert.open();
            }
        });
    });

})();
