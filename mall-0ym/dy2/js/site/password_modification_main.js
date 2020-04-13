require.config({
	 paths: {
			 "jquery": "/mall/dy2/js/jquery-1.6.2.min",
			 },
 });


require(['jquery','common','password_modification'],function (jquery,common, password_modification){
	$(function(){
		//加载登录的用户信息
		common.getUserInfo();
		//用户登出
		common.loginOut();
		
		password_modification.ready();
	});	
});