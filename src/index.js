import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/doConfig.js";

dotenv.config();
console.log(process.env.EMAIL_USER_NAME);
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MognoDB Fail to connect !!!", err);
  });

