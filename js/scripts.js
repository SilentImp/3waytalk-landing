"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();!function(){var e=function(){function e(){_classCallCheck(this,e);var t=new Promise(function(e,t){return"loading"!=document.readyState?e():void document.addEventListener("DOMContentLoaded",function(){return e()})});t.then(this.init.bind(this))}return _createClass(e,[{key:"init",value:function(){var e=document.querySelector(".header"),t=document.querySelector(".clock");$(".landing").fullpage({sectionSelector:".landing__section",navigation:!0,afterRender:this.recountSlides.bind(this),afterResize:this.recountSlides.bind(this),onLeave:function(n,o,i){1==o?e.classList.toggle("header_open",!1):e.classList.toggle("header_open",!0),6==o?t.classList.toggle("clock_visible",!0):t.classList.toggle("clock_visible",!1)}}),document.querySelector(".footer__top").addEventListener("click",this.scrollToTop.bind(this))}},{key:"recountSlides",value:function(){var e=document.querySelector(".clock"),t=document.querySelector(".fp-slidesContainer"),n=t.querySelector(".slide__title"),o=t.querySelector(".slide__text"),i=Math.min(t.offsetHeight-n.offsetHeight-o.offsetHeight+90,702),l=i/702;console.log(l),t.offsetWidth<=750&&(console.log("small enought"),e.style[Modernizr.prefixed("transform")]="scale("+l+")",console.log("marginRight",e.style.marginRight,e.offsetWidth*l*.33),e.style.margin="0 0 0 -"+e.offsetWidth*l*.33+"px")}},{key:"scrollToTop",value:function(e){e.preventDefault(),$.fn.fullpage.moveTo(1,0)}}]),e}();new e}();
"use strict";function _classCallCheck(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function i(i,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(i,o.key,o)}}return function(e,n,o){return n&&i(e.prototype,n),o&&i(e,o),e}}();!function(){window.mobileAndTabletcheck=function(){var i=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(i=!0)}(navigator.userAgent||navigator.vendor||window.opera),i},window.isMobile={Android:function(){return/Android/i.test(navigator.userAgent)},BlackBerry:function(){return/BlackBerry/i.test(navigator.userAgent)},iOS:function(){return/iPhone|iPad|iPod/i.test(navigator.userAgent)},Windows:function(){return/IEMobile/i.test(navigator.userAgent)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Windows()}};var i=function(){function i(){_classCallCheck(this,i);var e=new Promise(function(i,e){return"loading"!=document.readyState?i():void document.addEventListener("DOMContentLoaded",function(){return i()})});e.then(this.init.bind(this))}return _createClass(i,[{key:"init",value:function(){window.isMobile.Android()?document.body.parentNode.classList.add("android"):window.isMobile.iOS()?document.body.parentNode.classList.add("ios"):window.mobileAndTabletcheck()?document.body.parentNode.classList.add("unknown-mobile"):document.body.parentNode.classList.add("desktop")}}]),i}();new i}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhbmRpbmcvbGFuZGluZy5qcyIsImxheW91dC9sYXlvdXQuanMiXSwibmFtZXMiOlsiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIl9jcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImkiLCJsZW5ndGgiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJwcm90b3R5cGUiLCJMYW5kZ2luZyIsInRoaXMiLCJyZWFkeSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZG9jdW1lbnQiLCJyZWFkeVN0YXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRoZW4iLCJpbml0IiwiYmluZCIsInZhbHVlIiwiaGVhZGVyIiwicXVlcnlTZWxlY3RvciIsImNsb2NrIiwiJCIsImZ1bGxwYWdlIiwic2VjdGlvblNlbGVjdG9yIiwibmF2aWdhdGlvbiIsImFmdGVyUmVuZGVyIiwicmVjb3VudFNsaWRlcyIsImFmdGVyUmVzaXplIiwib25MZWF2ZSIsImluZGV4IiwibmV4dEluZGV4IiwiZGlyZWN0aW9uIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwic2Nyb2xsVG9Ub3AiLCJjbG9ja19zbGlkZSIsInRpdGxlIiwidGV4dCIsImhlaWdodCIsIk1hdGgiLCJtaW4iLCJvZmZzZXRIZWlnaHQiLCJwZXJjIiwiY29uc29sZSIsImxvZyIsIm9mZnNldFdpZHRoIiwic3R5bGUiLCJNb2Rlcm5penIiLCJwcmVmaXhlZCIsIm1hcmdpblJpZ2h0IiwibWFyZ2luIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImZuIiwibW92ZVRvIiwid2luZG93IiwibW9iaWxlQW5kVGFibGV0Y2hlY2siLCJjaGVjayIsImEiLCJ0ZXN0Iiwic3Vic3RyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidmVuZG9yIiwib3BlcmEiLCJpc01vYmlsZSIsIkFuZHJvaWQiLCJCbGFja0JlcnJ5IiwiaU9TIiwiV2luZG93cyIsImFueSIsIkxheW91dCIsImJvZHkiLCJwYXJlbnROb2RlIiwiYWRkIl0sIm1hcHBpbmdzIjoiQUFBQSxZQUlBLFNBQVNBLGlCQUFnQkMsRUFBVUMsR0FBZSxLQUFNRCxZQUFvQkMsSUFBZ0IsS0FBTSxJQUFJQyxXQUFVLHFDQUZoSCxHQUFJQyxjQUFlLFdBQWUsUUFBU0MsR0FBaUJDLEVBQVFDLEdBQVMsSUFBSyxHQUFJQyxHQUFJLEVBQUdBLEVBQUlELEVBQU1FLE9BQVFELElBQUssQ0FBRSxHQUFJRSxHQUFhSCxFQUFNQyxFQUFJRSxHQUFXQyxXQUFhRCxFQUFXQyxhQUFjLEVBQU9ELEVBQVdFLGNBQWUsRUFBVSxTQUFXRixLQUFZQSxFQUFXRyxVQUFXLEdBQU1DLE9BQU9DLGVBQWVULEVBQVFJLEVBQVdNLElBQUtOLElBQWlCLE1BQU8sVUFBVVIsRUFBYWUsRUFBWUMsR0FBaUosTUFBOUhELElBQVlaLEVBQWlCSCxFQUFZaUIsVUFBV0YsR0FBaUJDLEdBQWFiLEVBQWlCSCxFQUFhZ0IsR0FBcUJoQixPQUFqaUIsV0FLSSxHQUpNa0IsR0FBUSxXQUtFLFFBTFZBLEtBV0VwQixnQkFBZ0JxQixLQVhsQkQsRUFNRSxJQUFJRSxHQUFRLEdBQUlDLFNBQVEsU0FBQ0MsRUFBU0MsR0FDOUIsTUFBMkIsV0FBdkJDLFNBQVNDLFdBQWdDSCxRQUM3Q0UsVUFBU0UsaUJBQWlCLG1CQUFvQixXQVExQyxNQVIrQ0osUUFFdkRGLEdBQU1PLEtBQUtSLEtBQUtTLEtBQUtDLEtBQUtWLE9Bc0U5QixNQXREQWpCLGNBMUJFZ0IsSUEyQkVKLElBQUssT0FDTGdCLE1BWkMsV0FDRCxHQUFJQyxHQUFTUCxTQUFTUSxjQUFjLFdBQzlCQyxFQUFRVCxTQUFTUSxjQUFjLFNBQ3JDRSxHQUFFLFlBQVlDLFVBQ1ZDLGdCQUFpQixvQkFDZkMsWUFBWSxFQUNaQyxZQUFh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LE1BWitDSixRQUV2REYsR0FBTU8sS0FBS1IsS0FBS1MsS0FBS0MsS0FBS1YsT0FvQzlCLE1BaEJBakIsY0E5QkVrRixJQStCRXRFLElBQUssT0FDTGdCLE1BaEJDLFdBQ0dzQyxPQUFPVSxTQUFTQyxVQUNoQnZELFNBQVM2RCxLQUFLQyxXQUFXekMsVUFBVTBDLElBQUksV0FDaENuQixPQUFPVSxTQUFTRyxNQUN2QnpELFNBQVM2RCxLQUFLQyxXQUFXekMsVUFBVTBDLElBQUksT0FDaENuQixPQUFPQyx1QkFDZDdDLFNBQVM2RCxLQUFLQyxXQUFXekMsVUFBVTBDLElBQUksa0JBRXZDL0QsU0FBUzZELEtBQUtDLFdBQVd6QyxVQUFVMEMsSUFBSSxlQXhCN0NILElBNkJSLElBQUlBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICBjbGFzcyBMYW5kZ2luZyB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgaW5pdGlhbGl6YXRpb24gb24gZG9tbG9hZFxuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCk9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQWRkaW5nIGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgaW5pdCAoKSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpXG4gICAgICAgICAgICAgICAgLCBjbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9jaycpO1xuICAgICAgICAgICAgJChcIi5sYW5kaW5nXCIpLmZ1bGxwYWdlKHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uU2VsZWN0b3I6IFwiLmxhbmRpbmdfX3NlY3Rpb25cIlxuICAgICAgICAgICAgICAgICwgbmF2aWdhdGlvbjogdHJ1ZVxuICAgICAgICAgICAgICAgICwgYWZ0ZXJSZW5kZXI6IHRoaXMucmVjb3VudFNsaWRlcy5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgLCBhZnRlclJlc2l6ZTogdGhpcy5yZWNvdW50U2xpZGVzLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAsIG9uTGVhdmU6ICggaW5kZXgsIG5leHRJbmRleCwgZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5leHRJbmRleCA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfb3BlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfb3BlbicsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobmV4dEluZGV4ID09IDYpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2suY2xhc3NMaXN0LnRvZ2dsZSgnY2xvY2tfdmlzaWJsZScsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2suY2xhc3NMaXN0LnRvZ2dsZSgnY2xvY2tfdmlzaWJsZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXJfX3RvcFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zY3JvbGxUb1RvcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmVjb3VudFNsaWRlcyAoKSB7XG4gICAgICAgICAgICBsZXQgY2xvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvY2snKVxuICAgICAgICAgICAgICAgICwgY2xvY2tfc2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnAtc2xpZGVzQ29udGFpbmVyJylcbiAgICAgICAgICAgICAgICAsIHRpdGxlID0gY2xvY2tfc2xpZGUucXVlcnlTZWxlY3RvcignLnNsaWRlX190aXRsZScpXG4gICAgICAgICAgICAgICAgLCB0ZXh0ID0gY2xvY2tfc2xpZGUucXVlcnlTZWxlY3RvcignLnNsaWRlX190ZXh0JylcbiAgICAgICAgICAgICAgICAsIGhlaWdodCA9IE1hdGgubWluKGNsb2NrX3NsaWRlLm9mZnNldEhlaWdodCAtIHRpdGxlLm9mZnNldEhlaWdodCAtIHRleHQub2Zmc2V0SGVpZ2h0ICsgOTAsIDcwMilcbiAgICAgICAgICAgICAgICAsIHBlcmMgPSBoZWlnaHQvNzAyO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGVyYyk7XG5cbiAgICAgICAgICAgIGlmIChjbG9ja19zbGlkZS5vZmZzZXRXaWR0aCA8PSA3NTApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc21hbGwgZW5vdWdodCcpO1xuICAgICAgICAgICAgICAgIGNsb2NrLnN0eWxlW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNmb3JtJyldID0gJ3NjYWxlKCcrIHBlcmMgKycpJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWFyZ2luUmlnaHQnLCBjbG9jay5zdHlsZS5tYXJnaW5SaWdodCwgKGNsb2NrLm9mZnNldFdpZHRoKnBlcmMpKjAuMzMpO1xuICAgICAgICAgICAgICAgIGNsb2NrLnN0eWxlLm1hcmdpbiA9IFwiMCAwIDAgLVwiKyhjbG9jay5vZmZzZXRXaWR0aCpwZXJjKSowLjMzK1wicHhcIjtcbiAgICAgICAgICAgICAgICAvLyBjbG9jay5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JlZCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc2Nyb2xsVG9Ub3AgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJC5mbi5mdWxscGFnZS5tb3ZlVG8oMSwwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgbmV3IExhbmRnaW5nO1xufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5tb2JpbGVBbmRUYWJsZXRjaGVjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgIGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKSB8fCAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsIDQpKSkgY2hlY2sgPSB0cnVlXG4gICAgICAgIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfTtcblxuICAgIHdpbmRvdy5pc01vYmlsZSA9IHtcbiAgICAgICAgQW5kcm9pZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL0FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB9LFxuICAgICAgICBCbGFja0JlcnJ5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvQmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlPUzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB9LFxuICAgICAgICBXaW5kb3dzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvSUVNb2JpbGUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB9LFxuICAgICAgICBhbnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIChpc01vYmlsZS5BbmRyb2lkKCkgfHwgaXNNb2JpbGUuQmxhY2tCZXJyeSgpIHx8IGlzTW9iaWxlLmlPUygpIHx8IGlzTW9iaWxlLldpbmRvd3MoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2xhc3MgTGF5b3V0IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTdGFydCBpbml0aWFsaXphdGlvbiBvbiBkb21sb2FkXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICAgICAgbGV0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKT0+IHJlc29sdmUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBBZGRpbmcgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBpbml0ICgpIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaXNNb2JpbGUuQW5kcm9pZCgpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2FuZHJvaWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmlzTW9iaWxlLmlPUygpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2lvcycpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cubW9iaWxlQW5kVGFibGV0Y2hlY2soKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd1bmtub3duLW1vYmlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnZGVza3RvcCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2FuZHJvaWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgbmV3IExheW91dDtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=