define(function(){
	//1.订单表格初始化
	function initialization(){
		//找到位置引用datatable
		$("#order-table").dataTable({
			"autoWidth":false,		//禁止自动计算宽度
			"paging":true,			//分页
			"ordering" : false,		//排序
			"info":	false,			//统计信息
			"searching":false,		//取消搜索
			"dom": '<"#tool-container"><"top" t><"bottom" lp>', //dom
			"aPaginationType": "full_numbers",
			"ajax":{
				"xhrFields":{withCredentials:true},
				"crossDomain":true,
				"url":baseUrl+"mgr/order/findorders_nopages.do",
			},
			"columns":[
				{"data":"orderNo"},
				{"data":"deliveryName"},
				{"data":"statusDesc"},
				{"data":"amount"},
				{"data":"created"},
				{"data":null}
			],
			columnDefs:[
				//最后一列
				{
					targets:5,
					render:function(data,type,row,meta){
						return query(row);
					}
				},
			],
			"oLanguage"		:{
				"oProcessing":"正在加载数据……",
				"sLengthMenu":"每页显示_MENU_条记录",
				"sZeroRecords":"抱歉，没有找到",
				"sInfo":"从_START_到_END_/共_TOTAL_条记录",
				"sInfoEmpty":"没有数据",
				"sInfoFiltered":"(从_MAX_条数据中检索)",
				"sZeroRecords":"没有检索到数据",
				"sSearch":"模糊查询",
				"oPaginate":{
					"sFirst":"首页",
					"sPrevious":"前一页",
					"sNext":"后一页",
					"sLast":"尾页"
				}	
			}
		});
	}
	//2.加载订单按钮和查询框
	function addBtn(){
		var str = '<label for="orderNo" class="control-label" style="margin-right:20px;">订单编号</label>'
			+'<input type="text" class="form-control" id="orderNo" style="margin-right:15px;" placeholder="请输入订单编号">'
			+'<a class="btn btn-primary" href="javascript:void(0);" id="btn-search-product">查询</a>';
		$("#tool-container").addClass("clearfix");
		$("#tool-container").html(str);
	}
	//3.查询订单
	function selectProductInfo(){
		//给按钮添加事件
		$("#btn-search-product").click(function(){
			//获得table对象
			var table = $("#order-table").dataTable();
			//清空数据
			table.fnClearTable();
			//重新加载数据
			table.fnReloadAjax(baseUrl+"mgr/order/findorders_nopages.do?orderNo="+$("#orderNo").val());
		});
		
	}
	
	return {
		initialization:initialization,
		addBtn:addBtn,
		selectProductInfo:selectProductInfo
	};
});

//渲染操作列
function query(row){
	var str = '<a class="button" href="javascript:void(0);" onclick="queryDetail(\''+row.orderNo+'\')">查看详情</a>';
	return str;
}
//查看详情
function queryDetail(id){
	$(window).attr("location","order_detail.html?orderNo="+id);
}