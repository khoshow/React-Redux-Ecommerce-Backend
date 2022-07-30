const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  list,
  listProducts,
  getProductCategory
} = require("../controllers/product");




// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/list-products", listProducts)

// router.get("/products", list);
// router.get("/product/:slug", read);
// router.put("/product/:slug", authCheck, adminCheck, update);
// router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/category/:slug", getProductCategory);

module.exports = router;
