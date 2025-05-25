const admin = require("./firebaseAdmin");

 async function GoogleLoginUser(req, res,next) {
  try {
    
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(200).json({ message: "un Authorised" });
    }

    const decodeUser = await admin.auth().verifyIdToken(token);
    req.user = decodeUser;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = GoogleLoginUser;