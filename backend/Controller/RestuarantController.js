const Restaurant = require("../Model/Restaurants");

exports.getLists = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant lists" });
  }
};

exports.AddresLists = async (req, res) => {
  try {
    const { name, cuisine, rating, deliveryTime, featured, image, menu, id } =
      req.body;

    if (!name || !cuisine || !rating || !deliveryTime || !menu) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // let imagePath = null; // Initialize imagePath to null
    // if (req.files && req.files.image && req.files.image.length > 0) {
    //   // Assuming the first file is the image
    //   const imageFile = req.files[0];
    //   imagePath = `${process.env.BACKEND_URL}/uploads/${imageFile.filename}`;
    // }

    // const menuImages = req.files.menuImages; // Assuming menuImages is an array of files
    // const menuImagesPaths = menuImages.map((file) => {
    //   return `${process.env.BACKEND_URL}/uploads/${file.filename}`;
    // })

    const existingRestaurant = await Restaurant.findOne({ _id: id });
    if (existingRestaurant) {
      if (existingRestaurant._id.toString() === id) {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            name,
            image,
            cuisine,
            rating,
            deliveryTime,
            featured,
            menu: JSON.parse(menu),
          },
          { new: true }
        );
        if (!updatedRestaurant) {
          return res.status(404).json({ message: "Restaurant not found" });
        }
        return res.status(200).json({
          updatedRestaurant,
          message: "Restaurant updated successfully",
        });
      }

      return res
        .status(400)
        .json({ message: "Restaurant name already exists" });
    }
    // Create a new restaurant
    const newRestaurant = new Restaurant({
      name,
      image,
      cuisine,
      rating,
      deliveryTime,
      featured,
      menu: JSON.parse(menu),
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error("Error adding restaurant:", error); // Log the error for debugging
    res.status(500).json({ message: error + "Error adding restaurant" });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, cuisine, rating, deliveryTime, featured, menu } =
      req.body;

    // Find the restaurant by ID and update it
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, image, cuisine, rating, deliveryTime, featured, menu },
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant" });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
console.log(id);
    // Find the restaurant by ID and delete it
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant" });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    // Return the restaurant details
    return res.status(200).json({restaurant});

  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({ message: "Error fetching restaurant" });
  }
};
