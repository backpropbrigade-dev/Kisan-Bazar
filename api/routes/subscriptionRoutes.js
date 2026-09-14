const express = require("express");
const {
  getSubscriptionStatus,
  upgradeSubscription,
  getFarmerAnalytics,
} = require("../controllers/subscriptionController");
const { verifyToken, isFarmer } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, isFarmer, getSubscriptionStatus);
router.post("/upgrade", verifyToken, isFarmer, upgradeSubscription);
router.get("/analytics", verifyToken, isFarmer, getFarmerAnalytics);

module.exports = router;
