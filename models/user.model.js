const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        enum: ['ADMIN', 'EDITOR', 'GUEST'],
        default: 'GUEST'
    },
    dives: {type: Schema.Types.ObjectId, ref: 'Dive'},
    my_equipment: {type: Schema.Types.ObjectId, ref: 'Equipment'}
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User