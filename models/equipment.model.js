const mongoose = require("mongoose")
const Schema = mongoose.Schema

const equipmentSchema = new Schema({
    mask: String,
    fins: String,
    wetsuit: String,
    jacket: String,
})

const Equipment = mongoose.model("Equipment", equipmentSchema)

module.exports = Equipment