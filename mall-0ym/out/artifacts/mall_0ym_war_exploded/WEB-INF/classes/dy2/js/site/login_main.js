require.config({
	 paths: {
			 "jquery": "/mall/dy2/js/jquery-1.6.2.min",
			 },
 });


require(['jquery','common','login'],function (jquery,common, login){
	$(function(){
		//1.失去光标时验证用户名
		login.accountCheck();
		//2.失去光标时验证密码
		login.pwdCheck();
		//登录
		login.loginBtn();
	});	
});