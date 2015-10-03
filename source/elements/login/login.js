"use strict";
console.log('Menu');
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
            let back_buttons =              document.querySelectorAll('.login__back')
                , login_buttons =           document.querySelectorAll('.login__login-button, .login_success .login__submit')
                , mobile_popup_buttons =    document.querySelectorAll('.menu__interpreter, .header__interpreter');

            this.menu_popup_open = false;

            this.login_button =             document.querySelector('.menu__login');
            this.register_button =          document.querySelector('.menu__register');

            this.step1 =                    document.querySelector('.login_register-step-1');
            this.step1_form =               document.querySelector('.login_register-step-1 form.login__form');
            this.step2 =                    document.querySelector('.login_register-step-2');
            this.step2_form =               document.querySelector('.login_register-step-2 form.login__form');

            this.mobile_popup =             document.querySelector('.popup_mobile');
            this.mobile_popup_close =       this.mobile_popup.querySelector('.popup__close');

            this.wrapper =                  document.querySelector('.menu__wrapper');
            this.header_register_button =   document.querySelector('.header__link_register');
            this.header_login_button =      document.querySelector('.header__link_login');
            this.recovery_button =          document.querySelector('.login__password-recovery');
            this.lightbox =                 document.querySelector('body>.lightbox');
            this.login_popup =              document.querySelector('.login_login');
            this.recovery =                 document.querySelector('.login_recovery');
            this.password =                 document.querySelector('.login_password');
            this.recovery_form =            this.recovery.querySelector('.login__form');
            this.password_form =            this.password.querySelector('.login__form');
            this.error_message =            document.querySelector('.login_error');
            this.email =                    document.querySelector('.login_email');
            this.success =                  document.querySelector('.login_success');

            this.current = document.querySelector('.login_open');
            this.last = [];

            this.login_button.addEventListener('click', this.openLoginForm.bind(this));
            this.recovery_button.addEventListener('click', this.openRecovery.bind(this));
            this.lightbox.addEventListener('click', this.closeAll.bind(this));
            this.register_button.addEventListener('click', this.openRegister.bind(this));
            this.header_login_button.addEventListener('click', this.openLoginOuter.bind(this));
            this.header_register_button.addEventListener('click', this.openLoginOuter.bind(this));
            this.mobile_popup_close.addEventListener('click', this.closeMobilePopup.bind(this));

            this.recovery_form.addEventListener('submit', this.sendData.bind(this));
            this.password_form.addEventListener('submit', this.sendData.bind(this));
            this.step1_form.addEventListener('submit', this.openNext.bind(this));
            this.step2_form.addEventListener('submit', this.sendData.bind(this));

            window.addEventListener('resize', this.reposPopup.bind(this));

            $('.login select').select2();

            [].forEach.call(mobile_popup_buttons, (button) => {
                button.addEventListener('click', this.openMobilePopup.bind(this));
            });

            [].forEach.call(back_buttons, (button) => {
                button.addEventListener('click', this.goback.bind(this));
            });

            [].forEach.call(login_buttons, (button) => {
                button.addEventListener('click', this.openLoginInner.bind(this));
            });

            this.WebRTCSupport = !document.documentElement.classList.contains('no-peerconnection');


            if(!this.WebRTCSupport) {

                [].forEach.call(document.querySelectorAll('form.login__form input, form.login__form button, form.login__form select'), (element) => {
                    element.setAttribute("disabled","disabled");
                });

                [].forEach.call(document.documentElement.querySelectorAll('form.login__form'), (form) => {
                    form.addEventListener("click", (event)=>{
                        form.closest('.login').querySelector('.popup_browser').open();
                    });
                });

                [].forEach.call(document.querySelectorAll('.popup_browser'), (popup) => {
                    this.showPopup(popup);
                });
            }
        }

        openNext (event) {
            event.preventDefault();
            if (this.step1_form.validate() == false) {
                return;
            }
            this.openForm(this.step2);
        }

        reposPopup (event) {
            if(!this.menu_popup_open){
                return;
            }
            this.mobile_popup.style[Modernizr.prefixed('transform')] = "translateY(" + this.mobile_popup.offsetHeight + "px)";
        }

        closeMobilePopup () {
            if(!this.menu_popup_open){
                return;
            }
            this.menu_popup_open = false;

            Velocity(this.mobile_popup, "stop");
            Velocity(this.mobile_popup, {translateY: 0}, 250);

            Velocity(this.mobile_popup_button, "stop");
            Velocity(this.mobile_popup_button, {
                opacity: 1
            }, {
                duration: 250
                , begin: ()=> {
                    this.mobile_popup_button.style.display = "block";
                }
            });
        }

        openMobilePopup () {
            if(this.menu_popup_open){
                return;
            }
            this.menu_popup_open = true;

            Velocity(this.mobile_popup, "stop");
            Velocity(this.mobile_popup, {translateY: this.mobile_popup.offsetHeight + "px"}, 250);

            Velocity(this.mobile_popup_button, "stop");
            Velocity(this.mobile_popup_button, {
                opacity: 0
            }, {
                duration: 250
                , complete: ()=> {
                    this.mobile_popup_button.style.display = "none";
                }
            });
        }

        showPopup (popup) {
            if (popup.show != undefined){
                popup.show();
            } else {
                setTimeout(this.showPopup.bind(this, popup), 50);
            }
        }

        /**
         * @description Scroll to first slide and open login form
         */
        openLoginOuter (event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1, 0);
            setTimeout(()=>{
                this.login_button.click();
            }, 800)
        }

        /**
         * @description Scroll to first slide and open register form
         */
        openRegisterOuter (event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1, 0);
            setTimeout(()=>{
                this.register_button.click();
            }, 800)
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
            this.last = new Array();
            console.log(reason.code, 'Responce status code: ' + reason.code + '. ' + reason.message + '.');
            this.openForm(this.error_message, true);
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
            this.openForm(this.step1);
        }

        /**
         * @description Open register form
         */
        openRegister () {
            event.preventDefault();

            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);

            let props = {
                    right: 0
                },
                options = {
                    duration: 250
                };

            Velocity(this.step1, props, options);
            this.current = this.step1;

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
        openRecovery (event) {
            event.preventDefault();
            if(!this.WebRTCSupport) {
                return;
            }
            this.openForm(this.recovery);
        }

        /**
         * @description Open recovery forms
         * @param form {node} Form you want to open
         * @param back {node} Form which you want to open when user press back, by default — last form opened
         */
        openForm (popup, dont_save) {

            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);

            let form = this.current.querySelector('form');
            if (form != null) {
                setTimeout(()=>{form.clear();}, 250);
            }

            if (typeof popup == "undefined" && this.last.length > 0) {
                popup = this.last.pop();
            } else if (typeof popup == "undefined" && this.last.length == 0) {
                this.closeAll();
                return;
            } else if (dont_save != true) {
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

            this.clearAll();
        }

        clearAll () {
            [].forEach.call(document.querySelectorAll('form'), (form) => {
                form.clear();
            });

            $('.login select').select2("destroy");
            $('.login select').select2();
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
