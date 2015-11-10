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
        constructor(alert) {
            this.alert = alert;
            this.alert.querySelector('.alert__close').addEventListener('click', this.close.bind(this));
            this.alert.close = this.close.bind(this);
            this.alert.open = this.open.bind(this);
            this.status = false;
        }

        close() {
            if (!this.status) {
                return;
            }
            Velocity(this.alert, "finish");
            Velocity(this.alert, {
                translateY: 0
            }, {
                duration: 250,
                complete: () => {
                    this.status = false;
                }
            });
        }

        open() {
            if (this.status) {
                return;
            }

            Velocity(this.alert, "finish");
            Velocity(this.alert, {
                translateY: this.alert.offsetHeight + "px"
            }, {
                duration: 250,
                complete: () => {
                    this.status = true;
                }
            });
        }
    }

    let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
    });

    ready.then(() => {
        [].forEach.call(document.querySelectorAll('.alert'), alert => {
            new Alert(alert);
            if (alert.classList.contains('alert_open')) {
                alert.open();
            }
        });
    });
})();
"use strict";

(function () {
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
            if (this.map != null) {
                this.map.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - document.querySelector('.contact__wrapper').offsetHeight - document.querySelector('.footer').offsetHeight - document.querySelector('.header').offsetHeight - 52 + "px";
                window.addEventListener('resize', this.resize.bind(this));
            }
        }

        resize() {
            if (this.map != null) {
                this.map.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - document.querySelector('.contact__wrapper').offsetHeight - document.querySelector('.footer').offsetHeight - document.querySelector('.header').offsetHeight - 52 + "px";
            }
        }
    }
    new Contacts();
})();
"use strict";

(function () {
    class Landging {
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

            if (document.querySelector('.landing') == null) {
                return;
            }

            this.fired = false;
            this.tablet = 1200;
            this.mobile = 750;
            this.min_height = 250;
            this.meta = document.querySelector("meta[name='viewport']");

            this.onResize();

            let header = document.querySelector('.header'),
                clock = document.querySelector('.clock'),
                main = document.querySelector('.slide_main');

            window.requestAnimFrame = window.requestAnimationFrame;
            $(".landing").fullpage({
                sectionSelector: ".landing__section",
                navigation: true,
                scrollingSpeed: 350,
                afterLoad: this.hideLoader.bind(this),
                afterRender: this.recountSlides.bind(this),
                afterResize: this.recountSlides.bind(this),
                onLeave: (index, nextIndex, direction) => {

                    if (nextIndex == 1) {
                        header.classList.toggle('header_open', false);
                        this.hideNav();
                    } else {
                        header.classList.toggle('header_open', true);
                        this.showNav();
                    }

                    if (nextIndex == 6) {
                        clock.classList.toggle('clock_visible', true);
                    } else {
                        clock.classList.toggle('clock_visible', false);
                    }
                }
            });
            document.querySelector(".footer__top").addEventListener("click", this.scrollToTop.bind(this));

            window.addEventListener('resize', this.onResize.bind(this));

            let active = document.querySelector('.landing__section.active');
            if (active != null) {
                active.classList.toggle('active_moment', true);
                active.classList.toggle('active', false);
                setTimeout(() => {
                    active.classList.toggle('active_moment', false);
                    active.classList.toggle('active', true);
                }, 0);
            }
        }

        onResize() {
            if (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) > 420 && Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 500) {
                this.meta.setAttribute("content", "width=400");
            } else {
                this.meta.setAttribute("content", "width=device-width, initial-scale=1.0");
            }
        }

        hideNav() {
            Velocity(this.nav, "finish");
            Velocity(this.nav, {
                opacity: 0
            }, {
                duration: 300,
                complete: () => {
                    this.nav.style.display = "none";
                }
            });
        }

        showNav() {
            Velocity(this.nav, "finish");
            Velocity(this.nav, {
                opacity: 1
            }, {
                duration: 300,
                begin: () => {
                    this.nav.style.display = "block";
                }
            });
        }

        hideLoader() {
            this.onResize();
            if (this.fired) {
                return;
            }
            this.fired = true;
            this.nav = document.getElementById('fp-nav');
            this.hideNav();

            [].forEach.call(document.querySelectorAll('.slide__resizable, .slide__centred'), resizable => {
                resizable.setAttribute('data-height', resizable.offsetHeight);
                resizable.setAttribute('data-width', resizable.offsetWidth);
            });

            let loader = document.querySelector('.loader__wrapper'),
                props = {
                opacity: 0
            },
                options = {
                duration: 500,
                complete: () => {
                    loader.parentNode.removeChild(loader);
                }
            };
            Velocity(loader, props, options);
        }

        recountSlides() {

            this.onResize();

            let resizables = document.querySelectorAll('.slide__resizable'),
                centred = document.querySelector('.slide__centred'),
                steps = document.querySelectorAll('.steps__step'),
                service_slide = document.querySelector('.slide_service'),
                service_illustration = document.querySelector('.slide__illustration'),
                main = document.querySelector('.slide_main'),
                shema = document.querySelector('.shema'),
                header_height = document.querySelector('.header').offsetHeight,
                footer_height = document.querySelector('.footer').offsetHeight,
                shema_details = shema.closest('.slide__details'),
                phones = main.querySelector('.slide__phones'),
                phone = main.querySelector('.slide__phone'),
                viewport_height,
                viewport_width,
                availabale_width,
                availabale_height,
                delta = 20,
                cell,
                size,
                scale = 1,
                scale_x = 1,
                scale_y = 1,
                header,
                slide,
                border_width,
                delta_y,
                tr_y,
                tr_x,
                element_width,
                element_height,
                illustration_height,
                w_width,
                w_height,
                i_width,
                del,
                i_height;

            cell = main.querySelector('.fp-tableCell');
            viewport_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10));
            viewport_width = cell.offsetWidth;

            header = main.querySelector('.slide__header');
            main.style.backgroundSize = "auto " + viewport_height + "px";

            if (viewport_width > 750) {
                del = 0;
                size = 550;
            } else {
                del = 100;
                size = 480;
            }
            availabale_height = viewport_height - del - header.offsetHeight;

            if (availabale_height >= 200 && viewport_width > 750) {
                phones.style.height = Math.min(availabale_height, size) + "px";
                phones.style.marginLeft = -Math.min(availabale_height, size) * 0.1 + "px";
                phones.style.visibility = "visible";
            } else if (availabale_height < 200) {
                phones.style.visibility = "hidden";
            } else {
                phones.removeAttribute('style');
            }

            if (viewport_width <= 750) {
                phone.style.height = availabale_height + "px";
            }

            cell = service_slide.querySelector('.fp-tableCell');
            viewport_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10));
            viewport_width = cell.offsetWidth;
            header = service_slide.querySelector('.slide__header');
            illustration_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10)) - header.offsetHeight - footer_height - header_height;
            service_illustration.style.height = illustration_height + "px";

            w_width = 700;
            w_height = 570;
            i_width = viewport_width * 1.2;
            i_height = w_height * i_width / w_width;

            if (i_height < illustration_height) {
                service_illustration.classList.toggle('slide__illustration_hidden', false);
                service_illustration.style.backgroundPosition = "50% 100%";
            } else if (illustration_height < 370) {
                service_illustration.classList.toggle('slide__illustration_hidden', true);
            } else {
                service_illustration.classList.toggle('slide__illustration_hidden', false);
                service_illustration.style.backgroundPosition = "50% 0";
            }

            // Centred style

            // Чистим все стили привнесенные
            centred.removeAttribute('style');
            [].forEach.call(steps, step => {
                step.removeAttribute('style');
            });

            if (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) > 480) {

                slide = centred.closest('.slide');
                cell = centred.closest('.fp-tableCell');
                viewport_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10));
                viewport_width = cell.offsetWidth;

                element_height = parseInt(centred.getAttribute('data-height'), 10);

                if (viewport_width > 1220) {
                    // desktop
                    element_width = 1230;
                    delta_y = 170;
                } else if (viewport_width > 750 && viewport_width <= 1220) {
                    // tablet
                    element_width = 1050;
                    delta_y = 170;
                } else {
                    // mobile
                    element_width = 400;
                    element_height = 900;
                    delta_y = 0;
                }

                availabale_height = viewport_height - header_height;
                availabale_width = viewport_width - 40;

                scale_x = availabale_height / element_height;
                scale_y = availabale_width / element_width;
                scale = Math.min(Math.min(scale_x, scale_y), 1);

                tr_y = 0;
                tr_x = 0;

                if (viewport_width < 750) {
                    // mobile
                    scale = availabale_height / 620;
                    centred.style[Modernizr.prefixed('transform')] = 'translateX(-50%) scale(' + scale + ')';
                } else {
                    // not mobile

                    if (availabale_width < element_width) {
                        tr_x = -(element_width - viewport_width) / 2;
                    }

                    // upscale text
                    if (scale < 1) {
                        [].forEach.call(steps, step => {
                            step.style[Modernizr.prefixed('transform')] = 'scale(' + Math.min(1 / scale * 0.8, 2) + ')';
                        });
                        tr_x += 30;
                    }

                    tr_x += 'px';
                    centred.style[Modernizr.prefixed('transform')] = 'translateX(' + tr_x + ') translateY(' + tr_y + ') scale(' + scale + ')';
                }
            }

            [].forEach.call(resizables, resizable => {

                slide = resizable.closest('.slide');
                header = resizable.closest('.slide__details').querySelector('.slide__header');
                cell = resizable.closest('.fp-tableCell');

                viewport_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10));
                viewport_width = cell.offsetWidth;

                element_height = parseInt(resizable.getAttribute('data-height'), 10);
                element_width = parseInt(resizable.getAttribute('data-width'), 10);

                scale_x = availabale_height / element_height;
                scale_y = availabale_width / element_width;
                scale = Math.min(scale_x, scale_y);

                if (viewport_width > this.mobile) {
                    // tablet and desktop resolution

                    availabale_height = viewport_height - header_height - delta;
                    availabale_width = viewport_width / 2 - 40;

                    scale_x = availabale_height / element_height;
                    scale_y = availabale_width / element_width;
                    scale = Math.min(scale_x, scale_y);

                    if (availabale_height < this.min_height) {

                        slide.classList.add('slide_hide-resizable');
                    } else if (scale < 1) {

                        slide.classList.remove('slide_hide-resizable');
                        resizable.style[Modernizr.prefixed('transform')] = 'scale(' + scale + ')';

                        if (slide.classList.contains('slide_right')) {
                            border_width = parseInt(resizable.getAttribute('data-width'), 10) * scale;
                            header.style.borderLeftWidth = border_width + 'px';

                            if (viewport_width > this.tablet) {
                                // tablet resolution
                                resizable.style.marginRight = header.offsetWidth / 2 - border_width + 'px';
                            }
                        } else {
                            border_width = parseInt(resizable.getAttribute('data-width'), 10) * scale;
                            header.style.borderRightWidth = border_width + 'px';

                            if (viewport_width > this.tablet) {
                                // tablet resolution
                                resizable.style.marginLeft = header.offsetWidth / 2 - border_width + 'px';
                            }
                        }
                    } else {
                        slide.classList.remove('slide_hide-resizable');
                        resizable.removeAttribute('style');
                        header.removeAttribute('style');
                    }
                } else {
                    // mobile resolution
                    availabale_height = viewport_height - header_height - header.offsetHeight - 60;
                    availabale_width = viewport_width - 40;

                    scale_x = availabale_height / element_height;
                    scale_y = availabale_width / element_width;
                    scale = Math.min(scale_x, scale_y);

                    if (availabale_width < element_width) {
                        resizable.style.marginLeft = -((element_width - availabale_width) / 2 - 20) + "px";
                    } else {
                        resizable.style.marginLeft = 'auto';
                    }

                    if (availabale_height < 200) {
                        console.log('hidding');
                        slide.classList.add('slide_hide-resizable');
                    } else if (scale < 1) {

                        slide.classList.remove('slide_hide-resizable');
                        resizable.style[Modernizr.prefixed('transform')] = 'scale(' + scale + ')';
                    } else {
                        slide.classList.remove('slide_hide-resizable');
                        resizable.removeAttribute('style');
                        header.removeAttribute('style');
                    }
                }
            });

            this.onResize();
        }

        scrollToTop(event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1, 0);
        }
    }
    new Landging();
})();
"use strict";

