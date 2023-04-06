const express = require("express");

const queryController = require("../controllers/query.controller");

const router = express.Router();

router.get("/1", queryController.getUndeliveredOrders);

router.get("/2", queryController.getFiveRecentOrders);

router.get("/3", queryController.getFiveMostActiveUsers);

router.get("/4", queryController.getInactiveUsers);

router.get("/5", queryController.getUndeliveredOrders);

router.get("/6", queryController.getUndeliveredOrders);

module.exports = router;