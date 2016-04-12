/**
 * Created by fangjunfeng on 15-10-27.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var userSchema = new mongoose.Schema({
    username: { type: String, required: false, index: { unique: true, sparse : true } },
    phone: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: false, index: { unique: true , sparse : true} },
    password: { type: String },
    enabled: { type:Boolean, default: true },
    deleted: { type: Boolean, default: false, index: true },
    createdTime: { type: Date, default: Date.now, index: true },
    updatedTime: { type: Date, default: Date.now, index: true }
});

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.password) return next();
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, crypted) {
            if (err) return next(err);
            console.log(crypted);
            user.password = crypted;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, matched) {
        if (err) return cb(err);
        cb(null, matched);
    });
};



exports.User = mongoose.model('User', userSchema);
