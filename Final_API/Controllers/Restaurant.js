
// Location Model to work with
const Restaurant = require('../Models/Restaurant');

// functions for business logic and to talk to database

exports.getAllRestaurants = (req, res) => {
    Restaurant.find().then(result => {
        res.status(200).json({
            message: "Restaurants fetched",
            restaurants: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error in Database",
            error: error
        });
    });
}

exports.getRestaurantsByLocation = (req, res) => {
    const city_name = req.params.city_name;
    Restaurant.find({ city_name: city_name }).then(result => {
        res.status(200).json({
            message: `Restaurants fetched for ${city_name}`,
            restaurants: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error in Database",
            error: error
        });
    });
}

exports.getRestaurantsById = (req, res) => {
    const _Id = req.params._Id;
    Restaurant.find({ _id: _Id }).then(result => {
        res.status(200).json({
            message: `Restaurants details for ${_Id}`,
            restaurants: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error in Database",
            error: error
        });
    });
}

exports.getFilteredRestaurants = (req, res) => {
    const {
        mealtype,
        location,
        cuisine,
        hcost,
        lcost,
        sort,
        page
    } = req.body;

    let filterPayload = {};

    if (mealtype) {
        filterPayload = { mealtype_id: mealtype };
    }

    if (mealtype && location) {
        filterPayload = { mealtype_id: mealtype, location_id: location };
    }

    if (mealtype && cuisine) {
        filterPayload = { mealtype_id: mealtype, cuisine: cuisine };
    }

    if (mealtype && location && cuisine) {
        filterPayload = { mealtype_id: mealtype, location_id: location, cuisine: cuisine };
    }

    if (mealtype && hcost && lcost) {
        filterPayload = { 
            mealtype_id: mealtype, 
            min_price: {
                $lt: hcost,
                $gt: lcost
            } 
        };
    }

    if (mealtype && location && hcost && lcost) {
        filterPayload = { 
            mealtype_id: mealtype, 
            min_price: {
                $lt: hcost,
                $gt: lcost
            },
            location_id: location
        };
    }

    if (mealtype && cuisine && hcost && lcost) {
        filterPayload = { 
            mealtype_id: mealtype, 
            min_price: {
                $lt: hcost,
                $gt: lcost
            },
            cuisine: cuisine
        };
    }

    if (mealtype && location && cuisine && hcost && lcost) {
        filterPayload = { 
            mealtype_id: mealtype, 
            min_price: {
                $lt: hcost,
                $gt: lcost
            },
            location_id: location,
            cuisine: cuisine
        };
    }

   Restaurant.find(payload).sort({ min_price: sort }).then(result => {
        const count = Math.ceil(result.length / 5);
        const pageCountArr = [];

        const resultValues = result.slice(start, end);  // to return paginated items
        for (var i = 1; i <= count; i++) {
            pageCountArr.push(i);
        }

        res.status(200).json({ message: "Restaurant Fetched Sucessfully", 
                               restaurant: resultValues,
                               pageCount: pageCountArr, 
                               totalCount: result.length 
                            });
    }).catch(err => {
        res.status(500).json({ message: err })
    });

}