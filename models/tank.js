import mongoose from "mongoose";

const tankSchema = mongoose.Schema({
    sideNumber: String,
    producer: String,
    model: String,
    curMod: String,
    year: Date,
    introductionDate: Date,
    mileage: Number,
    ammoCount: Number,
    armor: [Number],
    createdAt: {
        type: Date,
        default: new Date()
    },
    updateDate: {
        type: Date,
        default: new Date()
    },
})

var Tanks = mongoose.model('Tanks', tankSchema);

export default Tanks;