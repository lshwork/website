/**
 * Created by fangjunfeng on 16-3-1.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * 车辆信息
 * @type {Model|Aggregate|*}
 */
exports.Car = mongoose.model('Car', new Schema({
    communityId: { type: ObjectId, required: true, index: true, ref: 'Community' },
    house: { type: String, required: false }, //楼号房号
    phone: { type: String, required: true, index: true }, //手机号
    num: { type: String, required: true, index: true }, //车牌号
    owner: { type: String, required: false }, //车主名
    signDate: { type: Date, required: false, index: true }, //上牌日
    brand: { type: String, required: false }, //品牌
    model: { type: String, required: false }, //型号
    vin: { type: String, required: false }, //车架号
    engineNum: { type: String, required: false }, //发动机号
    insurer: { type: String, required: false }, //保险人名
    insurance: { type: String, required: false }, //保险公司
    commerceAmount: { type: Number, required: false }, //商业险额
    compulsoryAmount: { type: Number, required: false }, //交强险额
    progress: { type: Number, required: false, default: 1 }, //进度 1:未认领 2:未报价 3:未下单 4:未打单 5:未送单 6:已完成
    seller: { type: ObjectId, required: false, index: true, ref: 'Seller' }, //电销员
    contactDate: { type: Date, required: false }, //最近联系日
    hitDate: { type: Date, required: false }, //打单日
    sender: { type: String, required: false }, //送单人
    finishDate: { type: Date, required: false }, //完成日
    insuranceAmount: { type: Number, required: false }, //保险公司卡额
    corpAmount: { type: Number, required: false }, //公司卡额
    couponAmount: { type: Number, required: false }, //现金抵用券额
    gift: { type: String, required: false }, //其它礼品
    remark: { type: String, required: false }, //备注
    deleted: { type: Boolean, default: false, index: true },
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true } //修改时， 登记时
}));


