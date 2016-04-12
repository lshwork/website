/**
 * Created by fangjunfeng on 16-3-12.
 */

$(function() {
    var drpLocale = lesnho.locale.daterangepicker;
    $('#followRange').daterangepicker({
        autoUpdateInput: false,
        locale: drpLocale
    });
    $('#followRange').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format(drpLocale.format) + drpLocale.separator + picker.endDate.format(drpLocale.format));
    });
    $('#followRange').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
});

function exportExcel() {
    var url = '/admin/followers/exportExcel?' + $('#search_form').serialize();
    window.location.href = url;
}
