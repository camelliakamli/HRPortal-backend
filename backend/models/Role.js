const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role_name: { type: String, enum: ['Admin', 'Employee'], required: true },
  permissions: { type: [String], required: true },
}, {
  timestamps: true,
});

const role = mongoose.model('Role', roleSchema);
module.exports = mongoose.model('Role', roleSchema);
