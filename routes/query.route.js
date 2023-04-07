const express = require("express");

const queryController = require("../controllers/query.controller");

const router = express.Router();

router.get("/orders/undelivered", queryController.getUndeliveredOrders);

router.get("/orders/recent", queryController.getFiveRecentOrders);

router.get("/users/active", queryController.getFiveMostActiveUsers);

router.get("/users/inactive", queryController.getInactiveUsers);

router.get("/products/", queryController.getFiveMostPurchasedProducts);

router.get("/orders/expensive", queryController.getMostOrLeastExpensiveOrder);

module.exports = router;