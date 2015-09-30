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
            let back_buttons = document.querySelectorAll('.login__back')
                , login_buttons = document.querySelectorAll('.login__login-button, .login_success .login__submit');

            this.login_button = document.querySelector('.menu__login');
            this.register_button = document.querySelector('.menu__register');

            this.recovery_button = document.querySelector('.login__password-recovery');
            this.register_button_inner = document.querySelector('.login__register-button');

            this.lightbox =  document.querySelector('body>.lightbox');
            this.login_popup = document.querySelector('.login_login');
            this.recovery = document.querySelector('.login_recovery');
            this.register = document.querySelector('.login_register');
            this.password = document.querySelector('.login_password');
            this.register_back = this.register.querySelector('.login__back');
            this.recovery_form = this.recovery.querySelector('.login__form');
            this.register_form = this.register.querySelector('.login__form');
            this.password_form = this.password.querySelector('.login__form');
            this.error_message = document.querySelector('.login_error');
            this.email = document.querySelector('.login_email');
            this.success = document.querySelector('.login_success');


            this.current = document.querySelector('.login_open');
            this.last = [];

            this.login_button.addEventListener('click', this.openLoginForm.bind(this));
            this.recovery_button.addEventListener('click', this.openRecovery.bind(this));
            this.lightbox.addEventListener('click', this.closeAll.bind(this));

            this.register_button.addEventListener('click', this.openRegister.bind(this));
            this.register_button_inner.addEventListener('click', this.openRegisterInner.bind(this));

            this.recovery_form.addEventListener('submit', this.sendData.bind(this));
            this.register_form.addEventListener('submit', this.sendData.bind(this));
            this.password_form.addEventListener('submit', this.sendData.bind(this));

            $('.login select').select2();


            [].forEach.call(back_buttons, (button) => {
                button.addEventListener('click', this.goback.bind(this));
            });

            console.log(login_buttons);
            [].forEach.call(login_buttons, (button) => {
                button.addEventListener('click', this.openLoginInner.bind(this));
            });
        }

        /**
         * @description Send registration data and show message
         */
        sendData (event) {
            event.preventDefault();
            let form = event.currentTarget;

            if (form.validate() == false) {
                return;
            }

            try {
                let DONE = 4
                , OK = 200
                , message
                , xhr = new XMLHttpRequest()
                , loaded = new Promise((resolve, reject) => {
                    xhr.open('POST', form.getAttribute('action'));
                    xhr.send(new FormData(form));
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

                if (form.hasAttribute('data-check')) {
                    message = this.showCheckMessage.bind(this);
                } else {
                    message = this.showSuccessMessage.bind(this);
                }

                loaded.then(message).catch(this.showErrorMessage.bind(this));
                // loaded.then(message).catch(message);

            } catch (err) {
                console.log('error: ', err);
            }
        }

        /**
         * @description Show check email message
         */
        showCheckMessage () {
            this.openForm(this.email);
        }

        /**
         * @description Show success message
         */
        showSuccessMessage () {
            this.openForm(this.success);
        }

        /**
         * @description Open login
         */
        openLoginInner () {
            this.openForm(this.login_popup);
        }

        /**
         * @description Show message
         */
        showErrorMessage (reason) {
            console.log(reason.code, 'Responce status code: ' + reason.code + '. ' + reason.message + '.');
            this.openForm(this.error_message);
        }

        /**
         * @description Open last page
         */
        goback () {
            this.openForm();
        }

        /**
         * @description Show email sent warning
         */
        emailHaveSend () {
            this.openForm(this.email);
        }

        /**
         * @description Open register form
         */
        openRegisterInner () {
            this.register_back.style.visibility = "visible";
            this.openForm(this.register);
        }

        /**
         * @description Open register form
         */
        openRegister () {
            event.preventDefault();

            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);

            this.register_back.style.visibility = "hidden";

            let props = {
                    right: 0
                },
                options = {
                    duration: 250
                };

            Velocity(this.register, props, options);
            this.current = this.register;

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

        /**
         * @description Open recovery forms
         */
        openRecovery () {
            this.openForm(this.recovery);
        }

        /**
         * @description Open recovery forms
         * @param form {node} Form you want to open
         * @param back {node} Form which you want to open when user press back, by default — last form opened
         */
        openForm (popup) {

            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);

            let form = this.current.querySelector('form');
            if (form != null) {
                setTimeout(()=>{form.clear();}, 250);
            }

            if (typeof popup == "undefined") {
                popup = this.last.pop();
            } else {
                this.last.push(this.current);
            }

            let props = {
                    right: - this.current.offsetWidth + "px"
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

            Velocity(popup, props, options);
            this.current = popup;

        }

        /**
         * @description Close all forms
         */
        closeAll () {

            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);

            let props = {
                    right: - this.current.offsetWidth + "px"
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

            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);

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
