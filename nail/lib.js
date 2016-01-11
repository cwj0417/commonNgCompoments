angular.module('nail', [])
.directive('nail', function($window) {
    return function(scope, ele, attr) {
        ele = ele[0];
        ele.style.position = 'relative';
        var top = attr.nail && Math.min(ele.getBoundingClientRect().top, attr.nail) || ele.getBoundingClientRect().top;
        var _top = ele.getBoundingClientRect().top + top;
        $window.onscroll = function() {
            if (_top - $window.scrollY <= top) {
                ele.style.top = ($window.scrollY + top) + 'px';
            }else {
                ele.style.top = _top;
            }
        }
    }
})