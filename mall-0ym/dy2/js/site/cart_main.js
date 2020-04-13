require.config({
	 paths: {
			 "jquery": "/mall/dy2/js/jquery-1.6.2.min",
			 "handlebar": "/mall/dy2/js/handlebars-v4.0.11",
			 }
 });

require(['jquery','handlebar','common','cart'], function (jquery,handlebar,common, cart){
	$(function(){
		//加载用户登陆信息
		common.getUserInfo();
		//用户登出
		common.loginOut();
		
		cart.ready();
	});	
});