const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { requireSignin, isAuth, isAdmin } = require("../controllers/authClient");
const { userById } = require("../controllers/user");
const {
    create,
    listOrders,
    getStatusValues,
    orderById,
    updateOrderStatus,
    orderByFournisseur,
    livrerProd
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

//router.param("userId", userById);
router.param("orderId", orderById);

router.post("/create/:userId", decreaseQuantity, create);
router.get("/listByFournisseur/:userId", orderByFournisseur);
router.get("/livrerProd/:orderId/:prodId", livrerProd);
router.get("/list/:userId", listOrders);
router.get(
    "/status-values/:userId",

    isAdmin,
    getStatusValues
);
router.put(
    "/:orderId/status/:userId",

    updateOrderStatus
);

//router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
