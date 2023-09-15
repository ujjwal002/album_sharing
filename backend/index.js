const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

// const fileUpload = require("express-fileupload"); // Commented out
const User = require("./models/user");
const sequelize = require("./config/database");


const app = express();
const PORT = process.env.PORT || 3000;
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
(async () => {
  try {
    await sequelize.authenticate();
    // sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    //   .then(() => {
    //     return sequelize.sync({ force: true });
    //   })
    //   .then(() => {
    //     return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
    //   })
    //   .catch(error => {
    //     console.error('Error syncing models:', error);
    //   });
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const userRoutes = require("./routes/userRoutes");
const albumRoutes = require("./routes/albumRoutes");
const imageRoutes = require("./routes/imageRoutes")

app.use("/user", userRoutes);
app.use("/user/album", albumRoutes);
app.use("/user/album", imageRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
