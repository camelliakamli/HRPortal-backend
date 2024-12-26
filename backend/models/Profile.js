const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photo_profile: { type: String, default: '' },  
  address: { type: String, default: '' },
  status: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active' },

}, {
  timestamps: true,
});

const profile = mongoose.model('Profile', profileSchema);
module.exports = mongoose.model('Profile', profileSchema);
