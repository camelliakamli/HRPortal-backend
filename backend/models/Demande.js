const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemandeSchema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
    },
    type: { 
        type: String, 
        enum: ['Congé', 'Sortie', 'télétravail'], 
        required: true, 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending', 
    },
    start_date: { 
        type: Date, 
        required: true, 
    },
    end_date: { 
        type: Date 
    },
    request_date: { 
        type: Date, 
        default: Date.now, 
    },
}, {
    timestamps: true,
  });
const Demande = mongoose.model("Demande", DemandeSchema);
module.exports = Demande;