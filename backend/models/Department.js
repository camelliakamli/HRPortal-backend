const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    manager:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employees: [{ // Array of employees
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    hierarchy_level: { 
        type: Number, 
        required: true 
      }
    }, {
      timestamps: true,
    }
);

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;