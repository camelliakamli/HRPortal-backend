const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String, 
      enum: ['active', 'inactive'],
      default: 'active',
    },
    deactivation_date: {
      type: Date,
    },
    reason_for_deactivation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;