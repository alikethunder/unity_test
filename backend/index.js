
const mongoose = require('mongoose');

const First = require('./models/first');
const Second = require('./models/second');

mongoose
    .connect('mongodb://mongodb_test:27017/', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const first = require('./first.json');

const second = require('./second.json');

async function main() {

    const first_count = await First.countDocuments();

    if (!first_count) await First.insertMany(first);

    const second_count = await Second.countDocuments();

    if (!second_count) await Second.insertMany(second);

    First
        .aggregate(
            [
                {
                    $addFields: {
                        "longitude": { $arrayElemAt: ["$location.ll", 0] },
                        "latitude": { $arrayElemAt: ["$location.ll", 1] },
                    }
                },
                {
                    $lookup: {
                        from: 'seconds',
                        localField: 'country',
                        foreignField: 'country',
                        as: 'second'
                    }
                },
                {
                    $addFields: {
                        "diff": { $subtract: [{ $sum: "$students.number" }, { $sum: "$second.overallStudents" }] }
                    }
                },
                {
                    $group: {
                        _id: "$country",
                        allDiffs: { $push: "$diff" },
                        count: { $sum: 1 },
                        longitude: { $push: "$longitude" },
                        latitude: { $push: "$latitude" },
                    }
                },
                {
                    $out: "thirds"
                }
            ]
        )
        .exec()
}

main();