const { productControllers } = require("../controllers");

const router = require("express").Router();

router.get("/", productControllers.getAllProducts)
router.post("/", productControllers.createNewProduct)
router.patch("/:id", productControllers.editProductById)
router.delete("/:id", productControllers.deleteProductById)

module.exports = router;