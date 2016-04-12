/**
 * Created by lsh on 2015/11/24 0024.
 */
$(document).ready(function(){
    $('#startDate, #endDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });

    $('#top').bootstrapSwitch({
        onText: '是',
        offText: '否',
        onColor: 'info'
    });
    var domain=$("#domain").val();
    $.ajax({
        type: "GET",
        url: '/admin/qiniu/uptoken',
        success: function (obj) {
            var json = eval(obj);
            var uptoken=json.uptoken;
            var src=$("#imageUrl").val();
            if(src){
                var path=src.substr(domain.length,src.length);
                $("#image").fileinput({
                    language: 'zh', //设置语言
                    allowedFileExtensions: ['JPEG', 'jpeg', 'JPG','jpg','GIF','gif','BMP','bmp','png','PNG'],//接收的文件后缀//.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png
                    maxFileCount: 1, //表示允许同时上传的最大文件个数

                    initialPreview: [
                        "<img style='height:160px' src='"+src+"'>",
                    ],
                    initialPreviewConfig: [
                        {caption: "", width: "120px", url: "/admin/qiniu/delete", key: path},
                    ],
                    autoReplace:true,
                    showClose: false,
                    showRemove: false,
                    showCaption: false,
                    uploadUrl: 'http://upload.qiniu.com/',
                    uploadExtraData: {
                        token: uptoken
                    }
                }).on("fileuploaded",function(event, data, previewId, index) {
                    $("#imageUrl").val(domain+data.response.key);
                }).on("filepredelete", function(event,key) {
                    var abort = true;
                    if (confirm("你确定要删除这张图片?")) {
                        abort = false;
                        $("#imageUrl").val('');
                    }
                    return abort;
                });
            }else{
                $("#image").fileinput({
                    uploadUrl:  'http://upload.qiniu.com/',
                    language: 'zh', //设置语言
                    allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
                    maxFileCount: 5,//表示允许同时上传的最大文件个数
                    showClose: false,
                    showRemove: false,
                    showCaption: false,
                    autoReplace: true,
                    uploadExtraData: {
                        token: uptoken
                    }
                }).on("fileuploaded",function(event, data, previewId, index) {
                    $("#imageUrl").val(domain+data.response.key);
                }).on('filepredelete', function(event,key) {
                    var abort = true;
                    if (confirm("你确定要删除这张图片?")) {
                        abort = false;
                        $("#imageUrl").val('');
                    }
                    return abort;
                });
            }
        },
        error: function () {
        }
    });
});
