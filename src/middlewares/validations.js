const jwt = require("jsonwebtoken");
const config = require("../config");

const signUp = (req, res, next) => {
  console.log("holaaaaaaaaaa");
  const { username, password1, password2 } = req.body;

  console.log({ username, password1, password2 });

  if (!username && !password1 && !password2) {
    // TODO: sessions
    return res.redirect("/pages/signUp");
  }

  if (password1 !== password2) {
    // TODO: sessions
    return res.redirect("/pages/signUp");
  }
  next();
};

const tokenExists = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ errorMessage: "token no esta definido!" });
  }
  req.token = token;
  next();
};

const isAdmin = (req, res, next) => {
  const data = jwt.verify(req.token, config.jwt.secret);

  if (!data.user.admin) {
    return res.json("no es admin");
  }

  next();
};

module.exports = {
  signUp,
  tokenExists,
  isAdmin,
};
