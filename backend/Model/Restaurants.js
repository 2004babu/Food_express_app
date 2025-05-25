const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {   type: String, required: true },
    image: { type: String, required: true },
    cuisine: { type: String, required: true },
    rating: { type: Number, required: true },
    deliveryTime: { type: String, required: true },

    featured: { type: Boolean, default: false },
    menu: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    },{timestamps:true});


const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;

  