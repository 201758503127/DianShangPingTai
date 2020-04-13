var parentId=0; //父类型的id
define(['common'],function(common){
	//1.表格初始化
	function productTable(){
		//找到位置引用datatable
		$("#product-table").dataTable({
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
				"url":baseUrl+"mgr/param/findptype.do",
			},
			"columns":[
				{"data":"id"},
				{"data":"name"},
				{"data":null}
			],
			columnDefs:[
				//最后一列
				{
					targets:2,
					render:function(data,type,row,meta){
						return findChildren(row);
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
	//2.加载新增商品按钮
	function addBtn(){
		var str = '<a class="btn btn-primary pull-right" href="param_save.html">新增类型参数</a>';
		$("#tool-container").addClass("clearfix");
		$("#tool-container").html(str);
	}
	return {
		productTable:productTable,
		addBtn:addBtn
	};
});

//渲染操作
function findChildren(row){
	var str ='<a class="button" href="javascript:void(0);" onclick="queryDirectChild(\''+row.id+'\')">查看子节点</a>';
	str+='<a class="button" href="javascript:void(0); id="del_params" style="margin-left:10px;" onclick="delParams(\''+row.id+'\')">删除</a>';
	str+='<a class="button" href="javascript:void(0); id="update_params" style="margin-left:10px;" onclick="updateParams(\''+row.id+'\',\''+row.name+'\')">编辑</a>';
	return str;
}

//查看子节点
function queryDirectChild(id){
	parentId= id;//父级id
	//清空数据
	var table = $("#product-table").dataTable();
	table.fnClearTable();//清空数据
	//重新加载数据
	table.fnReloadAjax(baseUrl+"mgr/param/findchildren.do?id="+id);
}
//删除类型
function delParams(id){
	//提示确定删除
	if(confirm("确定删除吗？")){
		$.ajax({
			"xhrFields":{withCredentials:true},
			"crossDomain":true,
			"url":baseUrl+"mgr/param/delparam.do",
			data:{"id":id},
			type:"post",
			dataType:'json',
			success:function(rs){
				if(rs.status==0){
					//清空数据
					var table = $("#product-table").dataTable();
					table.fnClearTable();//清空数据
					//重新加载数据
					table.fnReloadAjax(baseUrl+"mgr/param/findchildren.do?id="+id);
				}else{
					//失败返回信息
					alert(rs.msg);
				}			
			}
		});
		return true;
	}
	return false;
}

//修改类型
function updateParams(id,paramName){
	$(window).attr("location","param_update.html?paramId="+id+"&parentId="+parentId+"&paramName="+paramName);
}






