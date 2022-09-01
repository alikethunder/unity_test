const mongoose = require('mongoose')
const Schema = mongoose.Schema

const First = new Schema(
    {
        country: String,
        city: String,
        name: String,
        location: {
            ll: [Number]
        },
        students: [{ year: Number, number: Number }]
    },
)

module.exports = mongoose.model('firsts', First)