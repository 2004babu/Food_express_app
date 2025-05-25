const router = require("express").Router();
const {
  AddresLists,
  getLists,
  deleteRestaurant,
  updateRestaurant,
  getRestaurantById,
} = require("../Controller/RestuarantController");
const isAdmin = require("../utils/isAdmin");

const multer = require("multer");

const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use the original file extension
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 20 * 1024 * 1024, // 10MB for text fields
    fileSize: 50 * 1024 * 1024,
  },
});

router.get("/getLists", getLists);
router.get("/getRestaurant/:id",isAdmin,getRestaurantById);
// router.post("/updateRestaurant/:id", isAdmin, updateRestaurant);
// router.post("/addRestaurant", isAdmin, AddresLists);
// router.delete("/deleteRestaurant/:id", isAdmin, deleteRestaurant);
// router.post("/updateRestaurant/:id", upload.any("image"), updateRestaurant);
router.post(
  "/addRestaurant",
  upload.any("image"),
  isAdmin,
  AddresLists
);
router.delete("/deleteRestaurant/:id",isAdmin, deleteRestaurant);

module.exports = router;
