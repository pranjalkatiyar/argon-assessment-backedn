const express = require("express");
const passport = require("passport");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook").Strategy;
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth.js");
const sequelize = require("./db/pg.js");
const morgan = require("morgan");
const User = require("./models/pg/user.model.js");
const sync = require("./sync/sync.js");
const localRoute = require("./routes/localAuth");
const bodyParser = require("body-parser");
 const mongodb = require("./db/mongoose.js")();
 const userRoute = require("./routes/userdetails.js");
require("./middleware/passport-local.js")(passport);
 require("./middleware/passport-facebook.js")(passport);


app.use(cors({
  credentials:true,
}));

app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

 
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use morgan middleware to log requests

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));




// pg
// sequlize auth
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// server-testing-Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// routes
app.use("/auth", authRoute);
app.use("/local", localRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port 4000");
});
