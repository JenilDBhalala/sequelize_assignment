const express = require("express");

const orderController = require("../controllers/order.controller");

const router = express.Router();

router.get("/", orderController.getOrders);

router.get("/:orderID", orderController.getOrderByID);

router.post("/", orderController.addOrder);

router.put("/:orderID", orderController.updateOrder);

router.delete("/:orderID", orderController.deleteOrder);

module.exports = router;