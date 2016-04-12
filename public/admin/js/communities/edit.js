/**
 * Created by lsh on 2015/11/24 0024.
 */
$(function(){
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
            var uptoken=json.uptoken;
            var kingEditorParams ={
                filePostName  : "file",
                uploadJson :'http://upload.qiniu.com/',  //http://upload.qiniu.com/ /admin/pic/uploadKindEditor/'+$("#imageType").val()
                dir : "image",
                extraFileUploadParams:{
                    token: uptoken
                }
            };
            var newsAddEditor=KindEditor.create("#userForm [name=description]", kingEditorParams);
        },
        error:function(){
        }
    });
});
