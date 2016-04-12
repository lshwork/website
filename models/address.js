/**
 * Created by lsh on 2015/11/24 0024.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;


module.exports = mongoose.model('Address',new Schema({
    name:{type:String,require:true},
    phone:{type:String,require:true},
    isDefault:{type:Number,default:0},
    community:{type:String,require:true},
    location:{type:String,require:true},
    userId:{type:ObjectId,require:true,ref:'User'},
    deleted:{type:Boolean,default:false},
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));