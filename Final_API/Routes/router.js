const express = require('express');

// We have to import controllers
const locationController = require('../Controllers/Location');
const mealTypeController = require('../Controllers/MealType');
const restaurantController = require('../Controllers/Restaurant');
const userController = require('../Controllers/User');
const paymentController = require('../Controllers/Payment');

const router = express.Router();

// Have my routes
router.get('/getLocations', locationController.getLocations);
router.get('/getAllRestaurants', restaurantController.getAllRestaurants);
router.get('/getRestaurantsByLocation/:cityName', restaurantController.getRestaurantsByLocation);
router.get('/getRestaurantsById/:restaurantId', restaurantController.getRestaurantsById);
router.get('/getMealTypes', mealTypeController.getMealTypes);
router.post('/userSignUp', userController.addNewUser);
router.post('/userLogin', userController.login);
router.post('/getFilteredRestaurants', restaurantController.getFilteredRestaurants);

// payment APIs
router.post('/payment', paymentController.payment);
router.post('/callback', paymentController.callback);


module.exports = router;