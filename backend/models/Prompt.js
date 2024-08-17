const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promptSchema = new Schema({
    prompt: {
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

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;