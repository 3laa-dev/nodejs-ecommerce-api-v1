const path = require("node:path");

const express = require("express");
const morgan = require("morgan");

const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const _Error = require("./utils/Error");
const globalError = require("./middlewares/errorMiddlware");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute")
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const reviewRoute = require("./routes/reviewRoute")
const wishlistRoute = require("./routes/wishlistRoute");
const addressRoute = require("./routes/addressRoute");


require("dotenv").config();
dbConnection();



const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode : ${process.env.NODE_ENV}`);
}

app.set("query parser", "extended");
app.use(express.json())
app.use(express.static(path.join(__dirname , "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subCategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products" , productRoute);
app.use("/api/v1/users" , userRoute)
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/addresses", addressRoute);

app.use((req, res, next) => {
    next(new _Error(`Can't find this route: ${req.originalUrl}`, 404));
})

app.use(globalError);



const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})

process.on("unhandledRejection", err => {
    console.log(`UnhandledRejection Errors: ${err.name}  | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    })
})