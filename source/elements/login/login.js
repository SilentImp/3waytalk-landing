"use strict";

(function () {
    class Menu {
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
            let back_buttons = document.querySelectorAll('.login__back');

            this.login_button = document.querySelector('.menu__login');
            this.register_button = document.querySelector('.menu__register');
            this.recovery_button = document.querySelector('.login__password-recovery');

            this.lightbox =  document.querySelector('body>.lightbox');
            this.login_popup = document.querySelector('.login_login');
            this.recovery = document.querySelector('.login_recovery');
            this.recovery_form = this.recovery.querySelector('.login__form');
            this.email = document.querySelector('.login_email');
            this.success = document.querySelector('.login_success');


            this.current = null;
            this.last = null;

            this.login_button.addEventListener('click', this.openLoginForm.bind(this));
            this.recovery_button.addEventListener('click', this.openRecovery.bind(this));
            this.lightbox.addEventListener('click', this.closeAll.bind(this));

            this.recovery_form.addEventListener('submit', this.sendRecoveryData.bind(this));

            [].forEach.call(back_buttons, (button) => {
                button.addEventListener('click', this.goback.bind(this));
            });
        }

        /**
         * @description Send recovery data and show message
         */
        sendRecoveryData (event) {
            event.preventDefault();

            try {
                let DONE = 4
                , OK = 200
                , xhr = new XMLHttpRequest()
                , loaded = new Promise((resolve, reject) => {
                    xhr.open('POST', this.recovery_form.getAttribute('action'));
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({
                        email: this.recovery_form.querySelector('[name="email"]')
                    }));
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === DONE) {
                            this.recovery_form.reset();
                            if (xhr.status === OK) {
                                resolve();
                            } else {
                                reject({
                                    code: parseInt(xhr.status, 10),
                                    message: xhr.statusText
                                });
                            }
                        }
                    };
                });

                loaded.then(this.showMessage.bind(this)).catch((reason) => {
                    console.log(reason.code, 'Responce status code: ' + reason.code + '. ' + reason.message + '.');
                    this.showMessage();
                });

            } catch (err) {
                console.log('error: ', err);
            }
        }

        /**
         * @description Show message
         */
        showMessage () {
            let props = {
                    right: -300
                },
                options = {
                    duration: 250
                };

            Velocity(this.recovery, props, options);
            props = {
                    right: 0
                },
                options = {
                    duration: 250
                };

            Velocity(this.email, props, options);

            this.last = this.login_popup;
            this.current = this.email;
        }

        /**
         * @description Open last page
         */
        goback () {

            let props = {
                    right: -300
                },
                options = {
                    duration: 250
                },
                tmp_last = this.last,
                tmp_current = this.current;

            Velocity(this.current, props, options);

            props = {
                    right: 0
                },
                options = {
                    duration: 250
                };

            Velocity(this.last, props, options);

            this.last = tmp_current;
            this.current = tmp_last;
        }

        /**
         * @description Show email sent warning
         */
        emailHaveSend () {
            let props = {
                    right: -300
                },
                options = {
                    duration: 250
                };

            Velocity(this.current, props, options);
            props = {
                    right: 0
                },
                options = {
                    duration: 250
                };

            Velocity(this.email, props, options);

            this.last = this.current;
            this.current = this.email;
        }

        /**
         * @description Open recovery forms
         */
        openRecovery () {
            let props = {
                    right: -300
                },
                options = {
                    duration: 250
                };

            Velocity(this.current, props, options);
            props = {
                    right: 0
                },
                options = {
                    duration: 250
                };

            Velocity(this.recovery, props, options);

            this.last = this.current;
            this.current = this.recovery;
        }

        /**
         * @description Close all forms
         */
        closeAll () {

            let props = {
                    right: -300
                },
                options = {
                    duration: 250
                };

            Velocity(this.current, props, options);
            this.current = null;

            props = {
                    opacity: 0
                },
                options = {
                    complete: () => {
                        this.lightbox.style.display = "none";
                    },
                    duration: 250
                };

            Velocity(this.lightbox, props, options);
        }

        /**
         * @description Open login popup
         */
        openLoginForm (event) {
            event.preventDefault();

            let props = {
                    right: 0
                },
                options = {
                    duration: 250
                };

            Velocity(this.login_popup, props, options);
            this.current = this.login_popup;

            props = {
                    opacity: 1
                },
                options = {
                    begin: () => {
                        this.lightbox.style.display = "block";
                    },
                    duration: 250
                };

            Velocity(this.lightbox, props, options);
        }
    }
  new Menu;
})();
