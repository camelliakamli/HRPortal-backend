const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadDocument , getDocumentsForUser, getAllDocumentsForAdmin , getDocumentByID , deleteDocument , archiveDocument  } = require('../controllers/documentController');

//MULTER CONFIG
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Store file with unique name
    },
  });

const upload = multer({ storage: storage });
 
//ROute to upload a document
router.post('/upload', upload.single('document'), uploadDocument);
// Get all documents for a user
router.get('/:user_id', getDocumentsForUser);
// Get all documents (for admin)
router.get('/', getAllDocumentsForAdmin);
//get document by ID
router.get('/document/:id', getDocumentByID);

router.delete('/document/:id', deleteDocument); 

router.post('/document/ id/archive', archiveDocument);

module.exports = router;