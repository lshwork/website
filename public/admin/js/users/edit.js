/**
 * Created by wjc on 2016/4/15.
 */
$(function() {
    $("#areaId").change(function () {
        var areaId = $(this).select().val();
        $.ajax({
            type: "GET",
            url: "/admin/communities/list?areaId="+areaId,
            success: function (obj) {
                var $select = $("#communityId");
                $select.empty();
                var json = eval(obj);
                $.each(json, function (index, item) {
                    //循环获取数据
                    var name = item.name;
                    var id = item._id;
                    var $option = $("<option value=" + id + ">" + name + "</option>");
                    $select.append($option);
                });
            },
            error: function () {
                alert('失败!');
            }
        });
    });
    $("#areaId2").change(function () {
        var areaId = $(this).select().val();
        $.ajax({
            type: "GET",
            url: "/admin/communities/list?areaId="+areaId,
            success: function (obj) {
                var $select = $("#communityId2");
                $select.empty();
                var json = eval(obj);
                $.each(json, function (index, item) {
                    //循环获取数据
                    var name = item.name;
                    var id = item._id;
                    var $option = $("<option value=" + id + ">" + name + "</option>");
                    $select.append($option);
                });
            },
            error: function () {
                alert('失败!');
            }
        });
    });
    $('#birthday').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });
    var domain=$("#domain").val();
    var main2Template = '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n' +
        '<button type="button" class="btn btn-info select-library">从图库选择</button>\n';
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
                        "<img style='height:160px' src='"+src+"'>"
                    ],
                    initialPreviewConfig: [
                        {caption: "", width: "120px", url: "/admin/qiniu/delete", key: path}
                    ],
                    autoReplace:true,
                    showClose: false,
                    showRemove: false,
                    showCaption: false,
                    uploadUrl: 'http://upload.qiniu.com/',
                    //layoutTemplates: {main2: main2Template},
                    uploadExtraData: {
                        token: uptoken
                    }
                }).on("fileuploaded",function(event, data, previewId, index) {
                    alert(data.response.key);
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
                    allowedFileExtensions: ['JPEG', 'jpeg', 'JPG','jpg','GIF','gif','BMP','bmp','png','PNG'],//接收的文件后缀
                    maxFileCount: 5,//表示允许同时上传的最大文件个数
                    showClose: false,
                    showRemove: false,
                    showCaption: false,
                    autoReplace: true,
                    //layoutTemplates: {main2: main2Template},
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