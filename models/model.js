const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  emplName: {
    type: String,
    default: "",
    require: true
  },
  emplKnox: {
    type: String,
    default: "",
    require: true,
  },
  emplGender: {
    type: String,
    default: "",
    require: true
  }
})

module.exports = mongoose.model("employees", EmployeeSchema);