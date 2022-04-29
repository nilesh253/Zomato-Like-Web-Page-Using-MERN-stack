const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }
);


// export the model
module.exports = mongoose.model('MealType', MealTypeSchema, 'Meals');