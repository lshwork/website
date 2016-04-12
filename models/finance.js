/**
 * Created by fangjunfeng on 15-12-7.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

/**
 * 金融产品的类别，如月度理财、季度理财、年度理财
 * @type {Model|Aggregate|*}
 */
exports.FinanceCategory = mongoose.model('FinanceCategory',new Schema({
    type: { type: Number, required: true }, //类型 4:车险 5:理财 6:贷款
    name: { type: String, required: true }, //名称
    deleted: { type: Boolean, default: false, index: true },//删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));

/**
 * 金融产品
 * @type {Model|Aggregate|*}
 */
exports.Finance = mongoose.model('Finance',new Schema({
    type: { type: Number, required: true }, //类型  4:车险 5:理财 6:贷款
    classId:{type:ObjectId,required:true,index:true,ref:'FinanceCategory'},
    name: { type: String, required: true }, //名称
    logo: { type: String, required: true }, // logo 图片路径
    contactPhone:{type:String,require:true},
    top: { type: Boolean, default: false, index: true }, //是否置顶
    url: { type: String, required: true }, // 目标url地址
    startDate:{type:Date,require:true},
    endDate:{type:Date,require:true},
    deleted: { type: Boolean, default: false, index: true }, //删除状态
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));
