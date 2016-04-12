/**
 * Created by fangjunfeng on 15-11-18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 地区、城市
 * @type {Model|Aggregate|*}
 */
module.exports = mongoose.model('Area', new Schema({
    sn: { type: Number, required: true, default: 1, index: true }, //序号，数字越小越靠前
    name: { type: String, required: true },
    firstLetter: { type: String, required: true }, //首字母
    areaCode: { type: String, required: true }, //区号
    zipCode: { type: String }, //邮编
    enabled: { type: Boolean, default: false, index: true }, //是否开启
    deleted: { type: Boolean, default: false, index: true },
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));