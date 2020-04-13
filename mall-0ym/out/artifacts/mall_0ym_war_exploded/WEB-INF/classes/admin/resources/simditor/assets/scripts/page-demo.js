(function() {
  $(function() {
    var $preview, editor, mobileToolbar, toolbar;
    //Simditor.locale = 'zh-CN';
    toolbar = [ 'title', 'bold', 'italic', 'underline', 'strikethrough',    
        'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|',    
        'link', 'image', 'hr', '|', 'indent', 'outdent' ];   
    Simditor.locale = 'zh-CN';//设置中文
    editor = new Simditor({
      textarea: $('#txt-content'),
      placeholder: '这里输入文字...',
      toolbar: toolbar,
      pasteImage: true,
      defaultImage: 'resources/simditor/assets/images/image.png',
      upload:{
        url: 'http://localhost:8080/mall/mgr/product/pic_upload.do',
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
    $preview = $('#preview');
    if ($preview.length > 0) {
      return editor.on('valuechanged', function(e) {
        return $preview.html(editor.getValue());
      });
    }
  });

}).call(this);
