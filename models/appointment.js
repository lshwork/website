/**
 * Created by fangjunfeng on 15-11-20.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

/**
 * 预约
 * @type {Model|Aggregate|*}
 */
module.exports = mongoose.model('Appointment',new Schema({
    sn: {type:String, require:true, index:{unique:true}}, // 预约编号
    type: { type: Number, required: true },//预约类型  1: 干洗 2:家政 3:养老 4:理财 5:车险 6:贷款
    objectId: {type: ObjectId, index: {sparse: true},ref:'Finance'}, //预约对象 干洗、家政、养老不用填，理财、车险对应产品id
    userId: {type: ObjectId, required: true, index: true,ref:'User'}, //预约用户id
    contact: {
        name: String, //联系人
        phone: String //联系电话，联系方式
    },
    address: {type: String}, //地址
    orderDate: {type: Date}, //预约日期
    timeRange: {  //预约时间段
        from: Number,
        to: Number
    },
    state: {type: Number, required: true, default: 1, index: true}, //预约状态 -1: 取消 1:提交预约 2:确认预约 3:派人上门 4:已完成
    remark: {type: String,default:''}, //备注
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));