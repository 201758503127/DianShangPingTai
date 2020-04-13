define(['common'],function(common){
	//获取该用户id
	var id = common.getParam("userId");
	//1.获取用户参数
	function getUserInfo(){
		$.ajax({
			"xhrFields":{withCredentials:true},
			"crossDomain":true,
			"url":baseUrl+"mgr/user/finduser.do",
			data:{"id":id},
			success:function(rs){
				//判断是否成功
				if(rs.status==0){
					//插入订单信息
					$("#userId").val(rs.data.id);
					$("#useraccount").val(rs.data.account);
					$("#username").val(rs.data.name);
					if(rs.data.sex=="男"){
						document.getElementById("man").checked = "checked";
					}else{
						document.getElementById("woman").checked = "checked";
					}
					$("#userage").val(rs.data.age);
					$("#userphone").val(rs.data.phone);
					$("#useremail").val(rs.data.email);
				}else{
					//弹出错误信息
					alert(rs.msg);
				}
			}
		});
	}
	
	//保存
	function saveUser(){
		//创建click事件
		$("#user-save").click(function(){
			//获取修改后信息
			var userId = $("#userId").val();
			var useraccount = $("#useraccount").val();
			var username = $("#username").val();
			var sex = $('input:radio[name="sex"]:checked').val();
			var userage = $("#userage").val();
			if(userage==0){
				return alert("请填写年龄！");
			}
			var userphone = $("#userphone").val();
			var useremail = $("#useremail").val();
			//ajax修改
			$.ajax({
				"xhrFields":{withCredentials:true},
				"crossDomain":true,
				"url":baseUrl+"mgr/user/updateuser.do",
				data:{"id":userId,"name":username,"account":useraccount,
					"age":userage,"phone":userphone,"email":useremail,"sex":sex},
				type:"post",
				success:function(rs){
					//判断是否成功
					if(rs.status==0){
						//跳转用户管理页面
						$(window).attr("location","user_management.html");
					}else{
						//弹出错误信息
						alert(rs.msg);
					}
				}
			});
		});
	}
	
	
	return{
		getUserInfo:getUserInfo,
		saveUser:saveUser
	};
});