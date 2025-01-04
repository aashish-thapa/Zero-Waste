const mongoose = require('mongoose');

const storageTipSchema = new mongoose.Schema({
    ingredient: {
        type: String,
        required: true
    },
    tip: {
        type: String,
        required: true
    }
})
const StorageTip = mongoose.model('StorageTip', storageTipSchema);
module.exports = StorageTip
