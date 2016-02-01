angular.module('antDirective',[])
.factory('antAlert',function(){
	// info,error,success , timeout
	// loading -> var hide = antAlert.laoding('...'); hide;
	// ant ver 0.9.x
	return antd.message;
})
.directive('antDatepicker',function(){
	return{
		restrict:'E',
		template:'<div style="display:inline-block;"></div>',
		require:'?ngModel',
		link:function(scope, ele, attr, ngModelCtrl) {
			var Picker = React.createClass({
			  handleChange: function(value) {
			  	scope.$apply(function(){
			  		ngModelCtrl.$setViewValue(value);
			  	});
			  },
			  render: function() {
			    return React.createElement(antd.Datepicker, {format:attr.format, value:ngModelCtrl.$viewValue || attr.value, onSelect:this.handleChange});
			  }
			});
	 		ngModelCtrl.$render = function(){
	 			React.render(React.createElement(Picker), ele.find('div')[0]);
	 		}
		}	
	}
})
.directive('antSelect',function($timeout){
	return{
		restrict:'E',
		template:'<div style="display:inline-block;width:100%"></div>',
		require:'?ngModel',
		scope:{
			antOptions:'='
		},
		link:function(scope, ele, attr, ngModelCtrl) {
			var code = attr.antField.split(',')[0] || 'code';
			var value = attr.antField.split(',')[1] || 'value';
			function render() {
				if(!scope.antOptions){
					return;
				}
				var Select = antd.Select;
				var Option = Select.Option;
				var children = [];
				function changeHandle(value){
					scope.$apply(function(){
						value = isNaN(+value) ? value : +value;
				  		ngModelCtrl.$setViewValue(value);
				  	});
				}
				for (var i = 0 ; i < scope.antOptions.length ; i ++) {
				  children.push(React.createElement(Option, {key:scope.antOptions[i][code]}, scope.antOptions[i][value]));
				}
				React.render(React.createElement(Select,{style:{width:'100%'},multiple:attr.multiple == undefined ? false : true,onChange:changeHandle,defaultValue:ngModelCtrl.$viewValue} ,children), ele.find('div')[0]);
			}
			scope.$watch(function(){
				return scope.antOptions;
			},function(){
				render();
			},true)
			ngModelCtrl.$render = function(){
				$timeout(function(){
					render();
				})
			}
		}
	}
})
.directive('antSwitch',function(){
	return{
		restrict:'E',
		template:'<div style="display:inline-block;"></div>',
		require:'?ngModel',
		link:function(scope, ele, attr, ngModelCtrl) {
			var Switch = antd.Switch;
			function changehandle(value) {
				scope.$apply(function(){
					ngModelCtrl.$setViewValue(value);
				})
			}
			function render() {
				React.render(React.createElement(Switch, {checkedChildren:React.createElement('i',{className:"anticon anticon-check"},null),unCheckedChildren:React.createElement('i',{className:"anticon anticon-cross"},null),onChange:changehandle,defaultChecked:ngModelCtrl.$viewValue}, null) , ele.find('div')[0]);
			}
			ngModelCtrl.$render = function() {
				render();
			}
		}
	}
})
.directive('antTable',function($timeout){
	return{
		restrict:'E',
		template:'<div style="display:inline-block;width:100%"></div>',
		scope:{
			coldef:'=',
			data:'='
		},
		link:function(scope, ele, attr) {
			var hd;
			function render() {
				if(hd){
					$timeout.cancel(hd);
				}
				hd = $timeout(function(){
					console.log(scope.coldef,scope.data)
					React.render(React.createElement(antd.Table, {columns:scope.coldef,dataSource:scope.data}, null),ele.find('div')[0]);
				},1000)
			}
			scope.$watch('coldef',function(){
				render();
			},true)
			scope.$watch('data',function(){
				render();
			},true)
		}
	}
})
