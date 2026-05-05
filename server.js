const path = require("node:path");

const express = require("express");
const morgan = require("morgan");

const dbConnection = require("./config/database");
const _Error = require("./utils/Error");
const globalError = require("./middlewares/errorMiddlware");
const mountRoutes = require("./routes");

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
mountRoutes(app)


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