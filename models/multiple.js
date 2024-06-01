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

const MultipleSchema = new mongoose.Schema({
  team1: [EmployeeSchema],
  team2: [EmployeeSchema]
})

module.exports = mongoose.model("multiple", MultipleSchema);