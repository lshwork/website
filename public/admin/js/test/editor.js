/**
 * Created by fangjunfeng on 16-1-26.
 */
KindEditor.plugin('hello', function(K) {
    var editor = this, name = 'hello';
    editor.clickToolbar(name, function() {
        editor.insertHtml('你好');
    });
});

KindEditor.lang({
    hello: '你好'
});
$(function() {
    var editor = KindEditor.create('#editor_id', {
        items: ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'cut', 'copy', 'paste',
            'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
            'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
            'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
            'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
            'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
            'anchor', 'link', 'unlink', '|', 'hello']
    });
});