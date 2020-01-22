const express = require("express");
const dotenv = require("dotenv");
//const logger = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");

//Load env vars

dotenv.config({ path: "./config/config.env" });

// connect ot db

connectDB();

// route files

const bootcamps = require("./routes/bootcamps");

let app = express();

// tell the server to use the logger middleware
//app.use(logger);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// tell the server to look at /api/v1/bootcamps if a request for that route comes in
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close Server & Exit Process
  server.close(() => process.exit(1));
});
