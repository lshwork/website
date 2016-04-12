/**
 * Created by fangjunfeng on 16-3-9.
 */
$(function() {
    $('#startDate,#endDate').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });

    $.ajax({
        type: "GET",
        url: '/admin/qiniu/uptoken?type=content',
        success: function (obj) {
            var json = eval(obj);
            var uptoken = json.uptoken;
            var kingEditorParams = {
                filePostName  : "file",
                uploadJson :'http://upload.qiniu.com/',
                dir : "image",
                extraFileUploadParams:{
                    token: uptoken
                }
            };
            KindEditor.create("#couponForm [name=description]", kingEditorParams);
        },
        error:function(){
        }
    });
});