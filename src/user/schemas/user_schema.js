import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';

const owasp = require('owasp-password-strength-test');

const { Schema } = mongoose;

const validateLocalStrategyProperty = property => ((this.provider !== 'local' && !this.updated) || property.length);
const validateLocalStrategyEmail = email => ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));

const userSchema = new Schema({
  firstName: {
    type: String, trim: true, default: '', validate: [validateLocalStrategyProperty, 'first name is required'],
  },
  lastName: {
    type: String, trim: true, default: '', validate: [validateLocalStrategyProperty, 'last name is required'],
  },
  displayName: { type: String, trim: true },
  email: {
    type: String, unique: true, lowercase: true, trim: true, default: '', validate: [validateLocalStrategyEmail, 'email is required'],
  },
  username: {
    type: String, unique: 'Username already exists', required: 'username is required', lowercase: true, trim: true,
  },
  password: { type: String, default: '' },
  salt: { type: String },
  access_token: { type: String },
  profileImageURL: { type: String, default: 'modules/users/client/img/profile/default.png' },
  provider: { type: String, required: 'Provider is required' },
  providerData: {},
  additionalProvidersData: {},
  roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'], required: 'role is required' },
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  /* For reset password */
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});
userSchema.index({ username: 1 });

userSchema.pre('save', (next) => {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

/**
 * Hook a pre validate method to test the local password
 */
userSchema.pre('validate', (next) => {
  if (this.provider === 'local' && this.password && this.isModified('password')) {
    const result = owasp.test(this.password);
    if (result.errors.length) {
      const error = result.errors.join(' ');
      this.invalidate('password', error);
    }
  }
  next();
});

/**
 * Create instance method for hashing a password
 */
userSchema.methods.hashPassword = password => (
  this.salt && password
    ? crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'base64').toString('base64')
    : password
);

/**
 * Create instance method for authenticating user
 */
userSchema.methods.authenticate = password => (this.password === this.hashPassword(password));

userSchema.statics.findUniqueUsername = async (username, suffix) => {
  try {
    const possibleUsername = username.toLowerCase() + (suffix || '');
    const user = await this.findOne({ username: possibleUsername }).exec();
    if (!user) {
      return Promise.resolve(possibleUsername);
    }
    return await this.findUniqueUsername(username, (suffix || 0) + 1);
  } catch (err) {
    return Promise.reject(err);
  }
};

const User = mongoose.model('users', userSchema);
export default User;
