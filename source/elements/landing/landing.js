"use strict";
console.log('landing');
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
            this.min_height = 450;

            let header = document.querySelector('.header')
                , clock = document.querySelector('.clock');

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
                console.log('initial size: ', [resizable.offsetHeight, resizable.offsetWidth]);
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
                , header_height = document.querySelector('.header').offsetHeight
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
                , element_height;

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

                if ((availabale_height < element_height )) {
                    tr_y = -(element_height - viewport_height - header_height)/2;
                }

                if (
                    (availabale_width < element_width )
                    && (
                        (viewport_width < 1221)
                        && (viewport_width > 750)
                    )
                ) {
                    tr_y = 0;
                    tr_x = -(element_width - viewport_width)/2;
                }

                if ((viewport_width > 1221)) {
                    tr_y = 0;
                }

                if( viewport_height < 580 ) {
                    slide.classList.add('slide_hide-centred');
                    centred.style[Modernizr.prefixed('transform')] = 'none';
                } else if ( scale < 1 ) {
                    slide.classList.remove('slide_hide-centred');
                    centred.style[Modernizr.prefixed('transform')] = 'translateX('+tr_x+'px) translateY('+tr_y+'px) scale(' + scale + ')';
                } else {
                    slide.classList.remove('slide_hide-centred');
                    centred.style[Modernizr.prefixed('transform')] = 'translateX('+tr_x+'px) translateY('+tr_y+'px)';
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
                            border_width = (parseInt(resizable.getAttribute('data-width'),10)+20)*scale;
                            header.style.borderLeftWidth = border_width + 'px';

                            if (viewport_width > this.tablet ) {
                                // tablet resolution
                                resizable.style.marginRight = (20 + header.offsetWidth/2 - border_width) + 'px';
                            }

                        } else {
                            border_width = (parseInt(resizable.getAttribute('data-width'),10)+20)*scale;
                            header.style.borderRightWidth = border_width + 'px';

                            if (viewport_width > this.tablet ) {
                                // tablet resolution
                                resizable.style.marginLeft = (20 + header.offsetWidth/2 - border_width) + 'px';
                            }
                        }

                    } else {
                        slide.classList.remove('slide_hide-resizable');
                        resizable.removeAttribute('style');
                        header.removeAttribute('style');
                    }

                } else {
                    // mobile resolution
                    availabale_height = viewport_height - header_height - header.offsetHeight - 90 - 20;
                    availabale_width = viewport_width - 40;

                    scale_x = availabale_height/element_height;
                    scale_y = availabale_width/element_width;
                    scale = Math.min(scale_x, scale_y);

                    if (availabale_width < element_width) {
                        resizable.style.marginLeft = - (((element_width - availabale_width)/2) - 20) + "px"
                    } else {
                        resizable.style.marginLeft = 'auto';
                    }

                    if( availabale_height < this.min_height ) {
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

            // let clock = document.querySelector('.clock'),
            //     clock_slide = document.querySelector('.fp-slidesContainer'),
            //     title = clock_slide.querySelector('.slide__title'),
            //     text = clock_slide.querySelector('.slide__text'),
            //     height = Math.min(clock_slide.offsetHeight - title.offsetHeight - text.offsetHeight + 90, 702),
            //     perc = height / 702;
            //
            // if (clock_slide.offsetWidth <= 750) {
            //     clock.style[Modernizr.prefixed('transform')] = 'scale(' + perc + ')';
            //     clock.style.margin = "0 0 0 -" + (clock.offsetWidth * perc) * 0.33 + "px";
            //     // clock.style.background = 'red';
            // } else {
            //     clock.removeAttribute('style');
            // }

        }

        scrollToTop(event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(1, 0);
        }
    }
    new Landging;
})();
