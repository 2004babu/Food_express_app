const GoogleLoginUser = require("./GoogleLoginUser");
const userModel = require("../Model/userModel");

const admin =require("./firebaseAdmin");

const isAdmin =async (req, res, next) => {

   try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {

        return res.status(401).json({ message: "Unauthorized" });
    }

    const decodeUser = await admin.auth().verifyIdToken(token);
    req.user = decodeUser;  
    console.log("Decoded user:", decodeUser); // Log the decoded user object

    if (!req?.user?.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userModel.findOne({ email: req?.user?.email });
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    
    if (user && user.isAdmin) {
        console.log(user);

        next(); // User is admin, proceed to the next middleware
    } else {
      return  res.status(403).json({ message: "Access denied. Admins only." });
    }
   } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
   }
};

module.exports = isAdmin;