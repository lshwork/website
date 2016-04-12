/**
 * Created by lsh on 2015/12/8 0008.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
/**
 * 活动
 * @type {Model|Aggregate|*}
 */
exports.Activity = mongoose.model('Activity', new Schema({
    title:{type:String,required:true,index:true},
    image: {type: String,required:true},
    //communityId:{type:ObjectId,required:true,index:{ sparse : true},ref:'Community'},
    communities: {type: [{type:ObjectId, ref:'Community'}], index: true}, //小区，有多个
    desc: {type: String, required: true},
    content: {type: String},
    startDate:{ type: Date, required: true, index: true },
    endDate:{ type: Date, required: true, index: true },
    address: {type: String},
    cost: {type: Number,default:0}, //活动费用
    applyCount: {type: Number, default: 0}, //报名人数，不要用+1的方式修改此数
    limitCount: {type: Number, default: 0}, //限制人数
    deleted:{type:Boolean,default:false},
    createdTime: {type: Date, default: Date.now, index: true},
    updatedTime: {type: Date, default: Date.now, index: true}
}));

/**
 * 活动报名
 * @type {Model|Aggregate|*}
 */
exports.ActivityApply = mongoose.model('ActivityApply', new Schema({
    activityId: {type: ObjectId, required: true, index: true, ref: 'Activity'},
    userId: {type: ObjectId, required: true, index: true, ref: 'User'},
    realName: {type: String, required: true}, //真实姓名
    phone: {type: String, required: true}, //电话、手机号码
    deleted:{type:Boolean,default:false},
    createdTime: {type: Date, default: Date.now, index: true},
    updatedTime: {type: Date, default: Date.now, index: true}
}));

