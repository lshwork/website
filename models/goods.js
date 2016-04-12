/**
 * Created by fangjunfeng on 15-11-20.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

/**
 * 商品分类
 * @type {Model|Aggregate|*}
 */
exports.GoodsCategory = mongoose.model('GoodsCategory',new Schema({
    //parentId: {type: ObjectId, index: {sparse: true}},
    type: {type: Number, required: true, index: true}, //类型 1:顺手早餐 2:社区商城
    name: {type: String, required: true}, //名称
    image:{type:String,require:true},
    subtitle: {type: String}, //副标题
    sort: {type: Number, required: true, default: 0}, //排序
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 商品
 * @type {Model|Aggregate|*}
 */
exports.Goods = mongoose.model('Goods', new Schema({
    //categoryId: {type: ObjectId, required: true, index: true}, //分类id
    categories: {type: [{type: ObjectId, ref: 'GoodsCategory'}], index: true},
    type: {type: Number, required: true, index: true}, //类型 1:顺手早餐 2:社区商城
    communities: {type: [{type:ObjectId, ref:'Community'}], index: true}, //在哪些小区售卖
    total: {type: Number, required: true}, //总库存
    name: {type: String, required: true}, //名称
    price: {type: Number, required: true, index: true}, // 价格
    originPrice: {type: Number, required: true}, //原价
    images: {type: Array}, //商品图片
    summary: {type: String}, //商品摘要
    description: {type: String}, //商品详情
    showed: {type: Boolean, required: true, default: true}, //是否上架
    startDate: {type: Date, required: true, index: true}, //开售日期
    endDate:{type: Date, required: true, index: true},//下架日期
    startDays: [{type: Number}], //星期几开售，有多个
    closeHours:{type:Number},
    goodsCode:{type:Number},
    sales:{type:Number,require:true,default:0},//销量
    sort: {type: Number, required: true, default: 0}, //排序
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 商品订单
 * @type {Model|Aggregate|*}
 */
exports.GoodsOrder = mongoose.model('GoodsOrder', new Schema({
    sn: {type:String, require:true, index:{unique:true}}, // 订单编号
    userId: {type: ObjectId, required: true, index: true, ref: 'User'},
    receiver: { // 收货人
        name: String,
        phone: String,
        address: String
    },
    type: {type: Number, required: true, default: 1}, //订单类型 1: 早餐 2:团购
    total: {type: Number}, //商品总数
    amount: {type: Number, required: true}, //商品总金额
    state: {type: Number, required: true, default: 1}, //订单状态 -1:已取消 1:未付款 2:已付款 3:已发货 4:已完成 5:已关闭
    refunded: {type: Boolean, required: true, default: false}, //是否退款
    refundAmount: {type: Number, default: 0}, //退款金额
    shipping: { // 物流
        fee: {type: Number, default: 0}, //费用
        company: {type: String}, //快递公司
        code: {type: String} //货运单号
    },
    payment: {
        code: {type: String}, //支付方式代码: alipay wxpay等
        time: {type: Date} //支付时间
    },
    wxpay: { //微信支付
        prepayId: {type: String}, //预支付id
        noncestr: {type: String}, //随机字符串
        timestamp: {type: Date} //时间戳
    },
    goods: [{
        goodsId: {type: ObjectId, required: true, ref: 'Goods'},
        name: {type: String},
        goodsCode:{type:Number},
        price: {type: Number},
        number: {type: Number},
        picture: {type: String},
        isEvaluate:{type:Boolean,default:false},
        breakfastDate:{type:Date},
        type: {type: Number, required: true, default: 1}, //1:默认 2:团购商品 3:限时折扣商品 4:组合套装 5:赠品
        payPrice: {type: Number, required: true} //商品实际支付价格
    }],
    goodsCode:{type:Number},
    communityId: {type: ObjectId,  ref: 'Community'},
    code:{type:String},
    transaction_id:{type:String},
    message: {type: String}, //留言
    shippingDate:{ type: Date, index: true }, //发货时间
    completeDate:{ type: Date, index: true }, //确认收货时间
    device_info:{type: String},//支付设备
    promoCodes: [{type: ObjectId, ref: 'PromoCode'}], //使用的优惠码，可以有多个
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));


/**
 * 退款单
 * @type {Model|Aggregate|*}
 */
exports.GoodsRefund = mongoose.model('GoodsRefund', new Schema({
    orderId: { type: ObjectId, required: true, index: true, ref: 'GoodsOrder' },
    refundFee: { type: Number, required: true }, //退款总金额
    state: { type: Number, default: 1 }, //退款状态 1:用户申请退款 2:用户取消退款 3:退款中 4:退款成功 5:退款失败
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 优惠码
 * @type {Model|Aggregate|*}
 */
exports.PromoCode = mongoose.model('PromoCode', new Schema({
    userId: {type: ObjectId, required: true, index: true, ref: 'User'},
    code: {type: String, required: true, index: true}, //优惠码
    value: {type: Number, required: true}, //面值
    state: {type: Number, default: 1}, // 状态 0:无效 1:有效 2:被使用
    startDate:{type:Date, require:true},
    endDate:{type:Date, require:true},
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 购物车
 * @type {Model|Aggregate|*}
 */
exports.ShoppingCart = mongoose.model('ShoppingCart', new Schema({
    userId: {type: ObjectId, required: true, index: true, ref: 'User'},
    goodsId: {type: ObjectId, required: true, ref: 'Goods'},
    count:{type:Number,required:true,default:1},
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 商品评价
 * @type {Model|Aggregate|*}
 */
exports.ShoppingEvaluate = mongoose.model('ShoppingEvaluate', new Schema({
    userId: {type: ObjectId, required: true, index: true, ref: 'User'},
    goodsId: {type: ObjectId, required: true, ref: 'Goods'},
    evaluate:{type:Number,required:true,default:1}, //1:好评 2:中评 3:差评
    remark: { type: String },
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));