/**
 * Created by lsh on 2015/12/8 0008.
 */
$(function(){
    $('#enabled').bootstrapSwitch({
        onText: '开启',
        offText: '关闭',
        onColor: 'info'
    });
    var kingEditorParams ={
        filePostName  : "file",
        uploadJson :'/admin/pic/upload',  //http://upload.qiniu.com/ /admin/pic/uploadKindEditor/'+$("#imageType").val()
        dir : "image",
        extraFileUploadParams:{
            kingEditor: "kingEditor"
        }
    };
    var newsAddEditor=KindEditor.create("#newsForm [name=content]", kingEditorParams);
    var src=$("#imageUrl").val();
    if(src){
        $("#image").fileinput({
            language: 'zh', //设置语言
            allowedFileExtensions: ['JPEG', 'jpeg', 'JPG','jpg','GIF','gif','BMP','bmp','png','PNG'],//接收的文件后缀//.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png
            maxFileCount: 1, //表示允许同时上传的最大文件个数
            initialPreview: [
                "<img style='height:160px' src='"+src+"'>",
            ],
            initialPreviewConfig: [
                {caption: "", width: "120px", url: "/admin/image/delete", key: src},
            ],
            autoReplace:true,
            showClose: false,
            showRemove: false,
            showCaption: false,
            uploadUrl: '/admin/pic/upload'
        }).on("fileuploaded",function(event, data, previewId, index) {
            $("#imageUrl").val(data.response.key);
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
            uploadUrl:  '/admin/pic/upload',
            language: 'zh', //设置语言
            allowedFileExtensions:['JPEG', 'jpeg', 'JPG','jpg','GIF','gif','BMP','bmp','png','PNG'],//接收的文件后缀
            maxFileCount: 5,//表示允许同时上传的最大文件个数
            showClose: false,
            showRemove: false,
            showCaption: false,
            autoReplace: true,
            maxFileSize: 1024,
        }).on("fileuploaded",function(event, data, previewId, index) {
            $("#imageUrl").val(data.response.key);
        }).on('filepredelete', function(event,key) {
            var abort = true;
            if (confirm("你确定要删除这张图片?")) {
                abort = false;
                $("#imageUrl").val('');
            }
            return abort;
        });
    }
});

function fileChange(target) {
    var fileSize = 0;
    if (!target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile (filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }
    var size = fileSize / 1024;
    if(size>1000){
        alert("附件不能大于2M");
        target.value="";
        return
    }
    var name=target.value;
    var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    if(fileName !="jpg" && fileName !="jpeg" && fileName !="pdf" && fileName !="png" && fileName !="dwg" && fileName !="gif" ){
        alert("请选择图片格式文件上传(jpg,png,gif,dwg,pdf,gif等)！");
        target.value="";
        return
    }
}
/*function removeImage(count,url){
    var url=url.substring(url.indexOf('/public'),url.length);
    if(confirm('你确定删除吗?')){
        $("#image"+count).remove();
        $("#image").val('');
        var params = {url: "."+url};
        $.ajax({
            type: "POST",
            url: "/admin/advertisements/deleteImage",
            data: params,
            success: function () {
            },
            error: function () {
            }
        });
    }
}*/

/*
var LSH = {

    // 编辑器参数
    kingEditorParams : {
        filePostName  : "file",
        uploadJson : 'http://upload.qiniu.com/',
        dir : "image",
        extraFileUploadParams:{
            token: uptoken
        }
    },
    init : function(data){
        this.initPicUpload(data);
        this.initOnePicUpload();
    },
    // 初始化图片上传组件
    initPicUpload : function(data){
        var count=0;
        $(".picFileUpload").each(function(i,e){
            var _ele = $(e);
            _ele.siblings("div.pics").remove();
            _ele.after('\
    			<div class="pics" style="clear:both">\
        			<ul ></ul>\
        		</div>');
            // 回显图片
            if(data && data.pics){
                var imgs = data.pics.split(",");
                for(var i in imgs){
                    alert(imgs[i]);
                    if($.trim(imgs[i]).length > 0){
                        _ele.siblings(".pics").find("ul").append("<li><a href='"+imgs[i]+"' target='_blank'><img src='"+imgs[i]+"' width='80' height='50' /></a></li>");
                    }
                }
            }
            $(e).click(function(){
                var form = $(this).parentsUntil("form").parent("form");
                KindEditor.editor(LSH.kingEditorParams).loadPlugin('multiimage',function(){
                    var editor = this;
                    editor.plugin.multiImageDialog({
                        clickFn : function(urlList) {
                            $("#PreviewIcon").remove();
                            var imgArray = [];
                            KindEditor.each(urlList, function(i, data) {
                                imgArray.push(data.url);
                                var id="image"+count;
                                form.find(".pics ul").append("<li id='"+id+"' style='list-style:none'><a href='"+data.url+"' target='_blank'><img class='img-circle' src='"+data.url+"' width='80' height='80' /></a>"+"<a  href='javascript:void(0);' onClick=removeImage("+count+",'"+data.url+"') >"+"<img alt='删除' src='/public/admin/img/delete.jpg' style='width:15px;height:15px;' ></a></li>");
                                count++;
                            });
                            form.find("#image").val(imgArray.join(","));
                            editor.hideDialog();
                        }
                    });
                });
            });
        });
    },



    createEditor : function(select){
        return KindEditor.create(select, LSH.kingEditorParams);
    },

    /!**
     * 初始化单图片上传组件 <br/>
     * 选择器为：.onePicUpload <br/>
     * 上传完成后会设置input内容以及在input后面追加<img>
     *!/
    initOnePicUpload : function(){
        var count=0;
        $(".onePicUpload").click(function(){
            var _self = $(this);
            KindEditor.editor(LSH.kingEditorParams).loadPlugin('image', function() {
                this.plugin.imageDialog({
                    showRemote : false,
                    clickFn : function(url, title, width, height, border, align) {
                        var upload=$("#upload");
                        var imgId="image"+count;
                        var inputId="input"+count;
                        $("#PreviewIcon").remove();
                        upload.after("<li id='"+imgId+"' style='list-style:none'><a href='"+url+"' style='display:block;float:left;margin-left:10px' target='_blank'><img  src='"+url+"' width='80' height='50'/></a>"+"<a  href='javascript:void(0);' onClick=deleteImage("+count+",'"+url+"') style='display: block;float: left;' >"+"<img alt='删除' src='/public/admin/img/delete.jpg' style='width:15px;height:15px;' ></a></li>");
                        $("#image").val(url);
                        this.hideDialog();
                    }
                });
            });
        });
    }
};*/
