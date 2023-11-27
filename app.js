require("dotenv").config();
const connect = require(__dirname + "/db/connect");
const errorMiddleware = require(__dirname + "/middlewares/errorMiddleware");
const Router = require("./routes");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
//static dir
const staticDirectory = path.join(__dirname, "public");
app.use(express.static(staticDirectory));

//router
app.use("/api/v1", Router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await connect(process.env.DB_URI_STRING);
    app.listen(PORT, console.log(`app is listening on port:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

main();
