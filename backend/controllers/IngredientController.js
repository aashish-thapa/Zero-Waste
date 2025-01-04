const Ingredient = require('../models/Ingredient');
const addIngredient = async(req, res) =>{
    try{
        const {name, expirationDate, quantity} = req.body;
        const ingredient = new Ingredient({name, expirationDate, quantity});
        await ingredient.save();
        res.json(ingredient);
    }
    catch(err){
        res.status(500).json({error: 'Failed to add ingredient '});

    }
}
module.exports = {
    addIngredient,
}