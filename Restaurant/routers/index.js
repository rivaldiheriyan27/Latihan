const {Restaurant} = require("../controllers/restaurantController")
const errorHandler = require("../middlewares/errorHandler");

const router = require("express").Router();

router.get("/" , Restaurant.listMenu)
router.get("/:foodId", Restaurant.detaillMenu)
router.post("/order", Restaurant.orderFood)


router.use(errorHandler)

module.exports = router;