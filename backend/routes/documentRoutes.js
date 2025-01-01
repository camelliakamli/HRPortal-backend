const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadDocument, getDocumentsForUser, getAllDocumentsForAdmin, getDocumentByID, deleteDocument, archiveDocument, viewDocument } = require('../controllers/documentController');

// MULTER CONFIG
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Store file with unique name
    },
});

const upload = multer({ storage: storage });

// Route to upload a document
router.post('/upload', upload.single('document'), uploadDocument);

// Route to fetch documents for a specific user
router.get('/user/:user_id', getDocumentsForUser); 

// Admin route to get all documents (no user_id here)
router.get('/admin/all-documents', getAllDocumentsForAdmin); // Admin route to get all documents

// Get document by ID
router.get('/document/:id', getDocumentByID);

// Delete document by ID
router.delete('/document/:id', deleteDocument);

// Archive a document
router.post('/document/:id/archive', archiveDocument);

router.get('/view/:id', viewDocument);

module.exports = router;
