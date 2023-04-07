const { Sequelize, Op } = require('sequelize');
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const OrderDetail = require("../models/orderdetail.model");

module.exports = {
    getUndeliveredOrders: async (req, res, next) => {
        try {
            const orders = await Order.findAll({
                where: {
                    orderStatus: {
                        [Op.ne]: 'delivered'
                    }
                }
            })
            if (orders.length == 0) {
                return res.status(404).json({ msg: "orders not found!" });
            }
            res.status(200).json({ data: orders });
        }
        catch (e) {
            next(e);
        }
    },

    getFiveRecentOrders: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit);
            if (isNaN(limit) || limit <= 0) {
                return res.status(400).json({ msg: "Invalid limit parameter" });
            }

            const orders = await Order.findAll({
                order: [
                    ['orderDate', 'DESC']
                ],
                limit: limit
            })
            if (orders.length == 0) {
                return res.status(404).json({ msg: "orders not found!" });
            }
            res.status(200).json({ data: orders });
        }
        catch (e) {
            next(e);
        }
    },

    getFiveMostActiveUsers: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit);
            if (isNaN(limit) || limit <= 0) {
                return res.status(400).json({ msg: "Invalid limit parameter" });
            }
            
            const users = await Order.findAll({
                include: {
                    model: User,
                    attributes: [
                        'username',
                        'email'
                    ]
                },
                attributes: [
                    'userId',
                    [Sequelize.literal('COUNT(userId)'), 'orderCount']
                ],
                group: ['userId'],
                order: [['orderCount', 'DESC']],
                limit: limit
            })
            if (users.length == 0) {
                return res.status(404).json({ msg: "users not found!" });
            }
            res.status(200).json({ data: users });
        }
        catch (e) {
            next(e);
        }
    },


    getInactiveUsers: async (req, res, next) => {
        try {
            const users = await User.findAll({
                include: {
                    model: Order,
                    attributes: []
                },
                where: {
                    "$orders.userId$": null
                }
            })
            if (users.length == 0) {
                return res.status(404).json({ msg: "users not found!" });
            }
            res.status(200).json({ data: users });
        }
        catch (e) {
            next(e);
        }
    },

    getFiveMostPurchasedProducts: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit);
            if (isNaN(limit) || limit <= 0) {
                return res.status(400).json({ msg: "Invalid limit parameter" });
            }

            const products = await OrderDetail.findAll({
                attributes: [
                    'productId',
                    [Sequelize.literal('SUM(quantity)'), 'totalQuantity']
                ],
                group: 'productId',
                order: [['totalQuantity', req.query.sortByQty === 'desc' ? 'DESC' : 'ASC']],
                limit: limit
            })
            if (products.length == 0) {
                return res.status(404).json({ msg: "products not found!" });
            }
            res.status(200).json({ data: products });
        }
        catch (e) {
            next(e);
        }
    },


    getMostOrLeastExpensiveOrder: async (req, res, next) => {
        try {
            const orders = await OrderDetail.findAll({
                include: {
                    model: Product,
                    required: true,
                    attributes: []
                },
                attributes: [
                    'orderId',
                    [Sequelize.literal('SUM(orderdetail.quantity*product.price)'), 'totalPrice']
                ],
                group: 'orderId',
                order: [['totalPrice', req.query.order === 'desc' ? 'DESC' : 'ASC']],
                limit: 1
            })
            if (orders.length == 0) {
                return res.status(404).json({ msg: "orders not found!" });
            }
            res.status(200).json({ data: orders });
        }
        catch (e) {
            next(e);
        }
    }
};

