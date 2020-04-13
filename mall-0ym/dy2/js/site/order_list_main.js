require.config({
	 paths: {
			 "jquery": "/mall/dy2/js/jquery-1.6.2.min",
			 "handlebar": "/mall/dy2/js/handlebars-v4.0.11",
			 },
 });


require(['jquery','handlebar','common','order_list'],function (jquery,handlebar,common, order_list){
	$(function(){
		//加载登录用户信息
		common.getUserInfo();
		//用户登出
		common.loginOut();
		
		order_list.ready();
		
	});	
});