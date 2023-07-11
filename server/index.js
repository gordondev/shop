require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require("./db");
const router = require("./routes/index");
const errorMiddleware = require("./middlewares/error-middleware");
const requestIp = require('request-ip');

const PORT = process.env.PORT || 5000;

app.use(requestIp.mw());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("SERVER STARTED");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`\nServer started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
