const jwt = require("jsonwebtoken");

 function setJwt( res, user) {
  try {
    const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    if (!token) {
      return res.status(200).json({ message: "Token not found" });
    }
    res.cookie("pizza", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      user,
      message: "Success",
    });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
}


module.exports = setJwt;