(function () {
    window.mobileAndTabletcheck = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    window.isMobile = {
        Android: function () {
            return (/Android/i.test(navigator.userAgent)
            );
        },
        BlackBerry: function () {
            return (/BlackBerry/i.test(navigator.userAgent)
            );
        },
        iOS: function () {
            return (/iPhone|iPad|iPod/i.test(navigator.userAgent)
            );
        },
        Windows: function () {
            return (/IEMobile/i.test(navigator.userAgent)
            );
        },
        any: function () {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows();
        }
    };

    class Layout {
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
            if (window.isMobile.Android()) {
                document.body.parentNode.classList.add('android');
            } else if (window.isMobile.iOS()) {
                document.body.parentNode.classList.add('ios');
            } else if (window.mobileAndTabletcheck()) {
                document.body.parentNode.classList.add('unknown-mobile');
            } else {
                document.body.parentNode.classList.add('desktop');
            }
        }
    }
    new Layout();
})();
"use strict";

(function () {
    class Menu {
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

            if (document.querySelector('.login') == null) {
                return;
            }

            let back_buttons = document.querySelectorAll('.login__back'),
                login_buttons = document.querySelectorAll('.login__login-button, .login_success .login__submit'),
                mobile_popup_buttons = document.querySelectorAll('.menu__interpreter, .header__interpreter');

            this.menu_popup_open = false;

            this.login_button = document.querySelector('.menu__login');
            this.register_button = document.querySelector('.menu__register');

            this.step1 = document.querySelector('.login_register-step-1');
            this.step1_form = document.querySelector('.login_register-step-1 form.login__form');
            this.step2 = document.querySelector('.login_register-step-2');
            this.step2_form = document.querySelector('.login_register-step-2 form.login__form');

            this.login_form = document.querySelector('.login_login form.login__form');

            this.mobile_popup = document.querySelector('.popup_mobile');
            this.mobile_popup_close = this.mobile_popup.querySelector('.popup__close');

            this.wrapper = document.querySelector('.menu__wrapper');
            this.header_register_button = document.querySelector('.header__link_register');
            this.header_login_button = document.querySelector('.header__link_login');
            this.recovery_button = document.querySelector('.login__password-recovery');
            this.lightbox = document.querySelector('body>.lightbox');
            this.login_popup = document.querySelector('.login_login');
            this.recovery = document.querySelector('.login_recovery');
            this.password = document.querySelector('.login_password');
            this.recovery_form = this.recovery.querySelector('.login__form');
            this.password_form = this.password.querySelector('.login__form');

            this.error_message = document.querySelector('.alert_form-send-fail');

            this.email = document.querySelector('.login_email');
            this.success = document.querySelector('.login_success');

            this.current = document.querySelector('.login_open');
            this.last = [];

            this.login_button.addEventListener('click', this.openLoginForm.bind(this));
            this.recovery_button.addEventListener('click', this.openRecovery.bind(this));
            this.lightbox.addEventListener('click', this.closeAll.bind(this));
            this.register_button.addEventListener('click', this.openRegister.bind(this));
            this.header_login_button.addEventListener('click', this.openLoginOuter.bind(this));
            this.header_register_button.addEventListener('click', this.openRegisterOuter.bind(this));
            this.mobile_popup_close.addEventListener('click', this.closeMobilePopup.bind(this));

            this.recovery_form.addEventListener('submit', this.sendData.bind(this));
            this.password_form.addEventListener('submit', this.sendData.bind(this));
            this.step1_form.addEventListener('submit', this.openNext.bind(this));
            this.step2_form.addEventListener('submit', this.sendData.bind(this));
            this.login_form.addEventListener('submit', this.sendData.bind(this));

            window.addEventListener('resize', this.reposPopup.bind(this));

            $('select.language_from').select2();
            $('select.language_to').select2();
            $('select.language_location').select2();

            this.language_from = document.querySelector('.language_from');
            this.language_to = document.querySelector('.language_to');
            this.language_location = document.querySelector('.language_location');

            $(".login select.language_from").on("change", this.changeFromLanguage.bind(this));

            [].forEach.call(document.querySelectorAll('.login'), element => {
                element.style.visibility = "visible";
            });

            [].forEach.call(mobile_popup_buttons, button => {
                button.addEventListener('click', this.openMobilePopup.bind(this));
            });

            [].forEach.call(back_buttons, button => {
                button.addEventListener('click', this.goback.bind(this));
            });

            [].forEach.call(login_buttons, button => {
                button.addEventListener('click', this.openLoginInner.bind(this));
            });

            this.WebRTCSupport = !document.documentElement.classList.contains('no-peerconnection');

            if (!this.WebRTCSupport) {

                [].forEach.call(document.querySelectorAll('form.login__form input, form.login__form button, form.login__form select'), element => {
                    element.setAttribute("disabled", "disabled");
                });

                [].forEach.call(document.documentElement.querySelectorAll('form.login__form'), form => {
                    form.addEventListener("click", event => {
                        form.closest('.login').querySelector('.popup_browser').open();
                    });
                });

                [].forEach.call(document.querySelectorAll('.popup_browser'), popup => {
                    this.showPopup(popup);
                });
            }
        }

        changeFromLanguage() {
            let value_from = this.language_from.value,
                value_to = this.language_to.value;

            if (value_from === value_to) {
                this.language_to.selectedIndex = 0;
                $(this.language_to).select2("val", "");
            }

            [].forEach.call(this.language_to.querySelectorAll('option[value][disabled]'), to_enable => {
                to_enable.removeAttribute('disabled');
            });

            [].forEach.call(this.language_to.querySelectorAll('option[value="' + value_from + '"]'), to_disable => {
                to_disable.setAttribute('disabled', 'disabled');
            });

            // inefficient, but it look lite there are no other way correctly disable/enable select2 dynamically
            $(this.language_to).select2();
        }

        openNext(event) {
            event.preventDefault();

            this.step1_data = {
                from: $('select.language_from').select2("val"),
                to: $('select.language_to').select2("val"),
                location: $('select.language_location').select2("val")
            };

            if (this.step1_form.validate() == false) {
                return;
            }

            this.openForm(this.step2);
        }

        reposPopup(event) {
            if (!this.menu_popup_open) {
                return;
            }
            this.mobile_popup.style[Modernizr.prefixed('transform')] = "translateY(" + this.mobile_popup.offsetHeight + "px)";
        }

        closeMobilePopup() {
            if (!this.menu_popup_open) {
                return;
            }
            this.menu_popup_open = false;

            Velocity(this.mobile_popup, "stop");
            Velocity(this.mobile_popup, { translateY: 0 }, 250);

            Velocity(this.mobile_popup_button, "stop");
            Velocity(this.mobile_popup_button, {
                opacity: 1
            }, {
                duration: 250,
                begin: () => {
                    this.mobile_popup_button.style.display = "block";
                }
            });
        }

        openMobilePopup() {
            if (this.menu_popup_open) {
                return;
            }
            this.menu_popup_open = true;

            Velocity(this.mobile_popup, "stop");
            Velocity(this.mobile_popup, { translateY: this.mobile_popup.offsetHeight + "px" }, 250);

            Velocity(this.mobile_popup_button, "stop");
            Velocity(this.mobile_popup_button, {
                opacity: 0
            }, {
                duration: 250,
                complete: () => {
                    this.mobile_popup_button.style.display = "none";
                }
            });
        }

        showPopup(popup) {
            if (popup.show != undefined) {
                popup.show();
            } else {
                setTimeout(this.showPopup.bind(this, popup), 50);
            }
        }

        /**
         * @description Scroll to first slide and open login form
         */
        openLoginOuter(event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1, 0);
            setTimeout(() => {
                this.login_button.click();
            }, 800);
        }

        /**
         * @description Scroll to first slide and open register form
         */
        openRegisterOuter(event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1, 0);
            setTimeout(() => {
                this.register_button.click();
            }, 800);
        }

        /**
         * @description Send registration data and show message
         */
        sendData(event) {
            event.preventDefault();
            let form = event.currentTarget;

            if (form.validate() == false) {
                return;
            }

            try {
                let DONE = 4,
                    OK = 200,
                    after_action,
                    xhr = new XMLHttpRequest(),
                    loaded,
                    index,
                    data = new FormData(form);

                if (this.step1_data != null) {
                    data.append('from', this.step1_data.from);
                    data.append('to', this.step1_data.to);
                    data.append('location', this.step1_data.location);
                    this.step1_data = null;
                }

                loaded = new Promise((resolve, reject) => {
                    xhr.open('POST', form.getAttribute('action'));
                    xhr.send(data);
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === DONE) {
                            setTimeout(() => {
                                this.clearAll();
                            }, 500);
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

                if (form.hasAttribute('data-success')) {
                    after_action = this.redirectTo.bind(this, form.getAttribute('data-success'));
                } else if (form.hasAttribute('data-check')) {
                    after_action = this.showCheckMessage.bind(this);
                } else {
                    after_action = this.showSuccessMessage.bind(this);
                }

                loaded.then(after_action).catch(this.showErrorMessage.bind(this));
                // loaded.then(after_action).catch(after_action);

                this.step1Data = null;
            } catch (err) {
                console.log('error: ', err);
            }
        }

        /**
         * @description Redirect to url
         */
        redirectTo(url) {
            document.location.href = url;
        }

        /**
         * @description Show check email message
         */
        showCheckMessage() {
            this.openForm(this.email);
        }

        /**
         * @description Show success message
         */
        showSuccessMessage() {
            this.last = new Array();
            this.openForm(this.success);
        }

        /**
         * @description Open login
         */
        openLoginInner() {
            this.openForm(this.login_popup);
        }

        /**
         * @description Show message
         */
        showErrorMessage(reason) {
            this.last = new Array();
            console.log(reason.code, 'Responce status code: ' + reason.code + '. ' + reason.message + '.');
            this.error_message.open();
        }

        /**
         * @description Open last page
         */
        goback() {
            this.openForm();
        }

        /**
         * @description Show email sent warning
         */
        emailHaveSend() {
            this.last = new Array();
            this.openForm(this.email);
        }

        /**
         * @description Open register form
         */
        openRegisterInner() {
            this.openForm(this.step1);
        }

        /**
         * @description Open register form
         */
        openRegister() {
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
            }, options = {
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
        openRecovery(event) {
            event.preventDefault();
            if (!this.WebRTCSupport) {
                return;
            }
            this.openForm(this.recovery);
        }

        /**
         * @description Open recovery forms
         * @param form {node} Form you want to open
         * @param back {node} Form which you want to open when user press back, by default — last form opened
         */
        openForm(popup, dont_save) {
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);

            var form = this.current.querySelector('form');

            // $('select.language_from').select2("val", "");
            // $('select.language_to').select2("val", "");
            // $('select.language_location').select2("val", "");
            // if ((form != null) && (typeof form.clear != 'undefined')) {
            //     setTimeout(()=>{
            //         if (form!=null) {
            //             form.clear();
            //         }
            //     }, 500);
            // }

            if (typeof popup == "undefined" && this.last.length > 0) {
                popup = this.last.pop();
            } else if (typeof popup == "undefined" && this.last.length == 0) {
                this.closeAll();
                return;
            } else if (dont_save != true) {
                this.last.push(this.current);
            }

            // form = popup.querySelector('form');
            // if (form != null) {
            //     setTimeout(()=>{
            //         if (form!=null) {
            //             form.clear();
            //         }
            //     }, 500);
            // }

            let props = {
                right: -this.current.offsetWidth + "px"
            },
                options = {
                duration: 250
            };

            Velocity(this.current, props, options);
            props = {
                right: 0
            }, options = {
                duration: 250
            };

            Velocity(popup, props, options);
            this.current = popup;
        }

        /**
         * @description Close all forms
         */
        closeAll() {

            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);

            let props = {
                right: -this.current.offsetWidth + "px"
            },
                options = {
                duration: 250
            };

            Velocity(this.current, props, options);
            this.current = null;

            props = {
                opacity: 0
            }, options = {
                complete: () => {
                    this.lightbox.style.display = "none";
                },
                duration: 250
            };

            Velocity(this.lightbox, props, options);
            setTimeout(() => {
                this.clearAll();
            }, 500);
        }

        clearAll() {
            [].forEach.call(document.querySelectorAll('form'), form => {
                form.clear();
            });
        }

        /**
         * @description Open login popup
         */
        openLoginForm(event) {
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
            }, options = {
                begin: () => {
                    this.lightbox.style.display = "block";
                },
                duration: 250
            };

            Velocity(this.lightbox, props, options);
        }
    }

    new Menu();
})();
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
        constructor(popup) {
            this.popup = popup;
            popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
            this.popup.close = this.close.bind(this);
            this.popup.open = this.open.bind(this);
            this.popup.show = this.show.bind(this);
            this.status = false;
            this.jamping = false;
        }

        show() {
            this.popup.style.display = "block";
            this.popup.style[Modernizr.prefixed('transform')] = "rotateX(0)";
            this.status = true;
        }

        hide() {
            this.popup.style.display = "none";
            this.popup.style[Modernizr.prefixed('transform')] = "rotateX(180deg)";
            this.status = false;
            Velocity(this.popup, "stop");
        }

        close() {
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
                duration: 500,
                begin: () => {
                    this.popup.style.display = "block";
                },
                complete: () => {
                    this.status = false;
                }
            });
        }

        open() {
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
                duration: 500,
                begin: () => {
                    this.popup.style.display = "block";
                },
                complete: () => {
                    this.status = true;
                }
            });
            Velocity(this.popup, { rotateX: "20deg" }, 150);
            Velocity(this.popup, { rotateX: "0deg" }, 125);
            Velocity(this.popup, { rotateX: "10deg" }, 200);
            Velocity(this.popup, { rotateX: "0deg" }, {
                duration: 175,
                complete: () => {
                    this.jamping = false;
                }
            });
        }

        jump() {
            this.jamping = true;
            Velocity(this.popup, "finish");
            Velocity(this.popup, { rotateX: "35deg" }, 150);
            Velocity(this.popup, { rotateX: "0deg" }, 125);
            Velocity(this.popup, { rotateX: "20deg" }, 200);
            Velocity(this.popup, { rotateX: "0deg" }, 175);
            Velocity(this.popup, { rotateX: "15deg" }, 250);
            Velocity(this.popup, { rotateX: "0deg" }, {
                duration: 225,
                complete: () => {
                    this.jamping = false;
                }
            });
        }

    }

    let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
    });

    ready.then(() => {
        [].forEach.call(document.querySelectorAll('.popup_browser'), popup => {
            new Popup(popup);
        });

        [].forEach.call(document.querySelectorAll('.popup_common'), popup => {
            new Popup(popup);
            if (popup.classList.contains('popup_open')) {
                popup.open();
            }
        });
    });
})();
"use strict";

