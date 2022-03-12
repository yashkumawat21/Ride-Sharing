const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DriverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo :{
    type : String,
    required : true
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Driver = mongoose.model("drivers", DriverSchema);