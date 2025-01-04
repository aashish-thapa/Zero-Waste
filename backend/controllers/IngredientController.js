const Ingredient = require('../models/Ingredient');

exports.addIngredient = async (req, res) => {
    try {
        const { name, expirationDate, userId } = req.body;

        // Preprocess date to ensure it’s in the correct format
        const formattedDate = new Date(expirationDate);
        if (isNaN(formattedDate)) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
        }

        const ingredient = new Ingredient({
            name,
            expirationDate: formattedDate,
            userId,
        });

        await ingredient.save();
        res.status(201).json(ingredient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
