angular.module('filesdrag',[])
.directive('filesdrag', function() {
	return {
		restrict:'A',
		scope:{
			files:'=filesdrag'
		},
		link:function(scope, ele, attr) {
			console.log(scope)
			var drag = ele[0];
			drag.addEventListener('dragenter',function(e){
				// this.style.background = 'gray';
			},false)			
			drag.addEventListener('dragleave',function(e){
				// this.style.background = 'pink';
			},false)			
			drag.addEventListener('dragenter',function(e){
				e.stopPropagation();  
				e.preventDefault();  
			},false)				
			drag.addEventListener('dragover',function(e){
				e.stopPropagation();  
				e.preventDefault();  
			},false)			
			drag.addEventListener("drop", function(e){
				// this.style.background = 'pink';
		    	e.stopPropagation();  
		    	e.preventDefault();  
				scope.files = e.dataTransfer.files;
				scope.$apply();
			}, false);
		}
	}
})
.directive('picreader', function() {
	return {
		restrict:'A',
		scope:{
			file:'=',
			config:'@piccfg'
		},
		link:function(scope, ele, attr) {
			console.log(scope)
			scope.$watch('file', function(n) {
				if(n) {
					console.log(n)
				}
			})
		}
	}
})