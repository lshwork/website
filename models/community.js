/**
 * Created by fangjunfeng on 15-11-18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

/**
 * 小区
 * @type {Model|Aggregate|*}
 */
module.exports = mongoose.model('Community', new Schema({
    sn: { type: Number, required: true, default: 1, index: true }, //序号，数字越小越靠前
    areaId: {type: ObjectId, required: true, index: true, ref: 'Area'},
    firstLetter: {type: String, required: true}, //首字母
    name: {type: String, required: true}, //名字
    address: {type: String, required: true}, //地址
    contact: {
        name: String, //联系人
        phone: String //联系电话，联系方式
    },
    alias:{type:String},
    description: {type: String},
    enabled: { type: Boolean, default: false, index: true }, //是否开启
    deleted: { type: Boolean, default: false, index: true },
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));
