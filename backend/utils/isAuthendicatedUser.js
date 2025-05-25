import User from "../Model/userModel";

export default async function (req, res, next) {
  try {
    const token = req.cookies.pizza;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify the token using the secret key
    // and check if it has expired

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
