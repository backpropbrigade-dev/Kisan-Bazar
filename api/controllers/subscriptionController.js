const FarmerProfile = require("../models/FarmerProfileModel");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");

// @desc    Get subscription status and limits for farmer
// @route   GET /api/subscription
// @access  Private (Farmer only)
exports.getSubscriptionStatus = async (req, res) => {
  try {
    let profile = await FarmerProfile.findOne({ user: req.user._id });
    
    if (!profile) {
      profile = await FarmerProfile.create({
        user: req.user._id,
        farmName: `${req.user.name}'s Farm`,
        description: "Farm profile",
        subscriptionPlan: "free",
      });
    }

    const productCount = await Product.countDocuments({ farmer: req.user._id, isActive: true });
    const maxProducts = profile.subscriptionPlan === "free" ? 5 : Infinity;

    res.json({
      success: true,
      data: {
        plan: profile.subscriptionPlan || "free",
        status: profile.subscriptionStatus || "active",
        expiresAt: profile.subscriptionExpiresAt,
        isVerified: profile.isVerified || false,
        isFeatured: profile.isFeatured || false,
        productUsage: {
          current: productCount,
          max: maxProducts,
          remaining: maxProducts === Infinity ? "Unlimited" : Math.max(0, maxProducts - productCount),
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Upgrade subscription plan
// @route   POST /api/subscription/upgrade
// @access  Private (Farmer only)
exports.upgradeSubscription = async (req, res) => {
  try {
    const { plan } = req.body; // 'free', 'pro', or 'enterprise'

    if (!["free", "pro", "enterprise"].includes(plan)) {
      return res.status(400).json({ success: false, message: "Invalid subscription plan specified" });
    }

    let profile = await FarmerProfile.findOne({ user: req.user._id });

    if (!profile) {
      profile = await FarmerProfile.create({
        user: req.user._id,
        farmName: `${req.user.name}'s Farm`,
        description: "Farm profile",
      });
    }

    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    profile.subscriptionPlan = plan;
    profile.subscriptionStatus = "active";
    profile.subscriptionExpiresAt = plan === "free" ? null : nextYear;

    if (plan === "pro" || plan === "enterprise") {
      profile.isVerified = true;
      profile.isFeatured = true;
    }

    await profile.save();

    res.json({
      success: true,
      message: `Successfully upgraded to ${plan.toUpperCase()} plan!`,
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Get SaaS Sales & Revenue Analytics for farmer
// @route   GET /api/subscription/analytics
// @access  Private (Farmer only)
exports.getFarmerAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id });
    const products = await Product.find({ farmer: req.user._id });

    const totalRevenue = orders
      .filter((o) => o.status === "completed" || o.status === "accepted")
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const pendingOrdersCount = orders.filter((o) => o.status === "pending").length;
    const completedOrdersCount = orders.filter((o) => o.status === "completed").length;

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders: orders.length,
        pendingOrders: pendingOrdersCount,
        completedOrders: completedOrdersCount,
        totalProductsListed: products.length,
        recentOrders: orders.slice(0, 5),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
