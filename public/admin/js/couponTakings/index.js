/**
 * Created by fangjunfeng on 16-3-9.
 */

$(function() {
    var drpLocale = lesnho.locale.daterangepicker;
    $('#takeRange, #useRange').daterangepicker({
        autoUpdateInput: false,
        locale: drpLocale
    });
    $('#takeRange, #useRange').on('apply.daterangepicker', function(ev, picker) {
        alert(picker.startDate.format(drpLocale.format) + drpLocale.separator + picker.endDate.format(drpLocale.format))
        $(this).val(picker.startDate.format(drpLocale.format) + drpLocale.separator + picker.endDate.format(drpLocale.format));
    });
    $('#takeRange, #useRange').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
});

function exportExcel() {
    var url = '/admin/couponTakings/exportExcel?' + $('#search_form').serialize();
    window.location.href = url;
}
