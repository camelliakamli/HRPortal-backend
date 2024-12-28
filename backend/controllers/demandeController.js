const Demande = require('../models/Demande');
const createError = require('../utils/error');

//CREATE DEMANDE BY EMPLOYEE
const createDemande = async (req, res, next) => {
    try{
        //get user from req
        const { user_id, type, start_date, end_date } = req.body;

        //validate fields
        if(!user_id || !type || !start_date){
            return res.status(400).json({ message: 'Missing required fields' });
        }
        //CREATE NEW DEMANDE 
        const newDemande = new Demande({
            user_id,
            type,
            start_date,
            end_date,
        });

        const savedDemande = await newDemande.save();
        res.status(201).json({ message: 'Demande created successfully', savedDemande });


    }catch(error){
        console.error("Error creating Demande:", error);
        next(error);
    }
}

//GET ALL DEMANDE FOR USER
const getDemandeForUser = async (req, res, next) => {
    try{
        //get user id from req
        const { user_id } = req.params;
        //find all demandes for the user
        const demandes = await Demande.find({ user_id });
        res.status(200).json(demandes);


    }catch(error){
        console.error("Error getting Demande:", error);
        next(error);
    }
}
// FETCH ALL DEMANDES - FOR ADMIN
const getAllDemandes = async (req, res, next) => {
    try{
        const demandes = await Demande.find();
        res.status(200).json(demandes);
    }catch(error){
        console.error("Error getting Demande:", error);
        next(error);
    }
}

//DELETE DEMANDE
const deleteDemande = async (req,res,next) => {
    try{
        const { id } = req.params;
        const deletedDemande = await Demande.findByIdAndDelete(id);

        if(!deleteDemande){
            return createError(404, 'Demande not found');
        }
        
        res.status(200).json({ message: 'Demande deleted successfully' });
    }catch(error){
        console.error("Error deleting Demande:", error);
        next(error);
    }
}
 
//UPDATE DEMANDE STATUS BY ADMIN - Approve or Reject
const updateDemandeStatus = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { status } = req.body;
        
        //validate status
        if(!['Pending', 'Approved', 'Rejected'].includes(status)){
            return res.createError(400, 'Invalid status');
        }
        //update the status
        const updatedDemande = await Demande.findByIdAndUpdate(
            id, 
            { status },
            { new: true }
        );
        if (!updatedDemande) {
            return res.status(404).json({ error: 'Demande not found' });
          }
      
        res.status(200).json({ message: 'Demande status updated', demande: updatedDemande });
            

    }catch(error){
        console.error("Error updating Demande:", error);
        next(error);
    }
}

// CRUD OPERATIN FOR DEMANDE

module.exports = { createDemande , getDemandeForUser , getAllDemandes, deleteDemande, updateDemandeStatus };  