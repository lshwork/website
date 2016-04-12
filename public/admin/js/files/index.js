/**
 * Created by fangjunfeng on 16-1-22.
 */

var lesnho = lesnho || {};
lesnho.FilesBox = function() {
    var self = this;
    $('#filesBox .box-footer button:first').prop('disabled', true);
    $('#filesBox .box-footer button:last').prop('disabled', true);
    $('#filesBox .box-footer button:first').click(function(event) {
        self.prev();
    });
    $('#filesBox .box-footer button:last').click(function(event) {
        self.next();
    });
};

$.extend(lesnho.FilesBox.prototype, {
    markers: [],
    nextMarker: null,
    items: [],
    loadList: function(marker) {
        var self = this;
        $.get('/admin/files/list', {marker: marker}, function(data) {
            if (data.marker) {
                self.markers.push(data.marker);
                $('#filesBox .box-footer button:last').prop('disabled', false);
            } else {
                $('#filesBox .box-footer button:last').prop('disabled', true);
            }
            if (self.markers.length > 1) {
                $('#filesBox .box-footer button:first').prop('disabled', false);
            } else {
                $('#filesBox .box-footer button:first').prop('disabled', true);
            }
            var domain = data.domain;
            var rows = $.map(data.items, function(item, i) {
                return [
                    '<tr>',
                    '<td>', '<img src="' + domain + encodeURIComponent(item.key) + '?imageView2/1/w/50/h/50/q/100' + '">', '</td>',
                    '<td>', item.key, '</td>',
                    '<td>', item.mimeType, '</td>',
                    '<td>', item.putTime, '</td>',
                    '<td>', item.fsize, '</td>',
                    '</tr>'].join('');
            });
            $('#filesBox table tr:gt(0)').remove();
            $('#filesBox table').append(rows.join(''));
        });
    },
    prev: function() {
        var mLen = this.markers.length;
        if (mLen < 2) return;
        var marker = mLen == 2 ? null  : this.markers[mLen-3];
        this.markers.pop();
        this.markers.pop();
        this.loadList(marker);
    },
    next: function() {
        var mLen = this.markers.length;
        var marker = mLen > 0 ? this.markers[mLen-1] : null;
        this.loadList(marker);
    }
});

$(function() {
    var filesBox = new lesnho.FilesBox();
    filesBox.next();
});