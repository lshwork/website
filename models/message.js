/**
 * Created by fangjunfeng on 15-11-19.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

/**
 * 系统消息、小区通知、政务公告
 * @type {Model|Aggregate|*}
 */
module.exports = mongoose.model('Message', new Schema({
    receiverType: {type: Number, required: true, index: true}, // 接受者类型 1:用户 2:小区
    receiverId: {type: ObjectId, required: true, index: true}, // 接受者id
    receiverName:{type:String},
    type: {type: Number, required: true, index: true}, // 消息类型 1:系统消息 2:小区通知 3:政务公告
    title: {type: String}, // 消息标题
    content: {type: String, required: true}, //消息内容
    isRead:{type:Boolean,require:true,default:false},//已读
    deleted: {type: Boolean, default: false, index: true},
    createdTime: {type: Date, default: Date.now, index: true},
    updatedTime: {type: Date, default: Date.now, index: true}
}));