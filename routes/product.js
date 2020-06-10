const express = require("express");
const router = express.Router();

const {
    productById,
    create,
    read,
    remove,
    update,
    list,
    relatedProduct,
    listCategories,
    listBySearch,
    photo,
    listSearch,
} = require("../controllers/product");
//const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
//const { userById } = require("../controllers/user");
//onst { productValidator } = require("../validators/productValidator");

//router.param("userId", userById);
router.param("productId", productById);

router.get("/search", listSearch);
router.get("/all", list);
router.get("/photo/:productId", photo);
router.post("/products/by/search", listBySearch);
router.get("/categories", listCategories);
router.get("/related/:productId", relatedProduct);

router.get("/:productId", read);
//router.post("/create/:userId", requireSignin, isAuth, isAdmin, create);
//router.delete("/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
//router.put("/:productId/:userId", requireSignin, isAuth, isAdmin, update);

//router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
