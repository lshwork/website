var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
/**
 * 活动报名
 * @type {Model|Aggregate|*}
 */
exports.ActivityApply = mongoose.model('ActivityApply', new Schema({
    activityName: {type: String},//活动名称
    realName: {type: String}, //真实姓名
    phone: {type: String}, //电话、手机号码
    identification: {type: String}, //身份证,
    age:{type: String},//年龄
    job:{type: String},//职业
    deleted:{type:Boolean,default:false},
    createdTime: {type: Date, default: Date.now, index: true},
    updatedTime: {type: Date, default: Date.now, index: true}
}));

