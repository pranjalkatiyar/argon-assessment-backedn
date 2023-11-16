const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const User = require("../models/pg/user.model.js");

module.exports = function (passport) {
  passport.use(
    new Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
                
      },
      async function (accessToken, refreshToken, profile, cb) {
        // save the profile on the Database
        // Save the accessToken and refreshToken if you need to call facebook apis later on
        console.log("FACEBOOK AUTH RUNNING");
        await User.findOne({
          where: { email: profile.emails[0].value, provider: profile.provider },
        })
          .then(async (user) => {
            if (user) {
              console.log("FACEBOOK USER EXITS");
               return cb(null, user);
            } else {
              console.log("FACEBOOK USER CREATING");
              const newuser = await User.create({
                username: profile.displayName===undefined?profile.username:profile.displayName,
                email: profile.emails[0].value,
                provider: profile.provider,
                password: "",
                first_name: profile.name.givenName===undefined?"":profile.name.givenName,
                last_name: profile.name.familyName===undefined?"":profile.name.familyName,
                social_id:profile.id
                // picture:profile.photos[0].value,
              });
              console.log("facebook new user",newuser);
              return cb(null,newuser);
            }
           
          })
          .catch((err) => {
            console.log(err);
            return cb(null, profile);
          });
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
