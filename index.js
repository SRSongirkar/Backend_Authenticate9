require("dotenv").config({ path: ".env" });
const { sequelize } = require("./DBConnection.js");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const authRoutes = require("./Routes/authRoutes.js");
const spamRoutes = require("./Routes/spamRoutes.js");
const contactRoutes = require("./Routes/contactRoutes.js");
const Randomsampledata = require("./randomsampledata.js");
const authMiddleware = require("./Middleware/authMiddleware.js");
const searchRoutes = require("./Routes/searchRoutes.js");

const PORT = process.env.PORT || 5432;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(async () => {
    console.log("Connected to the database");
    //Randomsampledata();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("connection failed:", error);
  });

app.get("/", (req, res) => {
  res.send("Connected to Server");
});

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/spam", authMiddleware, spamRoutes);
app.use("/api/v1/search", authMiddleware, searchRoutes);
app.use("/api/v1/contact", authMiddleware, contactRoutes);
