const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorsHandler");
const User = require('../models/user');
const Photo = require('../models/Photo');
exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        //.populate("products.product", "name price")
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            req.order = order;
            next();
        });
};

exports.orderByFournisseur = async (req, res) => {
    var id = req.params.userId
    var listProd = [];
    orders = await Order.find();
    orders.forEach(order => {
        products = order.products;
        products.forEach(product => {
            if (product.fournisseur == id && product.status != "livre" && product.status != "disponible") {
                product.status = order._id;
                listProd.push(product);

            }
        })
    })
    console.log("liste des produits", listProd);
    res.json(listProd)

}

exports.livrerProd = async (req, res) => {
    var produit;
    var idOrder = req.params.orderId
    var prodId = req.params.prodId;
    order = await Order.findById(idOrder);

    products = order.products;
    products.forEach(product => {
        if (product._id == prodId) {
            product.status = "livre"
            console.log("le produit", produit)
        }
    })
    order.products = products;
    var ordre = await Order.findByIdAndUpdate(idOrder, order);
    console.log("Order modifié", ordre);
    res.json(ordre);

}

exports.create = async (req, res) => {
    console.log("CREATE ORDER: ", req.body);
    console.log('Id user', req.params.userId);
    const user = await User.findById(req.params.userId);
    const products = req.body.order.products;
    console.log('les produits', products);
    req.body.order.user = user;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error),
            });
        }

        res.json(data);
    });
};

exports.listOrders = async (req, res) => {
    console.log("id du clien", req.params.userId);
    const user = await User.findById(req.params.userId);
    Order.find({ user })
        //.populate("user", "_id name address")
        .sort("-created")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error),
                });
            }
            console.log(orders);
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(order);
        }
    );
};
