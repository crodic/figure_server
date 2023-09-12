// Import
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookie = require("cookie-parser");
require("dotenv").config();

// Import file
const Connection = require("./app/Config/db/DBContext");
const UserRouter = require("./app/Routes/user.route");
const { notFound, errorHandler } = require("./app/Middleware/errorHandler");
const ProductRoute = require("./app/Routes/product.route");
const CategoriesRoute = require("./app/Routes/categories.route");
const BlogCategoriesRoute = require("./app/Routes/blogCategories.route");
const BlogRoute = require("./app/Routes/blog.route");
const BrandRoute = require("./app/Routes/brand.route");
const CouponRoute = require("./app/Routes/coupon.route");
const BillRoute = require("./app/Routes/bill.route");

// Config app
const app = express();
const port = process.env.PORT || 1919;

// Config Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(morgan("common"));

// Connection MongoDB
Connection();

// Routes
app.use("/", (req, res) => {
    return res.status(200).json({ msg: "OKAY" })
})
app.use("/v1/api/user", UserRouter);
app.use("/v1/api/product", ProductRoute);
app.use("/v1/api/categories", CategoriesRoute);
app.use("/v1/api/blog", BlogCategoriesRoute);
app.use("/v1/api/blogger", BlogRoute);
app.use("/v1/api/brand", BrandRoute);
app.use("/v1/api/coupon", CouponRoute);
app.use("/v1/api/bill", BillRoute);

app.use("*", notFound);
app.use(errorHandler);

// App Start
app.listen(port, () => {
    console.log("Server is running");
})