'use strict';

let bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });
  User.prototype.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  User.associate = function(models) {
    USER.hasMany(product);
  };
  return User;
};
