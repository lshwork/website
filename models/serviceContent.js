/**
 * Created by lsh on 2015/11/13 0013.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

module.exports = mongoose.model('ServiceContent', new Schema({
    type: {type: Number, required: true,unique:true},//订单类型  0:临时保洁
    description: {type: String},
    scope: {type: String},

    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() }
}));