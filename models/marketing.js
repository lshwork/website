/**
 * Created by fangjunfeng on 16-3-9.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

/**
 * 优惠券
 * @type {*|Model|Aggregate}
 */
exports.Coupon = mongoose.model('Coupon',new Schema({
    type: { type: Number, required: true, index: true }, //类型 2:干洗券 3:家政券 4:车险券
    sn: { type: Number, required: true, default: 1, index: true }, //序号，数字越小越靠前
    name: { type: String, required: true }, //名称
    description: { type: String, required: true }, //信息，描述，使用说明
    startDate: { type: Date, required: true, index: true }, //开始日期
    endDate: { type: Date, required: true, index: true }, //结束日期
    deleted: { type: Boolean, default: false, index: true }, //删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 优惠券领取
 * @type {*|Model|Aggregate}
 */
exports.CouponTaking = mongoose.model('CouponTaking', new Schema({
    coupon: { type: ObjectId, required: true, index: true, ref: 'Coupon' }, //优惠券id
    phone: { type: String, required: true, index: true }, //手机号
    followedNum: { type: Number, required: true, index: true }, //吸粉人编号
    takeDate: { type: Date, required: true, default: Date.now, index: true }, //领取日期
    useDate: { type: Date, required: false, index: true }, //使用时间
    used: { type: Boolean, required: true, default: false, index: true }, //是否已使用
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 吸粉人
 * @type {*|Model|Aggregate}
 */
exports.FollowedUser = mongoose.model('FollowedUser', new Schema({
    num: { type: Number, required: true, index: {unique: true} }, //编号
    name: { type: String, required: true }, //姓名
    phone: { type: String, required: true, index: true }, //手机号
    enabled: { type: Boolean, required: true, default: true, index: true },//状态 正常/暂停
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 粉丝
 * @type {*|Model|Aggregate}
 */
exports.Follower = mongoose.model('Follower', new Schema({
    phone: { type: String, required: true }, //手机号
    followedUser: { type: ObjectId, required: true, index: true, ref: 'FollowedUser' }, //吸粉人id
    mode: { type: Number, required: true, default: 1, index: true }, //吸粉方式 1:优惠券 2:车辆登记
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 电销员
 * @type {*|Model|Aggregate}
 */


var sellerSchema = new mongoose.Schema({
    area: { type: ObjectId, required: true, index: true, ref: 'Area' }, //地区
    num: { type: Number, required: true, index: {unique: true} }, //编号
    name: { type: String, required: true }, //姓名
    password:{type:String},
    count:{type:Number,default:0},
    enabled: { type: Boolean, required: true, default: true, index: true },//状态 正常/暂停
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
});

sellerSchema.pre('save', function(next) {
    var seller = this;
    if (!seller.password) return next();
    if (!seller.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(seller.password, salt, function(err, crypted) {
            if (err) return next(err);
            console.log(crypted);
            seller.password = crypted;
            next();
        });
    });
});

sellerSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, matched) {
        if (err) return cb(err);
        cb(null, matched);
    });
};

exports.Seller = mongoose.model('Seller',sellerSchema);