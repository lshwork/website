/**
 * Created by lsh on 2015/12/8 0008.
 */
$(function(){
    $('.spinner .btn:first-of-type').on('click', function() {
        var value=$('.spinner input').val();
        if(isNaN(value)||!value){
            value=0
        }
        if(value<23){
            $('.spinner input').val( parseInt(value, 10) + 1);
        }
    });
    $('.spinner .btn:last-of-type').on('click', function() {
        var value=$('.spinner input').val();
        if(isNaN(value)||!value){
            $('.spinner input').val(0);
        }
        if(value>=1){
            $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
        }
        if(value==0){
            $('.spinner input').val("");
        }
    });

    $("input[name='showed']").bootstrapSwitch({
        onText: '开启',
        offText: '关闭',
        onColor: 'info'
    });
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
        $(".community span").click(function(){
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
    $(".select2").select2();
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    $('#startDate,#endDate').datetimepicker({
        format:"YYYY-MM-DD HH:mm:ss",
        sideBySide: true
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
    $("#iframe1").load( function() {
            //以下操作必须在iframe加载完后才可进行
            var iframe_preview = $(window.frames["preview"].document);
            console.log(iframe_preview)
            var imgs=$("input[name=images]");
            var summary=$("#summary").val();
            var name=$("#name").val();
            var price=$("#price").val();
            var description=$("#description").val();
            if(imgs.length>0){
                imgs.each(function(i){
                    if(i==0){
                        iframe_preview.find("#image_preview").attr("src",$(this).val());
                    }
                });
            }
            iframe_preview.find("#summary_preview").html(summary);
            iframe_preview.find("#name_preview").html(name);
            iframe_preview.find("#price_preview").html("￥"+price);
            iframe_preview.find("#summary_description").html(description);
        $("#summary").keyup(function(){
            var $this=$(this);
            iframe_preview.find("#summary_preview").html($this.val());
        });
        $("#name").keyup(function(){
            var $this=$(this);
            iframe_preview.find("#name_preview").html($this.val());
        });
        $("#price").keyup(function(){
            var $this=$(this);
            iframe_preview.find("#price_preview").html("￥"+$this.val());
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
                    },
                    afterChange:function(){
                        var html= $(window.frames["iframe1"].document).find(".ke-content").html();
                        iframe_preview.find("#summary_description").html( html);

                    }
                };
                var activitiesAddEditor=KindEditor.create("#goodsForm [name=description]", kingEditorParams);
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
                var images=$("input[name='images']");
                var initialPreview=new Array();
                var initialPreviewConfig=new Array();
                images.each(function(){
                    var url=$(this).val();
                    var path=url.substr(domain.length,url.length);
                    initialPreview.push("<img style='height:160px' src='"+$(this).val()+"'>");
                    initialPreviewConfig.push({caption: "", width: "120px", url: "/admin/qiniu/delete", key: path});
                });
                if(images.length>0){
                    $("#image").fileinput({
                        language: 'zh', //设置语言
                        allowedFileExtensions: ['JPEG', 'jpeg', 'JPG','jpg','GIF','gif','BMP','bmp','png','PNG'],//接收的文件后缀//.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png
                        maxFileCount: 5, //表示允许同时上传的最大文件个数
                        initialPreview: initialPreview,
                        initialPreviewConfig: initialPreviewConfig,
                        showClose: false,
                        showRemove: false,
                        showCaption: false,
                        showPreview:true,
                        uploadUrl: 'http://upload.qiniu.com/',
                        uploadExtraData: {
                            token: uptoken
                        }
                    }).on("fileuploaded",function(event, data, previewId, index) {
                        $("#image").after("<input type='hidden' name='images' value='"+domain+data.response.key+"' >");
                    }).on('filebatchuploadcomplete', function(event, files, extra) {
                        var imgs=$("input[name=images]");
                        imgs.each(function(i){
                            if(i==0){
                                iframe_preview.find("#image_preview").attr("src",$(this).val());
                            }
                        });
                    }).on("filepredelete", function(event,key) {
                        var abort = true;
                        if (confirm("你确定要删除这张图片?")) {
                            abort = false;
                            $("input[value*='"+key+"']").remove();
                            $("input[value*='undefined']").remove();
                            var imgs=$("input[name=images]");
                            if(imgs.length>0){
                                imgs.each(function(i){
                                    if(i==0){
                                        iframe_preview.find("#image_preview").attr("src",$(this).val());
                                    }
                                });
                            }else{
                                iframe_preview.find("#image_preview").attr("src","/public/site/image/btn_pic@2x.png");
                            }
                        }
                        return abort;
                    });
                }else{
                    $("#image").fileinput({
                        uploadUrl: 'http://upload.qiniu.com/',
                        language: 'zh', //设置语言
                        allowedFileExtensions:  ['JPEG', 'jpeg', 'JPG','jpg','GIF','gif','BMP','bmp','png','PNG'],//接收的文件后缀
                        maxFileCount: 5, //表示允许同时上传的最大文件个数
                        showCaption: false,
                        showClose: false,
                        showRemove: false,
                        showPreview:true,
                        uploadExtraData: {
                            token: uptoken
                        }
                    }).on("fileuploaded",function(event, data, previewId, index) {
                        $("#image").after("<input type='hidden' name='images'  value='"+domain+data.response.key+"' >");
                    }).on('filebatchuploadcomplete', function(event, files, extra) {
                        var imgs=$("input[name=images]");
                        imgs.each(function(i){
                            if(i==0){
                                iframe_preview.find("#image_preview").attr("src",$(this).val());
                            }
                        });
                    }).on('filepredelete', function(event, key) {
                        var abort = true;
                        if (confirm("你确定要删除这张图片?")) {
                            abort = false;
                            $("input[value*='"+key+"']").remove();
                            $("input[value*='undefined']").remove();
                            var imgs=$("input[name=images]");
                            if(imgs.length>0){
                                imgs.each(function(i){
                                    if(i==0){
                                        iframe_preview.find("#image_preview").attr("src",$(this).val());
                                    }
                                });
                            }else{
                                iframe_preview.find("#image_preview").attr("src","/public/site/image/btn_pic@2x.png");
                            }
                        }
                        return abort;
                    });
                }
            },
            error: function () {
            }
        });

    });

});
