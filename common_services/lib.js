angular.module('services',[])
.factory('file',function($http){
	return{
		dFile:function(fileName,content){
			//下载文件, 文件名和内容
			var aLink = document.createElement('a');
			var blob = new Blob([content]);
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("click", false, false);
			aLink.download = fileName;
			aLink.href = URL.createObjectURL(blob);
			aLink.dispatchEvent(evt);
		}
	}
})
.factory('evt',function($timeout){
	return{
		trigger:function(a){
			//触发事件, evt.trigger('resize')一些组件在dom变化后不会自动重新定位, 触发resize一般都会触发他们重新定位的动作
			$timeout(function(){
				var e = document.createEvent("HTMLEvents");
				e.initEvent(a, true, true);
				window.dispatchEvent(e);
			},20)
		}
	}
})
.factory('str',function(){
	return{
		get_rand_str:function(){
			var num = arguments[0] == undefined ? 5 : arguments[0];
			　　var $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
			　　var pwd = '';
			　　for (i = 0; i < num; i++) {
				　　　　pwd += $chars.charAt(Math.floor(Math.random() * 36));
			　　}
			　　return pwd;
		},
		toarr:function(obj){
			var tmp = [];
			angular.forEach(obj, function(value){
				tmp.push(value);
			});
			return tmp;
		}
	}
})
.factory('arr',function() {
	return{
		multi_sort:function(cond, defaultarr) {//条件和初始条件, 根据多条件排序
			for(var j = 0 ; j < defaultarr.length ; j ++ ) {
				cond.push(defaultarr[j]);
			}
			function compare(a, b, order, type){
				if(!type) {
					type = isNaN(+a) ? 'string' : 'number';
				}
				var ret;
				switch(type){
					case 'number':
					ret = a - b;
					break;
					case 'string':
					ret = a.localeCompare(b);
					break;
				}
				return (order == 'desc')? -ret : ret;
			}
			return function(a,b) {
				for(var i = 0 ; i < cond.length ;  i ++ ) {
					res = compare(a[cond[i].name], b[cond[i].name], cond[i].order, cond[i].type);
					if(res != 0 ){
						return res;
					}
				}
				return 0;
			}
		}
	}
})
.factory('color',function(){
	var colors = ['rgba(248,158,76,.8)','rgba(237,32,46,.8)','rgba(65,183,88,.8)','rgba(0,186,242,.8)','rgba(5,31,95,.8)','rgba(216,226,241,.8)','rgba(242,135,183,.8)','rgba(10,184,155,.8)'];
	return{
		getCL : function(num){
			//根据任意数字有规律的把颜色库中的颜色打出来
			while(num > (colors.length - 1)){
				num -= colors.length;
			}
			return colors[num];
		}
	}
})