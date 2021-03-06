const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  member: { type: String,},
  starttime: { type: Date},
  endtime: { type: Date}
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
