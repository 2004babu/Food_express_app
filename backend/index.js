const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({limit: "50mb"})); // Increase the limit to 50mb
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase the limit to 50mb

app.use(cookieParser());

//db
const connectMongoDB = require("./utils/db");
connectMongoDB();

// cors
const CLIENT_URL = process.env.CLIENT_URL; // Dynamic frontend URL

const corsOptions = {
  origin: CLIENT_URL,
  methods: ["POST", "GET","DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// Basic route

const authRoute = require("./Router/authRoute");
const restaurantRoute = require("./Router/restaurantRoute");
app.use("/pizza/auth", authRoute);
app.use("/pizza/res", restaurantRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(express.static(path.join(__dirname,"../client/dist")));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
