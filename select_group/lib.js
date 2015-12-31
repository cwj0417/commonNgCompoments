angular.module('selectgroup',[])
.directive('selectgroup', function($http, $q) {
	return {
		restrict:'E',
		require:'?^ngModel',
		scope:{},
		template:"<div></div>",
		link:function(scope, ele, attr, ngModelCtrl) {
			var config, ztatuz = {};
			var wrap = $(ele[0]);
			function render(ztatuz) {
				if(!config) throw('请设置配置表url');
				wrap.html('');
				appendselect(0,ztatuz);
			}
			function appendselect(parent, ztatuz) {
				var cell_cfg, render_cfg, item, value, defer = $q.defer();
				for(var i = 0;i < config.length;i ++) {
					if((config[i].parent == parent && ztatuz[parent] == config[i].when) || (parent == 0 && config[i].parent == 0)) {
						cell_cfg = config[i];
						break;
					}
				}
				if(!cell_cfg) return false;
				if(cell_cfg.content instanceof Array) {
					render_cfg = cell_cfg.content;
					defer.resolve();
				}else {
					$http.get(cell_cfg.content)
					.success(function(data) {
						render_cfg = data;
						defer.resolve();
					})
				};
				defer.promise
				.then(function() {
					item = cell_cfg.item || (item ='item');
					value = cell_cfg.value || (value = 'value');
					var select = $('<select name="'+cell_cfg.field+'"></select>');
					for(var i = 0;i < render_cfg.length;i ++) {
						if(ztatuz[cell_cfg.field] == render_cfg[i][value]) {
							$('<option selected value="'+render_cfg[i][value]+'">'+render_cfg[i][item]+'</option>').appendTo(select);
						}else {
							$('<option value="'+render_cfg[i][value]+'">'+render_cfg[i][item]+'</option>').appendTo(select);
						}
					}
					select.on('change', cal)
					select.appendTo(wrap);
					appendselect(cell_cfg.field, ztatuz);
					cal();
				})
			}
			function cal() {
				var selects = wrap.find('select');
				var obj = {};
				for(var i = 0;i < selects.length ;i ++) {
					obj[$(selects[i]).attr('name')] = $(selects[i]).val();
				}
				console.log(obj,ztatuz);
				console.log(JSON.stringify(obj) != JSON.stringify(ztatuz))
				if(JSON.stringify(obj) != JSON.stringify(ztatuz)) {
					setTimeout(function(){
						render(ztatuz);
						ztatuz = obj;
					}, 5000)
				}
			}
			$http.get(attr.config)
			.success(function(data) {
				config = data;
				render(ztatuz);
			})
		}
	}
})