 require.config({
	 paths: {
			 "jquery": "/mall/admin/adminlte/bower_components/jquery/dist/jquery.min",
			 "bootstrap":"/mall/admin/adminlte/bower_components/bootstrap/dist/js/bootstrap.min",
			 "datatables.net":"/mall/admin/adminlte/bower_components/datatables.net/js/jquery.dataTables.min",
			 "bsdataTables":"/mall/admin/adminlte/bower_components/datatables.net-bs/js/dataTables.bootstrap.min",
			 "adminlte":"/mall/admin/adminlte/dist/js/adminlte.min",
			 "simple-module":"/mall/admin/resources/simditor/assets/scripts/module",
		     "uploader":"/mall/admin/resources/simditor/assets/scripts/uploader",
		     "hotkeys":"/mall/admin/resources/simditor/assets/scripts/hotkeys",
		     "simditor":"/mall/admin/resources/simditor/assets/scripts/simditor",
		     "webuploader":"/mall/admin/resources/webuploader/webuploader"
			 },

 });

require(['common','product_save','simditor_product','webuploader_product'], 
		function (common,product_save,simditor_product,webuploader_product){
	$(function(){
		//用户校验
		common.userCalibration();
		//1.获取产品类型参数
		product_save.getParams();
		//2.为产品下拉绑定事件
		product_save.dropDownEvent();
		//3.保存商品信息
		product_save.saveBtn();
	});
});