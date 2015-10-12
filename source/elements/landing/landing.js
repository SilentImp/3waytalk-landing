"use strict";
(function() {
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
            this.fired = false;
            this.tablet = 1200;
            this.mobile = 750;
            this.min_height = 300;

            let header = document.querySelector('.header')
                , clock = document.querySelector('.clock');

            window.requestAnimFrame = window.requestAnimationFrame;
            $(".landing").fullpage({
                sectionSelector: ".landing__section",
                navigation: true,
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
        }

        hideNav () {
            Velocity(this.nav, "finish");
            Velocity(this.nav, {
                opacity: 0
            }, {
                duration: 300
                , complete: ()=> {
                    this.nav.style.display = "none";
                }
            });
        }

        showNav () {
            Velocity(this.nav, "finish");
            Velocity(this.nav, {
                opacity: 1
            }, {
                duration: 300
                , begin: ()=> {
                    this.nav.style.display = "block";
                }
            });
        }

        hideLoader() {
            if (this.fired) {
                return;
            }
            this.fired = true;
            this.nav = document.getElementById('fp-nav');
            this.hideNav();

            [].forEach.call(document.querySelectorAll('.slide__resizable, .slide__centred'), (resizable) => {
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
                }
            Velocity(loader, props, options);
        }


        recountSlides() {

            let resizables = document.querySelectorAll('.slide__resizable')
                , centreds = document.querySelectorAll('.slide__centred')
                , service_slide = document.querySelector('.slide_service')
                , service_illustration = document.querySelector('.slide__illustration')
                , main = document.querySelector('.slide_main')
                , shema = document.querySelector('.shema')
                , header_height = document.querySelector('.header').offsetHeight
                , footer_height = document.querySelector('.footer').offsetHeight
                , shema_details = shema.closest('.slide__details')
                , phones = main.querySelector('.slide__phones')
                , phone = main.querySelector('.slide__phone')
                , viewport_height
                , viewport_width
                , availabale_width
                , availabale_height
                , delta = 20
                , cell
                , scale = 1
                , scale_x = 1
                , scale_y = 1
                , header
                , slide
                , border_width
                , delta_y
                , tr_y
                , tr_x
                , element_width
                , element_height
                , illustration_height
                , w_width
                , w_height
                , i_width
                , i_height;

            cell = main.querySelector('.fp-tableCell');
            viewport_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10));
            viewport_width = cell.offsetWidth;

            if ((viewport_height < 710) && (viewport_width<750)) {
                shema.style.display = "none";
                shema_details.style.display = "block";
                shema_details.style.height = "auto";
            } else {
                shema.removeAttribute('style');
                shema_details.removeAttribute('style');
            }

            header = main.querySelector('.slide__header');
            main.style.backgroundSize = "auto " + viewport_height + "px";
            availabale_height = viewport_height - delta - header.offsetHeight;

            if ((availabale_height < 500)&&(availabale_height >= 200)) {
                phones.style.height = availabale_height + "px";
                phones.style.visibility = "visible";
            } else if (availabale_height < 200 ) {
                phones.style.visibility = "hidden";
            } else {
                phones.removeAttribute('style');
            }

            if (viewport_width < 750) {
                if ((viewport_height < 790) && (viewport_height > 480)) {
                    scale = viewport_height/790;

                    if (scale < 1) {

                        phone.style[Modernizr.prefixed('transform')] = 'scale(' + scale + ')';

                    } else {
                        phone.removeAttribute('style');
                        header.removeAttribute('style');
                    }

                } else if (viewport_height < 481){
                    header.removeAttribute('style');
                } else {
                    phone.removeAttribute('style');
                    header.removeAttribute('style');
                }

                if ((viewport_width > 500) && (scale < 1)) {
                    i_width = ((scale*440)/3)*2;
                    phone.style[Modernizr.prefixed('transform-origin')] = "66.666% 66.666%";
                    phone.style.right = -(i_width/2)+"px";
                    header.style.borderRightWidth = i_width - 20 + "px"
                } else if ((viewport_width < 501) && (viewport_width > 420) && (scale < 1)) {
                    i_width = (scale*440)/2;
                    phone.style[Modernizr.prefixed('transform-origin')] = "50% 66.666%";
                    phone.style.right = -i_width+"px";
                    header.style.borderRightWidth = i_width - 20 + "px"
                } else if (scale < 1) {
                    i_width = (scale*440)/3;
                    phone.style[Modernizr.prefixed('transform-origin')] = "33.333% 66.666%";
                    phone.style.right = -(i_width*2)+"px";
                    header.style.borderRightWidth = i_width - 20 + "px"
                }

                if ((viewport_width > 500) && (scale>=1)) {
                    phone.style.right = "-145px";
                    header.style.borderRightWidth =  "270px";
                } else if ((viewport_width < 501) && (viewport_width > 420) && (scale>=1)) {
                    phone.style.right = "-220px";
                    header.style.borderRightWidth = "200px"
                } else if (scale>=1) {
                    phone.style.right = "-290px";
                    header.style.borderRightWidth = "125px"
                }
            }

            cell = service_slide.querySelector('.fp-tableCell');
            viewport_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10));
            viewport_width = cell.offsetWidth;
            header = service_slide.querySelector('.slide__header');
            illustration_height = (Math.min(cell.offsetHeight, parseInt(cell.style.height, 10)) - header.offsetHeight - footer_height - header_height);
            service_illustration.style.height = illustration_height + "px";

            w_width = 700;
            w_height = 570;
            i_width = viewport_width*1.2;
            i_height = w_height*i_width/w_width;

            if (i_height < illustration_height) {
                service_illustration.classList.toggle('slide__illustration_hidden', false);
                service_illustration.style.backgroundPosition = "50% 100%";
            } else if (illustration_height < 370) {
                service_illustration.classList.toggle('slide__illustration_hidden', true);
            } else {
                service_illustration.classList.toggle('slide__illustration_hidden', false);
                service_illustration.style.backgroundPosition = "50% 0";
            }

            [].forEach.call(centreds, (centred) => {
                slide = centred.closest('.slide');
                cell = centred.closest('.fp-tableCell');

                viewport_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10));
                viewport_width = cell.offsetWidth;

                element_height = parseInt(centred.getAttribute('data-height'),10);

                if (viewport_width > 1220){
                    element_width = 1230;
                    delta_y = 170;
                } else if (viewport_width > 750) {
                    element_width = 1050;
                    delta_y = 170;
                } else {
                    element_width = 400;
                    element_height = 900;
                    delta_y = 0;
                }

                availabale_height = viewport_height - header_height - delta + delta_y;
                availabale_width = viewport_width - 40;

                scale_x = availabale_height/element_height;
                scale_y = availabale_width/element_width;
                scale = Math.min(scale_x, scale_y);

                tr_y = 0;
                tr_x = 0;

                if (
                    (availabale_width < element_width )
                    && (
                        (viewport_width < 1221)
                        && (viewport_width > 750)
                    )
                ) {
                    tr_x = -(element_width - viewport_width)/2;
                }

                if( viewport_height < 300 ) {
                    slide.classList.add('slide_hide-centred');
                    centred.style[Modernizr.prefixed('transform')] = 'none';
                    [].forEach.call(centred.querySelectorAll('.steps__step'), (step) => {
                        step.removeAttribute('style');
                    });

                } else if ( scale < 1 ) {
                    slide.classList.remove('slide_hide-centred');
                    centred.style[Modernizr.prefixed('transform')] = 'translateX('+tr_x+'px) scale(' + scale + ')';

                    [].forEach.call(centred.querySelectorAll('.steps__step'), (step) => {
                        step.style[Modernizr.prefixed('transform')] = 'scale(' + (1 + (1-scale)) + ')';
                    });


                } else {
                    slide.classList.remove('slide_hide-centred');
                    centred.style[Modernizr.prefixed('transform')] = 'translateX('+tr_x+'px)';
                    [].forEach.call(centred.querySelectorAll('.steps__step'), (step) => {
                        step.removeAttribute('style');
                    });
                }
            });

            [].forEach.call(resizables, (resizable) => {

                slide = resizable.closest('.slide');
                header = resizable.closest('.slide__details').querySelector('.slide__header');
                cell = resizable.closest('.fp-tableCell');

                viewport_height = Math.min(cell.offsetHeight, parseInt(cell.style.height, 10));
                viewport_width = cell.offsetWidth;

                element_height = parseInt(resizable.getAttribute('data-height'),10);
                element_width = parseInt(resizable.getAttribute('data-width'),10);

                scale_x = availabale_height/element_height;
                scale_y = availabale_width/element_width;
                scale = Math.min(scale_x, scale_y);


                if (viewport_width > this.mobile) {
                    // tablet and desktop resolution

                    availabale_height = viewport_height - header_height - delta;
                    availabale_width = viewport_width/2 - 40;

                    scale_x = availabale_height/element_height;
                    scale_y = availabale_width/element_width;
                    scale = Math.min(scale_x, scale_y);

                    if( availabale_height < this.min_height ) {

                        slide.classList.add('slide_hide-resizable');

                    } else if ( scale < 1 ) {

                        slide.classList.remove('slide_hide-resizable');
                        resizable.style[Modernizr.prefixed('transform')] = 'scale(' + scale + ')';

                        if (slide.classList.contains('slide_right')){
                            border_width = (parseInt(resizable.getAttribute('data-width'),10))*scale;
                            header.style.borderLeftWidth = border_width + 'px';

                            if (viewport_width > this.tablet ) {
                                // tablet resolution
                                resizable.style.marginRight = (header.offsetWidth/2 - border_width) + 'px';
                            }

                        } else {
                            border_width = (parseInt(resizable.getAttribute('data-width'),10))*scale;
                            header.style.borderRightWidth = border_width + 'px';

                            if (viewport_width > this.tablet ) {
                                // tablet resolution
                                resizable.style.marginLeft = (header.offsetWidth/2 - border_width) + 'px';
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

                    scale_x = availabale_height/element_height;
                    scale_y = availabale_width/element_width;
                    scale = Math.min(scale_x, scale_y);

                    if (availabale_width < element_width) {
                        resizable.style.marginLeft = - (((element_width - availabale_width)/2) - 20) + "px"
                    } else {
                        resizable.style.marginLeft = 'auto';
                    }

                    if( availabale_height < 200 ) {
                        console.log('hidding');
                        slide.classList.add('slide_hide-resizable');

                    } else if ( scale < 1 ) {

                        slide.classList.remove('slide_hide-resizable');
                        resizable.style[Modernizr.prefixed('transform')] = 'scale(' + scale + ')';

                    } else {
                        slide.classList.remove('slide_hide-resizable');
                        resizable.removeAttribute('style');
                        header.removeAttribute('style');
                    }
                }

            });

        }

        scrollToTop(event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1, 0);
        }
    }
    new Landging;
})();
