var LogIt = LogIt || {};
(function(){
	'use strict';
	
	var props = ['dateFormat', 'dayHour', 'weekView'];
	
	var defaults = {
		dateFormat : 'dateFirst',
		dayHour: 8,
		weekView : 5
	};
	
	var values = {
	};
	
	var init = function(callback){
		if (chrome){
			chrome.storage.local.get(props, function(items){
				for(var key in items){
					values[key] = items[key];
				}
				callback();
			});
		}
	};
	
	var get = function(key){
		var val;
		if (key == null){
			return null;
		}
		
		//First, get from local storage
		var val = values[key];
		//If not found, use default.
		if (typeof val === 'undefined'){
			val = defaults[key];
		}
		
		return val;
	};
	
	var set = function(key, value){
		values[key] = value;
		var obj = {};
		obj[key] = value;
		chrome.storage.local.set(obj);
	};
	
	var dateFormat = function(options){
		var formats = {
			dateFirst : 'dd MMM yyyy',
			monthFirst: 'MMM dd yyyy'
		};
		var form = get('dateFormat');
		return formats[form];
	};
	
	var weekView = function(v){
		if (v){
			set('weekView', v);
			return;
		}
		return get('weekView');
		
	};
	
	LogIt.Settings = {
		dateFormat: dateFormat,
		weekView: weekView,
		init: init
	};
	
	Object.freeze(LogIt.Settings);
	
})();