var passport = require("passport");
var User = require("../models/pg/user.model.js");
var LocalStrategy = require("passport-local").Strategy;
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");


// Local strategy with passport
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          console.log("signup");
          const user = await User.findOne({ where: { email } });
           
          if (user) {
             console.log("checking password");
             if (isPasswordValid) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          }  
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    console.log("serialize",user);
    done(null, user.id);
  });

  passport.deserializeUser(function (user, done) {
   done (null,user.id);
  });
};
