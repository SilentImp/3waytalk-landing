"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    /**
     * @class Popup
     */

    var Alert = (function () {
        /**
         * @description Adding events and properties
         * @constructor
         */

        function Alert(alert) {
            _classCallCheck(this, Alert);

            this.alert = alert;
            this.alert.querySelector('.alert__close').addEventListener('click', this.close.bind(this));
            this.alert.close = this.close.bind(this);
            this.alert.open = this.open.bind(this);
            this.status = false;
        }

        _createClass(Alert, [{
            key: 'close',
            value: function close() {
                var _this = this;

                if (!this.status) {
                    return;
                }
                Velocity(this.alert, "finish");
                Velocity(this.alert, {
                    translateY: 0
                }, {
                    duration: 250,
                    complete: function complete() {
                        _this.status = false;
                    }
                });
            }
        }, {
            key: 'open',
            value: function open() {
                var _this2 = this;

                if (this.status) {
                    return;
                }

                Velocity(this.alert, "finish");
                Velocity(this.alert, {
                    translateY: this.alert.offsetHeight + "px"
                }, {
                    duration: 250,
                    complete: function complete() {
                        _this2.status = true;
                    }
                });
            }
        }]);

        return Alert;
    })();

    var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
            return resolve();
        });
    });

    ready.then(function () {
        [].forEach.call(document.querySelectorAll('.alert'), function (alert) {
            new Alert(alert);
            if (alert.classList.contains('alert_open')) {
                alert.open();
            }
        });
    });
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var Contacts = (function () {
        /**
         * @description Start initialization on domload
         * @constructor
         */

        function Contacts() {
            _classCallCheck(this, Contacts);

            var ready = new Promise(function (resolve, reject) {
                if (document.readyState != "loading") return resolve();
                document.addEventListener("DOMContentLoaded", function () {
                    return resolve();
                });
            });
            ready.then(this.init.bind(this));
        }

        /**
         * @description Adding events and properties
         */

        _createClass(Contacts, [{
            key: "init",
            value: function init() {
                this.map = document.querySelector('.contact__map');
                if (this.map != null) {
                    this.map.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - document.querySelector('.contact__wrapper').offsetHeight - document.querySelector('.footer').offsetHeight - document.querySelector('.header').offsetHeight - 52 + "px";
                    window.addEventListener('resize', this.resize.bind(this));
                }
            }
        }, {
            key: "resize",
            value: function resize() {
                if (this.map != null) {
                    this.map.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - document.querySelector('.contact__wrapper').offsetHeight - document.querySelector('.footer').offsetHeight - document.querySelector('.header').offsetHeight - 52 + "px";
                }
            }
        }]);

        return Contacts;
    })();

    new Contacts();
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var Landging = (function () {
        /**
         * @description Start initialization on domload
         * @constructor
         */

        function Landging() {
            _classCallCheck(this, Landging);

            var ready = new Promise(function (resolve, reject) {
                if (document.readyState != "loading") return resolve();
                document.addEventListener("DOMContentLoaded", function () {
                    return resolve();
                });
            });
            ready.then(this.init.bind(this));
        }

        /**
         * @description Adding events and properties
         */

        _createClass(Landging, [{
            key: "init",
            value: function init() {
                var _this = this;

                if (document.querySelector('.landing') == null) {
                    return;
                }

                this.fired = false;
                this.tablet = 1200;
                this.mobile = 750;
                this.min_height = 250;
                this.meta = document.querySelector("meta[name='viewport']");

                this.onResize();

                var header = document.querySelector('.header'),
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
                    onLeave: function onLeave(index, nextIndex, direction) {

                        if (nextIndex == 1) {
                            header.classList.toggle('header_open', false);
                            _this.hideNav();
                        } else {
                            header.classList.toggle('header_open', true);
                            _this.showNav();
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

                var active = document.querySelector('.landing__section.active');
                if (active != null) {
                    active.classList.toggle('active_moment', true);
                    active.classList.toggle('active', false);
                    setTimeout(function () {
                        active.classList.toggle('active_moment', false);
                        active.classList.toggle('active', true);
                    }, 0);
                }
            }
        }, {
            key: "onResize",
            value: function onResize() {
                if (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) > 420 && Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 500) {
                    this.meta.setAttribute("content", "width=400");
                } else {
                    this.meta.setAttribute("content", "width=device-width, initial-scale=1.0");
                }
            }
        }, {
            key: "hideNav",
            value: function hideNav() {
                var _this2 = this;

                Velocity(this.nav, "finish");
                Velocity(this.nav, {
                    opacity: 0
                }, {
                    duration: 300,
                    complete: function complete() {
                        _this2.nav.style.display = "none";
                    }
                });
            }
        }, {
            key: "showNav",
            value: function showNav() {
                var _this3 = this;

                Velocity(this.nav, "finish");
                Velocity(this.nav, {
                    opacity: 1
                }, {
                    duration: 300,
                    begin: function begin() {
                        _this3.nav.style.display = "block";
                    }
                });
            }
        }, {
            key: "hideLoader",
            value: function hideLoader() {
                this.onResize();
                if (this.fired) {
                    return;
                }
                this.fired = true;
                this.nav = document.getElementById('fp-nav');
                this.hideNav();

                [].forEach.call(document.querySelectorAll('.slide__resizable, .slide__centred'), function (resizable) {
                    resizable.setAttribute('data-height', resizable.offsetHeight);
                    resizable.setAttribute('data-width', resizable.offsetWidth);
                });

                var loader = document.querySelector('.loader__wrapper'),
                    props = {
                    opacity: 0
                },
                    options = {
                    duration: 500,
                    complete: function complete() {
                        loader.parentNode.removeChild(loader);
                    }
                };
                Velocity(loader, props, options);
            }
        }, {
            key: "recountSlides",
            value: function recountSlides() {
                var _this4 = this;

                this.onResize();

                var resizables = document.querySelectorAll('.slide__resizable'),
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
                    viewport_height = undefined,
                    viewport_width = undefined,
                    availabale_width = undefined,
                    availabale_height = undefined,
                    delta = 20,
                    cell = undefined,
                    size = undefined,
                    scale = 1,
                    scale_x = 1,
                    scale_y = 1,
                    header = undefined,
                    slide = undefined,
                    border_width = undefined,
                    delta_y = undefined,
                    tr_y = undefined,
                    tr_x = undefined,
                    element_width = undefined,
                    element_height = undefined,
                    illustration_height = undefined,
                    w_width = undefined,
                    w_height = undefined,
                    i_width = undefined,
                    del = undefined,
                    i_height = undefined;

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
                [].forEach.call(steps, function (step) {
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
                            [].forEach.call(steps, function (step) {
                                step.style[Modernizr.prefixed('transform')] = 'scale(' + Math.min(1 / scale * 0.8, 2) + ')';
                            });
                            tr_x += 30;
                        }

                        tr_x += 'px';
                        centred.style[Modernizr.prefixed('transform')] = 'translateX(' + tr_x + ') translateY(' + tr_y + ') scale(' + scale + ')';
                    }
                }

                [].forEach.call(resizables, function (resizable) {

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

                    if (viewport_width > _this4.mobile) {
                        // tablet and desktop resolution

                        availabale_height = viewport_height - header_height - delta;
                        availabale_width = viewport_width / 2 - 40;

                        scale_x = availabale_height / element_height;
                        scale_y = availabale_width / element_width;
                        scale = Math.min(scale_x, scale_y);

                        if (availabale_height < _this4.min_height) {

                            slide.classList.add('slide_hide-resizable');
                        } else if (scale < 1) {

                            slide.classList.remove('slide_hide-resizable');
                            resizable.style[Modernizr.prefixed('transform')] = 'scale(' + scale + ')';

                            if (slide.classList.contains('slide_right')) {
                                border_width = parseInt(resizable.getAttribute('data-width'), 10) * scale;
                                header.style.borderLeftWidth = border_width + 'px';

                                if (viewport_width > _this4.tablet) {
                                    // tablet resolution
                                    resizable.style.marginRight = header.offsetWidth / 2 - border_width + 'px';
                                }
                            } else {
                                border_width = parseInt(resizable.getAttribute('data-width'), 10) * scale;
                                header.style.borderRightWidth = border_width + 'px';

                                if (viewport_width > _this4.tablet) {
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
        }, {
            key: "scrollToTop",
            value: function scrollToTop(event) {
                event.preventDefault();
                $.fn.fullpage.moveTo(1, 0);
            }
        }]);

        return Landging;
    })();

    new Landging();
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    window.mobileAndTabletcheck = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    window.isMobile = {
        Android: function Android() {
            return (/Android/i.test(navigator.userAgent)
            );
        },
        BlackBerry: function BlackBerry() {
            return (/BlackBerry/i.test(navigator.userAgent)
            );
        },
        iOS: function iOS() {
            return (/iPhone|iPad|iPod/i.test(navigator.userAgent)
            );
        },
        Windows: function Windows() {
            return (/IEMobile/i.test(navigator.userAgent)
            );
        },
        any: function any() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows();
        }
    };

    var Layout = (function () {
        /**
         * @description Start initialization on domload
         * @constructor
         */

        function Layout() {
            _classCallCheck(this, Layout);

            var ready = new Promise(function (resolve, reject) {
                if (document.readyState != "loading") return resolve();
                document.addEventListener("DOMContentLoaded", function () {
                    return resolve();
                });
            });
            ready.then(this.init.bind(this));
        }

        /**
         * @description Adding events and properties
         */

        _createClass(Layout, [{
            key: "init",
            value: function init() {
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
        }]);

        return Layout;
    })();

    new Layout();
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var Menu = (function () {
        /**
         * @description Start initialization on domload
         * @constructor
         */

        function Menu() {
            _classCallCheck(this, Menu);

            var ready = new Promise(function (resolve, reject) {
                if (document.readyState != "loading") return resolve();
                document.addEventListener("DOMContentLoaded", function () {
                    return resolve();
                });
            });
            ready.then(this.init.bind(this));
        }

        /**
         * @description Adding events and properties
         */

        _createClass(Menu, [{
            key: "init",
            value: function init() {
                var _this = this;

                if (document.querySelector('.login') == null) {
                    return;
                }

                var back_buttons = document.querySelectorAll('.login__back'),
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

                [].forEach.call(document.querySelectorAll('.login'), function (element) {
                    element.style.visibility = "visible";
                });

                [].forEach.call(mobile_popup_buttons, function (button) {
                    button.addEventListener('click', _this.openMobilePopup.bind(_this));
                });

                [].forEach.call(back_buttons, function (button) {
                    button.addEventListener('click', _this.goback.bind(_this));
                });

                [].forEach.call(login_buttons, function (button) {
                    button.addEventListener('click', _this.openLoginInner.bind(_this));
                });

                this.WebRTCSupport = !document.documentElement.classList.contains('no-peerconnection');

                if (!this.WebRTCSupport) {

                    [].forEach.call(document.querySelectorAll('form.login__form input, form.login__form button, form.login__form select'), function (element) {
                        element.setAttribute("disabled", "disabled");
                    });

                    [].forEach.call(document.documentElement.querySelectorAll('form.login__form'), function (form) {
                        form.addEventListener("click", function (event) {
                            form.closest('.login').querySelector('.popup_browser').open();
                        });
                    });

                    [].forEach.call(document.querySelectorAll('.popup_browser'), function (popup) {
                        _this.showPopup(popup);
                    });
                }
            }
        }, {
            key: "changeFromLanguage",
            value: function changeFromLanguage() {
                var value_from = this.language_from.value,
                    value_to = this.language_to.value;

                if (value_from === value_to) {
                    this.language_to.selectedIndex = 0;
                    $(this.language_to).select2("val", "");
                }

                [].forEach.call(this.language_to.querySelectorAll('option[value][disabled]'), function (to_enable) {
                    to_enable.removeAttribute('disabled');
                });

                [].forEach.call(this.language_to.querySelectorAll('option[value="' + value_from + '"]'), function (to_disable) {
                    to_disable.setAttribute('disabled', 'disabled');
                });

                // inefficient, but it look lite there are no other way correctly disable/enable select2 dynamically
                $(this.language_to).select2();
            }
        }, {
            key: "openNext",
            value: function openNext(event) {
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
        }, {
            key: "reposPopup",
            value: function reposPopup(event) {
                if (!this.menu_popup_open) {
                    return;
                }
                this.mobile_popup.style[Modernizr.prefixed('transform')] = "translateY(" + this.mobile_popup.offsetHeight + "px)";
            }
        }, {
            key: "closeMobilePopup",
            value: function closeMobilePopup() {
                var _this2 = this;

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
                    begin: function begin() {
                        _this2.mobile_popup_button.style.display = "block";
                    }
                });
            }
        }, {
            key: "openMobilePopup",
            value: function openMobilePopup() {
                var _this3 = this;

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
                    complete: function complete() {
                        _this3.mobile_popup_button.style.display = "none";
                    }
                });
            }
        }, {
            key: "showPopup",
            value: function showPopup(popup) {
                if (popup.show != undefined) {
                    popup.show();
                } else {
                    setTimeout(this.showPopup.bind(this, popup), 50);
                }
            }

            /**
             * @description Scroll to first slide and open login form
             */

        }, {
            key: "openLoginOuter",
            value: function openLoginOuter(event) {
                var _this4 = this;

                event.preventDefault();
                $.fn.fullpage.moveTo(1, 0);
                setTimeout(function () {
                    _this4.login_button.click();
                }, 800);
            }

            /**
             * @description Scroll to first slide and open register form
             */

        }, {
            key: "openRegisterOuter",
            value: function openRegisterOuter(event) {
                var _this5 = this;

                event.preventDefault();
                $.fn.fullpage.moveTo(1, 0);
                setTimeout(function () {
                    _this5.register_button.click();
                }, 800);
            }

            /**
             * @description Send registration data and show message
             */

        }, {
            key: "sendData",
            value: function sendData(event) {
                var _this6 = this;

                event.preventDefault();
                var form = event.currentTarget;

                if (form.validate() == false) {
                    return;
                }

                try {
                    (function () {
                        var DONE = 4,
                            OK = 200,
                            after_action = undefined,
                            xhr = new XMLHttpRequest(),
                            loaded = undefined,
                            index = undefined,
                            data = new FormData(form);

                        if (_this6.step1_data != null) {
                            data.append('from', _this6.step1_data.from);
                            data.append('to', _this6.step1_data.to);
                            data.append('location', _this6.step1_data.location);
                            _this6.step1_data = null;
                        }

                        loaded = new Promise(function (resolve, reject) {
                            xhr.open('POST', form.getAttribute('action'));
                            xhr.send(data);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === DONE) {
                                    setTimeout(function () {
                                        _this6.clearAll();
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
                            after_action = _this6.redirectTo.bind(_this6, form.getAttribute('data-success'));
                        } else if (form.hasAttribute('data-check')) {
                            after_action = _this6.showCheckMessage.bind(_this6);
                        } else {
                            after_action = _this6.showSuccessMessage.bind(_this6);
                        }

                        loaded.then(after_action).catch(_this6.showErrorMessage.bind(_this6));
                        // loaded.then(after_action).catch(after_action);

                        _this6.step1Data = null;
                    })();
                } catch (err) {
                    console.log('error: ', err);
                }
            }

            /**
             * @description Redirect to url
             */

        }, {
            key: "redirectTo",
            value: function redirectTo(url) {
                document.location.href = url;
            }

            /**
             * @description Show check email message
             */

        }, {
            key: "showCheckMessage",
            value: function showCheckMessage() {
                this.openForm(this.email);
            }

            /**
             * @description Show success message
             */

        }, {
            key: "showSuccessMessage",
            value: function showSuccessMessage() {
                this.last = new Array();
                this.openForm(this.success);
            }

            /**
             * @description Open login
             */

        }, {
            key: "openLoginInner",
            value: function openLoginInner() {
                this.openForm(this.login_popup);
            }

            /**
             * @description Show message
             */

        }, {
            key: "showErrorMessage",
            value: function showErrorMessage(reason) {
                this.last = new Array();
                console.log(reason.code, 'Responce status code: ' + reason.code + '. ' + reason.message + '.');
                this.error_message.open();
            }

            /**
             * @description Open last page
             */

        }, {
            key: "goback",
            value: function goback() {
                this.openForm();
            }

            /**
             * @description Show email sent warning
             */

        }, {
            key: "emailHaveSend",
            value: function emailHaveSend() {
                this.last = new Array();
                this.openForm(this.email);
            }

            /**
             * @description Open register form
             */

        }, {
            key: "openRegisterInner",
            value: function openRegisterInner() {
                this.openForm(this.step1);
            }

            /**
             * @description Open register form
             */

        }, {
            key: "openRegister",
            value: function openRegister() {
                var _this7 = this;

                $.fn.fullpage.setAllowScrolling(false);
                $.fn.fullpage.setKeyboardScrolling(false);

                var props = {
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
                    begin: function begin() {
                        _this7.lightbox.style.display = "block";
                    },
                    duration: 250
                };

                Velocity(this.lightbox, props, options);
            }

            /**
             * @description Open recovery forms
             */

        }, {
            key: "openRecovery",
            value: function openRecovery(event) {
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

        }, {
            key: "openForm",
            value: function openForm(popup, dont_save) {
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

                var props = {
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

        }, {
            key: "closeAll",
            value: function closeAll() {
                var _this8 = this;

                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);

                var props = {
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
                    complete: function complete() {
                        _this8.lightbox.style.display = "none";
                    },
                    duration: 250
                };

                Velocity(this.lightbox, props, options);
                setTimeout(function () {
                    _this8.clearAll();
                }, 500);
            }
        }, {
            key: "clearAll",
            value: function clearAll() {
                [].forEach.call(document.querySelectorAll('form'), function (form) {
                    form.clear();
                });
            }

            /**
             * @description Open login popup
             */

        }, {
            key: "openLoginForm",
            value: function openLoginForm(event) {
                var _this9 = this;

                event.preventDefault();

                $.fn.fullpage.setAllowScrolling(false);
                $.fn.fullpage.setKeyboardScrolling(false);

                var props = {
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
                    begin: function begin() {
                        _this9.lightbox.style.display = "block";
                    },
                    duration: 250
                };

                Velocity(this.lightbox, props, options);
            }
        }]);

        return Menu;
    })();

    new Menu();
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    /**
     * @class Popup
     */

    var Popup = (function () {
        /**
         * @description Adding events and properties
         * @constructor
         */

        function Popup(popup) {
            _classCallCheck(this, Popup);

            this.popup = popup;
            popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
            this.popup.close = this.close.bind(this);
            this.popup.open = this.open.bind(this);
            this.popup.show = this.show.bind(this);
            this.status = false;
            this.jamping = false;
        }

        _createClass(Popup, [{
            key: 'show',
            value: function show() {
                this.popup.style.display = "block";
                this.popup.style[Modernizr.prefixed('transform')] = "rotateX(0)";
                this.status = true;
            }
        }, {
            key: 'hide',
            value: function hide() {
                this.popup.style.display = "none";
                this.popup.style[Modernizr.prefixed('transform')] = "rotateX(180deg)";
                this.status = false;
                Velocity(this.popup, "stop");
            }
        }, {
            key: 'close',
            value: function close() {
                var _this = this;

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
                    begin: function begin() {
                        _this.popup.style.display = "block";
                    },
                    complete: function complete() {
                        _this.status = false;
                    }
                });
            }
        }, {
            key: 'open',
            value: function open() {
                var _this2 = this;

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
                    begin: function begin() {
                        _this2.popup.style.display = "block";
                    },
                    complete: function complete() {
                        _this2.status = true;
                    }
                });
                Velocity(this.popup, { rotateX: "20deg" }, 150);
                Velocity(this.popup, { rotateX: "0deg" }, 125);
                Velocity(this.popup, { rotateX: "10deg" }, 200);
                Velocity(this.popup, { rotateX: "0deg" }, {
                    duration: 175,
                    complete: function complete() {
                        _this2.jamping = false;
                    }
                });
            }
        }, {
            key: 'jump',
            value: function jump() {
                var _this3 = this;

                this.jamping = true;
                Velocity(this.popup, "finish");
                Velocity(this.popup, { rotateX: "35deg" }, 150);
                Velocity(this.popup, { rotateX: "0deg" }, 125);
                Velocity(this.popup, { rotateX: "20deg" }, 200);
                Velocity(this.popup, { rotateX: "0deg" }, 175);
                Velocity(this.popup, { rotateX: "15deg" }, 250);
                Velocity(this.popup, { rotateX: "0deg" }, {
                    duration: 225,
                    complete: function complete() {
                        _this3.jamping = false;
                    }
                });
            }
        }]);

        return Popup;
    })();

    var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
            return resolve();
        });
    });

    ready.then(function () {
        [].forEach.call(document.querySelectorAll('.popup_browser'), function (popup) {
            new Popup(popup);
        });

        [].forEach.call(document.querySelectorAll('.popup_common'), function (popup) {
            new Popup(popup);
            if (popup.classList.contains('popup_open')) {
                popup.open();
            }
        });
    });
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    /**
     * @classdesc Class representing form validation
     * @class
     */

    var Validation = (function () {
        /**
         * @description Adding events and properties
         * @constructor
         */

        function Validation(form) {
            _classCallCheck(this, Validation);

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

        _createClass(Validation, [{
            key: "clear",
            value: function clear() {

                var selects = $(this.form).find('select'),
                    index = selects.length;
                while (index--) {

                    if (typeof selects[index].select2 != null) {
                        $(selects[index]).select2("val", "");
                    } else {
                        selects[index].selectedIndex = 0;
                    }

                    [].forEach.call(selects[index].querySelectorAll('option[value][disabled]'), function (option) {
                        option.removeAttribute('disabled');
                    });
                }

                this.form.reset();

                setTimeout(function () {
                    var errors = document.querySelectorAll('.form-error'),
                        fields = document.querySelectorAll('[data-valid], [data-invalid]');

                    [].forEach.call(errors, function (error) {
                        error.parentNode.removeChild(error);
                    });

                    [].forEach.call(fields, function (field) {
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

        }, {
            key: "addError",
            value: function addError(element, message, type) {

                if (element.parentNode.querySelector('.form-error[data-type="' + type + '"]') != null) {
                    return;
                }
                var error = document.createElement('P');
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

        }, {
            key: "clearError",
            value: function clearError(element, type) {

                var err = element.parentNode.querySelector('.form-error[data-type="' + type + '"]');
                if (err != null) {
                    element.parentNode.removeChild(err);
                }
            }

            /**
             * @description Validate form
             * @param {Event} event - submit event
             * @todo Implement login validation
             */

        }, {
            key: "validate",
            value: function validate(event) {
                var _this = this;

                if (typeof event != "undefined" && !event.currentTarget.hasAttribute('data-reload')) {
                    event.preventDefault();
                }

                var valid = true,
                    next = null,
                    equal_fields = this.form.querySelectorAll('[data-equal]'),
                    unequal_fields = this.form.querySelectorAll('[data-unequal]'),
                    required_fields = this.form.querySelectorAll('[required]'),
                    url_fields = this.form.querySelectorAll('input[type="url"]'),
                    email_fields = this.form.querySelectorAll('input[type="email"]'),
                    url_regex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$", "i"),
                    email_regex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");

                /* check equal fields */
                [].forEach.call(equal_fields, function (element) {
                    var equal = _this.form.querySelector(element.getAttribute("data-equal"));
                    if (element.value.trim() != equal.value.trim()) {
                        valid = false;
                        _this.addError(element, _this.messages[document.body.parentNode.getAttribute('lang')].equal, "equal");
                    } else {
                        _this.clearError(element, "equal");
                    }
                });

                /* check unequal fields */
                [].forEach.call(unequal_fields, function (element) {
                    var unequal = _this.form.querySelector(element.getAttribute("data-unequal"));
                    if (element.options[element.selectedIndex].value.trim() == unequal.options[unequal.selectedIndex].value.trim()) {
                        valid = false;
                        _this.addError(element, _this.messages[document.body.parentNode.getAttribute('lang')].unequal, "unequal");
                    } else {
                        _this.clearError(element, "unequal");
                    }
                });

                /* check required fields */
                [].forEach.call(required_fields, function (element) {
                    if (element.value.trim() === "") {
                        valid = false;
                        _this.addError(element, _this.messages[document.body.parentNode.getAttribute('lang')].required, "required");
                    } else {
                        _this.clearError(element, 'required');
                    }
                });

                /* check url fields */
                [].forEach.call(url_fields, function (element) {
                    if (element.value.trim().length > 0 && url_regex.test(element.value.trim()) === false) {
                        valid = false;
                        _this.addError(element, _this.messages[document.body.parentNode.getAttribute('lang')].url, 'url');
                    } else {
                        _this.clearError(element, 'url');
                    }
                });

                /* check email fields */
                [].forEach.call(email_fields, function (element) {
                    if (element.value.trim().length > 0 && email_regex.test(element.value.trim()) === false) {
                        valid = false;
                        _this.addError(element, _this.messages[document.body.parentNode.getAttribute('lang')].email, 'email');
                    } else {
                        _this.clearError(element, 'email');
                    }
                });

                var all_fields = Array.prototype.slice.call(equal_fields).concat(Array.prototype.slice.call(required_fields), Array.prototype.slice.call(url_fields), Array.prototype.slice.call(email_fields));

                [].forEach.call(all_fields, function (element) {
                    var err = element.parentNode.querySelector('.form-error');
                    if (err != null) {
                        var invalid = document.createAttribute("data-invalid");
                        invalid.value = true;

                        if (element.tagName == "SELECT") {
                            element.nextSibling.setAttributeNode(invalid);
                            element.nextSibling.removeAttribute('data-valid');
                        } else {
                            element.setAttributeNode(invalid);
                            element.removeAttribute('data-valid');
                        }
                    } else {

                        var _valid = document.createAttribute("data-valid");
                        _valid.value = true;
                        if (element.tagName == "SELECT") {
                            element.nextSibling.setAttributeNode(_valid);
                            element.nextSibling.removeAttribute('data-invalid');
                        } else {
                            element.setAttributeNode(_valid);
                            element.removeAttribute('data-invalid');
                        }
                    }
                });

                var errors_count = this.form.querySelectorAll('.form_error').length;
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
        }]);

        return Validation;
    })();

    var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
            return resolve();
        });
    });

    ready.then(function () {
        var forms = document.querySelectorAll('form');
        [].forEach.call(forms, function (form) {
            new Validation(form);
        });
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L2FsZXJ0LmpzIiwiY29udGFjdC9jb250YWN0cy5qcyIsImxhbmRpbmcvbGFuZGluZy5qcyIsImxheW91dC9sYXlvdXQuanMiLCJsb2dpbi9sb2dpbi5qcyIsInBvcHVwL3BvcHVwLmpzIiwidmFsaWRhdG9yL3ZhbGlkYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7QUFDYixDQUFDLFlBQVk7Ozs7OztRQUtILEtBQUs7Ozs7OztBQUtQLGlCQUxFLEtBQUssQ0FLTSxLQUFLLEVBQUU7a0NBTGxCLEtBQUs7O0FBTUgsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLGdCQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMzRixnQkFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsZ0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2Qjs7cUJBWEMsS0FBSzs7b0NBYUU7OztBQUNMLG9CQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNkLDJCQUFPO2lCQUNWO0FBQ0Qsd0JBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLHdCQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNqQiw4QkFBVSxFQUFFLENBQUM7aUJBQ2hCLEVBQUU7QUFDQyw0QkFBUSxFQUFFLEdBQUc7QUFDWCw0QkFBUSxFQUFFLG9CQUFLO0FBQ2IsOEJB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QUFDO3lCQUMzQztxQkFDSjtpQkFDSixDQUFDLENBQUM7O0FBRUgsb0JBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3BFLG9CQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7QUFDbEIseUJBQUssR0FBRyxLQUFLLENBQUM7aUJBQ2pCOztBQUVELG9CQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7QUFDakIsd0JBQUksT0FBTyxLQUFLLElBQUksV0FBVyxFQUFFO0FBQzdCLDZCQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7cUJBQzFCO2lCQUNKOztBQUVELHVCQUFPLEtBQUssQ0FBQzthQUVoQjs7O2VBM05DLFVBQVU7OztBQStOaEIsUUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQ3pDLFlBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUUsT0FBTyxPQUFPLEVBQUUsQ0FBQztBQUN2RCxnQkFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO21CQUFNLE9BQU8sRUFBRTtTQUFBLENBQUMsQ0FBQztLQUNsRSxDQUFDLENBQUM7O0FBRUgsU0FBSyxDQUFDLElBQUksQ0FBQyxZQUFXO0FBQ2xCLFlBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxVQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJLEVBQUs7QUFDN0IsZ0JBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCLENBQUMsQ0FBQztLQUNOLENBQUMsQ0FBQztDQUVOLENBQUEsRUFBRyxDQUFDIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbiAoKSB7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgUG9wdXBcbiAgICAgKi9cbiAgICBjbGFzcyBBbGVydCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQWRkaW5nIGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yIChhbGVydCkge1xuICAgICAgICAgICAgdGhpcy5hbGVydCA9IGFsZXJ0O1xuICAgICAgICAgICAgdGhpcy5hbGVydC5xdWVyeVNlbGVjdG9yKCcuYWxlcnRfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5hbGVydC5jbG9zZSA9IHRoaXMuY2xvc2UuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuYWxlcnQub3BlbiA9IHRoaXMub3Blbi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsb3NlICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLmFsZXJ0LCBcImZpbmlzaFwiKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMuYWxlcnQsIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVZOiAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgICwgY29tcGxldGU6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3BlbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMuYWxlcnQsIFwiZmluaXNoXCIpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5hbGVydCwge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHRoaXMuYWxlcnQub2Zmc2V0SGVpZ2h0ICsgXCJweFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgICwgY29tcGxldGU6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCk9PiByZXNvbHZlKCkpO1xuICAgIH0pO1xuXG4gICAgcmVhZHkudGhlbigoKT0+e1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFsZXJ0JyksIChhbGVydCkgPT4ge1xuICAgICAgICAgICAgbmV3IEFsZXJ0KGFsZXJ0KTtcbiAgICAgICAgICAgIGlmIChhbGVydC5jbGFzc0xpc3QuY29udGFpbnMoJ2FsZXJ0X29wZW4nKSl7XG4gICAgICAgICAgICAgICAgYWxlcnQub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzIENvbnRhY3RzIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTdGFydCBpbml0aWFsaXphdGlvbiBvbiBkb21sb2FkXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVhZHkudGhlbih0aGlzLmluaXQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIEFkZGluZyBldmVudHMgYW5kIHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIGluaXQoKSB7XG4gICAgICAgICAgICB0aGlzLm1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X19tYXAnKTtcbiAgICAgICAgICAgIGlmKHRoaXMubWFwICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5zdHlsZS5oZWlnaHQgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCkgLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9fd3JhcHBlcicpLm9mZnNldEhlaWdodCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKS5vZmZzZXRIZWlnaHQgLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykub2Zmc2V0SGVpZ2h0IC0gNTIgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzaXplICgpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubWFwICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5zdHlsZS5oZWlnaHQgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCkgLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9fd3JhcHBlcicpLm9mZnNldEhlaWdodCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKS5vZmZzZXRIZWlnaHQgLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykub2Zmc2V0SGVpZ2h0IC0gNTIgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbmV3IENvbnRhY3RzO1xufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzIExhbmRnaW5nIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTdGFydCBpbml0aWFsaXphdGlvbiBvbiBkb21sb2FkXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVhZHkudGhlbih0aGlzLmluaXQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIEFkZGluZyBldmVudHMgYW5kIHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIGluaXQoKSB7XG5cbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYW5kaW5nJykgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5maXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50YWJsZXQgPSAxMjAwO1xuICAgICAgICAgICAgdGhpcy5tb2JpbGUgPSA3NTA7XG4gICAgICAgICAgICB0aGlzLm1pbl9oZWlnaHQgPSAyNTA7XG4gICAgICAgICAgICB0aGlzLm1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPSd2aWV3cG9ydCddXCIpO1xuXG4gICAgICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG5cbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJylcbiAgICAgICAgICAgICAgICAsIGNsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb2NrJylcbiAgICAgICAgICAgICAgICAsIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVfbWFpbicpO1xuXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gICAgICAgICAgICAkKFwiLmxhbmRpbmdcIikuZnVsbHBhZ2Uoe1xuICAgICAgICAgICAgICAgIHNlY3Rpb25TZWxlY3RvcjogXCIubGFuZGluZ19fc2VjdGlvblwiLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgc2Nyb2xsaW5nU3BlZWQ6IDM1MCxcbiAgICAgICAgICAgICAgICBhZnRlckxvYWQ6IHRoaXMuaGlkZUxvYWRlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIGFmdGVyUmVuZGVyOiB0aGlzLnJlY291bnRTbGlkZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBhZnRlclJlc2l6ZTogdGhpcy5yZWNvdW50U2xpZGVzLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgb25MZWF2ZTogKGluZGV4LCBuZXh0SW5kZXgsIGRpcmVjdGlvbikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9vcGVuJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlTmF2KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX29wZW4nLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdigpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRJbmRleCA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9jay5jbGFzc0xpc3QudG9nZ2xlKCdjbG9ja192aXNpYmxlJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9jay5jbGFzc0xpc3QudG9nZ2xlKCdjbG9ja192aXNpYmxlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3Rlcl9fdG9wXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNjcm9sbFRvVG9wLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYW5kaW5nX19zZWN0aW9uLmFjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZV9tb21lbnQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZV9tb21lbnQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgb25SZXNpemUgKCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCkgPiA0MjAgKVxuICAgICAgICAgICAgICAgICYmIChNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApIDwgNTAwKVxuICAgICAgICAgICAgKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGEuc2V0QXR0cmlidXRlKFwiY29udGVudFwiLCBcIndpZHRoPTQwMFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRhLnNldEF0dHJpYnV0ZShcImNvbnRlbnRcIiwgXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaGlkZU5hdiAoKSB7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLm5hdiwgXCJmaW5pc2hcIik7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLm5hdiwge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwXG4gICAgICAgICAgICAgICAgLCBjb21wbGV0ZTogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dOYXYgKCkge1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5uYXYsIFwiZmluaXNoXCIpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5uYXYsIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMFxuICAgICAgICAgICAgICAgICwgYmVnaW46ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaGlkZUxvYWRlcigpIHtcbiAgICAgICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpcmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcC1uYXYnKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZU5hdigpO1xuXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlX19yZXNpemFibGUsIC5zbGlkZV9fY2VudHJlZCcpLCAocmVzaXphYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzaXphYmxlLnNldEF0dHJpYnV0ZSgnZGF0YS1oZWlnaHQnLCByZXNpemFibGUub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICByZXNpemFibGUuc2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJywgcmVzaXphYmxlLm9mZnNldFdpZHRoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcl9fd3JhcHBlcicpLFxuICAgICAgICAgICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFZlbG9jaXR5KGxvYWRlciwgcHJvcHMsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cblxuICAgICAgICByZWNvdW50U2xpZGVzKCkge1xuXG4gICAgICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG5cbiAgICAgICAgICAgIGxldCByZXNpemFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlX19yZXNpemFibGUnKVxuICAgICAgICAgICAgICAgICwgY2VudHJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZV9fY2VudHJlZCcpXG4gICAgICAgICAgICAgICAgLCBzdGVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGVwc19fc3RlcCcpXG4gICAgICAgICAgICAgICAgLCBzZXJ2aWNlX3NsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlX3NlcnZpY2UnKVxuICAgICAgICAgICAgICAgICwgc2VydmljZV9pbGx1c3RyYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVfX2lsbHVzdHJhdGlvbicpXG4gICAgICAgICAgICAgICAgLCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlX21haW4nKVxuICAgICAgICAgICAgICAgICwgc2hlbWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hlbWEnKVxuICAgICAgICAgICAgICAgICwgaGVhZGVyX2hlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICAsIGZvb3Rlcl9oZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyJykub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICAgICAgLCBzaGVtYV9kZXRhaWxzID0gc2hlbWEuY2xvc2VzdCgnLnNsaWRlX19kZXRhaWxzJylcbiAgICAgICAgICAgICAgICAsIHBob25lcyA9IG1haW4ucXVlcnlTZWxlY3RvcignLnNsaWRlX19waG9uZXMnKVxuICAgICAgICAgICAgICAgICwgcGhvbmUgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZV9fcGhvbmUnKVxuICAgICAgICAgICAgICAgICwgdmlld3BvcnRfaGVpZ2h0XG4gICAgICAgICAgICAgICAgLCB2aWV3cG9ydF93aWR0aFxuICAgICAgICAgICAgICAgICwgYXZhaWxhYmFsZV93aWR0aFxuICAgICAgICAgICAgICAgICwgYXZhaWxhYmFsZV9oZWlnaHRcbiAgICAgICAgICAgICAgICAsIGRlbHRhID0gMjBcbiAgICAgICAgICAgICAgICAsIGNlbGxcbiAgICAgICAgICAgICAgICAsIHNpemVcbiAgICAgICAgICAgICAgICAsIHNjYWxlID0gMVxuICAgICAgICAgICAgICAgICwgc2NhbGVfeCA9IDFcbiAgICAgICAgICAgICAgICAsIHNjYWxlX3kgPSAxXG4gICAgICAgICAgICAgICAgLCBoZWFkZXJcbiAgICAgICAgICAgICAgICAsIHNsaWRlXG4gICAgICAgICAgICAgICAgLCBib3JkZXJfd2lkdGhcbiAgICAgICAgICAgICAgICAsIGRlbHRhX3lcbiAgICAgICAgICAgICAgICAsIHRyX3lcbiAgICAgICAgICAgICAgICAsIHRyX3hcbiAgICAgICAgICAgICAgICAsIGVsZW1lbnRfd2lkdGhcbiAgICAgICAgICAgICAgICAsIGVsZW1lbnRfaGVpZ2h0XG4gICAgICAgICAgICAgICAgLCBpbGx1c3RyYXRpb25faGVpZ2h0XG4gICAgICAgICAgICAgICAgLCB3X3dpZHRoXG4gICAgICAgICAgICAgICAgLCB3X2hlaWdodFxuICAgICAgICAgICAgICAgICwgaV93aWR0aFxuICAgICAgICAgICAgICAgICwgZGVsXG4gICAgICAgICAgICAgICAgLCBpX2hlaWdodDtcblxuICAgICAgICAgICAgY2VsbCA9IG1haW4ucXVlcnlTZWxlY3RvcignLmZwLXRhYmxlQ2VsbCcpO1xuICAgICAgICAgICAgdmlld3BvcnRfaGVpZ2h0ID0gTWF0aC5taW4oY2VsbC5vZmZzZXRIZWlnaHQsIHBhcnNlSW50KGNlbGwuc3R5bGUuaGVpZ2h0LCAxMCkpO1xuICAgICAgICAgICAgdmlld3BvcnRfd2lkdGggPSBjZWxsLm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICBoZWFkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZV9faGVhZGVyJyk7XG4gICAgICAgICAgICBtYWluLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCJhdXRvIFwiICsgdmlld3BvcnRfaGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgICAgICAgICBpZiAodmlld3BvcnRfd2lkdGggPiA3NTApIHtcbiAgICAgICAgICAgICAgICBkZWwgPSAwO1xuICAgICAgICAgICAgICAgIHNpemUgPSA1NTA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbCA9IDEwMDtcbiAgICAgICAgICAgICAgICBzaXplID0gNDgwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmFsZV9oZWlnaHQgPSB2aWV3cG9ydF9oZWlnaHQgLSBkZWwgLSBoZWFkZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKGF2YWlsYWJhbGVfaGVpZ2h0ID49IDIwMClcbiAgICAgICAgICAgICAgICAmJiAodmlld3BvcnRfd2lkdGggPiA3NTApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBwaG9uZXMuc3R5bGUuaGVpZ2h0ID0gTWF0aC5taW4oYXZhaWxhYmFsZV9oZWlnaHQsIHNpemUpICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHBob25lcy5zdHlsZS5tYXJnaW5MZWZ0ID0gLU1hdGgubWluKGF2YWlsYWJhbGVfaGVpZ2h0LCBzaXplKSowLjEgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgcGhvbmVzLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXZhaWxhYmFsZV9oZWlnaHQgPCAyMDAgKSB7XG4gICAgICAgICAgICAgICAgcGhvbmVzLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwaG9uZXMucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmICh2aWV3cG9ydF93aWR0aCA8PSA3NTApIHtcbiAgICAgICAgICAgICAgICBwaG9uZS5zdHlsZS5oZWlnaHQgPSBhdmFpbGFiYWxlX2hlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2VsbCA9IHNlcnZpY2Vfc2xpZGUucXVlcnlTZWxlY3RvcignLmZwLXRhYmxlQ2VsbCcpO1xuICAgICAgICAgICAgdmlld3BvcnRfaGVpZ2h0ID0gTWF0aC5taW4oY2VsbC5vZmZzZXRIZWlnaHQsIHBhcnNlSW50KGNlbGwuc3R5bGUuaGVpZ2h0LCAxMCkpO1xuICAgICAgICAgICAgdmlld3BvcnRfd2lkdGggPSBjZWxsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgaGVhZGVyID0gc2VydmljZV9zbGlkZS5xdWVyeVNlbGVjdG9yKCcuc2xpZGVfX2hlYWRlcicpO1xuICAgICAgICAgICAgaWxsdXN0cmF0aW9uX2hlaWdodCA9IChNYXRoLm1pbihjZWxsLm9mZnNldEhlaWdodCwgcGFyc2VJbnQoY2VsbC5zdHlsZS5oZWlnaHQsIDEwKSkgLSBoZWFkZXIub2Zmc2V0SGVpZ2h0IC0gZm9vdGVyX2hlaWdodCAtIGhlYWRlcl9oZWlnaHQpO1xuICAgICAgICAgICAgc2VydmljZV9pbGx1c3RyYXRpb24uc3R5bGUuaGVpZ2h0ID0gaWxsdXN0cmF0aW9uX2hlaWdodCArIFwicHhcIjtcblxuICAgICAgICAgICAgd193aWR0aCA9IDcwMDtcbiAgICAgICAgICAgIHdfaGVpZ2h0ID0gNTcwO1xuICAgICAgICAgICAgaV93aWR0aCA9IHZpZXdwb3J0X3dpZHRoKjEuMjtcbiAgICAgICAgICAgIGlfaGVpZ2h0ID0gd19oZWlnaHQqaV93aWR0aC93X3dpZHRoO1xuXG4gICAgICAgICAgICBpZiAoaV9oZWlnaHQgPCBpbGx1c3RyYXRpb25faGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgc2VydmljZV9pbGx1c3RyYXRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnc2xpZGVfX2lsbHVzdHJhdGlvbl9oaWRkZW4nLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VydmljZV9pbGx1c3RyYXRpb24uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gXCI1MCUgMTAwJVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbGx1c3RyYXRpb25faGVpZ2h0IDwgMzcwKSB7XG4gICAgICAgICAgICAgICAgc2VydmljZV9pbGx1c3RyYXRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnc2xpZGVfX2lsbHVzdHJhdGlvbl9oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VydmljZV9pbGx1c3RyYXRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnc2xpZGVfX2lsbHVzdHJhdGlvbl9oaWRkZW4nLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VydmljZV9pbGx1c3RyYXRpb24uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gXCI1MCUgMFwiO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vIENlbnRyZWQgc3R5bGVcblxuICAgICAgICAgICAgLy8g0KfQuNGB0YLQuNC8INCy0YHQtSDRgdGC0LjQu9C4INC/0YDQuNCy0L3QtdGB0LXQvdC90YvQtVxuICAgICAgICAgICAgY2VudHJlZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoc3RlcHMsIChzdGVwKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RlcC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKSA+IDQ4MCApIHtcblxuICAgICAgICAgICAgICAgIHNsaWRlID0gY2VudHJlZC5jbG9zZXN0KCcuc2xpZGUnKTtcbiAgICAgICAgICAgICAgICBjZWxsID0gY2VudHJlZC5jbG9zZXN0KCcuZnAtdGFibGVDZWxsJyk7XG4gICAgICAgICAgICAgICAgdmlld3BvcnRfaGVpZ2h0ID0gTWF0aC5taW4oY2VsbC5vZmZzZXRIZWlnaHQsIHBhcnNlSW50KGNlbGwuc3R5bGUuaGVpZ2h0LCAxMCkpO1xuICAgICAgICAgICAgICAgIHZpZXdwb3J0X3dpZHRoID0gY2VsbC5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnRfaGVpZ2h0ID0gcGFyc2VJbnQoY2VudHJlZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JyksMTApO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdwb3J0X3dpZHRoID4gMTIyMCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlc2t0b3BcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF93aWR0aCA9IDEyMzA7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhX3kgPSAxNzA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodmlld3BvcnRfd2lkdGggPiA3NTApICYmICh2aWV3cG9ydF93aWR0aCA8PSAxMjIwKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0YWJsZXRcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudF93aWR0aCA9IDEwNTA7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhX3kgPSAxNzA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9iaWxlXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfd2lkdGggPSA0MDA7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRfaGVpZ2h0ID0gOTAwO1xuICAgICAgICAgICAgICAgICAgICBkZWx0YV95ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhdmFpbGFiYWxlX2hlaWdodCA9IHZpZXdwb3J0X2hlaWdodCAtIGhlYWRlcl9oZWlnaHQ7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmFsZV93aWR0aCA9IHZpZXdwb3J0X3dpZHRoIC0gNDA7XG5cbiAgICAgICAgICAgICAgICBzY2FsZV94ID0gYXZhaWxhYmFsZV9oZWlnaHQvZWxlbWVudF9oZWlnaHQ7XG4gICAgICAgICAgICAgICAgc2NhbGVfeSA9IGF2YWlsYWJhbGVfd2lkdGgvZWxlbWVudF93aWR0aDtcbiAgICAgICAgICAgICAgICBzY2FsZSA9IE1hdGgubWluKE1hdGgubWluKHNjYWxlX3gsIHNjYWxlX3kpLDEpO1xuXG4gICAgICAgICAgICAgICAgdHJfeSA9IDA7XG4gICAgICAgICAgICAgICAgdHJfeCA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodmlld3BvcnRfd2lkdGggPCA3NTApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9iaWxlXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlID0gYXZhaWxhYmFsZV9oZWlnaHQvNjIwO1xuICAgICAgICAgICAgICAgICAgICBjZW50cmVkLnN0eWxlW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNmb3JtJyldID0gJ3RyYW5zbGF0ZVgoLTUwJSkgc2NhbGUoJyArIHNjYWxlICsgJyknO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90IG1vYmlsZVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdmFpbGFiYWxlX3dpZHRoIDwgZWxlbWVudF93aWR0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyX3ggPSAtKGVsZW1lbnRfd2lkdGggLSB2aWV3cG9ydF93aWR0aCkvMiA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyB1cHNjYWxlIHRleHRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlPDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChzdGVwcywgKHN0ZXApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwLnN0eWxlW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNmb3JtJyldID0gJ3NjYWxlKCcgKyBNYXRoLm1pbigoMS9zY2FsZSkqMC44LCAyKSArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJfeCArPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRyX3ggKz0gJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgY2VudHJlZC5zdHlsZVtNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zZm9ybScpXSA9ICd0cmFuc2xhdGVYKCcgKyB0cl94ICsgJykgdHJhbnNsYXRlWSgnICsgdHJfeSArICcpIHNjYWxlKCcgKyBzY2FsZSArICcpJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwocmVzaXphYmxlcywgKHJlc2l6YWJsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgc2xpZGUgPSByZXNpemFibGUuY2xvc2VzdCgnLnNsaWRlJyk7XG4gICAgICAgICAgICAgICAgaGVhZGVyID0gcmVzaXphYmxlLmNsb3Nlc3QoJy5zbGlkZV9fZGV0YWlscycpLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZV9faGVhZGVyJyk7XG4gICAgICAgICAgICAgICAgY2VsbCA9IHJlc2l6YWJsZS5jbG9zZXN0KCcuZnAtdGFibGVDZWxsJyk7XG5cbiAgICAgICAgICAgICAgICB2aWV3cG9ydF9oZWlnaHQgPSBNYXRoLm1pbihjZWxsLm9mZnNldEhlaWdodCwgcGFyc2VJbnQoY2VsbC5zdHlsZS5oZWlnaHQsIDEwKSk7XG4gICAgICAgICAgICAgICAgdmlld3BvcnRfd2lkdGggPSBjZWxsLm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudF9oZWlnaHQgPSBwYXJzZUludChyZXNpemFibGUuZ2V0QXR0cmlidXRlKCdkYXRhLWhlaWdodCcpLDEwKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50X3dpZHRoID0gcGFyc2VJbnQocmVzaXphYmxlLmdldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcpLDEwKTtcblxuICAgICAgICAgICAgICAgIHNjYWxlX3ggPSBhdmFpbGFiYWxlX2hlaWdodC9lbGVtZW50X2hlaWdodDtcbiAgICAgICAgICAgICAgICBzY2FsZV95ID0gYXZhaWxhYmFsZV93aWR0aC9lbGVtZW50X3dpZHRoO1xuICAgICAgICAgICAgICAgIHNjYWxlID0gTWF0aC5taW4oc2NhbGVfeCwgc2NhbGVfeSk7XG5cblxuICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydF93aWR0aCA+IHRoaXMubW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRhYmxldCBhbmQgZGVza3RvcCByZXNvbHV0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmFsZV9oZWlnaHQgPSB2aWV3cG9ydF9oZWlnaHQgLSBoZWFkZXJfaGVpZ2h0IC0gZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsYWJhbGVfd2lkdGggPSB2aWV3cG9ydF93aWR0aC8yIC0gNDA7XG5cbiAgICAgICAgICAgICAgICAgICAgc2NhbGVfeCA9IGF2YWlsYWJhbGVfaGVpZ2h0L2VsZW1lbnRfaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBzY2FsZV95ID0gYXZhaWxhYmFsZV93aWR0aC9lbGVtZW50X3dpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IE1hdGgubWluKHNjYWxlX3gsIHNjYWxlX3kpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCBhdmFpbGFiYWxlX2hlaWdodCA8IHRoaXMubWluX2hlaWdodCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnc2xpZGVfaGlkZS1yZXNpemFibGUnKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBzY2FsZSA8IDEgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlX2hpZGUtcmVzaXphYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGUuc3R5bGVbTW9kZXJuaXpyLnByZWZpeGVkKCd0cmFuc2Zvcm0nKV0gPSAnc2NhbGUoJyArIHNjYWxlICsgJyknO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGlkZV9yaWdodCcpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJfd2lkdGggPSAocGFyc2VJbnQocmVzaXphYmxlLmdldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcpLDEwKSkqc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLnN0eWxlLmJvcmRlckxlZnRXaWR0aCA9IGJvcmRlcl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlld3BvcnRfd2lkdGggPiB0aGlzLnRhYmxldCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFibGV0IHJlc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlLnN0eWxlLm1hcmdpblJpZ2h0ID0gKGhlYWRlci5vZmZzZXRXaWR0aC8yIC0gYm9yZGVyX3dpZHRoKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcl93aWR0aCA9IChwYXJzZUludChyZXNpemFibGUuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJyksMTApKSpzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aCA9IGJvcmRlcl93aWR0aCArICdweCc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlld3BvcnRfd2lkdGggPiB0aGlzLnRhYmxldCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFibGV0IHJlc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlLnN0eWxlLm1hcmdpbkxlZnQgPSAoaGVhZGVyLm9mZnNldFdpZHRoLzIgLSBib3JkZXJfd2lkdGgpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlX2hpZGUtcmVzaXphYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGUucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9iaWxlIHJlc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmFsZV9oZWlnaHQgPSB2aWV3cG9ydF9oZWlnaHQgLSBoZWFkZXJfaGVpZ2h0IC0gaGVhZGVyLm9mZnNldEhlaWdodCAtIDYwO1xuICAgICAgICAgICAgICAgICAgICBhdmFpbGFiYWxlX3dpZHRoID0gdmlld3BvcnRfd2lkdGggLSA0MDtcblxuICAgICAgICAgICAgICAgICAgICBzY2FsZV94ID0gYXZhaWxhYmFsZV9oZWlnaHQvZWxlbWVudF9oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlX3kgPSBhdmFpbGFiYWxlX3dpZHRoL2VsZW1lbnRfd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlID0gTWF0aC5taW4oc2NhbGVfeCwgc2NhbGVfeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJhbGVfd2lkdGggPCBlbGVtZW50X3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGUuc3R5bGUubWFyZ2luTGVmdCA9IC0gKCgoZWxlbWVudF93aWR0aCAtIGF2YWlsYWJhbGVfd2lkdGgpLzIpIC0gMjApICsgXCJweFwiXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGUuc3R5bGUubWFyZ2luTGVmdCA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKCBhdmFpbGFiYWxlX2hlaWdodCA8IDIwMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaWRkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCdzbGlkZV9oaWRlLXJlc2l6YWJsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHNjYWxlIDwgMSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVfaGlkZS1yZXNpemFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZS5zdHlsZVtNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zZm9ybScpXSA9ICdzY2FsZSgnICsgc2NhbGUgKyAnKSc7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlX2hpZGUtcmVzaXphYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemFibGUucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgc2Nyb2xsVG9Ub3AoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLm1vdmVUbygxLCAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBuZXcgTGFuZGdpbmc7XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG4gICAgd2luZG93Lm1vYmlsZUFuZFRhYmxldGNoZWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjaGVjayA9IGZhbHNlO1xuICAgICAgICAoZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgaWYgKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpIHx8IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCwgNCkpKSBjaGVjayA9IHRydWVcbiAgICAgICAgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XG4gICAgICAgIHJldHVybiBjaGVjaztcbiAgICB9O1xuXG4gICAgd2luZG93LmlzTW9iaWxlID0ge1xuICAgICAgICBBbmRyb2lkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvQW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIEJsYWNrQmVycnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIC9CbGFja0JlcnJ5L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgaU9TOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIFdpbmRvd3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIC9JRU1vYmlsZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFueTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKGlzTW9iaWxlLkFuZHJvaWQoKSB8fCBpc01vYmlsZS5CbGFja0JlcnJ5KCkgfHwgaXNNb2JpbGUuaU9TKCkgfHwgaXNNb2JpbGUuV2luZG93cygpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjbGFzcyBMYXlvdXQge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFN0YXJ0IGluaXRpYWxpemF0aW9uIG9uIGRvbWxvYWRcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQWRkaW5nIGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaXNNb2JpbGUuQW5kcm9pZCgpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2FuZHJvaWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmlzTW9iaWxlLmlPUygpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2lvcycpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cubW9iaWxlQW5kVGFibGV0Y2hlY2soKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd1bmtub3duLW1vYmlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnZGVza3RvcCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG5ldyBMYXlvdXQ7XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24gKCkge1xuICAgIGNsYXNzIE1lbnUge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFN0YXJ0IGluaXRpYWxpemF0aW9uIG9uIGRvbWxvYWRcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVhZHkudGhlbih0aGlzLmluaXQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIEFkZGluZyBldmVudHMgYW5kIHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIGluaXQgKCkge1xuXG4gICAgICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW4nKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgYmFja19idXR0b25zID0gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sb2dpbl9fYmFjaycpXG4gICAgICAgICAgICAgICAgLCBsb2dpbl9idXR0b25zID0gICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sb2dpbl9fbG9naW4tYnV0dG9uLCAubG9naW5fc3VjY2VzcyAubG9naW5fX3N1Ym1pdCcpXG4gICAgICAgICAgICAgICAgLCBtb2JpbGVfcG9wdXBfYnV0dG9ucyA9ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19pbnRlcnByZXRlciwgLmhlYWRlcl9faW50ZXJwcmV0ZXInKTtcblxuICAgICAgICAgICAgdGhpcy5tZW51X3BvcHVwX29wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5sb2dpbl9idXR0b24gPSAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fbG9naW4nKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJfYnV0dG9uID0gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX3JlZ2lzdGVyJyk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RlcDEgPSAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luX3JlZ2lzdGVyLXN0ZXAtMScpO1xuICAgICAgICAgICAgdGhpcy5zdGVwMV9mb3JtID0gICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fcmVnaXN0ZXItc3RlcC0xIGZvcm0ubG9naW5fX2Zvcm0nKTtcbiAgICAgICAgICAgIHRoaXMuc3RlcDIgPSAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luX3JlZ2lzdGVyLXN0ZXAtMicpO1xuICAgICAgICAgICAgdGhpcy5zdGVwMl9mb3JtID0gICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fcmVnaXN0ZXItc3RlcC0yIGZvcm0ubG9naW5fX2Zvcm0nKTtcblxuICAgICAgICAgICAgdGhpcy5sb2dpbl9mb3JtID0gICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fbG9naW4gZm9ybS5sb2dpbl9fZm9ybScpO1xuXG4gICAgICAgICAgICB0aGlzLm1vYmlsZV9wb3B1cCA9ICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9tb2JpbGUnKTtcbiAgICAgICAgICAgIHRoaXMubW9iaWxlX3BvcHVwX2Nsb3NlID0gICAgICAgdGhpcy5tb2JpbGVfcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jbG9zZScpO1xuXG4gICAgICAgICAgICB0aGlzLndyYXBwZXIgPSAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X193cmFwcGVyJyk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcl9yZWdpc3Rlcl9idXR0b24gPSAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2xpbmtfcmVnaXN0ZXInKTtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyX2xvZ2luX2J1dHRvbiA9ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbGlua19sb2dpbicpO1xuICAgICAgICAgICAgdGhpcy5yZWNvdmVyeV9idXR0b24gPSAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fX3Bhc3N3b3JkLXJlY292ZXJ5Jyk7XG4gICAgICAgICAgICB0aGlzLmxpZ2h0Ym94ID0gICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHk+LmxpZ2h0Ym94Jyk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX3BvcHVwID0gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9sb2dpbicpO1xuICAgICAgICAgICAgdGhpcy5yZWNvdmVyeSA9ICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5fcmVjb3ZlcnknKTtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmQgPSAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luX3Bhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aGlzLnJlY292ZXJ5X2Zvcm0gPSAgICAgICAgICAgIHRoaXMucmVjb3ZlcnkucXVlcnlTZWxlY3RvcignLmxvZ2luX19mb3JtJyk7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkX2Zvcm0gPSAgICAgICAgICAgIHRoaXMucGFzc3dvcmQucXVlcnlTZWxlY3RvcignLmxvZ2luX19mb3JtJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZXJyb3JfbWVzc2FnZSA9ICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0X2Zvcm0tc2VuZC1mYWlsJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZW1haWwgPSAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luX2VtYWlsJyk7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MgPSAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9zdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbl9vcGVuJyk7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5sb2dpbl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9wZW5Mb2dpbkZvcm0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnJlY292ZXJ5X2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3BlblJlY292ZXJ5LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5saWdodGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VBbGwuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3BlblJlZ2lzdGVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJfbG9naW5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vcGVuTG9naW5PdXRlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyX3JlZ2lzdGVyX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub3BlblJlZ2lzdGVyT3V0ZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLm1vYmlsZV9wb3B1cF9jbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VNb2JpbGVQb3B1cC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy5yZWNvdmVyeV9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc2VuZERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuc3RlcDFfZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9wZW5OZXh0LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5zdGVwMl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc2VuZERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmxvZ2luX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVwb3NQb3B1cC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgJCgnc2VsZWN0Lmxhbmd1YWdlX2Zyb20nKS5zZWxlY3QyKCk7XG4gICAgICAgICAgICAkKCdzZWxlY3QubGFuZ3VhZ2VfdG8nKS5zZWxlY3QyKCk7XG4gICAgICAgICAgICAkKCdzZWxlY3QubGFuZ3VhZ2VfbG9jYXRpb24nKS5zZWxlY3QyKCk7XG5cbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VfZnJvbSA9ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGFuZ3VhZ2VfZnJvbScpO1xuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZV90byA9ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYW5ndWFnZV90bycpO1xuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZV9sb2NhdGlvbiA9ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYW5ndWFnZV9sb2NhdGlvbicpO1xuXG4gICAgICAgICAgICAkKFwiLmxvZ2luIHNlbGVjdC5sYW5ndWFnZV9mcm9tXCIpLm9uKFwiY2hhbmdlXCIsIHRoaXMuY2hhbmdlRnJvbUxhbmd1YWdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxvZ2luJyksIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKG1vYmlsZV9wb3B1cF9idXR0b25zLCAoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vcGVuTW9iaWxlUG9wdXAuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGJhY2tfYnV0dG9ucywgKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZ29iYWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChsb2dpbl9idXR0b25zLCAoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vcGVuTG9naW5Jbm5lci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLldlYlJUQ1N1cHBvcnQgPSAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbm8tcGVlcmNvbm5lY3Rpb24nKTtcblxuXG4gICAgICAgICAgICBpZighdGhpcy5XZWJSVENTdXBwb3J0KSB7XG5cbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybS5sb2dpbl9fZm9ybSBpbnB1dCwgZm9ybS5sb2dpbl9fZm9ybSBidXR0b24sIGZvcm0ubG9naW5fX2Zvcm0gc2VsZWN0JyksIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtLmxvZ2luX19mb3JtJyksIChmb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xvc2VzdCgnLmxvZ2luJykucXVlcnlTZWxlY3RvcignLnBvcHVwX2Jyb3dzZXInKS5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cF9icm93c2VyJyksIChwb3B1cCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQb3B1cChwb3B1cCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjaGFuZ2VGcm9tTGFuZ3VhZ2UgKCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlX2Zyb20gPSB0aGlzLmxhbmd1YWdlX2Zyb20udmFsdWVcbiAgICAgICAgICAgICAgICAsIHZhbHVlX3RvID0gdGhpcy5sYW5ndWFnZV90by52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlX2Zyb20gPT09IHZhbHVlX3RvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYW5ndWFnZV90by5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAkKHRoaXMubGFuZ3VhZ2VfdG8pLnNlbGVjdDIoXCJ2YWxcIiwgXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmxhbmd1YWdlX3RvLnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvblt2YWx1ZV1bZGlzYWJsZWRdJyksICh0b19lbmFibGUpPT57XG4gICAgICAgICAgICAgICAgdG9fZW5hYmxlLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5sYW5ndWFnZV90by5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWVfZnJvbSArICdcIl0nKSwgKHRvX2Rpc2FibGUpPT57XG4gICAgICAgICAgICAgICAgdG9fZGlzYWJsZS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gaW5lZmZpY2llbnQsIGJ1dCBpdCBsb29rIGxpdGUgdGhlcmUgYXJlIG5vIG90aGVyIHdheSBjb3JyZWN0bHkgZGlzYWJsZS9lbmFibGUgc2VsZWN0MiBkeW5hbWljYWxseVxuICAgICAgICAgICAgJCh0aGlzLmxhbmd1YWdlX3RvKS5zZWxlY3QyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBvcGVuTmV4dCAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RlcDFfZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiAkKCdzZWxlY3QubGFuZ3VhZ2VfZnJvbScpLnNlbGVjdDIoXCJ2YWxcIilcbiAgICAgICAgICAgICAgICAsIHRvOiAkKCdzZWxlY3QubGFuZ3VhZ2VfdG8nKS5zZWxlY3QyKFwidmFsXCIpXG4gICAgICAgICAgICAgICAgLCBsb2NhdGlvbjogJCgnc2VsZWN0Lmxhbmd1YWdlX2xvY2F0aW9uJykuc2VsZWN0MihcInZhbFwiKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcDFfZm9ybS52YWxpZGF0ZSgpID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9wZW5Gb3JtKHRoaXMuc3RlcDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVwb3NQb3B1cCAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLm1lbnVfcG9wdXBfb3Blbil7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tb2JpbGVfcG9wdXAuc3R5bGVbTW9kZXJuaXpyLnByZWZpeGVkKCd0cmFuc2Zvcm0nKV0gPSBcInRyYW5zbGF0ZVkoXCIgKyB0aGlzLm1vYmlsZV9wb3B1cC5vZmZzZXRIZWlnaHQgKyBcInB4KVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xvc2VNb2JpbGVQb3B1cCAoKSB7XG4gICAgICAgICAgICBpZighdGhpcy5tZW51X3BvcHVwX29wZW4pe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWVudV9wb3B1cF9vcGVuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubW9iaWxlX3BvcHVwLCBcInN0b3BcIik7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLm1vYmlsZV9wb3B1cCwge3RyYW5zbGF0ZVk6IDB9LCAyNTApO1xuXG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLm1vYmlsZV9wb3B1cF9idXR0b24sIFwic3RvcFwiKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubW9iaWxlX3BvcHVwX2J1dHRvbiwge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwXG4gICAgICAgICAgICAgICAgLCBiZWdpbjogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9iaWxlX3BvcHVwX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3Blbk1vYmlsZVBvcHVwICgpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubWVudV9wb3B1cF9vcGVuKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1lbnVfcG9wdXBfb3BlbiA9IHRydWU7XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubW9iaWxlX3BvcHVwLCBcInN0b3BcIik7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLm1vYmlsZV9wb3B1cCwge3RyYW5zbGF0ZVk6IHRoaXMubW9iaWxlX3BvcHVwLm9mZnNldEhlaWdodCArIFwicHhcIn0sIDI1MCk7XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubW9iaWxlX3BvcHVwX2J1dHRvbiwgXCJzdG9wXCIpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5tb2JpbGVfcG9wdXBfYnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICAgICAgICAgICAgICAsIGNvbXBsZXRlOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2JpbGVfcG9wdXBfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dQb3B1cCAocG9wdXApIHtcbiAgICAgICAgICAgIGlmIChwb3B1cC5zaG93ICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgcG9wdXAuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuc2hvd1BvcHVwLmJpbmQodGhpcywgcG9wdXApLCA1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFNjcm9sbCB0byBmaXJzdCBzbGlkZSBhbmQgb3BlbiBsb2dpbiBmb3JtXG4gICAgICAgICAqL1xuICAgICAgICBvcGVuTG9naW5PdXRlciAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLm1vdmVUbygxLCAwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luX2J1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgfSwgODAwKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTY3JvbGwgdG8gZmlyc3Qgc2xpZGUgYW5kIG9wZW4gcmVnaXN0ZXIgZm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgb3BlblJlZ2lzdGVyT3V0ZXIgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJC5mbi5mdWxscGFnZS5tb3ZlVG8oMSwgMCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3Rlcl9idXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIH0sIDgwMClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU2VuZCByZWdpc3RyYXRpb24gZGF0YSBhbmQgc2hvdyBtZXNzYWdlXG4gICAgICAgICAqL1xuICAgICAgICBzZW5kRGF0YSAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZm9ybSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgICAgICAgIGlmIChmb3JtLnZhbGlkYXRlKCkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IERPTkUgPSA0XG4gICAgICAgICAgICAgICAgLCBPSyA9IDIwMFxuICAgICAgICAgICAgICAgICwgYWZ0ZXJfYWN0aW9uXG4gICAgICAgICAgICAgICAgLCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICAgICAgICAgICwgbG9hZGVkXG4gICAgICAgICAgICAgICAgLCBpbmRleFxuICAgICAgICAgICAgICAgICwgZGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0ZXAxX2RhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmFwcGVuZCgnZnJvbScsICAgICB0aGlzLnN0ZXAxX2RhdGEuZnJvbSk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKCd0bycsICAgICAgIHRoaXMuc3RlcDFfZGF0YS50byk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKCdsb2NhdGlvbicsIHRoaXMuc3RlcDFfZGF0YS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcDFfZGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbG9hZGVkID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB4aHIub3BlbignUE9TVCcsIGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSk7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZW5kKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBET05FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e3RoaXMuY2xlYXJBbGwoKTt9LCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSBPSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHBhcnNlSW50KHhoci5zdGF0dXMsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChmb3JtLmhhc0F0dHJpYnV0ZSgnZGF0YS1zdWNjZXNzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYWZ0ZXJfYWN0aW9uID0gdGhpcy5yZWRpcmVjdFRvLmJpbmQodGhpcywgZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VjY2VzcycpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm0uaGFzQXR0cmlidXRlKCdkYXRhLWNoZWNrJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYWZ0ZXJfYWN0aW9uID0gdGhpcy5zaG93Q2hlY2tNZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWZ0ZXJfYWN0aW9uID0gdGhpcy5zaG93U3VjY2Vzc01lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsb2FkZWQudGhlbihhZnRlcl9hY3Rpb24pLmNhdGNoKHRoaXMuc2hvd0Vycm9yTWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAvLyBsb2FkZWQudGhlbihhZnRlcl9hY3Rpb24pLmNhdGNoKGFmdGVyX2FjdGlvbik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXAxRGF0YSA9IG51bGw7XG5cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjogJywgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBSZWRpcmVjdCB0byB1cmxcbiAgICAgICAgICovXG4gICAgICAgIHJlZGlyZWN0VG8gKHVybCkge1xuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU2hvdyBjaGVjayBlbWFpbCBtZXNzYWdlXG4gICAgICAgICAqL1xuICAgICAgICBzaG93Q2hlY2tNZXNzYWdlICgpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZvcm0odGhpcy5lbWFpbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFNob3cgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAqL1xuICAgICAgICBzaG93U3VjY2Vzc01lc3NhZ2UgKCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0ID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW5Gb3JtKHRoaXMuc3VjY2Vzcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIE9wZW4gbG9naW5cbiAgICAgICAgICovXG4gICAgICAgIG9wZW5Mb2dpbklubmVyICgpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZvcm0odGhpcy5sb2dpbl9wb3B1cCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFNob3cgbWVzc2FnZVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd0Vycm9yTWVzc2FnZSAocmVhc29uKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5jb2RlLCAnUmVzcG9uY2Ugc3RhdHVzIGNvZGU6ICcgKyByZWFzb24uY29kZSArICcuICcgKyByZWFzb24ubWVzc2FnZSArICcuJyk7XG4gICAgICAgICAgICB0aGlzLmVycm9yX21lc3NhZ2Uub3BlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBPcGVuIGxhc3QgcGFnZVxuICAgICAgICAgKi9cbiAgICAgICAgZ29iYWNrICgpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZvcm0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU2hvdyBlbWFpbCBzZW50IHdhcm5pbmdcbiAgICAgICAgICovXG4gICAgICAgIGVtYWlsSGF2ZVNlbmQgKCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0ID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW5Gb3JtKHRoaXMuZW1haWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBPcGVuIHJlZ2lzdGVyIGZvcm1cbiAgICAgICAgICovXG4gICAgICAgIG9wZW5SZWdpc3RlcklubmVyICgpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkZvcm0odGhpcy5zdGVwMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIE9wZW4gcmVnaXN0ZXIgZm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgb3BlblJlZ2lzdGVyICgpIHtcbiAgICAgICAgICAgICQuZm4uZnVsbHBhZ2Uuc2V0QWxsb3dTY3JvbGxpbmcoZmFsc2UpO1xuICAgICAgICAgICAgJC5mbi5mdWxscGFnZS5zZXRLZXlib2FyZFNjcm9sbGluZyhmYWxzZSk7XG5cbiAgICAgICAgICAgIGxldCBwcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnN0ZXAxLCBwcm9wcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnN0ZXAxO1xuXG4gICAgICAgICAgICBwcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW46ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlnaHRib3guc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubGlnaHRib3gsIHByb3BzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gT3BlbiByZWNvdmVyeSBmb3Jtc1xuICAgICAgICAgKi9cbiAgICAgICAgb3BlblJlY292ZXJ5IChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmKCF0aGlzLldlYlJUQ1N1cHBvcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9wZW5Gb3JtKHRoaXMucmVjb3ZlcnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBPcGVuIHJlY292ZXJ5IGZvcm1zXG4gICAgICAgICAqIEBwYXJhbSBmb3JtIHtub2RlfSBGb3JtIHlvdSB3YW50IHRvIG9wZW5cbiAgICAgICAgICogQHBhcmFtIGJhY2sge25vZGV9IEZvcm0gd2hpY2ggeW91IHdhbnQgdG8gb3BlbiB3aGVuIHVzZXIgcHJlc3MgYmFjaywgYnkgZGVmYXVsdCDigJTCoGxhc3QgZm9ybSBvcGVuZWRcbiAgICAgICAgICovXG4gICAgICAgIG9wZW5Gb3JtIChwb3B1cCwgZG9udF9zYXZlKSB7XG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLnNldEFsbG93U2Nyb2xsaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICQuZm4uZnVsbHBhZ2Uuc2V0S2V5Ym9hcmRTY3JvbGxpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuY3VycmVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5cbiAgICAgICAgICAgIC8vICQoJ3NlbGVjdC5sYW5ndWFnZV9mcm9tJykuc2VsZWN0MihcInZhbFwiLCBcIlwiKTtcbiAgICAgICAgICAgIC8vICQoJ3NlbGVjdC5sYW5ndWFnZV90bycpLnNlbGVjdDIoXCJ2YWxcIiwgXCJcIik7XG4gICAgICAgICAgICAvLyAkKCdzZWxlY3QubGFuZ3VhZ2VfbG9jYXRpb24nKS5zZWxlY3QyKFwidmFsXCIsIFwiXCIpO1xuICAgICAgICAgICAgLy8gaWYgKChmb3JtICE9IG51bGwpICYmICh0eXBlb2YgZm9ybS5jbGVhciAhPSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChmb3JtIT1udWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBmb3JtLmNsZWFyKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9LCA1MDApO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBvcHVwID09IFwidW5kZWZpbmVkXCIgJiYgdGhpcy5sYXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb3B1cCA9IHRoaXMubGFzdC5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBvcHVwID09IFwidW5kZWZpbmVkXCIgJiYgdGhpcy5sYXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUFsbCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9udF9zYXZlICE9IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3QucHVzaCh0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb3JtID0gcG9wdXAucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICAgICAgICAgICAgLy8gaWYgKGZvcm0gIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKGZvcm0hPW51bGwpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGZvcm0uY2xlYXIoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIGxldCBwcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IC0gdGhpcy5jdXJyZW50Lm9mZnNldFdpZHRoICsgXCJweFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5jdXJyZW50LCBwcm9wcywgb3B0aW9ucyk7XG4gICAgICAgICAgICBwcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBWZWxvY2l0eShwb3B1cCwgcHJvcHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gcG9wdXA7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIENsb3NlIGFsbCBmb3Jtc1xuICAgICAgICAgKi9cbiAgICAgICAgY2xvc2VBbGwgKCkge1xuXG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLnNldEFsbG93U2Nyb2xsaW5nKHRydWUpO1xuICAgICAgICAgICAgJC5mbi5mdWxscGFnZS5zZXRLZXlib2FyZFNjcm9sbGluZyh0cnVlKTtcblxuICAgICAgICAgICAgbGV0IHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogLSB0aGlzLmN1cnJlbnQub2Zmc2V0V2lkdGggKyBcInB4XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLmN1cnJlbnQsIHByb3BzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IG51bGw7XG5cbiAgICAgICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saWdodGJveC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLmxpZ2h0Ym94LCBwcm9wcywgb3B0aW9ucyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57dGhpcy5jbGVhckFsbCgpO30sIDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckFsbCAoKSB7XG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpLCAoZm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm0uY2xlYXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBPcGVuIGxvZ2luIHBvcHVwXG4gICAgICAgICAqL1xuICAgICAgICBvcGVuTG9naW5Gb3JtIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJC5mbi5mdWxscGFnZS5zZXRBbGxvd1Njcm9sbGluZyhmYWxzZSk7XG4gICAgICAgICAgICAkLmZuLmZ1bGxwYWdlLnNldEtleWJvYXJkU2Nyb2xsaW5nKGZhbHNlKTtcblxuICAgICAgICAgICAgbGV0IHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMubG9naW5fcG9wdXAsIHByb3BzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubG9naW5fcG9wdXA7XG5cbiAgICAgICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saWdodGJveC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5saWdodGJveCwgcHJvcHMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3IE1lbnU7XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24gKCkge1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzIFBvcHVwXG4gICAgICovXG4gICAgY2xhc3MgUG9wdXAge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIEFkZGluZyBldmVudHMgYW5kIHByb3BlcnRpZXNcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvciAocG9wdXApIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXAgPSBwb3B1cDtcbiAgICAgICAgICAgIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLmNsb3NlID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wb3B1cC5vcGVuID0gdGhpcy5vcGVuLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnNob3cgPSB0aGlzLnNob3cuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmphbXBpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3cgKCkge1xuICAgICAgICAgICAgdGhpcy5wb3B1cC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgdGhpcy5wb3B1cC5zdHlsZVtNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zZm9ybScpXSA9IFwicm90YXRlWCgwKVwiO1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaGlkZSAoKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMucG9wdXAuc3R5bGVbTW9kZXJuaXpyLnByZWZpeGVkKCd0cmFuc2Zvcm0nKV0gPSBcInJvdGF0ZVgoMTgwZGVnKVwiO1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIFwic3RvcFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsb3NlICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmphbXBpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwgXCJmaW5pc2hcIik7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCB7XG4gICAgICAgICAgICAgICAgcm90YXRlWDogXCIxMjBkZWdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDBcbiAgICAgICAgICAgICAgICAsIGJlZ2luOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1cC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsIGNvbXBsZXRlOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wZW4gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuamFtcGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cykge1xuICAgICAgICAgICAgICAgIHRoaXMuanVtcCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuamFtcGluZyA9IHRydWU7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCBcImZpbmlzaFwiKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIHtcbiAgICAgICAgICAgICAgICByb3RhdGVYOiBcIjBkZWdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDBcbiAgICAgICAgICAgICAgICAsIGJlZ2luOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1cC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsIGNvbXBsZXRlOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge3JvdGF0ZVg6IFwiMjBkZWdcIn0sIDE1MCk7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCB7cm90YXRlWDogXCIwZGVnXCJ9LCAxMjUpO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge3JvdGF0ZVg6IFwiMTBkZWdcIn0sIDIwMCk7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCB7cm90YXRlWDogXCIwZGVnXCJ9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246MTc1XG4gICAgICAgICAgICAgICAgLCBjb21wbGV0ZTogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuamFtcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBqdW1wICgpIHtcbiAgICAgICAgICAgIHRoaXMuamFtcGluZyA9IHRydWU7XG4gICAgICAgICAgICBWZWxvY2l0eSh0aGlzLnBvcHVwLCBcImZpbmlzaFwiKTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIHtyb3RhdGVYOiBcIjM1ZGVnXCJ9LCAxNTApO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge3JvdGF0ZVg6IFwiMGRlZ1wifSwgMTI1KTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIHtyb3RhdGVYOiBcIjIwZGVnXCJ9LCAyMDApO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge3JvdGF0ZVg6IFwiMGRlZ1wifSwgMTc1KTtcbiAgICAgICAgICAgIFZlbG9jaXR5KHRoaXMucG9wdXAsIHtyb3RhdGVYOiBcIjE1ZGVnXCJ9LCAyNTApO1xuICAgICAgICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwge3JvdGF0ZVg6IFwiMGRlZ1wifSwge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMjVcbiAgICAgICAgICAgICAgICAsIGNvbXBsZXRlOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qYW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCk9PiByZXNvbHZlKCkpO1xuICAgIH0pO1xuXG4gICAgcmVhZHkudGhlbigoKT0+e1xuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwX2Jyb3dzZXInKSwgKHBvcHVwKSA9PiB7XG4gICAgICAgICAgICBuZXcgUG9wdXAocG9wdXApO1xuICAgICAgICB9KTtcblxuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwX2NvbW1vbicpLCAocG9wdXApID0+IHtcbiAgICAgICAgICAgIG5ldyBQb3B1cChwb3B1cCk7XG4gICAgICAgICAgICBpZiAocG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3B1cF9vcGVuJykpe1xuICAgICAgICAgICAgICAgIHBvcHVwLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIEBjbGFzc2Rlc2MgQ2xhc3MgcmVwcmVzZW50aW5nIGZvcm0gdmFsaWRhdGlvblxuICAgICAqIEBjbGFzc1xuICAgICAqL1xuXG4gICAgY2xhc3MgVmFsaWRhdGlvbiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQWRkaW5nIGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKGZvcm0pIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZShcIm5vdmFsaWRhdGVcIiwgXCJub3ZhbGlkYXRlXCIpO1xuICAgICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnZhbGlkYXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgZm9ybS52YWxpZGF0ZSA9IHRoaXMudmFsaWRhdGUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGZvcm0uY2xlYXIgPSB0aGlzLmNsZWFyLmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSB7XG4gICAgICAgICAgICAgICAgZW46IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwiUmVxdWlyZWQgZmllbGRcIlxuICAgICAgICAgICAgICAgICAgICAsIGVtYWlsOiBcIldyb25nIGVtYWlsIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICwgZXF1YWw6IFwiUGFzc3dvcmQgZmllbGRzIHNob3VsZCBiZSBlcXVhbFwiXG4gICAgICAgICAgICAgICAgICAgICwgdW5lcXVhbDogXCJMYW5ndWFnZXMgc2hvdWxkbid0IGJlIGVxdWFsXCJcbiAgICAgICAgICAgICAgICAgICAgLCB1cmw6IFwiV3JvbmcgdXJsIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICwgcnU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwi0J/QvtC70LUg0L7QsdGP0LfQsNGC0LXQu9GM0L3QviDQtNC70Y8g0LfQsNC/0L7Qu9C90LXQvdC40Y9cIlxuICAgICAgICAgICAgICAgICAgICAsIGVtYWlsOiBcItCf0YDQvtCy0LXRgNGM0YLQtSDRhNC+0YDQvNCw0YIgZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAsIGVxdWFsOiBcItCf0LDRgNC+0LvQuCDQtNC+0LvQttC90Ysg0YHQvtCy0L/QsNC00LDRgtGMXCJcbiAgICAgICAgICAgICAgICAgICAgLCB1bmVxdWFsOiBcItCv0LfRi9C60Lgg0L3QtSDQtNC+0LvQttC90Ysg0YHQvtCy0L/QsNC00LDRgtGMXCJcbiAgICAgICAgICAgICAgICAgICAgLCB1cmw6IFwi0J/RgNC+0LLQtdGA0YzRgtC1INGE0L7RgNC80LDRgiBVUkxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gUmVzZXQgZm9ybSBhbmQgY2xlYXIgZXJyb3JzXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhciAoKSB7XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RzID0gJCh0aGlzLmZvcm0pLmZpbmQoJ3NlbGVjdCcpXG4gICAgICAgICAgICAgICAgLCBpbmRleCA9IHNlbGVjdHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4LS0pIHtcblxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBzZWxlY3RzW2luZGV4XS5zZWxlY3QyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgJChzZWxlY3RzW2luZGV4XSkuc2VsZWN0MihcInZhbFwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RzW2luZGV4XS5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoc2VsZWN0c1tpbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uW3ZhbHVlXVtkaXNhYmxlZF0nKSwgKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZvcm0ucmVzZXQoKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgIGxldCBlcnJvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybS1lcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12YWxpZF0sIFtkYXRhLWludmFsaWRdJyk7XG5cbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZXJyb3JzLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZmllbGRzLCAoZmllbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWludmFsaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXZhbGlkJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZSBlcnJvciBtZXNzYWdlIGFmdGVyIGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtOb2RlfSBlbGVtZW50IC0gZWxlbWVudCwgYWZ0ZXIgd2hpY2ggd2Ugd2lsbCBhZGQgZXJyb3IgbWVzc2FnZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAtIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cHBlIC0gZXJyb3IgdHlwZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkRXJyb3IoZWxlbWVudCwgbWVzc2FnZSwgdHlwZSkge1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWVycm9yW2RhdGEtdHlwZT1cIicgKyB0eXBlICsgJ1wiXScpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XG4gICAgICAgICAgICBlcnJvci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtZXNzYWdlKSk7XG4gICAgICAgICAgICBlcnJvci5jbGFzc0xpc3QuYWRkKCdmb3JtLWVycm9yJyk7XG4gICAgICAgICAgICBlcnJvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScsIHR5cGUpO1xuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlIGVycm9yIG1lc3NhZ2Ugb2Ygc29tZSB0eXBlIGFmdGVyIGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtOb2RlfSBlbGVtZW50IC0gZWxlbWVudCwgYWZ0ZXIgd2hpY2ggZXJyb3IgbWVzc2FnZSBpc1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwcGUgLSBlcnJvciB0eXBlXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhckVycm9yKGVsZW1lbnQsIHR5cGUpIHtcblxuICAgICAgICAgICAgbGV0IGVyciA9IGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuZm9ybS1lcnJvcltkYXRhLXR5cGU9XCInICsgdHlwZSArICdcIl0nKTtcbiAgICAgICAgICAgIGlmIChlcnIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBWYWxpZGF0ZSBmb3JtXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gc3VibWl0IGV2ZW50XG4gICAgICAgICAqIEB0b2RvIEltcGxlbWVudCBsb2dpbiB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICB2YWxpZGF0ZShldmVudCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPSBcInVuZGVmaW5lZFwiICYmICFldmVudC5jdXJyZW50VGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1yZWxvYWQnKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWxpZCA9IHRydWUsXG4gICAgICAgICAgICAgICAgbmV4dCA9IG51bGwsXG4gICAgICAgICAgICAgICAgZXF1YWxfZmllbGRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWVxdWFsXScpLFxuICAgICAgICAgICAgICAgIHVuZXF1YWxfZmllbGRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXVuZXF1YWxdJyksXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRfZmllbGRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyZXF1aXJlZF0nKSxcbiAgICAgICAgICAgICAgICB1cmxfZmllbGRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ1cmxcIl0nKSxcbiAgICAgICAgICAgICAgICBlbWFpbF9maWVsZHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImVtYWlsXCJdJyksXG4gICAgICAgICAgICAgICAgdXJsX3JlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oaHR0cHxodHRwc3xmdHApXFw6Ly8oW2EtekEtWjAtOVxcLlxcLV0rKFxcOlthLXpBLVowLTlcXC4mYW1wOyVcXCRcXC1dKykqQCkqKCgyNVswLTVdfDJbMC00XVswLTldfFswLTFdezF9WzAtOV17Mn18WzEtOV17MX1bMC05XXsxfXxbMS05XSlcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzEtOV18MClcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzEtOV18MClcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzAtOV0pfChbYS16QS1aMC05XFwtXStcXC4pKlthLXpBLVowLTlcXC1dK1xcLihjb218ZWR1fGdvdnxpbnR8bWlsfG5ldHxvcmd8Yml6fGFycGF8aW5mb3xuYW1lfHByb3xhZXJvfGNvb3B8bXVzZXVtfFthLXpBLVpdezJ9KSkoXFw6WzAtOV0rKSooLygkfFthLXpBLVowLTlcXC5cXCxcXD9cXCdcXFxcXFwrJmFtcDslXFwkI1xcPX5fXFwtXSspKSokXCIsIFwiaVwiKSxcbiAgICAgICAgICAgICAgICBlbWFpbF9yZWdleCA9IG5ldyBSZWdFeHAoXCJeKFthLXpBLVowLTlfXFwuXFwtXSkrXFxAKChbYS16QS1aMC05XFwtXSkrXFwuKSsoW2EtekEtWjAtOV17Miw0fSkrJFwiKTtcblxuICAgICAgICAgICAgLyogY2hlY2sgZXF1YWwgZmllbGRzICovXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZXF1YWxfZmllbGRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlcXVhbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1lcXVhbFwiKSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudmFsdWUudHJpbSgpICE9IGVxdWFsLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKGVsZW1lbnQsIHRoaXMubWVzc2FnZXNbZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnbGFuZycpXS5lcXVhbCwgXCJlcXVhbFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRXJyb3IoZWxlbWVudCwgXCJlcXVhbFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogY2hlY2sgdW5lcXVhbCBmaWVsZHMgKi9cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbCh1bmVxdWFsX2ZpZWxkcywgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdW5lcXVhbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS11bmVxdWFsXCIpKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5vcHRpb25zW2VsZW1lbnQuc2VsZWN0ZWRJbmRleF0udmFsdWUudHJpbSgpID09IHVuZXF1YWwub3B0aW9uc1t1bmVxdWFsLnNlbGVjdGVkSW5kZXhdLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKGVsZW1lbnQsIHRoaXMubWVzc2FnZXNbZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnbGFuZycpXS51bmVxdWFsLCBcInVuZXF1YWxcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckVycm9yKGVsZW1lbnQsIFwidW5lcXVhbFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyogY2hlY2sgcmVxdWlyZWQgZmllbGRzICovXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwocmVxdWlyZWRfZmllbGRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnZhbHVlLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKGVsZW1lbnQsIHRoaXMubWVzc2FnZXNbZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnbGFuZycpXS5yZXF1aXJlZCwgXCJyZXF1aXJlZFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRXJyb3IoZWxlbWVudCwgJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIGNoZWNrIHVybCBmaWVsZHMgKi9cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbCh1cmxfZmllbGRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgoZWxlbWVudC52YWx1ZS50cmltKCkubGVuZ3RoID4gMCkgJiYgKHVybF9yZWdleC50ZXN0KGVsZW1lbnQudmFsdWUudHJpbSgpKSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoZWxlbWVudCwgdGhpcy5tZXNzYWdlc1tkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdsYW5nJyldLnVybCwgJ3VybCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJFcnJvcihlbGVtZW50LCAndXJsJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIGNoZWNrIGVtYWlsIGZpZWxkcyAqL1xuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGVtYWlsX2ZpZWxkcywgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoKGVsZW1lbnQudmFsdWUudHJpbSgpLmxlbmd0aCA+IDApICYmIChlbWFpbF9yZWdleC50ZXN0KGVsZW1lbnQudmFsdWUudHJpbSgpKSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoZWxlbWVudCwgdGhpcy5tZXNzYWdlc1tkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdsYW5nJyldLmVtYWlsLCAnZW1haWwnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRXJyb3IoZWxlbWVudCwgJ2VtYWlsJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgbGV0IGFsbF9maWVsZHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlcXVhbF9maWVsZHMpLmNvbmNhdChcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyZXF1aXJlZF9maWVsZHMpLFxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHVybF9maWVsZHMpLFxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVtYWlsX2ZpZWxkcylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChhbGxfZmllbGRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlcnIgPSBlbGVtZW50LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmZvcm0tZXJyb3InKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGludmFsaWQgPSBkb2N1bWVudC5jcmVhdGVBdHRyaWJ1dGUoXCJkYXRhLWludmFsaWRcIik7XG4gICAgICAgICAgICAgICAgICAgIGludmFsaWQudmFsdWUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT0gXCJTRUxFQ1RcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0U2libGluZy5zZXRBdHRyaWJ1dGVOb2RlKGludmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0U2libGluZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdmFsaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlTm9kZShpbnZhbGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXZhbGlkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWxpZCA9IGRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZShcImRhdGEtdmFsaWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PSBcIlNFTEVDVFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHRTaWJsaW5nLnNldEF0dHJpYnV0ZU5vZGUodmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0U2libGluZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtaW52YWxpZCcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGVOb2RlKHZhbGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWludmFsaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgZXJyb3JzX2NvdW50ID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX2Vycm9yJykubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGVycm9yc19jb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbGV0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICB9KTtcblxuICAgIHJlYWR5LnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcbiAgICAgICAgW10uZm9yRWFjaC5jYWxsKGZvcm1zLCAoZm9ybSkgPT4ge1xuICAgICAgICAgICAgbmV3IFZhbGlkYXRpb24oZm9ybSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
