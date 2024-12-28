const express = require('express');
const router = express.Router();
const { createDemande, getDemandeForUser, getAllDemandes, deleteDemande } = require('../controllers/demandeController');

// Route to Create a demande
router.post('/create', createDemande);
// Route to Get all demandes for a user
router.get('/user/:user_id', getDemandeForUser);
// Route to Get all demandes - ADMIN
router.get('/all', getAllDemandes);
// Route to Delete a demande
router.delete('/:id', deleteDemande);

module.exports = router;