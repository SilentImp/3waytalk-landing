(function() {

  var ATTRIBUTE = 'form';

  function getAllElements() {
    return document.querySelectorAll('['+ATTRIBUTE+']');
  }

  function doOnAllElements(f) {
    var elements = getAllElements();
    for (var i = 0; i < elements.length; i++) {
      f(elements[i], i);
    }
  }

  function getFormFromElement(element) {
    return document.getElementById(element.getAttribute(ATTRIBUTE));
  }

  var polyfills = {
    button: buttonPolyfill,
    input: inputPolyfill,
    select: inputPolyfill,
    textarea: inputPolyfill
  }

  function getPolyfill(_tagName) {
    var tagName = _tagName.toString().toLowerCase();
    if (polyfills[tagName]) {
      return polyfills[tagName];
    }
    else {
      console.warn('Cannot find polyfill for form attribute on tag [' + tagName +']');
    }
  }

  function buttonPolyfill(element) {
    if (element.hasAlreadyDoneFormElementPolyfill) {
      return;
    }
    element.hasAlreadyDoneFormElementPolyfill = true;
    var form = getFormFromElement(element);
    element.onclick = function() {
      form.submit();
    };
  }

  function inputPolyfill(element) {
    if (hasAlreadyDone(element)) {
      return;
    }
    if (element.type === 'submit') {
      return inputSubmitPolyfill(element);
    }

    if (element.type === 'radio') {
      return radioButtonPolyfill(element);
    }

    if (element.type === 'checkbox') {
      return checkboxPolyfill(element);
    }

    var form = getFormFromElement(element);
    var clone = document.createElement('input');
    clone.name = element.name;
    clone.value = element.value;
    clone.style.display = 'none';
    form.appendChild(clone);

    element.onchange = function() {
      clone.value = element.value;
    };
  }

  function hasAlreadyDone(element) {
    var form = getFormFromElement(element);
    return !!form.querySelector('[name=' + element.name + ']');
  }

  function radioButtonPolyfill(element) {
    var form = getFormFromElement(element);
    function getFakeInput() {
      var fake = form.querySelector('[name='+element.name+']');
      if (fake) {
        return fake;
      }
      else {
        fake = document.createElement('input');
        fake.name = element.name;
        fake.style.display = 'none';
        form.appendChild(fake);
        return fake;
      }      
    }

    if (element.checked) {
      getFakeInput().value = element.value;
    }

    element.onchange = function() {
      if (element.checked) {
        getFakeInput().value = element.value;
      }
    }
  }

  function checkboxPolyfill(element) {
    var form = getFormFromElement(element);
    var clone = document.createElement('input');
    clone.type='checkbox';
    clone.name = element.name;
    clone.value = element.value;
    clone.checked = element.checked;
    clone.style.display = 'none';
    form.appendChild(clone);

    element.onchange = function() {
      clone.checked = element.checked;
    }
  }

  function inputSubmitPolyfill(element) {
    if (element.hasAlreadyDoneFormElementPolyfill) {
      return;
    }    
    element.hasAlreadyDoneFormElementPolyfill = true;
    var form = getFormFromElement(element);
    var clone = document.createElement('input');
    clone.style.display = 'none';
    form.appendChild(clone);

    element.onclick = function() {
      clone.name = element.name;
      clone.value = element.value;
      form.submit();
    }
  }

  function doPolyfill() {
    doOnAllElements(function(element) {
      getPolyfill(element.tagName)(element)
    });    
  }

  (function(){
    var t = setInterval(function(){
      if (document.readyState === "complete") {
        clearInterval(t);
        doPolyfill();
      }
    },9);
  }());

  (function (window) {
    var last = +new Date();
    var delay = 100;

    var stack = [];

    function callback() {
        var now = +new Date();
        if (now - last > delay) {
            for (var i = 0; i < stack.length; i++) {
                stack[i]();
            }
            last = now;
        }
    }

    var onDomChange = function (fn, newdelay) {
        if (newdelay) delay = newdelay;
        stack.push(fn);
    };

    function naive() {
        var last = document.getElementsByTagName('*');
        var lastlen = last.length;
        var timer = setTimeout(function check() {

            var current = document.getElementsByTagName('*');
            var len = current.length;
            if (len != lastlen) {
                last = [];
            }
            for (var i = 0; i < len; i++) {
                if (current[i] !== last[i]) {
                    callback();
                    last = current;
                    lastlen = len;
                    break;
                }
            }
            setTimeout(check, delay);
        }, delay);
    }

    var support = {};

    var el = document.documentElement;
    var remain = 3;

    function decide() {
        if (support.DOMNodeInserted) {
            window.addEventListener("DOMContentLoaded", function () {
                if (support.DOMSubtreeModified) { // for FF 3+, Chrome
                    el.addEventListener('DOMSubtreeModified', callback, false);
                } else { // for FF 2, Safari, Opera 9.6+
                    el.addEventListener('DOMNodeInserted', callback, false);
                    el.addEventListener('DOMNodeRemoved', callback, false);
                }
            }, false);
        } else if (document.onpropertychange) { // for IE 5.5+
            document.onpropertychange = callback;
        } else { // fallback
            naive();
        }
    }

    // checks a particular event
    function test(event) {
        el.addEventListener(event, function fn() {
            support[event] = true;
            el.removeEventListener(event, fn, false);
            if (--remain === 0) decide();
        }, false);
    }

    // attach test events
    if (window.addEventListener) {
        test('DOMSubtreeModified');
        test('DOMNodeInserted');
        test('DOMNodeRemoved');
    } else {
        decide();
    }

    // do the dummy test
    var dummy = document.createElement("div");
    el.appendChild(dummy);
    el.removeChild(dummy);

    onDomChange(function() {
      setTimeout(doPolyfill, 100);
    });
  })(window);

}())