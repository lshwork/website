/**
 * Created by fangjunfeng on 16-1-23.
 */

var lesnho = lesnho || {};

lesnho.FileLibrary = function(options) {
    var template = [
        '<div id="fileLibraryModal" class="modal fade" tabindex="-1" role="dialog">',
            '<div class="modal-dialog">',
                '<div class="modal-content">',
                    '<div class="modal-header">',
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                        '<h4 class="modal-title">Modal title</h4>',
                    '</div>',
                    '<div class="modal-body">',
                        '<table class="table table-hover table-striped">',
                            '<tr>',
                                '<th>缩略图</th>',
                                '<th>文件名</th>',
                                '<th>mimeType</th>',
                                '<th>上传时间</th>',
                                '<th>文件大小</th>',
                            '</tr>',
                        '</table>',
                    '</div>',
                    '<div class="modal-footer">',
                        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                        '<button type="button" class="btn btn-primary">Save changes</button>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');
};

$.extend(lesnho.FileLibrary.prototype, {});