const router = require("express").Router();
const User = require("../models/pg/user.model.js");
const passport = require("passport");
const isAuthenticated = require("../middleware/authenticated.js");
const Profile = require("../models/mongo/userDetails.model.js");
const { OP } = require("sequelize");

router.get("/profile/:id", async (req, res) => {
  try {
    console.log("INSIDE THE PROFILE");
    const user = await User.findOne({ where: { social_id: req.params.id } });
    const profile = await Profile.findOne({ user_id: req.params.id });
    res.status(200).json({ success: true, profile, user });
  } catch (err) {
    res.status(400).json({ success: false, message: "Internal server error" });
    console.log(err);
  }
});

router.post("/update", async (req, res) => {
  console.log(req.body);
  try {
    const { personalDetails, educationDetails, experienceDetails, skills } =
      req.body;
    const userExist = await Profile.find({ user_id: personalDetails.id });
    console.log("USEREXIST", userExist);
    if (userExist.length > 0) {
      console.log("PROFILE UPDATED", userExist);

      await Profile.findOneAndUpdate(
        { user_id: personalDetails.id },
        {
          user_id:personalDetails.id,
          fullName: personalDetails.fullName,
          email: personalDetails.email,
          phone_number: personalDetails.phoneNumber,
          description: personalDetails.description,
          education: educationDetails,
          workExperience: experienceDetails,
          skills: skills,
        }
      );

      res.status(200).json({ success: true, message: "Profile Updated" });
    } else {
      console.log("NEW PROFILE CREATED");

      const newProfile = await Profile.create({
        user_id: personalDetails.id,
        fullName: personalDetails.fullName,
        username: personalDetails.username,
        email: personalDetails.email,
        phone_number: personalDetails.phoneNumber,
        education: educationDetails,
        workExperience: experienceDetails,
        skills: skills,
      });

      res.status(200).json({ success: true, message: "Profile Created" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Internal server error", err });
    console.log(err);
  }
});

module.exports = router;
