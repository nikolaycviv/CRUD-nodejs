'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/** User schema
 * 
 * The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes. 
 * The index: true options to givenName, familyName and email are to optimize queries that use these fields.
 * 
 * */
const UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    givenName: { type: String, required: true, max: 20, index: true },
    familyName: { type: String, required: true, max: 20, index: true }
}, { timestamps: true });

// added unique: true to e-mail validated via the plugin below
UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

// Export the model
module.exports = mongoose.model('User', UserSchema);