(function () {

    /**
     * @classdesc Class representing form validation
     * @class
     */

    class Validation {
        /**
         * @description Adding events and properties
         * @constructor
         */
        constructor(form) {
            this.form = form;
            form.setAttribute("novalidate", "novalidate");
            form.addEventListener('submit', this.validate.bind(this));
            form.validate = this.validate.bind(this);
            form.clear = this.clear.bind(this);

            this.messages = {
                en: {
                    required: "Required field",
                    email: "Wrong email format",
                    equal: "Password fields should be equal",
                    unequal: "Languages shouldn't be equal",
                    url: "Wrong url format"
                },
                ru: {
                    required: "Поле обязательно для заполнения",
                    email: "Проверьте формат email",
                    equal: "Пароли должны совпадать",
                    unequal: "Языки не должны совпадать",
                    url: "Проверьте формат URL"
                }
            };
        }

        /**
         * @description Reset form and clear errors
         */
        clear() {

            let selects = $(this.form).find('select'),
                index = selects.length;
            while (index--) {

                if (typeof selects[index].select2 != null) {
                    $(selects[index]).select2("val", "");
                } else {
                    selects[index].selectedIndex = 0;
                }

                [].forEach.call(selects[index].querySelectorAll('option[value][disabled]'), option => {
                    option.removeAttribute('disabled');
                });
            }

            this.form.reset();

            setTimeout(() => {
                let errors = document.querySelectorAll('.form-error'),
                    fields = document.querySelectorAll('[data-valid], [data-invalid]');

                [].forEach.call(errors, error => {
                    error.parentNode.removeChild(error);
                });

                [].forEach.call(fields, field => {
                    field.removeAttribute('data-invalid');
                    field.removeAttribute('data-valid');
                });
            }, 100);
        }

        /**
         * @description Remove error message after element
         * @param {Node} element - element, after which we will add error message
         * @param {String} message - error message
         * @param {String} typpe - error type
         */
        addError(element, message, type) {

            if (element.parentNode.querySelector('.form-error[data-type="' + type + '"]') != null) {
                return;
            }
            let error = document.createElement('P');
            error.appendChild(document.createTextNode(message));
            error.classList.add('form-error');
            error.setAttribute('data-type', type);
            element.parentNode.appendChild(error);
        }

        /**
         * @description Remove error message of some type after element
         * @param {Node} element - element, after which error message is
         * @param {String} typpe - error type
         */
        clearError(element, type) {

            let err = element.parentNode.querySelector('.form-error[data-type="' + type + '"]');
            if (err != null) {
                element.parentNode.removeChild(err);
            }
        }

        /**
         * @description Validate form
         * @param {Event} event - submit event
         * @todo Implement login validation
         */
        validate(event) {
            if (typeof event != "undefined" && !event.currentTarget.hasAttribute('data-reload')) {
                event.preventDefault();
            }

            let valid = true,
                next = null,
                equal_fields = this.form.querySelectorAll('[data-equal]'),
                unequal_fields = this.form.querySelectorAll('[data-unequal]'),
                required_fields = this.form.querySelectorAll('[required]'),
                url_fields = this.form.querySelectorAll('input[type="url"]'),
                email_fields = this.form.querySelectorAll('input[type="email"]'),
                url_regex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$", "i"),
                email_regex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");

            /* check equal fields */
            [].forEach.call(equal_fields, element => {
                let equal = this.form.querySelector(element.getAttribute("data-equal"));
                if (element.value.trim() != equal.value.trim()) {
                    valid = false;
                    this.addError(element, this.messages[document.body.parentNode.getAttribute('lang')].equal, "equal");
                } else {
                    this.clearError(element, "equal");
                }
            });

            /* check unequal fields */
            [].forEach.call(unequal_fields, element => {
                let unequal = this.form.querySelector(element.getAttribute("data-unequal"));
                if (element.options[element.selectedIndex].value.trim() == unequal.options[unequal.selectedIndex].value.trim()) {
                    valid = false;
                    this.addError(element, this.messages[document.body.parentNode.getAttribute('lang')].unequal, "unequal");
                } else {
                    this.clearError(element, "unequal");
                }
            });

            /* check required fields */
            [].forEach.call(required_fields, element => {
                if (element.value.trim() === "") {
                    valid = false;
                    this.addError(element, this.messages[document.body.parentNode.getAttribute('lang')].required, "required");
                } else {
                    this.clearError(element, 'required');
                }
            });

            /* check url fields */
            [].forEach.call(url_fields, element => {
                if (element.value.trim().length > 0 && url_regex.test(element.value.trim()) === false) {
                    valid = false;
                    this.addError(element, this.messages[document.body.parentNode.getAttribute('lang')].url, 'url');
                } else {
                    this.clearError(element, 'url');
                }
            });

            /* check email fields */
            [].forEach.call(email_fields, element => {
                if (element.value.trim().length > 0 && email_regex.test(element.value.trim()) === false) {
                    valid = false;
                    this.addError(element, this.messages[document.body.parentNode.getAttribute('lang')].email, 'email');
                } else {
                    this.clearError(element, 'email');
                }
            });

            let all_fields = Array.prototype.slice.call(equal_fields).concat(Array.prototype.slice.call(required_fields), Array.prototype.slice.call(url_fields), Array.prototype.slice.call(email_fields));

            [].forEach.call(all_fields, element => {
                let err = element.parentNode.querySelector('.form-error');
                if (err != null) {
                    let invalid = document.createAttribute("data-invalid");
                    invalid.value = true;

                    if (element.tagName == "SELECT") {
                        element.nextSibling.setAttributeNode(invalid);
                        element.nextSibling.removeAttribute('data-valid');
                    } else {
                        element.setAttributeNode(invalid);
                        element.removeAttribute('data-valid');
                    }
                } else {

                    let valid = document.createAttribute("data-valid");
                    valid.value = true;
                    if (element.tagName == "SELECT") {
                        element.nextSibling.setAttributeNode(valid);
                        element.nextSibling.removeAttribute('data-invalid');
                    } else {
                        element.setAttributeNode(valid);
                        element.removeAttribute('data-invalid');
                    }
                }
            });

            let errors_count = this.form.querySelectorAll('.form_error').length;
            if (errors_count > 0) {
                valid = false;
            }

            if (valid === false) {
                if (typeof event != "undefined") {
                    event.preventDefault();
                }
            }

            return valid;
        }
    }

    let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
    });

    ready.then(function () {
        let forms = document.querySelectorAll('form');
        [].forEach.call(forms, form => {
            new Validation(form);
        });
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0LmpzIiwiY29udGFjdHMuanMiLCJsYW5kaW5nLmpzIiwibGF5b3V0LmpzIiwibG9naW4uanMiLCJwb3B1cC5qcyIsInZhbGlkYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUNiLENBQUMsWUFBWTs7Ozs7QUFLVCxVQUFNLEtBQUssQ0FBQzs7Ozs7QUFLUixtQkFBVyxDQUFFLEtBQUssRUFBRTtBQUNoQixnQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsZ0JBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzNGLGdCQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCOztBQUVELGFBQUssR0FBSTtBQUNMLGdCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNkLHVCQUFPO2FBQ1Y7QUFDRCxvQkFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0Isb0JBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2pCLDBCQUFVLEVBQUUsQ0FBQzthQUNoQixFQUFFO0FBQ0Msd0JBQVEsRUFBRSxHQUFHO0FBQ1gsd0JBQVEsRUFBRSxNQUFLO0FBQ2Isd0JBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUN2QjthQUNKLENBQUMsQ0FBQztTQUNOOztBQUVELFlBQUksR0FBSTtB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QUFDO0NBRU4sQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxuICAgICAqIEBjbGFzcyBQb3B1cFxuICAgICAqL1xuICAgIGNsYXNzIEFsZXJ0IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBBZGRpbmcgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IgKGFsZXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0ID0gYWxlcnQ7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydF9fY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0LmNsb3NlID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hbGVydC5vcGVuID0gdGhpcy5vcGVuLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xvc2UgKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXR1cykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMuYWxlcnQsIFwiZmluaXNoXCIpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5hbGVydCwge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVk6IDBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwXG4gICAgICAgICAgICAgICAgLCBjb21wbGV0ZTogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcGVuICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5hbGVydCwgXCJmaW5pc2hcIik7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLmFsZXJ0LCB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWTogdGhpcy5hbGVydC5vZmZzZXRIZWlnaHQgKyBcInB4XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwXG4gICAgICAgICAgICAgICAgLCBjb21wbGV0ZTogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKT0+IHJlc29sdmUoKSk7XG4gICAgfSk7XG5cbiAgICByZWFkeS50aGVuKCgpPT57XG4gICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWxlcnQnKSwgKGFsZXJ0KSA9PiB7XG4gICAgICAgICAgICBuZXcgQWxlcnQoYWxlcnQpO1xuICAgICAgICAgICAgaWYgKGFsZXJ0LmNsYXNzTGlzdC5jb250YWlucygnYWxlcnRfb3BlbicpKXtcbiAgICAgICAgICAgICAgICBhbGVydC5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG4gICAgY2xhc3MgQ29udGFjdHMge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFN0YXJ0IGluaXRpYWxpemF0aW9uIG9uIGRvbWxvYWRcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQWRkaW5nIGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIHRoaXMubWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3RfX21hcCcpO1xuICAgICAgICAgICAgaWYodGhpcy5tYXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLnN0eWxlLmhlaWdodCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKSAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X193cmFwcGVyJykub2Zmc2V0SGVpZ2h0IC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpLm9mZnNldEhlaWdodCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKS5vZmZzZXRIZWlnaHQgLSA1MiArIFwicHhcIjtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXNpemUgKCkge1xuICAgICAgICAgICAgaWYodGhpcy5tYXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLnN0eWxlLmhlaWdodCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKSAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X193cmFwcGVyJykub2Zmc2V0SGVpZ2h0IC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpLm9mZnNldEhlaWdodCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKS5vZmZzZXRIZWlnaHQgLSA1MiArIFwicHhcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBuZXcgQ29udGFjdHM7XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG4gICAgY2xhc3MgTGFuZGdpbmcge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFN0YXJ0IGluaXRpYWxpemF0aW9uIG9uIGRvbWxvYWRcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQWRkaW5nIGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgaW5pdCgpIHtcblxuICAgICAgICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmRpbmcnKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRhYmxldCA9IDEyMDA7XG4gICAgICAgICAgICB0aGlzLm1vYmlsZSA9IDc1MDtcbiAgICAgICAgICAgIHRoaXMubWluX2hlaWdodCA9IDI1MDtcbiAgICAgICAgICAgIHRoaXMubWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtZXRhW25hbWU9J3ZpZXdwb3J0J11cIik7XG5cbiAgICAgICAgICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKVxuICAgICAgICAgICAgICAgICwgY2xvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvY2snKVxuICAgICAgICAgICAgICAgICwgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZV9tYWluJyk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICAgICAgICAgICQoXCIubGFuZGluZ1wiKS5mdWxscGFnZSh7XG4gICAgICAgICAgICAgICAgc2VjdGlvblNlbGVjdG9yOiBcIi5sYW5kaW5nX19zZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzY3JvbGxpbmdTcGVlZDogMzUwLFxuICAgICAgICAgICAgICAgIGFmdGVyTG9hZDogdGhpcy5oaWRlTG9hZGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgYWZ0ZXJSZW5kZXI6IHRoaXMucmVjb3VudFNsaWRlcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIGFmdGVyUmVzaXplOiB0aGlzLnJlY291bnRTbGlkZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBvbkxlYXZlOiAoaW5kZXgsIG5leHRJbmRleCwgZGlyZWN0aW9uKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRJbmRleCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX29wZW4nLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVOYXYoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfb3BlbicsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TmF2KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dEluZGV4ID09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb2NrX3Zpc2libGUnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb2NrX3Zpc2libGUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyX190b3BcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2Nyb2xsVG9Ub3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICBsZXQgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmRpbmdfX3NlY3Rpb24uYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlX21vbWVudCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlX21vbWVudCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBvblJlc2l6ZSAoKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKSA+IDQyMCApXG4gICAgICAgICAgICAgICAgJiYgKE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgPCA1MDApXG4gICAgICAgICAgICApe1xuICAgICAgICAgICAgICAgIHRoaXMubWV0YS5zZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIsIFwid2lkdGg9NDAwXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGEuc2V0QXR0cmlidXRlKFwiY29udGVudFwiLCBcIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBoaWRlTmF2ICgpIHtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubmF2LCBcImZpbmlzaFwiKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubmF2LCB7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDBcbiAgICAgICAgICAgICAgICAsIGNvbXBsZXRlOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hvd05hdiAoKSB7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLm5hdiwgXCJmaW5pc2hcIik7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLm5hdiwge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwXG4gICAgICAgICAgICAgICAgLCBiZWdpbjogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBoaWRlTG9hZGVyKCkge1xuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZwLW5hdicpO1xuICAgICAgICAgICAgdGhpcy5oaWRlTmF2KCk7XG5cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVfX3Jlc2l6YWJsZSwgLnNsaWRlX19jZW50cmVkJyksIChyZXNpemFibGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNpemFibGUuc2V0QXR0cmlidXRlKCdkYXRhLWhlaWdodCcsIHJlc2l6YWJsZS5vZmZzZXRIZWlnaHQpO1xuICAgICAgICAgICAgICAgIHJlc2l6YWJsZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnLCByZXNpemFibGUub2Zmc2V0V2lkdGgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyX193cmFwcGVyJyksXG4gICAgICAgICAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsb2FkZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgVmVsb2NpdHkobG9hZGVyLCBwcm9wcywgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJlY291bnRTbGlkZXMoKSB7XG5cbiAgICAgICAgICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgICAgICAgICAgbGV0IHJlc2l6YWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVfX3Jlc2l6YWJsZScpXG4gICAgICAgICAgICAgICAgLCBjZW50cmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlX19jZW50cmVkJylcbiAgICAgICAgICAgICAgICAsIHN0ZXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0ZXBzX19zdGVwJylcbiAgICAgICAgICAgICAgICAsIHNlcnZpY2Vfc2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVfc2VydmljZScpXG4gICAgICAgICAgICAgICAgLCBzZXJ2aWNlX2lsbHVzdHJhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZV9faWxsdXN0cmF0aW9uJylcbiAgICAgICAgICAgICAgICAsIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVfbWFpbicpXG4gICAgICAgICAgICAgICAgLCBzaGVtYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGVtYScpXG4gICAgICAgICAgICAgICAgLCBoZWFkZXJfaGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgICwgZm9vdGVyX2hlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICAsIHNoZW1hX2RldGFpbHMgPSBzaGVtYS5jbG9zZXN0KCcuc2xpZGVfX2RldGFpbHMnKVxuICAgICAgICAgICAgICAgICwgcGhvbmVzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVfX3Bob25lcycpXG4gICAgICAgICAgICAgICAgLCBwaG9uZSA9IG1haW4ucXVlcnlTZWxlY3RvcignLnNsaWRlX19waG9uZScpXG4gICAgICAgICAgICAgICAgLCB2aWV3cG9ydF9oZWlnaHRcbiAgICAgICAgICAgICAgICAsIHZpZXdwb3J0X3dpZHRoXG4gICAgICAgICAgICAgICAgLCBhdmFpbGFiYWxlX3dpZHRoXG4gICAgICAgICAgICAgICAgLCBhdmFpbGFiYWxlX2hlaWdodFxuICAgICAgICAgICAgICAgICwgZGVsdGEgPSAyMFxuICAgICAgICAgICAgICAgICwgY2VsbFxuICAgICAgICAgICAgICAgICwgc2l6ZVxuICAgICAgICAgICAgICAgICwgc2NhbGUgPSAxXG4gICAgICAgICAgICAgICAgLCBzY2FsZV94ID0gMVxuICAgICAgICAgICAgICAgICwgc2NhbGVfeSA9IDFcbiAgICAgICAgICAgICAgICAsIGhlYWRlclxuICAgICAgICAgICAgICAgICwgc2xpZGVcbiAgICAgICAgICAgICAgICAsIGJvcmRlcl93aWR0aFxuICAgICAgICAgICAgICAgICwgZGVsdGFfeVxuICAgICAgICAgICAgICAgICwgdHJfeVxuICAgICAgICAgICAgICAgICwgdHJfeFxuICAgICAgICAgICAgICAgICwgZWxlbWVudF93aWR0aFxuICAgICAgICAgICAgICAgICwgZWxlbWVudF9oZWlnaHRcbiAgICAgICAgICAgICAgICAsIGlsbHVzdHJhdGlvbl9oZWlnaHRcbiAgICAgICAgICAgICAgICAsIHdfd2lkdGhcbiAgICAgICAgICAgICAgICAsIHdfaGVpZ2h0XG4gICAgICAgICAgICAgICAgLCBpX3dpZHRoXG4gICAgICAgICAgICAgICAgLCBkZWxcbiAgICAgICAgICAgICAgICAsIGlfaGVpZ2h0O1xuXG4gICAgICAgICAgICBjZWxsID0gbWFpbi5xdWVyeVNlbGVjdG9yKCcuZnAtdGFibGVDZWxsJyk7XG4gICAgICAgICAgICB2aWV3cG9ydF9oZWlnaHQgPSBNYXRoLm1pbihjZWxsLm9mZnNldEhlaWdodCwgcGFyc2VJbnQoY2VsbC5zdHlsZS5oZWlnaHQsIDEwKSk7XG4gICAgICAgICAgICB2aWV3cG9ydF93aWR0aCA9IGNlbGwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgIGhlYWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignLnNsaWRlX19oZWFkZXInKTtcbiAgICAgICAgICAgIG1haW4uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcImF1dG8gXCIgKyB2aWV3cG9ydF9oZWlnaHQgKyBcInB4XCI7XG5cbiAgICAgICAgICAgIGlmICh2aWV3cG9ydF93aWR0aCA+IDc1MCkge1xuICAgICAgICAgICAgICAgIGRlbCA9IDA7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IDU1MDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsID0gMTAwO1xuICAgICAgICAgICAgICAgIHNpemUgPSA0ODA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdmFpbGFiYWxlX2hlaWdodCA9IHZpZXdwb3J0X2hlaWdodCAtIGRlbCAtIGhlYWRlci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoYXZhaWxhYmFsZV9oZWlnaHQgPj0gMjAwKVxuICAgICAgICAgICAgICAgICYmICh2aWV3cG9ydF93aWR0aCA+IDc1MClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHBob25lcy5zdHlsZS5oZWlnaHQgPSBNYXRoLm1pbihhdmFpbGFiYWxlX2hlaWdodCwgc2l6ZSkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgcGhvbmVzLnN0eWxlLm1hcmdpbkxlZnQgPSAtTWF0aC5taW4oYXZhaWxhYmFsZV9oZWlnaHQsIHNpemUpKjAuMSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBwaG9uZXMuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhdmFpbGFiYWxlX2hlaWdodCA8IDIwMCApIHtcbiAgICAgICAgICAgICAgICBwaG9uZXMuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBob25lcy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKHZpZXdwb3J0X3dpZHRoIDw9IDc1MCkge1xuICAgICAgICAgICAgICAgIHBob25lLnN0eWxlLmhlaWdodCA9IGF2YWlsYWJhbGVfaGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjZWxsID0gc2VydmljZV9zbGlkZS5xdWVyeVNlbGVjdG9yKCcuZnAtdGFibGVDZWxsJyk7XG4gICAgICAgICAgICB2aWV3cG9ydF9oZWlnaHQgPSBNYXRoLm1pbihjZWxsLm9mZnNldEhlaWdodCwgcGFyc2VJbnQoY2VsbC5zdHlsZS5oZWlnaHQsIDEwKSk7XG4gICAgICAgICAgICB2aWV3cG9ydF93aWR0aCA9IGNlbGwub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBoZWFkZXIgPSBzZXJ2aWNlX3NsaWRlLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZV9faGVhZGVyJyk7XG4gICAgICAgICAgICBpbGx1c3RyYXRpb25faGVpZ2h0ID0gKE1hdGgubWluKGNlbGwub2Zmc2V0SGVpZ2h0LCBwYXJzZUludChjZWxsLnN0eWxlLmhlaWdodCwgMTApKSAtIGhlYWRlci5vZmZzZXRIZWlnaHQgLSBmb290ZXJfaGVpZ2h0IC0gaGVhZGVyX2hlaWdodCk7XG4gICAgICAgICAgICBzZXJ2aWNlX2lsbHVzdHJhdGlvbi5zdHlsZS5oZWlnaHQgPSBpbGx1c3RyYXRpb25faGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgICAgICAgICB3X3dpZHRoID0gNzAwO1xuICAgICAgICAgICAgd19oZWlnaHQgPSA1NzA7XG4gICAgICAgICAgICBpX3dpZHRoID0gdmlld3BvcnRfd2lkdGgqMS4yO1xuICAgICAgICAgICAgaV9oZWlnaHQgPSB3X2hlaWdodCppX3dpZHRoL3dfd2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChpX2hlaWdodCA8IGlsbHVzdHJhdGlvbl9oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlX2lsbHVzdHJhdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZV9faWxsdXN0cmF0aW9uX2hpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlX2lsbHVzdHJhdGlvbi5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBcIjUwJSAxMDAlXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlsbHVzdHJhdGlvbl9oZWlnaHQgPCAzNzApIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlX2lsbHVzdHJhdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZV9faWxsdXN0cmF0aW9uX2hpZGRlbicsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlX2lsbHVzdHJhdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZV9faWxsdXN0cmF0aW9uX2hpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlX2lsbHVzdHJhdGlvbi5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBcIjUwJSAwXCI7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8gQ2VudHJlZCBzdHlsZVxuXG4gICAgICAgICAgICAvLyDQp9C40YHRgtC40Lwg0LLRgdC1INGB0YLQuNC70Lgg0L/RgNC40LLQvdC10YHQtdC90L3Ri9C1XG4gICAgICAgICAgICBjZW50cmVkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChzdGVwcywgKHN0ZXApID0+IHtcbiAgICAgICAgICAgICAgICBzdGVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApID4gNDgwICkge1xuXG4gICAgICAgICAgICAgICAgc2xpZGUgPSBjZW50cmVkLmNsb3Nlc3QoJy5zbGlkZScpO1xuICAgICAgICAgICAgICAgIGNlbGwgPSBjZW50cmVkLmNsb3Nlc3QoJy5mcC10YWJsZUNlbGwnKTtcbiAgICAgICAgICAgICAgICB2aWV3cG9ydF9oZWlnaHQgPSBNYXRoLm1pbihjZWxsLm9mZnNldEhlaWdodCwgcGFyc2VJbnQoY2VsbC5zdHlsZS5oZWlnaHQsIDEwKSk7XG4gICAgICAgICAgICAgICAgdmlld3BvcnRfd2lkdGggPSBjZWxsLm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudF9oZWlnaHQgPSBwYXJzZUludChjZW50cmVkLmdldEF0dHJpYnV0ZSgnZGF0YS1oZWlnaHQnKSwxMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmlld3BvcnRfd2lkdGggPiAxMjIwKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVza3RvcFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50X3dpZHRoID0gMTIzMDtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFfeSA9IDE3MDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCh2aWV3cG9ydF93aWR0aCA+IDc1MCkgJiYgKHZpZXdwb3J0X3dpZHRoIDw9IDEyMjApKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRhYmxldFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50X3dpZHRoID0gMTA1MDtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFfeSA9IDE3MDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb2JpbGVcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF93aWR0aCA9IDQwMDtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF9oZWlnaHQgPSA5MDA7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhX3kgPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGF2YWlsYWJhbGVfaGVpZ2h0ID0gdmlld3BvcnRfaGVpZ2h0IC0gaGVhZGVyX2hlaWdodDtcbiAgICAgICAgICAgICAgICBhdmFpbGFiYWxlX3dpZHRoID0gdmlld3BvcnRfd2lkdGggLSA0MDtcblxuICAgICAgICAgICAgICAgIHNjYWxlX3ggPSBhdmFpbGFiYWxlX2hlaWdodC9lbGVtZW50X2hlaWdodDtcbiAgICAgICAgICAgICAgICBzY2FsZV95ID0gYXZhaWxhYmFsZV93aWR0aC9lbGVtZW50X3dpZHRoO1xuICAgICAgICAgICAgICAgIHNjYWxlID0gTWF0aC5taW4oTWF0aC5taW4oc2NhbGVfeCwgc2NhbGVfeSksMSk7XG5cbiAgICAgICAgICAgICAgICB0cl95ID0gMDtcbiAgICAgICAgICAgICAgICB0cl94ID0gMDtcblxuICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydF93aWR0aCA8IDc1MCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb2JpbGVcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBhdmFpbGFiYWxlX2hlaWdodC82MjA7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRyZWQuc3R5bGVbTW9kZXJuaXpyLnByZWZpeGVkKCd0cmFuc2Zvcm0nKV0gPSAndHJhbnNsYXRlWCgtNTAlKSBzY2FsZSgnICsgc2NhbGUgKyAnKSc7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBub3QgbW9iaWxlXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJhbGVfd2lkdGggPCBlbGVtZW50X3dpZHRoICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJfeCA9IC0oZWxlbWVudF93aWR0aCAtIHZpZXdwb3J0X3dpZHRoKS8yIDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwc2NhbGUgdGV4dFxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGU8MSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKHN0ZXBzLCAoc3RlcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAuc3R5bGVbTW9kZXJuaXpyLnByZWZpeGVkKCd0cmFuc2Zvcm0nKV0gPSAnc2NhbGUoJyArIE1hdGgubWluKCgxL3NjYWxlKSowLjgsIDIpICsgJyknO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cl94ICs9IDMwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdHJfeCArPSAncHgnO1xuICAgICAgICAgICAgICAgICAgICBjZW50cmVkLnN0eWxlW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNmb3JtJyldID0gJ3RyYW5zbGF0ZVgoJyArIHRyX3ggKyAnKSB0cmFuc2xhdGVZKCcgKyB0cl95ICsgJykgc2NhbGUoJyArIHNjYWxlICsgJyknO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChyZXNpemFibGVzLCAocmVzaXphYmxlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBzbGlkZSA9IHJlc2l6YWJsZS5jbG9zZXN0KCcuc2xpZGUnKTtcbiAgICAgICAgICAgICAgICBoZWFkZXIgPSByZXNpemFibGUuY2xvc2VzdCgnLnNsaWRlX19kZXRhaWxzJykucXVlcnlTZWxlY3RvcignLnNsaWRlX19oZWFkZXInKTtcbiAgICAgICAgICAgICAgICBjZWxsID0gcmVzaXphYmxlLmNsb3Nlc3QoJy5mcC10YWJsZUNlbGwnKTtcblxuICAgICAgICAgICAgICAgIHZpZXdwb3J0X2hlaWdodCA9IE1hdGgubWluKGNlbGwub2Zmc2V0SGVpZ2h0LCBwYXJzZUludChjZWxsLnN0eWxlLmhlaWdodCwgMTApKTtcbiAgICAgICAgICAgICAgICB2aWV3cG9ydF93aWR0aCA9IGNlbGwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50X2hlaWdodCA9IHBhcnNlSW50KHJlc2l6YWJsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JyksMTApO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRfd2lkdGggPSBwYXJzZUludChyZXNpemFibGUuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJyksMTApO1xuXG4gICAgICAgICAgICAgICAgc2NhbGVfeCA9IGF2YWlsYWJhbGVfaGVpZ2h0L2VsZW1lbnRfaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHNjYWxlX3kgPSBhdmFpbGFiYWxlX3dpZHRoL2VsZW1lbnRfd2lkdGg7XG4gICAgICAgICAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihzY2FsZV94LCBzY2FsZV95KTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdwb3J0X3dpZHRoID4gdGhpcy5tb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFibGV0IGFuZCBkZXNrdG9wIHJlc29sdXRpb25cblxuICAgICAgICAgICAgICAgICAgICBhdmFpbGFiYWxlX2hlaWdodCA9IHZpZXdwb3J0X2hlaWdodCAtIGhlYWRlcl9oZWlnaHQgLSBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmFsZV93aWR0aCA9IHZpZXdwb3J0X3dpZHRoLzIgLSA0MDtcblxuICAgICAgICAgICAgICAgICAgICBzY2FsZV94ID0gYXZhaWxhYmFsZV9oZWlnaHQvZWxlbWVudF9oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlX3kgPSBhdmFpbGFiYWxlX3dpZHRoL2VsZW1lbnRfd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlID0gTWF0aC5taW4oc2NhbGVfeCwgc2NhbGVfeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIGF2YWlsYWJhbGVfaGVpZ2h0IDwgdGhpcy5taW5faGVpZ2h0ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCdzbGlkZV9oaWRlLXJlc2l6YWJsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHNjYWxlIDwgMSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVfaGlkZS1yZXNpemFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZS5zdHlsZVtNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zZm9ybScpXSA9ICdzY2FsZSgnICsgc2NhbGUgKyAnKSc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NsaWRlX3JpZ2h0Jykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcl93aWR0aCA9IChwYXJzZUludChyZXNpemFibGUuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJyksMTApKSpzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIuc3R5bGUuYm9yZGVyTGVmdFdpZHRoID0gYm9yZGVyX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydF93aWR0aCA+IHRoaXMudGFibGV0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWJsZXQgcmVzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGUuc3R5bGUubWFyZ2luUmlnaHQgPSAoaGVhZGVyLm9mZnNldFdpZHRoLzIgLSBib3JkZXJfd2lkdGgpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyX3dpZHRoID0gKHBhcnNlSW50KHJlc2l6YWJsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnKSwxMCkpKnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5zdHlsZS5ib3JkZXJSaWdodFdpZHRoID0gYm9yZGVyX3dpZHRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydF93aWR0aCA+IHRoaXMudGFibGV0ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWJsZXQgcmVzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGUuc3R5bGUubWFyZ2luTGVmdCA9IChoZWFkZXIub2Zmc2V0V2lkdGgvMiAtIGJvcmRlcl93aWR0aCkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVfaGlkZS1yZXNpemFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb2JpbGUgcmVzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICBhdmFpbGFiYWxlX2hlaWdodCA9IHZpZXdwb3J0X2hlaWdodCAtIGhlYWRlcl9oZWlnaHQgLSBoZWFkZXIub2Zmc2V0SGVpZ2h0IC0gNjA7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsYWJhbGVfd2lkdGggPSB2aWV3cG9ydF93aWR0aCAtIDQwO1xuXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlX3ggPSBhdmFpbGFiYWxlX2hlaWdodC9lbGVtZW50X2hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVfeSA9IGF2YWlsYWJhbGVfd2lkdGgvZWxlbWVudF93aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihzY2FsZV94LCBzY2FsZV95KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmFsZV93aWR0aCA8IGVsZW1lbnRfd2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZS5zdHlsZS5tYXJnaW5MZWZ0ID0gLSAoKChlbGVtZW50X3dpZHRoIC0gYXZhaWxhYmFsZV93aWR0aCkvMikgLSAyMCkgKyBcInB4XCJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZS5zdHlsZS5tYXJnaW5MZWZ0ID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIGF2YWlsYWJhbGVfaGVpZ2h0IDwgMjAwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpZGRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ3NsaWRlX2hpZGUtcmVzaXphYmxlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggc2NhbGUgPCAxICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZV9oaWRlLXJlc2l6YWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlLnN0eWxlW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNmb3JtJyldID0gJ3NjYWxlKCcgKyBzY2FsZSArICcpJztcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVfaGlkZS1yZXNpemFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBzY3JvbGxUb1RvcChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQuZm4uZnVsbHBhZ2UubW92ZVRvKDEsIDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5ldyBMYW5kZ2luZztcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbigpIHtcbiAgICB3aW5kb3cubW9iaWxlQW5kVGFibGV0Y2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNoZWNrID0gZmFsc2U7XG4gICAgICAgIChmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICBpZiAoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWlub3xhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pLnRlc3QoYSkgfHwgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLCA0KSkpIGNoZWNrID0gdHJ1ZVxuICAgICAgICB9KShuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhKTtcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH07XG5cbiAgICB3aW5kb3cuaXNNb2JpbGUgPSB7XG4gICAgICAgIEFuZHJvaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIC9BbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgQmxhY2tCZXJyeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL0JsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB9LFxuICAgICAgICBpT1M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIC9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgV2luZG93czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL0lFTW9iaWxlL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgYW55OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAoaXNNb2JpbGUuQW5kcm9pZCgpIHx8IGlzTW9iaWxlLkJsYWNrQmVycnkoKSB8fCBpc01vYmlsZS5pT1MoKSB8fCBpc01vYmlsZS5XaW5kb3dzKCkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNsYXNzIExheW91dCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgaW5pdGlhbGl6YXRpb24gb24gZG9tbG9hZFxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgbGV0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBBZGRpbmcgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5pc01vYmlsZS5BbmRyb2lkKCkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnYW5kcm9pZCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuaXNNb2JpbGUuaU9TKCkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW9zJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5tb2JpbGVBbmRUYWJsZXRjaGVjaygpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3Vua25vd24tbW9iaWxlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdkZXNrdG9wJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbmV3IExheW91dDtcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbiAoKSB7XG4gICAgY2xhc3MgTWVudSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgaW5pdGlhbGl6YXRpb24gb24gZG9tbG9hZFxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCk9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQWRkaW5nIGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgaW5pdCAoKSB7XG5cbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbicpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBiYWNrX2J1dHRvbnMgPSAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxvZ2luX19iYWNrJylcbiAgICAgICAgICAgICAgICAsIGxvZ2luX2J1dHRvbnMgPSAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxvZ2luX19sb2dpbi1idXR0b24sIC5sb2dpbl9zdWNjZXNzIC5sb2dpbl9fc3VibWl0JylcbiAgICAgICAgICAgICAgICAsIG1vYmlsZV9wb3B1cF9idXR0b25zID0gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2ludGVycHJldGVyLCAuaGVhZGVyX19pbnRlcnByZXRlcicpO1xuXG4gICAgICAgICAgICB0aGlzLm1lbnVfcG9wdXBfb3BlbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ2luX2J1dHRvbiA9ICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19sb2dpbicpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlcl9idXR0b24gPSAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fcmVnaXN0ZXInKTtcblxuICAgICAgICAgICAgdGhpcy5zdGVwMSA9ICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fcmVnaXN0ZXItc3RlcC0xJyk7XG4gICAgICAgICAgICB0aGlzLnN0ZXAxX2Zvcm0gPSAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9yZWdpc3Rlci1zdGVwLTEgZm9ybS5sb2dpbl9fZm9ybScpO1xuICAgICAgICAgICAgdGhpcy5zdGVwMiA9ICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fcmVnaXN0ZXItc3RlcC0yJyk7XG4gICAgICAgICAgICB0aGlzLnN0ZXAyX2Zvcm0gPSAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9yZWdpc3Rlci1zdGVwLTIgZm9ybS5sb2dpbl9fZm9ybScpO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ2luX2Zvcm0gPSAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9sb2dpbiBmb3JtLmxvZ2luX19mb3JtJyk7XG5cbiAgICAgICAgICAgIHRoaXMubW9iaWxlX3BvcHVwID0gICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX21vYmlsZScpO1xuICAgICAgICAgICAgdGhpcy5tb2JpbGVfcG9wdXBfY2xvc2UgPSAgICAgICB0aGlzLm1vYmlsZV9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Nsb3NlJyk7XG5cbiAgICAgICAgICAgIHRoaXMud3JhcHBlciA9ICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX3dyYXBwZXInKTtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyX3JlZ2lzdGVyX2J1dHRvbiA9ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbGlua19yZWdpc3RlcicpO1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJfbG9naW5fYnV0dG9uID0gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19saW5rX2xvZ2luJyk7XG4gICAgICAgICAgICB0aGlzLnJlY292ZXJ5X2J1dHRvbiA9ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9fcGFzc3dvcmQtcmVjb3ZlcnknKTtcbiAgICAgICAgICAgIHRoaXMubGlnaHRib3ggPSAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keT4ubGlnaHRib3gnKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fcG9wdXAgPSAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luX2xvZ2luJyk7XG4gICAgICAgICAgICB0aGlzLnJlY292ZXJ5ID0gICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9yZWNvdmVyeScpO1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZCA9ICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRoaXMucmVjb3ZlcnlfZm9ybSA9ICAgICAgICAgICAgdGhpcy5yZWNvdmVyeS5xdWVyeVNlbGVjdG9yKCcubG9naW5fX2Zvcm0nKTtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRfZm9ybSA9ICAgICAgICAgICAgdGhpcy5wYXNzd29yZC5xdWVyeVNlbGVjdG9yKCcubG9naW5fX2Zvcm0nKTtcblxuICAgICAgICAgICAgdGhpcy5lcnJvcl9tZXNzYWdlID0gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnRfZm9ybS1zZW5kLWZhaWwnKTtcblxuICAgICAgICAgICAgdGhpcy5lbWFpbCA9ICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fZW1haWwnKTtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzcyA9ICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luX3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luX29wZW4nKTtcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ2luX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3BlbkxvZ2luRm9ybS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMucmVjb3ZlcnlfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vcGVuUmVjb3ZlcnkuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmxpZ2h0Ym94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZUFsbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vcGVuUmVnaXN0ZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9sb2dpbl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9wZW5Mb2dpbk91dGVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJfcmVnaXN0ZXJfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vcGVuUmVnaXN0ZXJPdXRlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMubW9iaWxlX3BvcHVwX2Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vYmlsZVBvcHVwLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJ5X2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRfZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnNlbmREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5zdGVwMV9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMub3Blbk5leHQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnN0ZXAyX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5fZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnNlbmREYXRhLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXBvc1BvcHVwLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICAkKCdzZWxlY3QubGFuZ3VhZ2VfZnJvbScpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJ3NlbGVjdC5sYW5ndWFnZV90bycpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJ3NlbGVjdC5sYW5ndWFnZV9sb2NhdGlvbicpLnNlbGVjdDIoKTtcblxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZV9mcm9tID0gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYW5ndWFnZV9mcm9tJyk7XG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlX3RvID0gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlX3RvJyk7XG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlX2xvY2F0aW9uID0gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlX2xvY2F0aW9uJyk7XG5cbiAgICAgICAgICAgICQoXCIubG9naW4gc2VsZWN0Lmxhbmd1YWdlX2Zyb21cIikub24oXCJjaGFuZ2VcIiwgdGhpcy5jaGFuZ2VGcm9tTGFuZ3VhZ2UuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9naW4nKSwgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwobW9iaWxlX3BvcHVwX2J1dHRvbnMsIChidXR0b24pID0+IHtcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9wZW5Nb2JpbGVQb3B1cC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoYmFja19idXR0b25zLCAoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5nb2JhY2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGxvZ2luX2J1dHRvbnMsIChidXR0b24pID0+IHtcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9wZW5Mb2dpbklubmVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuV2ViUlRDU3VwcG9ydCA9ICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCduby1wZWVyY29ubmVjdGlvbicpO1xuXG5cbiAgICAgICAgICAgIGlmKCF0aGlzLldlYlJUQ1N1cHBvcnQpIHtcblxuICAgICAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtLmxvZ2luX19mb3JtIGlucHV0LCBmb3JtLmxvZ2luX19mb3JtIGJ1dHRvbiwgZm9ybS5sb2dpbl9fZm9ybSBzZWxlY3QnKSwgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0ubG9naW5fX2Zvcm0nKSwgKGZvcm0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jbG9zZXN0KCcubG9naW4nKS5xdWVyeVNlbGVjdG9yKCcucG9wdXBfYnJvd3NlcicpLm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwX2Jyb3dzZXInKSwgKHBvcHVwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BvcHVwKHBvcHVwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNoYW5nZUZyb21MYW5ndWFnZSAoKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVfZnJvbSA9IHRoaXMubGFuZ3VhZ2VfZnJvbS52YWx1ZVxuICAgICAgICAgICAgICAgICwgdmFsdWVfdG8gPSB0aGlzLmxhbmd1YWdlX3RvLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodmFsdWVfZnJvbSA9PT0gdmFsdWVfdG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmd1YWdlX3RvLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICQodGhpcy5sYW5ndWFnZV90bykuc2VsZWN0MihcInZhbFwiLCBcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMubGFuZ3VhZ2VfdG8ucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uW3ZhbHVlXVtkaXNhYmxlZF0nKSwgKHRvX2VuYWJsZSk9PntcbiAgICAgICAgICAgICAgICB0b19lbmFibGUucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmxhbmd1YWdlX3RvLnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZV9mcm9tICsgJ1wiXScpLCAodG9fZGlzYWJsZSk9PntcbiAgICAgICAgICAgICAgICB0b19kaXNhYmxlLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBpbmVmZmljaWVudCwgYnV0IGl0IGxvb2sgbGl0ZSB0aGVyZSBhcmUgbm8gb3RoZXIgd2F5IGNvcnJlY3RseSBkaXNhYmxlL2VuYWJsZSBzZWxlY3QyIGR5bmFtaWNhbGx5XG4gICAgICAgICAgICAkKHRoaXMubGFuZ3VhZ2VfdG8pLnNlbGVjdDIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wZW5OZXh0IChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5zdGVwMV9kYXRhID0ge1xuICAgICAgICAgICAgICAgIGZyb206ICQoJ3NlbGVjdC5sYW5ndWFnZV9mcm9tJykuc2VsZWN0MihcInZhbFwiKVxuICAgICAgICAgICAgICAgICwgdG86ICQoJ3NlbGVjdC5sYW5ndWFnZV90bycpLnNlbGVjdDIoXCJ2YWxcIilcbiAgICAgICAgICAgICAgICAsIGxvY2F0aW9uOiAkKCdzZWxlY3QubGFuZ3VhZ2VfbG9jYXRpb24nKS5zZWxlY3QyKFwidmFsXCIpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGVwMV9mb3JtLnZhbGlkYXRlKCkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3BlbkZvcm0odGhpcy5zdGVwMik7XG4gICAgICAgIH1cblxuICAgICAgICByZXBvc1BvcHVwIChldmVudCkge1xuICAgICAgICAgICAgaWYoIXRoaXMubWVudV9wb3B1cF9vcGVuKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vYmlsZV9wb3B1cC5zdHlsZVtNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zZm9ybScpXSA9IFwidHJhbnNsYXRlWShcIiArIHRoaXMubW9iaWxlX3BvcHVwLm9mZnNldEhlaWdodCArIFwicHgpXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjbG9zZU1vYmlsZVBvcHVwICgpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLm1lbnVfcG9wdXBfb3Blbil7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tZW51X3BvcHVwX29wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5tb2JpbGVfcG9wdXAsIFwic3RvcFwiKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubW9iaWxlX3BvcHVwLCB7dHJhbnNsYXRlWTogMH0sIDI1MCk7XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubW9iaWxlX3BvcHVwX2J1dHRvbiwgXCJzdG9wXCIpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5tb2JpbGVfcG9wdXBfYnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICAgICAgICAgICAgICAsIGJlZ2luOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2JpbGVfcG9wdXBfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcGVuTW9iaWxlUG9wdXAgKCkge1xuICAgICAgICAgICAgaWYodGhpcy5tZW51X3BvcHVwX29wZW4pe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWVudV9wb3B1cF9vcGVuID0gdHJ1ZTtcblxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5tb2JpbGVfcG9wdXAsIFwic3RvcFwiKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubW9iaWxlX3BvcHVwLCB7dHJhbnNsYXRlWTogdGhpcy5tb2JpbGVfcG9wdXAub2Zmc2V0SGVpZ2h0ICsgXCJweFwifSwgMjUwKTtcblxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5tb2JpbGVfcG9wdXBfYnV0dG9uLCBcInN0b3BcIik7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLm1vYmlsZV9wb3B1cF9idXR0b24sIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgICwgY29tcGxldGU6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vYmlsZV9wb3B1cF9idXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hvd1BvcHVwIChwb3B1cCkge1xuICAgICAgICAgICAgaWYgKHBvcHVwLnNob3cgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBwb3B1cC5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5zaG93UG9wdXAuYmluZCh0aGlzLCBwb3B1cCksIDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU2Nyb2xsIHRvIGZpcnN0IHNsaWRlIGFuZCBvcGVuIGxvZ2luIGZvcm1cbiAgICAgICAgICovXG4gICAgICAgIG9wZW5Mb2dpbk91dGVyIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQuZm4uZnVsbHBhZ2UubW92ZVRvKDEsIDApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubG9naW5fYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB9LCA4MDApXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFNjcm9sbCB0byBmaXJzdCBzbGlkZSBhbmQgb3BlbiByZWdpc3RlciBmb3JtXG4gICAgICAgICAqL1xuICAgICAgICBvcGVuUmVnaXN0ZXJPdXRlciAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLm1vdmVUbygxLCAwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyX2J1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgfSwgODAwKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTZW5kIHJlZ2lzdHJhdGlvbiBkYXRhIGFuZCBzaG93IG1lc3NhZ2VcbiAgICAgICAgICovXG4gICAgICAgIHNlbmREYXRhIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBmb3JtID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgICAgICAgaWYgKGZvcm0udmFsaWRhdGUoKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgRE9ORSA9IDRcbiAgICAgICAgICAgICAgICAsIE9LID0gMjAwXG4gICAgICAgICAgICAgICAgLCBhZnRlcl9hY3Rpb25cbiAgICAgICAgICAgICAgICAsIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICAgICAgLCBsb2FkZWRcbiAgICAgICAgICAgICAgICAsIGluZGV4XG4gICAgICAgICAgICAgICAgLCBkYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RlcDFfZGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKCdmcm9tJywgICAgIHRoaXMuc3RlcDFfZGF0YS5mcm9tKTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5hcHBlbmQoJ3RvJywgICAgICAgdGhpcy5zdGVwMV9kYXRhLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5hcHBlbmQoJ2xvY2F0aW9uJywgdGhpcy5zdGVwMV9kYXRhLmxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwMV9kYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsb2FkZWQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywgZm9ybS5nZXRBdHRyaWJ1dGUoJ2FjdGlvbicpKTtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNlbmQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IERPTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57dGhpcy5jbGVhckFsbCgpO30sIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IE9LKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogcGFyc2VJbnQoeGhyLnN0YXR1cywgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm0uaGFzQXR0cmlidXRlKCdkYXRhLXN1Y2Nlc3MnKSkge1xuICAgICAgICAgICAgICAgICAgICBhZnRlcl9hY3Rpb24gPSB0aGlzLnJlZGlyZWN0VG8uYmluZCh0aGlzLCBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWNjZXNzJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybS5oYXNBdHRyaWJ1dGUoJ2RhdGEtY2hlY2snKSkge1xuICAgICAgICAgICAgICAgICAgICBhZnRlcl9hY3Rpb24gPSB0aGlzLnNob3dDaGVja01lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhZnRlcl9hY3Rpb24gPSB0aGlzLnNob3dTdWNjZXNzTWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxvYWRlZC50aGVuKGFmdGVyX2FjdGlvbikuY2F0Y2godGhpcy5zaG93RXJyb3JNZXNzYWdlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIC8vIGxvYWRlZC50aGVuKGFmdGVyX2FjdGlvbikuY2F0Y2goYWZ0ZXJfYWN0aW9uKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcDFEYXRhID0gbnVsbDtcblxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiAnLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFJlZGlyZWN0IHRvIHVybFxuICAgICAgICAgKi9cbiAgICAgICAgcmVkaXJlY3RUbyAodXJsKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTaG93IGNoZWNrIGVtYWlsIG1lc3NhZ2VcbiAgICAgICAgICovXG4gICAgICAgIHNob3dDaGVja01lc3NhZ2UgKCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRm9ybSh0aGlzLmVtYWlsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICovXG4gICAgICAgIHNob3dTdWNjZXNzTWVzc2FnZSAoKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIHRoaXMub3BlbkZvcm0odGhpcy5zdWNjZXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gT3BlbiBsb2dpblxuICAgICAgICAgKi9cbiAgICAgICAgb3BlbkxvZ2luSW5uZXIgKCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRm9ybSh0aGlzLmxvZ2luX3BvcHVwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU2hvdyBtZXNzYWdlXG4gICAgICAgICAqL1xuICAgICAgICBzaG93RXJyb3JNZXNzYWdlIChyZWFzb24pIHtcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uLmNvZGUsICdSZXNwb25jZSBzdGF0dXMgY29kZTogJyArIHJlYXNvbi5jb2RlICsgJy4gJyArIHJlYXNvbi5tZXNzYWdlICsgJy4nKTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JfbWVzc2FnZS5vcGVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIE9wZW4gbGFzdCBwYWdlXG4gICAgICAgICAqL1xuICAgICAgICBnb2JhY2sgKCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRm9ybSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTaG93IGVtYWlsIHNlbnQgd2FybmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZW1haWxIYXZlU2VuZCAoKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIHRoaXMub3BlbkZvcm0odGhpcy5lbWFpbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIE9wZW4gcmVnaXN0ZXIgZm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgb3BlblJlZ2lzdGVySW5uZXIgKCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRm9ybSh0aGlzLnN0ZXAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gT3BlbiByZWdpc3RlciBmb3JtXG4gICAgICAgICAqL1xuICAgICAgICBvcGVuUmVnaXN0ZXIgKCkge1xuICAgICAgICAgICAgJC5mbi5mdWxscGFnZS5zZXRBbGxvd1Njcm9sbGluZyhmYWxzZSk7XG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLnNldEtleWJvYXJkU2Nyb2xsaW5nKGZhbHNlKTtcblxuICAgICAgICAgICAgbGV0IHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMuc3RlcDEsIHByb3BzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuc3RlcDE7XG5cbiAgICAgICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saWdodGJveC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5saWdodGJveCwgcHJvcHMsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBPcGVuIHJlY292ZXJ5IGZvcm1zXG4gICAgICAgICAqL1xuICAgICAgICBvcGVuUmVjb3ZlcnkgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYoIXRoaXMuV2ViUlRDU3VwcG9ydCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub3BlbkZvcm0odGhpcy5yZWNvdmVyeSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIE9wZW4gcmVjb3ZlcnkgZm9ybXNcbiAgICAgICAgICogQHBhcmFtIGZvcm0ge25vZGV9IEZvcm0geW91IHdhbnQgdG8gb3BlblxuICAgICAgICAgKiBAcGFyYW0gYmFjayB7bm9kZX0gRm9ybSB3aGljaCB5b3Ugd2FudCB0byBvcGVuIHdoZW4gdXNlciBwcmVzcyBiYWNrLCBieSBkZWZhdWx0IOKAlMKgbGFzdCBmb3JtIG9wZW5lZFxuICAgICAgICAgKi9cbiAgICAgICAgb3BlbkZvcm0gKHBvcHVwLCBkb250X3NhdmUpIHtcbiAgICAgICAgICAgICQuZm4uZnVsbHBhZ2Uuc2V0QWxsb3dTY3JvbGxpbmcoZmFsc2UpO1xuICAgICAgICAgICAgJC5mbi5mdWxscGFnZS5zZXRLZXlib2FyZFNjcm9sbGluZyhmYWxzZSk7XG5cbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblxuICAgICAgICAgICAgLy8gJCgnc2VsZWN0Lmxhbmd1YWdlX2Zyb20nKS5zZWxlY3QyKFwidmFsXCIsIFwiXCIpO1xuICAgICAgICAgICAgLy8gJCgnc2VsZWN0Lmxhbmd1YWdlX3RvJykuc2VsZWN0MihcInZhbFwiLCBcIlwiKTtcbiAgICAgICAgICAgIC8vICQoJ3NlbGVjdC5sYW5ndWFnZV9sb2NhdGlvbicpLnNlbGVjdDIoXCJ2YWxcIiwgXCJcIik7XG4gICAgICAgICAgICAvLyBpZiAoKGZvcm0gIT0gbnVsbCkgJiYgKHR5cGVvZiBmb3JtLmNsZWFyICE9ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKGZvcm0hPW51bGwpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGZvcm0uY2xlYXIoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcG9wdXAgPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLmxhc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBvcHVwID0gdGhpcy5sYXN0LnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcG9wdXAgPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLmxhc3QubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQWxsKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb250X3NhdmUgIT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdC5wdXNoKHRoaXMuY3VycmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZvcm0gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gICAgICAgICAgICAvLyBpZiAoZm9ybSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgLy8gICAgICAgICBpZiAoZm9ybSE9bnVsbCkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZm9ybS5jbGVhcigpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgbGV0IHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogLSB0aGlzLmN1cnJlbnQub2Zmc2V0V2lkdGggKyBcInB4XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLmN1cnJlbnQsIHByb3BzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHBvcHVwLCBwcm9wcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBwb3B1cDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQ2xvc2UgYWxsIGZvcm1zXG4gICAgICAgICAqL1xuICAgICAgICBjbG9zZUFsbCAoKSB7XG5cbiAgICAgICAgICAgICQuZm4uZnVsbHBhZ2Uuc2V0QWxsb3dTY3JvbGxpbmcodHJ1ZSk7XG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLnNldEtleWJvYXJkU2Nyb2xsaW5nKHRydWUpO1xuXG4gICAgICAgICAgICBsZXQgcHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAtIHRoaXMuY3VycmVudC5vZmZzZXRXaWR0aCArIFwicHhcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMuY3VycmVudCwgcHJvcHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0Ym94LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubGlnaHRib3gsIHByb3BzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9Pnt0aGlzLmNsZWFyQWxsKCk7fSwgNTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyQWxsICgpIHtcbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyksIChmb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9ybS5jbGVhcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIE9wZW4gbG9naW4gcG9wdXBcbiAgICAgICAgICovXG4gICAgICAgIG9wZW5Mb2dpbkZvcm0gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLnNldEFsbG93U2Nyb2xsaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICQuZm4uZnVsbHBhZ2Uuc2V0S2V5Ym9hcmRTY3JvbGxpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgICBsZXQgcHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5sb2dpbl9wb3B1cCwgcHJvcHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5sb2dpbl9wb3B1cDtcblxuICAgICAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0Ym94LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLmxpZ2h0Ym94LCBwcm9wcywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXcgTWVudTtcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbiAoKSB7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgUG9wdXBcbiAgICAgKi9cbiAgICBjbGFzcyBQb3B1cCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQWRkaW5nIGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yIChwb3B1cCkge1xuICAgICAgICAgICAgdGhpcy5wb3B1cCA9IHBvcHVwO1xuICAgICAgICAgICAgcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMucG9wdXAuY2xvc2UgPSB0aGlzLmNsb3NlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLm9wZW4gPSB0aGlzLm9wZW4uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucG9wdXAuc2hvdyA9IHRoaXMuc2hvdy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuamFtcGluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hvdyAoKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnN0eWxlW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNmb3JtJyldID0gXCJyb3RhdGVYKDApXCI7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBoaWRlICgpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5wb3B1cC5zdHlsZVtNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zZm9ybScpXSA9IFwicm90YXRlWCgxODBkZWcpXCI7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwgXCJzdG9wXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xvc2UgKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuamFtcGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCBcImZpbmlzaFwiKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIHtcbiAgICAgICAgICAgICAgICByb3RhdGVYOiBcIjEyMGRlZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDUwMFxuICAgICAgICAgICAgICAgICwgYmVnaW46ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICwgY29tcGxldGU6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3BlbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5qYW1waW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5qYW1waW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIFwiZmluaXNoXCIpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge1xuICAgICAgICAgICAgICAgIHJvdGF0ZVg6IFwiMGRlZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDUwMFxuICAgICAgICAgICAgICAgICwgYmVnaW46ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICwgY29tcGxldGU6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCB7cm90YXRlWDogXCIyMGRlZ1wifSwgMTUwKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIHtyb3RhdGVYOiBcIjBkZWdcIn0sIDEyNSk7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCB7cm90YXRlWDogXCIxMGRlZ1wifSwgMjAwKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIHtyb3RhdGVYOiBcIjBkZWdcIn0sIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjoxNzVcbiAgICAgICAgICAgICAgICAsIGNvbXBsZXRlOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qYW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGp1bXAgKCkge1xuICAgICAgICAgICAgdGhpcy5qYW1waW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIFwiZmluaXNoXCIpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge3JvdGF0ZVg6IFwiMzVkZWdcIn0sIDE1MCk7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCB7cm90YXRlWDogXCIwZGVnXCJ9LCAxMjUpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge3JvdGF0ZVg6IFwiMjBkZWdcIn0sIDIwMCk7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCB7cm90YXRlWDogXCIwZGVnXCJ9LCAxNzUpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge3JvdGF0ZVg6IFwiMTVkZWdcIn0sIDI1MCk7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCB7cm90YXRlWDogXCIwZGVnXCJ9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIyNVxuICAgICAgICAgICAgICAgICwgY29tcGxldGU6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmphbXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKT0+IHJlc29sdmUoKSk7XG4gICAgfSk7XG5cbiAgICByZWFkeS50aGVuKCgpPT57XG4gICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXBfYnJvd3NlcicpLCAocG9wdXApID0+IHtcbiAgICAgICAgICAgIG5ldyBQb3B1cChwb3B1cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXBfY29tbW9uJyksIChwb3B1cCkgPT4ge1xuICAgICAgICAgICAgbmV3IFBvcHVwKHBvcHVwKTtcbiAgICAgICAgICAgIGlmIChwb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ3BvcHVwX29wZW4nKSl7XG4gICAgICAgICAgICAgICAgcG9wdXAub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzZGVzYyBDbGFzcyByZXByZXNlbnRpbmcgZm9ybSB2YWxpZGF0aW9uXG4gICAgICogQGNsYXNzXG4gICAgICovXG5cbiAgICBjbGFzcyBWYWxpZGF0aW9uIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBBZGRpbmcgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKFwibm92YWxpZGF0ZVwiLCBcIm5vdmFsaWRhdGVcIik7XG4gICAgICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMudmFsaWRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBmb3JtLnZhbGlkYXRlID0gdGhpcy52YWxpZGF0ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgZm9ybS5jbGVhciA9IHRoaXMuY2xlYXIuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHtcbiAgICAgICAgICAgICAgICBlbjoge1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJSZXF1aXJlZCBmaWVsZFwiXG4gICAgICAgICAgICAgICAgICAgICwgZW1haWw6IFwiV3JvbmcgZW1haWwgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgLCBlcXVhbDogXCJQYXNzd29yZCBmaWVsZHMgc2hvdWxkIGJlIGVxdWFsXCJcbiAgICAgICAgICAgICAgICAgICAgLCB1bmVxdWFsOiBcIkxhbmd1YWdlcyBzaG91bGRuJ3QgYmUgZXF1YWxcIlxuICAgICAgICAgICAgICAgICAgICAsIHVybDogXCJXcm9uZyB1cmwgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLCBydToge1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCLQn9C+0LvQtSDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdC+INC00LvRjyDQt9Cw0L/QvtC70L3QtdC90LjRj1wiXG4gICAgICAgICAgICAgICAgICAgICwgZW1haWw6IFwi0J/RgNC+0LLQtdGA0YzRgtC1INGE0L7RgNC80LDRgiBlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgICwgZXF1YWw6IFwi0J/QsNGA0L7Qu9C4INC00L7Qu9C20L3RiyDRgdC+0LLQv9Cw0LTQsNGC0YxcIlxuICAgICAgICAgICAgICAgICAgICAsIHVuZXF1YWw6IFwi0K/Qt9GL0LrQuCDQvdC1INC00L7Qu9C20L3RiyDRgdC+0LLQv9Cw0LTQsNGC0YxcIlxuICAgICAgICAgICAgICAgICAgICAsIHVybDogXCLQn9GA0L7QstC10YDRjNGC0LUg0YTQvtGA0LzQsNGCIFVSTFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBSZXNldCBmb3JtIGFuZCBjbGVhciBlcnJvcnNcbiAgICAgICAgICovXG4gICAgICAgIGNsZWFyICgpIHtcblxuICAgICAgICAgICAgbGV0IHNlbGVjdHMgPSAkKHRoaXMuZm9ybSkuZmluZCgnc2VsZWN0JylcbiAgICAgICAgICAgICAgICAsIGluZGV4ID0gc2VsZWN0cy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXgtLSkge1xuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHNlbGVjdHNbaW5kZXhdLnNlbGVjdDIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAkKHNlbGVjdHNbaW5kZXhdKS5zZWxlY3QyKFwidmFsXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdHNbaW5kZXhdLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChzZWxlY3RzW2luZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb25bdmFsdWVdW2Rpc2FibGVkXScpLCAob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgbGV0IGVycm9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLWVycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZhbGlkXSwgW2RhdGEtaW52YWxpZF0nKTtcblxuICAgICAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChlcnJvcnMsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChmaWVsZHMsIChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtaW52YWxpZCcpO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdmFsaWQnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlIGVycm9yIG1lc3NhZ2UgYWZ0ZXIgZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgLSBlbGVtZW50LCBhZnRlciB3aGljaCB3ZSB3aWxsIGFkZCBlcnJvciBtZXNzYWdlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIC0gZXJyb3IgbWVzc2FnZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwcGUgLSBlcnJvciB0eXBlXG4gICAgICAgICAqL1xuICAgICAgICBhZGRFcnJvcihlbGVtZW50LCBtZXNzYWdlLCB0eXBlKSB7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmZvcm0tZXJyb3JbZGF0YS10eXBlPVwiJyArIHR5cGUgKyAnXCJdJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBlcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcbiAgICAgICAgICAgIGVycm9yLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIGVycm9yLmNsYXNzTGlzdC5hZGQoJ2Zvcm0tZXJyb3InKTtcbiAgICAgICAgICAgIGVycm9yLnNldEF0dHJpYnV0ZSgnZGF0YS10eXBlJywgdHlwZSk7XG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUgZXJyb3IgbWVzc2FnZSBvZiBzb21lIHR5cGUgYWZ0ZXIgZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgLSBlbGVtZW50LCBhZnRlciB3aGljaCBlcnJvciBtZXNzYWdlIGlzXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBwZSAtIGVycm9yIHR5cGVcbiAgICAgICAgICovXG4gICAgICAgIGNsZWFyRXJyb3IoZWxlbWVudCwgdHlwZSkge1xuXG4gICAgICAgICAgICBsZXQgZXJyID0gZWxlbWVudC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWVycm9yW2RhdGEtdHlwZT1cIicgKyB0eXBlICsgJ1wiXScpO1xuICAgICAgICAgICAgaWYgKGVyciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFZhbGlkYXRlIGZvcm1cbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBzdWJtaXQgZXZlbnRcbiAgICAgICAgICogQHRvZG8gSW1wbGVtZW50IGxvZ2luIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHZhbGlkYXRlKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9IFwidW5kZWZpbmVkXCIgJiYgIWV2ZW50LmN1cnJlbnRUYXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLXJlbG9hZCcpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBuZXh0ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBlcXVhbF9maWVsZHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZXF1YWxdJyksXG4gICAgICAgICAgICAgICAgdW5lcXVhbF9maWVsZHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdW5lcXVhbF0nKSxcbiAgICAgICAgICAgICAgICByZXF1aXJlZF9maWVsZHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW3JlcXVpcmVkXScpLFxuICAgICAgICAgICAgICAgIHVybF9maWVsZHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInVybFwiXScpLFxuICAgICAgICAgICAgICAgIGVtYWlsX2ZpZWxkcyA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwiZW1haWxcIl0nKSxcbiAgICAgICAgICAgICAgICB1cmxfcmVnZXggPSBuZXcgUmVnRXhwKFwiXihodHRwfGh0dHBzfGZ0cClcXDovLyhbYS16QS1aMC05XFwuXFwtXSsoXFw6W2EtekEtWjAtOVxcLiZhbXA7JVxcJFxcLV0rKSpAKSooKDI1WzAtNV18MlswLTRdWzAtOV18WzAtMV17MX1bMC05XXsyfXxbMS05XXsxfVswLTldezF9fFsxLTldKVxcLigyNVswLTVdfDJbMC00XVswLTldfFswLTFdezF9WzAtOV17Mn18WzEtOV17MX1bMC05XXsxfXxbMS05XXwwKVxcLigyNVswLTVdfDJbMC00XVswLTldfFswLTFdezF9WzAtOV17Mn18WzEtOV17MX1bMC05XXsxfXxbMS05XXwwKVxcLigyNVswLTVdfDJbMC00XVswLTldfFswLTFdezF9WzAtOV17Mn18WzEtOV17MX1bMC05XXsxfXxbMC05XSl8KFthLXpBLVowLTlcXC1dK1xcLikqW2EtekEtWjAtOVxcLV0rXFwuKGNvbXxlZHV8Z292fGludHxtaWx8bmV0fG9yZ3xiaXp8YXJwYXxpbmZvfG5hbWV8cHJvfGFlcm98Y29vcHxtdXNldW18W2EtekEtWl17Mn0pKShcXDpbMC05XSspKigvKCR8W2EtekEtWjAtOVxcLlxcLFxcP1xcJ1xcXFxcXCsmYW1wOyVcXCQjXFw9fl9cXC1dKykpKiRcIiwgXCJpXCIpLFxuICAgICAgICAgICAgICAgIGVtYWlsX3JlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oW2EtekEtWjAtOV9cXC5cXC1dKStcXEAoKFthLXpBLVowLTlcXC1dKStcXC4pKyhbYS16QS1aMC05XXsyLDR9KSskXCIpO1xuXG4gICAgICAgICAgICAvKiBjaGVjayBlcXVhbCBmaWVsZHMgKi9cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChlcXVhbF9maWVsZHMsIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVxdWFsID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVxdWFsXCIpKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC52YWx1ZS50cmltKCkgIT0gZXF1YWwudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoZWxlbWVudCwgdGhpcy5tZXNzYWdlc1tkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdsYW5nJyldLmVxdWFsLCBcImVxdWFsXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJFcnJvcihlbGVtZW50LCBcImVxdWFsXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBjaGVjayB1bmVxdWFsIGZpZWxkcyAqL1xuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKHVuZXF1YWxfZmllbGRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB1bmVxdWFsID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVuZXF1YWxcIikpO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm9wdGlvbnNbZWxlbWVudC5zZWxlY3RlZEluZGV4XS52YWx1ZS50cmltKCkgPT0gdW5lcXVhbC5vcHRpb25zW3VuZXF1YWwuc2VsZWN0ZWRJbmRleF0udmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoZWxlbWVudCwgdGhpcy5tZXNzYWdlc1tkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdsYW5nJyldLnVuZXF1YWwsIFwidW5lcXVhbFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRXJyb3IoZWxlbWVudCwgXCJ1bmVxdWFsXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBjaGVjayByZXF1aXJlZCBmaWVsZHMgKi9cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChyZXF1aXJlZF9maWVsZHMsIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudmFsdWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoZWxlbWVudCwgdGhpcy5tZXNzYWdlc1tkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdsYW5nJyldLnJlcXVpcmVkLCBcInJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJFcnJvcihlbGVtZW50LCAncmVxdWlyZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogY2hlY2sgdXJsIGZpZWxkcyAqL1xuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKHVybF9maWVsZHMsIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKChlbGVtZW50LnZhbHVlLnRyaW0oKS5sZW5ndGggPiAwKSAmJiAodXJsX3JlZ2V4LnRlc3QoZWxlbWVudC52YWx1ZS50cmltKCkpID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihlbGVtZW50LCB0aGlzLm1lc3NhZ2VzW2RvY3VtZW50LmJvZHkucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2xhbmcnKV0udXJsLCAndXJsJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckVycm9yKGVsZW1lbnQsICd1cmwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogY2hlY2sgZW1haWwgZmllbGRzICovXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZW1haWxfZmllbGRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgoZWxlbWVudC52YWx1ZS50cmltKCkubGVuZ3RoID4gMCkgJiYgKGVtYWlsX3JlZ2V4LnRlc3QoZWxlbWVudC52YWx1ZS50cmltKCkpID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcihlbGVtZW50LCB0aGlzLm1lc3NhZ2VzW2RvY3VtZW50LmJvZHkucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2xhbmcnKV0uZW1haWwsICdlbWFpbCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJFcnJvcihlbGVtZW50LCAnZW1haWwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBsZXQgYWxsX2ZpZWxkcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVxdWFsX2ZpZWxkcykuY29uY2F0KFxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJlcXVpcmVkX2ZpZWxkcyksXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodXJsX2ZpZWxkcyksXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZW1haWxfZmllbGRzKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGFsbF9maWVsZHMsIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVyciA9IGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuZm9ybS1lcnJvcicpO1xuICAgICAgICAgICAgICAgIGlmIChlcnIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW52YWxpZCA9IGRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZShcImRhdGEtaW52YWxpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaW52YWxpZC52YWx1ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PSBcIlNFTEVDVFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHRTaWJsaW5nLnNldEF0dHJpYnV0ZU5vZGUoaW52YWxpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHRTaWJsaW5nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS12YWxpZCcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGVOb2RlKGludmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdmFsaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkID0gZG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlKFwiZGF0YS12YWxpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQudmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09IFwiU0VMRUNUXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubmV4dFNpYmxpbmcuc2V0QXR0cmlidXRlTm9kZSh2YWxpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHRTaWJsaW5nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1pbnZhbGlkJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZU5vZGUodmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtaW52YWxpZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBlcnJvcnNfY291bnQgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmZvcm1fZXJyb3InKS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoZXJyb3JzX2NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgIH0pO1xuXG4gICAgcmVhZHkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZm9ybXMsIChmb3JtKSA9PiB7XG4gICAgICAgICAgICBuZXcgVmFsaWRhdGlvbihmb3JtKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
