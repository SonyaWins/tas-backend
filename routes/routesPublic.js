const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const routes = express.Router();

const user = require("../models/user");
const { route } = require("express/lib/application");

routes.post("/login", async (req, res) => {
  const usernameToFind = req.body.username;

  const userToFind = await user.findOne({ username: usernameToFind });

  if (!userToFind) {
    return res.json({
      mensaje: "User does not exist",
    });
  } else {
    const password = req.body.passwordHash;

    const validationPass = await bcrypt.compare(password, userToFind.passwordHash);

    if (!validationPass) {
      return res.json({
        mensaje: "Wrong Password",
      });
    }
  }

  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.SECRETO_JWT
  );

  res.json({
    message: "Welcome",
    token: token,
  });
});

module.exports = routes;
