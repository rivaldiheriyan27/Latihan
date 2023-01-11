const {userController} = require("../controllers/userController")
const router = require("express").Router();


router.post("/login", userController.login)
router.get("/register", userController.register)

module.exports = router;