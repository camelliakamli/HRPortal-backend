const Document = require('../models/Document');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Upload a document
const uploadDocument = async (req, res) => {
    try {
        const { user_id, type } = req.body;
        if (!user_id || !type || !req.file) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const document = new Document({
            user_id,
            type,
            file_path: req.file.path,
        });

        await document.save();
        res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get all documents for a user
const getDocumentsForUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const documents = await Document.find({ user_id });

        if (documents.length === 0) {
            return res.status(404).json({ message: 'No documents found for this user' });
        }

        res.status(200).json({ documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getAllDocumentsForAdmin = async (req, res) => {
    try {
        const documents = await Document.find()
            .populate('user_id',  'first_name last_name')
            .exec();

        if (documents.length === 0) {
            return res.status(404).json({ message: 'No documents found' });
        }

        res.status(200).json({ documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getDocumentByID = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json({ document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const filePath = path.join(__dirname, '..', document.file_path);
        
        // Delete file if it exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Document.findByIdAndDelete(id);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const archiveDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        if (document.is_archived) {
            return res.status(400).json({ message: 'Document is already archived' });
        }

        document.is_archived = true;
        await document.save();

        res.status(200).json({ message: 'Document archived successfully', document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// View document
const viewDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const filePath = path.join(__dirname, '..', document.file_path);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found on server' });
        }

        // Set appropriate content type based on file extension
        const ext = path.extname(filePath).toLowerCase();
        const contentType = ext === '.pdf' ? 'application/pdf' : 
                          ext === '.docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                          'application/octet-stream';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `inline; filename="${path.basename(filePath)}"`);
        
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    uploadDocument,
    getDocumentsForUser,
    getAllDocumentsForAdmin,
    getDocumentByID,
    deleteDocument,
    archiveDocument,
    viewDocument
};