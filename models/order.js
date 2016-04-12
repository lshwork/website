/**
 * Created by lsh on 2015/11/10 0010.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment=require('moment');

/**
 * TODO 专用于家政的订单，以后要改成别的名称
 * @type {Model|Aggregate|*}
 */
module.exports = mongoose.model('Order',new Schema({
    orderId:{type:String,require:true,index:{unique:true}},
    type: { type: Number, required: true },//订单类型  0:临时保洁
    userPhone: { type: String, required: true },//用户手机号(用户名)
    address: { type: String, required: true },//服务地址
    serviceTime: { type: Date, required: true },//服务开始时间
    orderStatus: { type: Number, default: 0 , required: true},//订单状态,0:待处理 1:服务中 2:待评价 3:已评价
    payStatus: { type:Number, default: 0 },//付款状态,0:未付款 1:已付保证金  2:已付全款
    deleted: { type: Boolean, default: false },//订单删除状态
    money:{type:Number},//订单金额
    serviceHours:{type:Number},//服务时长
    serviceType:{type:Number},//长期钟点工主要服务内容 0:家庭保洁 1:买菜烧饭 2:看护病人 3:照看小孩
    houseArea:{type:String},//房屋面积
    serviceFrequency:{type:Array},//每周服务频率
    expectedPrice:{type:String},//期望价格
    serviceAunt:{type:String},//服务阿姨
    contactPhone:{type:String},//联系人电话
    contactName:{type:String},//联系人姓名
    persons:{type:Number},//家庭人数
    cookHobby:{type:Array},//烧饭喜好
    buyer:{type:Number},//谁买菜
    isPet:{type:Number},//是否有宠物
    isHome:{type:Boolean},//是否住家
    certificates:{type:Number},//证件

    others:{type:String},//其他需求
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() }
}));
