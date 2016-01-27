angular.module('filesdrag', [])
    .directive('filesdrag', function() {
        return {
            restrict: 'A',
            scope: {
                files: '=filesdrag',
                fn: '&fdFn'
            },
            link: function(scope, ele, attr) {
                var input = angular.element('<input type="file" onchange="exec()"/>')[0];
                // console.log(scope)
                var drag = ele[0];
                drag.addEventListener('dragenter', function(e) {
                    // this.style.background = 'gray';
                }, false)
                drag.addEventListener('dragleave', function(e) {
                    // this.style.background = 'pink';
                }, false)
                drag.addEventListener('dragenter', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }, false)
                drag.addEventListener('dragover', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }, false)
                drag.addEventListener("drop", function(e) {
                    // this.style.background = 'pink';
                    e.stopPropagation();     
                    e.preventDefault(); 
                    scope.files = e.dataTransfer.files;
                    scope.$apply();
                    scope.fn && scope.fn();
                }, false);
                drag.addEventListener("dblclick", function(e) {
                    input.click();
                })
                exec = function() {
                    scope.files = input.files;
                    scope.$apply();
                    scope.fn && scope.fn();
                }
            }
        }
    })
    .directive('picreader', function() {
        return {
            restrict: 'A',
            scope: {
                file: '=',
                config: '@piccfg'
            },
            link: function(scope, ele, attr) {
                scope.$watch('file', function(n) {
                    if (n) {
                        // console.log(n)
                    }
                })
            }
        }
    })
