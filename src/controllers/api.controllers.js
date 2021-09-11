const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signIn = async (req, res) => {
  const { username, password } = req.body;

  console.log({ username, password });

  const user = await models.user.findOne({ username });
  if (!user) {
    return res.json({ errorMessage: "Usuario no existe" });
  }

  if (user.password !== password) {
    return res.json({ errorMessage: "password no son igual" });
  }

  const token = jwt.sign({ user }, config.jwt.secret, { expiresIn: "1h" });

  return res.json({ token });
};

const signUp = async (req, res) => {
  const { username, password1, password2 } = req.body;
  try {
    const existUser = await models.user.findOne({ username });
    if (existUser) {
      // TODO: sessions
      return res.status(409).json({ errorMessage: "El usuario ya existe!." });
    }
    const user = new models.user({ username, password: password1 });
    await user.save();
  } catch (err) {
    return res.status(409).json({ errorMessage: "Error con datos." });
  }

  const user = models.user({ username, password: password1 });
  return res.status(201).json({ user });
};

const users = (req, res) => {
  return res.status(201).json("users");
};

module.exports = {
  signIn,
  signUp,
  users,
};
