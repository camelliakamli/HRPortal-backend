const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
    },
    type: { 
        type: String, 
        enum: ['Fiche de Paie', 'Fiche de Poste', 'Contrat de Travail'], 
        required: true, 
    },
    file_path: { 
        type: String, 
        required: true, 
    },
    upload_date: { 
        type: Date, 
        default: Date.now, 
    },
    is_archived: { 
        type: Boolean,
        default: false, 
    },
}, {
    timestamps: true,
  });

const Document = mongoose.model("Document", DocumentSchema);
module.exports = mongoose.model("Document", DocumentSchema);