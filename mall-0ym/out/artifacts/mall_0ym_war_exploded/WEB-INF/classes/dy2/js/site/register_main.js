require.config({
	 paths: {
			 "jquery": "/mall/dy2/js/jquery-1.6.2.min",
			 },

 });

require(['jquery','common','register'],function (jquery,common,register){
	$(function(){
		register.registBtn();
	});	
});