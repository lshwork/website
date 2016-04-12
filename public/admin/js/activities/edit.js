/**
 * Created by lsh on 2015/12/8 0008.
 */
$(function(){
    //添加小区
    var areas;
    $.getJSON("/admin/areas/list",function(result) {
        areas= result;
    });
    $(".remove").click(function(){       //删除
        $(this).prev().prev().remove();
        $(this).prev().remove();
        $(this).remove();
    });
        $(".form-group span").click(function(){
            var $div = $("<div class='parent' ></div>");
            var $areaSelect = $("<select class='form-control sb' name='areaId' placeholder='活动地区' style='width: 200px;display: block; float: left;margin: 10px 10px 10px 0'></select>");
            var $communitySelect = $("<select class='form-control' name='communityId' placeholder='活动小区' style='width: 200px;display: block; float: left;margin: 10px 10px 10px 0'></select>");
            var $clear = $("<div class='clearfix'></div>");
            var $close = $("<i  style='display: block;float: left;width: 20px; height: 20px; border: 1px solid red; font-style: normal; line-height: 20px; text-align: center;margin: 15px 0 0 0;cursor: pointer;padding: 0;font-size: 18px;color: red'>x</i>");
            $.each(areas, function(index,area){
                var name = area.name;
                var id = area._id;
                var $option = $("<option value=" + id + ">" + name + "</option>");
                $areaSelect.append($option);
            });
            $close.click(function(){       //删除
                $(this).parent(".parent").remove();

            });
            $areaSelect.change(function () {
                var $this=  $(this).next("select");
                $this .empty();
                var changeAreaId = $(this).select().val();
                $.getJSON("/admin/communities/list?areaId="+changeAreaId,function(communities) {
                    $.each(communities, function (index, community) {
                        var name = community.name;
                        var id = community._id;
                        var $option12 = $("<option value=" + id + ">" + name + "</option>");
                        $this.append($option12);

                    });
                });
            });
            var areaId = $areaSelect.select().val();
            $.getJSON("/admin/communities/list?areaId="+areaId,function(communities) {
                $.each(communities, function (index, community) {
                    var name = community.name;
                    var id = community._id;
                    var $option1 = $("<option value=" + id + ">" + name + "</option>");
                    $communitySelect.append($option1);

                });
            });
            $div.append($areaSelect);
            $div.append($communitySelect);
            $div.append($close);
            $div.append($clear);
            $(".show-input").append($div);
     });
    $('#startDate, #endDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });
    $(".areaId").change(function () {
        var areaId = $(this).select().val();
        var url = "/admin/communities/list?areaId="+areaId;
        var $select = $(this).next("select");
        $.ajax({
            type: "GET",
            url: url,
            success: function (obj) {
                $select.empty();
                var json = eval(obj);
                $.each(json, function (index, item) {
                    //循环获取数据
                    var name = item.name ;
                    var id = item._id;
                    var $option = $("<option value=" + id + ">" + name + "</option>");
                    $select.append($option);
                });
            },
            error: function () {
            }
        });
    });

    $.ajax({
        type: "GET",
        url: '/admin/qiniu/uptoken?type=content',
        success: function (obj) {
            var json = eval(obj);
            var uptoken=json.uptoken;
            var kingEditorParams ={
                filePostName  : "file",
                uploadJson :'http://upload.qiniu.com/',  //http://upload.qiniu.com/ /admin/pic/uploadKindEditor/'+$("#imageType").val()
                dir : "image",
                extraFileUploadParams:{
                    token: uptoken
                }
            };
            var activitiesAddEditor=KindEditor.create("#activityForm [name=content]", kingEditorParams);
        },
        error:function(){
        }
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
                    allowedFileExtensions: ['JPEG', 'jpeg', 'JPG','jpg','GIF','gif','BMP','bmp','png','PNG'],//接收的文件后缀
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