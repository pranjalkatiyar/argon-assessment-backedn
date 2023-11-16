const router = require("express").Router();
const passport = require("passport");
const isAuthenticated = require("../middleware/authenticated.js");
const User = require("../models/pg/user.model.js");
const  generateToken  = require("../utils/jwttoken.js");

router.get("/login/success", async (req, res) => {
  console.log("header",req.headers);
  let token="";
  if(req.headers.authorization){
    token=req.headers.authorization
  }
  else{
    token=`Bearer ${req.cookies.authorizationToken}`;
    console.log("token",token);
  }
  if(!token){
    res
      .status(401)
      .json({ success: false, message: "token not valid" });
  }
  const result = await isAuthenticated(token);
  console.log(result);
  if (result.value === true) {
    res
      .status(200)
      .json({
        success: true,
        message: "User has successfully authenticated",
        user: result.data,
      });
  } else {
    res
      .status(401)
      .json({ success: false, message: "User has not authenticated" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User failed to authenticate.",
  });
});

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/login/failed",
  }),
  async (req, res) => {
    console.log("facebook callback");
     const token=await generateToken(req.user);
     console.log(token);
    res.cookie("authorizationToken",token ,{
      httpOnly: true,
      secure: false,
      path: "/",
      expires: new Date(Date.now() + 24 * 86400000),
    });
    console.log(req.cookies);
    res.setHeader("authorization",`Bearer ${token}`);
    res.writeHead(200,{
      Location:"http://localhost:3000/profile"
    })
    res.end();
    // res.redirect("/auth/login/success");
    //  res.status(200).json({
    //   success: true,
    //   message: "User has successfully authenticated",
    //   user: req.user,
    // });     
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get("/logout", (req, res) => {
  console.log("logout");
  console.log(req.session);
  console.log(req);

  res
    .status(200)
    .json({ success: true, message: "User has successfully logged out" });
});

module.exports = router;
