require.config({
	 paths: {
			 "jquery": "/mall/dy2/js/jquery-1.6.2.min",
			 "jquery_SuperSlide": "/mall/dy2/js/jquery.SuperSlide.2.1.1",
			 "handlebar": "/mall/dy2/js/handlebars-v4.0.11",
			 },
	 shim:  {
			 'jquery_SuperSlide':['jquery']
	 		}
 });

require(['jquery','jquery_SuperSlide','handlebar','common','address','order_confirm'],function (jquery,jquery_SuperSlide,handlebar,common, address,order_confirm){
	$(function(){
		//加载登录用户信息
		common.getUserInfo();
		//用户登出
		common.loginOut();
		//读取用户生成的订单购物车商品信息
		order_confirm.getCartInfo();
		//提交确认信息生成订单
		order_confirm.submitBtn();
		//加载当前用户的地址信息
		address.getUserAddrInfo();
		//删除地址
		address.delAddress();
		//设为默认地址
		address.defaultAddress();
	});	
});