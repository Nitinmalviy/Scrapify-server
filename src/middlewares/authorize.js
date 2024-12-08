import jwt from "jsonwebtoken";
export const auth = async (request, response, next) => {
  try {
    let token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err);
    return response.status(401).json({ massage: "unauthorized acces" });
  }
};
