require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require("./db");
const router = require("./routes/index");
const { ApiError } = require("./exceptions/api-error");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);

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