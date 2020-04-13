 require.config({
	 paths: {
			 "jquery": "/mall/admin/adminlte/bower_components/jquery/dist/jquery.min",
			 "bootstrap":"/mall/admin/adminlte/bower_components/bootstrap/dist/js/bootstrap.min",
			 "datatables.net":"/mall/admin/adminlte/bower_components/datatables.net/js/jquery.dataTables.min",
			 "bsdataTables":"/mall/admin/adminlte/bower_components/datatables.net-bs/js/dataTables.bootstrap.min",
			 "adminlte":"/mall/admin/adminlte/dist/js/adminlte.min"
			 },
	 shim:{
			 'bootstrap':['jquery'],
			 'bsdataTables':['bootstrap'],
			 'fnReloadAjax':['jquery', 'datatables.net'],
			 'adminlte':['bootstrap']
	    }
 });

require(['jquery','bootstrap','datatables.net','bsdataTables','adminlte', 'fnReloadAjax','common','order_list'], 
		function (jquery,bootstrap,datatables_net,bsdataTables,adminlte, fnReloadAjax,common,order_list){
	$(function(){
		//用户校验
		common.userCalibration();
		//订单表格初始化
		order_list.initialization();
		//加载订单按钮和查询框
		order_list.addBtn();
		//查询订单
		order_list.selectProductInfo();
		
	});
});