const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Second = new Schema(
    {
        country: String,
        overallStudents: Number
    },
)

module.exports = mongoose.model('seconds', Second)