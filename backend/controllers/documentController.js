const Document = require('../models/Document');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const createError = require('../utils/error');
//MULTER CONFIG
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'uploads/'); // Store files in the uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Store file with unique name
    }
});

const upload = multer({ storage: storage });

// Upload a document
const uploadDocument = async (req, res) => {
    try{
        const { user_id, type } = req.body;
        if(!user_id || !type || !req.file){
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        // Create Document instance   
        const document = new Document({
            user_id,
            type,
            file_path: req.file.path, // Save file path in DB
        });

        // Save in DB
        await document.save();
        res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
// Get all documents for a user
const getDocumentsForUser = async (req, res) => {
    try{
        //get the user id from req
        const { user_id } = req.params;

        //find all documents for the user
        const documents = await Document.find({ user_id });

        //check if user has any documents
        if(documents.length === 0){
            return res.status(404).json({ message: 'No documents found for this user' });
        }

        //return the documents
        res.status(200).json({ documents });
            

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get all documents (for admin)
const getAllDocumentsForAdmin = async (req, res) => {
    try{
        //fetch all documents from DB
        const documents = await Document.find();

        //check if there are any documents
        if(documents.length === 0){
            return res.status(404).json({ message: 'No documents found' });
        }

        //return the documents
        res.status(200).json({ documents });
            

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//get document by id
const getDocumentByID = async (req, res) => {
    try{
        const { id } = req.params;

        //find Document
        const document = await Document.findById(id);
        // Validate ObjectId
        /*if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid document ID' });
        }*/
        //check if document 
        if(!document){
            return res.status(404).json({ message: 'Document not found' });
        }
        //return document
        res.status(200).json({ document });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//Delete Document
//USING fs TO DELETE THE DOCUMENT FROM DISK ALSO NOT ONLY DB
const deleteDocument = async (req, res) => {
    try{
        const { id } = req.params;

        // Find and delete the document
        const document = await Document.findById(id);

        // Check if document exists
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Delete document from DB
        await document.remove();

        // Delete the associated file from the file system
        const filePath = path.join(__dirname, '..', document.file_path);
        fs.unlinkSync(filePath, (error) => {
            if (error) {
                console.error('Error deleteing Document',error);
            }
        });
        // Send a success response
        res.status(200).json({ message: 'Document deleted successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
//Distriubute Document

//Archive Document
const archiveDocument = async (req, res) =>{
    try{
        const { id } = req.params;

        // Find the document by ID
        const document = await Document.findById(document_id);

        // Check if the document exists
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Check if the document is already archived
        if (document.is_archived) {
            return res.status(400).json({ message: 'Document is already archived' });
        }

        // Archive the document by setting the is_archived field to true
        document.is_archived = true;
        await document.save();

        res.status(200).json({ message: 'Document archived successfully', document });

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { uploadDocument, getDocumentsForUser, getAllDocumentsForAdmin ,  getDocumentByID , deleteDocument ,archiveDocument };
