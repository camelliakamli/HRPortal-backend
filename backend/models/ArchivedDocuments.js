const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArchivedDocumentSchema = new Schema({
    document_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Document", 
        required: true 
      },
      archival_date: { 
        type: Date, 
        default: Date.now 
      },
      archived_by: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
      },

    }, {
      timestamps: true,
    });

const ArchivedDocument = mongoose.model("ArchivedDocument", ArchivedDocumentSchema);
module.exports = ArchivedDocument;