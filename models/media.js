/**
 * Created by fangjunfeng on 16-3-15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.Article = mongoose.model('Article', new Schema({
    title: { type: String, required: true, index: true }, //标题
    summary: { type: String, required: true }, //摘要
    content: { type: String, required: true }, //内容
    enabled: { type: Boolean, default: true }, //是否开启
    deleted: { type: Boolean, default: false }, //是否删除
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
}));
