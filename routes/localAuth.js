const router = require("express").Router();
const User = require("../models/pg/user.model.js");
const passport = require("passport");
 const generateToken = require("../utils/jwttoken.js");

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, username, phone_number,image,id ,provider} =
    req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "User already exists" });
    } else {
       const newUser = await User.create({
        username,
        email,
        first_name,
        last_name,
        phone_number,
        social_id:id,
        provider:provider,
        image:image
      });

      console.log(newUser);

      return res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Internal server error", error: error });
  }
});

router.get("/signup", (req, res) => {
  res.send("Signup Page");
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("entered in login");
  console.log(req.user.dataValues);
  const token=generateToken(req.user.dataValues);
  console.log(token);
   res.status(200).json({ success: true, message: "User logged in",token:token });
});

module.exports = router;
