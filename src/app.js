import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route.js";
import scrapCategoryRouter from "./routes/scrapCategory.route.js";
import scrapProductRouter from "./routes/scrapProduct.route.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import NotificationRouter from "./routes/notification.route.js";
import OrderRouter from "./routes/order.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import AddressRouter from "./routes/address.routes.js";
import AdminNotificationRouter from "./routes/AdminNotification.routes.js";
import MessageRouter from "./routes/message.routes.js";
import VahicleRouter from "./routes/vahicle.routes.js";
import adminRouter from "./routes/admin.route.js"


// Work -------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors()
);
// read about cors in documentations
app.use(
  express.json({
    // limit: "20kb",
  })
);
//  object inside the object your send throght postman
app.use(
  express.urlencoded({
    extended: true,
    // limit: "16kb",
  })
);
// publix asset like images like logo svg fevicon
app.use(express.static("public"));

// rotes declartions
app.use("/api/user", userRouter);

// Scrap category Base router
app.use("/api/scrapCategory", scrapCategoryRouter);
app.use("/api/scrapProduct", scrapProductRouter);

// user Product Base Router
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);

// Notification route
app.use("/api/notification", NotificationRouter);



// Order route
app.use("/api/order", OrderRouter);
export default app;


// Address routes
app.use("/api/address", AddressRouter);


//Admin  Notification Rout
app.use("/api/AdminNotification", AdminNotificationRouter);

app.use("/api/Message", MessageRouter);

app.use("/api/Vahicle", VahicleRouter);




// _________________________ADMIN WORK______________________________

app.use("/api/admin", adminRouter)
