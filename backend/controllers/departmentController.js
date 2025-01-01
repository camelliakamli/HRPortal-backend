const Department = require('../models/Department');
const createError = require('../utils/error');

//FUNCTION TO CREATE DEPARTMENT
const createDepartment = async (req, res, next) => {
    try{
        const { name, manager, employees } = req.body;

        //Validate Manager and employees
        const managerExists = await User.findById(manager);
        if (!managerExists) {
          return res.createError(400, "Manager does not exist");
        }
        
        if (employees && employees.length > 0) {
            const invalidEmployees = await User.find({ _id: { $in: employees }, department: { $ne: null } });
            if (invalidEmployees.length > 0) {
              return res.status(400).json({
                message: "One or more employees are already assigned to a department.",
              });
            }
          }
        // Create the department
      const department = new Department({ name, manager, employees });
      await department.save();

      // Update manager and employee records with the department reference
      await User.findByIdAndUpdate(manager, { department: department._id });
      if (employees && employees.length > 0) {
        await User.updateMany({ _id: { $in: employees } }, { department: department._id });
      }

      res.status(201).json(department);

    }catch(error){
        console.error("Error creating Department:", error);
        next(createError(500, "Internal server error."));
    }
};


module.exports = { createDepartment };
