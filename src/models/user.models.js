const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    
  },
  admin: {
    type: Boolean,
    default: false,
  }
});

userSchema.statics.encrypt = function () {
  console.log('encrypt')
}

userSchema.methods.compare = function () {
  console.log('compare')
}

module.exports = model('User', userSchema);