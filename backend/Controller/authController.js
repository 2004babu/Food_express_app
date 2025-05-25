const setJwt = require("../utils/setJwt");
const userModel = require("../Model/userModel");
exports.googleLogin = async (req, res) => {
  try {
    if (!req.user.uid) {
      return res.status(404).json({ message: "Error In Create User!" });
    }

    const existingUser = await userModel.findOne({ uid: req.user.uid });
    if (existingUser) {
      return setJwt( res, existingUser);
    }

    console.log(req.user);
    const user = await userModel.create({
      userName: req.user.email,
      uid: req.user.uid,
      email: req.user.email,
      ProfilePic: req.user.ProfilePic ?? "",
    });
    if (!user) {
      return res
        .status(404)
        .json({ user: user, message: "Error In Create User!" });
    }

    return setJwt( res, user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.EmailSignup = async (req, res, next) => {
    try {
        if (!req.user.uid) {
            return res.status(404).json({ message: "Error In Create User!" });
          }
      
          const existingUser = await userModel.findOne({ uid: req.user.uid });
          if (existingUser) {
            return setJwt( res, existingUser);
          }
        const user = await userModel.create({
        userName: req.user.email,
        uid: req.user.uid,
        email: req.user.email,
      });
  
      if (!user) {
        return res
          .status(404)
          .json({ user: user, message: "Error In Create User!" });
      }
  
    return  setJwt(res,  user);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: error.message });
    }
  };


  