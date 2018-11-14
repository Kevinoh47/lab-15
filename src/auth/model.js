'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String},
  role: {type: String, default:'user', enum:['user','editor','admin']}
});

const capabilities = {
  user: ['read'],
  editor: ['create', 'read', 'update'],
  admin: [ 'create', 'read', 'update', 'delete'],
}

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password,10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch( error => {throw error;} );
});

// TODO see video ~46:00
userSchema.methods.can = function(capability) {
  return capabilities[this.role].includes(capability);
};

userSchema.statics.createFromOAuth = function(incoming) {

  if ( ! incoming || ! incoming.email ) {
    return Promise.reject('VALIDATION ERROR: missing username/email or password ');
  }

  return this.findOne({email:incoming.email})
    .then(user => {
      if ( ! user ) { throw new Error ('User Not Found'); }
      return user;
    })
    .catch( error => {
    // Create the user
      let username = incoming.email;
      let password = 'none';
      return this.create({
        username: username,
        password: password,
        email: incoming.email,
      });
    });

};

userSchema.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)

    // .then(user => user && user.comparePassword(auth.password)) // TODO I think this is a bug: returns bool rathr than user.
    .then(user => {
      console.log('MODEL.JS AUTHENTICATE BASIC - user:' , user);
      if(user && user.comparePassword(auth.password)) {
        return user;
      }})
    .catch(console.error);
};

userSchema.statics.authenticateToken = function(token) {
  let parsedToken = jwt.verify(token, process.env.SECRET || 'changeit');
  let query = {_id:parsedToken.id};
  return this.findOne(query)
    .then(user => {
      return user;
    })
    .catch(error => error);
};

// Compare a plain text password against the hashed one we have saved
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

// Generate a JWT from the user id and a secret
userSchema.methods.generateToken = function() {
  let tokenData = {
    id:this._id,
    capabilitites: capabilities[this.role],
  };
  return jwt.sign(tokenData, process.env.SECRET || 'changeit' );
};

export default mongoose.model('users', userSchema);
