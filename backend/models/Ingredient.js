const mongoose = require ('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expirationnDate: {
        type: Date,
        required: true
    } ,
    userId: {
        type: String,
        required: true
    },
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;