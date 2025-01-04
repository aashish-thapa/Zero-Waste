const axios = require('axios');
const fetchRecipes = async(Ingredients) =>{
    try{
        const response = await axios.post('openai api /recipe', {ingredients});
        return response.data;
    }catch(err){
        console.error(err);
        throw new Error('Failed to fetch recipes from api');
    }
}
module.exports = {
    fetchRecipes,
};