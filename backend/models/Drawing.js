const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drawingSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: false,
    },
    drawing: {
        type: Buffer,
        required: true,
        unique: false,
    },
    prompt: {
        type: Buffer,
        required: true,
        unique: false,
    },
    timestamp: {
        type: String,
        required: true,
        unique: false,
    },
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;