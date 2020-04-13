(function() {
  $(function() {
    var $preview, editor, mobileToolbar, toolbar;
    //Simditor.locale = 'zh-CN';
    //工具栏按钮
    toolbar = [ 'title', 'bold', 'italic', 'underline', 'strikethrough',    
        'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|',    
        'link', 'image', 'hr' ];
    //设置中文
    Simditor.locale = 'zh-CN';
    editor = new Simditor({
      //将jQuery对象，HTML元素或选择器字符串传递给此选项	
      textarea: $('#txt-content'),
      placeholder: '这里输入文字...',
      //显示工具栏按钮
      toolbar: toolbar,
      //支持通过从剪贴板粘贴图像进行上传
      pasteImage: true,
      //默认图像占位符
      defaultImage: 'resources/simditor/assets/images/image.png',
      //图片上传
      upload:{
        url: baseUrl+'mgr/product/pic_upload.do',
        xhrFields: {withCredentials: true},
        crossDomain: true,
        params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交  
        fileKey: 'files', //服务器端获取文件数据的参数名  
        connectionCount: 3,  
        leaveConfirm: '正在上传文件',  
      },
      success:function(data){
        alert(data);
      }
    });
  });	
}).call(this);









