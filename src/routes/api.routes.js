const { Router } = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

router.post("/signIn", controllers.api.signIn);
router.post("/signUp", controllers.api.signUp);
router.get(
  "/users",
  middlewares.validations.tokenExists,
  middlewares.validations.isAdmin,
  controllers.api.users
);

module.exports = router;
