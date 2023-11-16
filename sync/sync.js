// sync.js

const sequelize = require("../db/pg.js");
const User = require("../models/pg/user.model.js");

// Sync all defined models to the database
// sequelize.sync({ force: false }).then(() => {
//   console.log("Database synced!");
// });
