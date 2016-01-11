angular.module('nail', [])
.directive('nail', function($window) {
	return function(scope, ele, attr) {
		ele = ele[0];
		var _top = ele.getBoundingClientRect().top;
		ele.style.position = 'relative';
		var top = attr.nail && Math.min(ele.getBoundingClientRect().top, attr.nail) || ele.getBoundingClientRect().top;
		$window.onscroll = function() {
			console.log(_top-$window.scrollY,top)
			if(_top - $window.scrollY <= top) {
				ele.style.top = ($window.scrollY + top) + 'px';
			}
		}
	}
})