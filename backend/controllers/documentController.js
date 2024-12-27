const express = require('express');
const Document = require('../models/Document');
const multer = require('multer');
const path = require('path');


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
const deleteDocument = async (req, res) => {
    try{
        const { id } = req.params;

        // Find and delete the document
        const document = await Document.findByIdAndDelete(id);

        // Check if the document was found and deleted
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Document deleted successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
//Distriubute Document

//Archive Document
module.exports = { uploadDocument, getDocumentsForUser, getAllDocumentsForAdmin ,  getDocumentByID , deleteDocument };
