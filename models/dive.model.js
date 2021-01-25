const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diveSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
  register: Number,
  place: String,
  country: String,
  outside_temperature: Number,
  water_temperature: Number,
  visibility: String,
  start_time: String,
  end_time: String,
  duration: Number,
  start_pressure_tank: Number,
  end_pressure_tank: Number,
  nitrox: Number,
  max_depth: Number,
  location: { type: Object },
  wetsuit_thickness: Number,
  wetsuit_size: String,
  jacket_size: String,
  fins_size: String,
  weight: String,
});

const Dive = mongoose.model("Dive", diveSchema);

module.exports = Dive;
