//用jquery获取模板
var tpl = $("#param_item_tpl").html();
//预编译模板
var func = Handlebars.compile(tpl);
//模拟json数据
var context = {	
		    "status": 0,
		    "content":[
		    	{math:1},
		    	{math:2},
		    	{math:3}
		    ],
		    "data": {
		        "lists": [
		            {
		                "id": 16,
		                "userId": 1,
		                "productId": 29,
		                "name": "压路机",
		                "quantity": 1,
		                "price": 11,
		                "status": 2,
		                "totalPrice": 11,
		                "stock": 100,
		                "iconUrl": "",
		                "checked": 0
		            },
		            {
		                "id": 17,
		                "userId": 1,
		                "productId": 6,
		                "name": "锂基脂 00#",
		                "quantity": 2,
		                "price": 215.89,
		                "status": 2,
		                "totalPrice": 431.78,
		                "stock": 89,
		                "iconUrl": "/upload/10a42221-06a8-4001-8cc6-b2deb3b9e964.png",
		                "checked": 0
		            }
		        ],
		    },
					    "isTrue": true,
					    "email": '',
					    "num": '0',
					    "author":{	id:1,
					    	     	name:"xxx"
					    		},
	};

//匹配json内容
var html =func(context);
//输入模板
$("#test").html(html);

