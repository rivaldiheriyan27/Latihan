const {userController} = require("../controllers/userController")
const {bookLibrary} = require("../controllers/bookData")


const errorHandler = require("../middlwares/errorHandler");
const authorizationAdmin = require("../middlwares/authorizationAdmin")
const authentication = require("../middlwares/authentication")
const router = require("express").Router();


router.post("/login", userController.login)
router.post("/register", userController.register)


router.use(authentication);

router.get("/" , bookLibrary.bookData)
router.post("/addBook",authorizationAdmin, bookLibrary.addBook)


router.use(errorHandler);

module.exports = router;