/**
 * Created by fangjunfeng on 16-3-28.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingSchema = new Schema({
    key: { type: String, required: true, index: true },
    value: { type: Schema.Types.Mixed, required: true },
    deleted: { type: Boolean, default: false }, //是否删除
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
});

settingSchema.statics.coupon = function(cb) {
    var defaultValue = {
        takingValidateSms: true
    };
    this.findOneAndUpdate(
        {key: 'coupon', deleted: false},
        {$setOnInsert: {
            value: defaultValue,
            createdTime: Date.now(),
            updatedTime: Date.now()
        }},
        {new: true, upsert: true},
        function(err, setting) {
            if (err) return cb(err);
            cb(err, setting.value)
        }
    );
};

settingSchema.statics.updateCoupon = function(setting, cb) {
    this.update(
        {key: 'coupon', deleted: false},
        {value: setting, updatedTime: Date.now()},
        {upsert: true, setDefaultsOnInsert: true},
        cb
    );
};

module.exports = mongoose.model('Setting', settingSchema);