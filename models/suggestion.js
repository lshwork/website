/**
 * Created by lsh on 2015/12/8 0008.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
/**
 * 系统消息、小区通知、政务公告
 * @type {Model|Aggregate|*}
 */
module.exports = mongoose.model('Suggestion', new Schema({
    content:{type:String,require:true},
    contact: {type: String,require:true},
    userId: {type: ObjectId, required: true,ref:'User'},
    deleted:{type:Boolean,default:false},
    createdTime: {type: Date, default: Date.now, index: true},
    updatedTime: {type: Date, default: Date.now, index: true}
}));