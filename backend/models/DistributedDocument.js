const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistributedDocumentSchema = new Schema({
    document_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Document", 
        required: true 
      },
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
      },
      distribution_date: { 
        type: Date, 
        default: Date.now 
      },
      distributed_by: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
      },
      status: { 
        type: String, 
        enum: ['pending', 'sent', 'failed'], 
        default: 'pending' 
      }
    }, {
      timestamps: true,
    });
    
const DistributedDocument = mongoose.model("DistributedDocument", DistributedDocumentSchema);
module.exports = DistributedDocument;