/**
 * Created by fangjunfeng on 16-3-15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

exports.Memorandum = mongoose.model('Memorandum', new Schema({
    minute: { type: String}, //分钟数
    content: { type: String }, //内容
    type:{type:Number}, //1:电话 2:短信
    num:{type:String},//车牌号
    startTime: { type: Date },//拨号时
    seller: { type: ObjectId,ref:"Seller",required: false, index: true}, //电销员
    deleted: { type: Boolean, default: false }, //是否删除
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));
