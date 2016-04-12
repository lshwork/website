/**
 * Created by lsh on 2015/12/8 0008.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * 新闻
 * @type {Model|Aggregate|*}
 */
module.exports = mongoose.model('New', new Schema({
    title:{type:String,require:true,index:true},
    image: {type: String,require:false},
    desc: {type: String, required: true},
    priority:{type:Number,default:0},//优先级
    content: {type: String},
    enabled:{type:Boolean,default:true},
    deleted:{type:Boolean,default:false},
    createdTime: {type: Date, default: Date.now, index: true},
    updatedTime: {type: Date, default: Date.now, index: true}
}));