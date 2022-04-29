const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        city_id: {
            type: String,
            required: true
        },
        location_id: {
            type: String,
            required: true
        },
        country_name: {
            type: String,
            required: true
        }
    }
);


// export the model
module.exports = mongoose.model('Location', LocationSchema, 'Locations');