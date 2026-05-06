
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader) {

      return res.status(401).json({
        message: "No token"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Unauthorized"
    });
  }
};

export default protect;