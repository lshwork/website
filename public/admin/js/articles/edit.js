/**
 * Created by fangjunfeng on 16-3-16.
 */

$(function() {
    $('#enabled').bootstrapSwitch({
        onText: '开启',
        offText: '关闭',
        onColor: 'info'
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
            KindEditor.create("#articleForm [name=content]", kingEditorParams);
        },
        error:function(){
        }
    });
});