/**
 * Created by lsh on 2015/12/7 0007.
 */
$(function(){
    var i=0;
    var financeOn=$("#financeOn").val();
    if(financeOn){
        $(this).find(".ui-son").show();
    }
    $(".sidebar-menu li").click(function(){
        if(i==0){
            $(this).find(".ui-son").show();
            $(this).siblings().find(".ui-son").hide();
            i=1;
        }else{
            $(this).find(".ui-son").hide();
            i=0;
        }
    });
});

function deleteData(id,dataType) {
    var params = {"id": id, "deleted": true};
    if(confirm('你确定删除吗?')){
        $.ajax({
            type: "POST",
            url: "/admin/"+dataType+"/delete",
            data: params,
            success: function () {
                window.location.reload();
            },
            error: function () {
                alert('删除失败!');
            }
        });
    }
}

var lesnho = lesnho || {};
lesnho.locale = lesnho.locale || {};
lesnho.locale.daterangepicker = {
    "format": "YYYY-MM-DD",
    "separator": " ~ ",
    "applyLabel": "确定",
    "cancelLabel": "清除",
    "fromLabel": "从",
    "toLabel": "到",
    "customRangeLabel": "定制",
    "daysOfWeek": [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
    ],
    "monthNames": [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
    ],
    "firstDay": 1
};

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
        filePostName  : "image",
        uploadJson : '/admin/pic/uploadKindEditor/'+$("#imageType").val(),
        dir : "image"
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
