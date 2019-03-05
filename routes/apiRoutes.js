const express = require("express");
const router = express.Router();
const { user } = require("./index");
// const { user, category, product, rating, comment, faq, userCart, order, coupanCode, newsletter, giftcardRoutes } = require("./index");

router.use("/user", user);
// router.use("/category", category);
// router.use("/product", product);
// router.use("/rating", rating);
// router.use("/comments", comment);
// router.use("/FAQ", faq);
// router.use("/userCart", userCart)
// router.use("/order", order);
// router.use("/coupanCode", coupanCode)
// router.use("/newsletter", newsletter)
// router.use("/giftcard", giftcardRoutes)

module.exports = router;