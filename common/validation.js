const { body, check } = require("express-validator/check");
const Product = require("../models").product;
const giftCard = require("../models").giftcard;
const { user } = require("../models");

/* ------------------------------------------ Login Validation --------------------------------------- */

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid.")
    .trim(),
  body("password", "Password must be at least 6 character long.")
    .trim()
    .isLength({ min: 6 })
];

/* ------------------------------------ forgot password validation ----------------------------------- */
const forgotPassworValidation = [
  body("email").not().isEmpty().withMessage("Please enter email address..").trim().isEmail().withMessage("Email must be a valid.").trim()

];

/* ------------------------------------ User Reset Password validation ------------------------------- */
const resetpasswordValidation = [
  body("password").not().isEmpty().withMessage("Please enter password..").trim().isLength({ min: 6 }).withMessage("Password must be 6 character long."),
  body("verifyToken").not().isEmpty().withMessage("Please provide verfication token..").trim().custom(async (value, { req }) => {
    const { body } = req;
    const { email, id } = body;
    const result = await user.findOne({
      where: {
        verifyToken: value,
        id: id,
        email: email,
        isActive: true
      }
    });
    if (!result) {
      throw new Error("Token has been Expired.");
    }
    return true;
  }),
  body("email").not().isEmpty().withMessage("Please enter email..").trim().isEmail().withMessage("Email must be a valid."),
  body("id").not().isEmpty().withMessage("Please provide user id..").trim(),
];

/* ------------------------------------ User Sign up validation -------------------------------------- */

const signupValidation = [
  body("firstName").not().isEmpty().trim().isLength({ max: 20 }).withMessage("first name must be 20 character long."),
  body("lastName").not().isEmpty().withMessage("Please enter last name.").trim(),
  body("contactNumber").not().isEmpty().withMessage("Please enter mobile number.").isNumeric().withMessage("Only numbers are allowed..")
  .isLength({ min: 7, max: 14 }).withMessage("Mobile number must be 14 character long."),
  body("email", "Please enter email address").trim().isEmail().withMessage("Email must be a valid."),
  body("password").not().isEmpty().withMessage("Please enter password..").trim().isLength({ min: 6 }).withMessage("Password must be 6 character long.")
];

const updateValidation = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("Please enter first name.")
    .trim()
    .isLength({ max: 20 })
    .withMessage("first name must be 20 character long."),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Please enter last name.")
    .trim(),
  body("contactNumber")
    .not()
    .isEmpty()
    .withMessage("Please enter mobile number.")
    .isNumeric()
    .withMessage("Only numbers are allowed..")
    .isLength({ min: 7, max: 14 })
    .withMessage("Mobile number must be 10 character long.")
  // body('email', 'Please enter email address').trim().isEmail().withMessage('Email must be a valid.'),
  //body('password').not().isEmpty().withMessage('Please enter password..').trim().isLength({ min: 6 }).withMessage('Password must be 6 character long.'),
];

/* const updateValidation = [
  body('firstName').not().isEmpty().withMessage('Please enter first name.').trim(),
  body('lastName').not().isEmpty().withMessage('Please enter last name.').trim(),
  body('contactNumber').exists().withMessage('Mobile number is Required').not().isEmpty().withMessage('Please enter mobile number.').isNumeric().withMessage('Only numbers are allowed..').isLength({ min: 7, max: 14 }).withMessage('Mobile number must be 10 character long.'),
  body('emailAddress', 'Please enter email address').trim().isEmail().withMessage('Email must be a valid.'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be 6 character long.'),
  check('confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password and confirm password did not match.");
    } else {
      return value;
    }
  })
]; */

const confirmPassword = [
  body("oldPassword")
    .not()
    .isEmpty()
    .withMessage("Please enter password..")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 character long."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter password..")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 character long."),
  check("confirmation")
    .not()
    .isEmpty()
    .withMessage("Please enter password..")
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and confirm password did not match.");
      } else {
        return value;
      }
    })
];

//Confirm Admin reset password
const confirmResetPassword = [
  body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter password..")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 character long."),
  check("confirmation")
    .not()
    .isEmpty()
    .withMessage("Please enter password..")
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and confirm password did not match.");
      } else {
        return value;
      }
    })
];

/* ------------------------- Update admin profile validation ---------------------------------------- */
const updateAdminValidation = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("Please enter first name.")
    .trim(),
  body("email", "Please enter email address")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid.")
];

/* ------------------------- Confirm Password validation -------------------------------------------- */
const confirmUserPassword = [
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 character long."),
  check("confirmation")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Confirm Password must be 6 character long.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and confirm password did not match.");
      } else {
        return value;
      }
    })
];

const product = [
  body("productName").isLength({ max: 250 }).withMessage("Product Name must be 250 character long."),
  body("productQuantity").isFloat({ gt: -1 }).withMessage("Product Quantity must be greater than 0.")
    .isNumeric().withMessage("Only numbers are allowed..").isLength({ max: 10 }).withMessage("Product Price must be 10 character long."),
  body("productPrice").isNumeric().withMessage("Only numbers are allowed..").isFloat({ gt: 0 }).withMessage("Product Price must be greater than 0.")
    .isLength({ max: 10 }).withMessage("Product price must be 10 character long."),

  body("productNumber").isNumeric().withMessage("Only numbers are allowed..").isLength({ max: 10 }).withMessage("SKU number must be 10 character long.")
    .custom(async (value, { req }) => {
      const id = req.body.id;
      let condition = {
        productNumber: value
      };
      if (id) {
        condition.id = {
          $ne: id
        };
      }
      const SKU = await Product.findAll({ where: condition });
      if (SKU.length >= 1) {
        req.body.productImage = req.file.filename ? "/productImage/" + req.file.filename : req.body.productImage;
        throw new Error("SKU number must be unique");
      }
      return true;
    }),
  body("shortDescription")
    .isLength({ max: 1000 })
    .withMessage("Description must be 1000 character long.")
    .trim()
];



const giftCards = [
  body("title").isLength({ max: 250 }).withMessage("Title must be 250 character long."),
  body("giftcardQuantity").isFloat({ gt: -1 }).withMessage("Gift Card Quantity must be greater than 0.").isNumeric()
    .withMessage("Only numbers are allowed..").isLength({ max: 10 }).withMessage("Gift Card Price must be 10 character long."),
  body("giftcardPrice").isNumeric().withMessage("Only numbers are allowed..").isFloat({ gt: 0 }).withMessage("Product Price must be greater than 0.")
    .isLength({ max: 10 }).withMessage("Gift Card price must be 10 character long."),

  body("giftcardNumber").isNumeric().withMessage("Only numbers are allowed..").isLength({ max: 10 })
   .withMessage("SKU number must be 10 character long.").custom(async (value, { req }) => {
      const id = req.body.id;
      let condition = {
        giftcardNumber: value
      };
      if (id) {
        condition.id = {
          $ne: id
        };
      }
      const SKU = await giftCard.findAll({ where: condition });
      if (SKU.length >= 1) {
        req.body.giftcardImage = req.file.filename ? "/productImage/" + req.file.filename : req.body.giftcardImage;
        throw new Error("SKU number must be unique");
      }
      return true;
    }),
  body("shortDescription").isLength({ max: 1000 }).withMessage("Description must be 1000 character long.").trim()
];


const updateGiftCard = [
  body("giftcardQuantity").isFloat({ gt: 0 }).withMessage("Gift card Quantity must be greater than 0.").isNumeric().withMessage("Only numbers are allowed..")
    .isLength({ max: 10 }).withMessage("Gift card quantity must be 10 character long."),
  body("giftcardPrice").isNumeric().withMessage("Only numbers are allowed..")
    .isFloat({ gt: 0 }).withMessage("Gift card Price must be greater than 0.").isLength({ max: 10 })
    .withMessage("Gift card price must be 10 character long."),
  body("shortDescription").isLength({ max: 1000 }).withMessage("Description must be 1000 character long.").trim()
];

const updateProduct = [
  body("productQuantity")
    .isFloat({ gt: 0 })
    .withMessage("Product Quantity must be greater than 0.")
    .isNumeric()
    .withMessage("Only numbers are allowed..")
    .isLength({ max: 10 })
    .withMessage("Product Quantity must be 10 character long."),
  body("productPrice")
    .isNumeric()
    .withMessage("Only numbers are allowed..")
    .isFloat({ gt: 0 })
    .withMessage("Product Price must be greater than 0.")
    .isLength({ max: 10 })
    .withMessage("Product price must be 10 character long."),
  body("shortDescription")
    .isLength({ max: 1000 })
    .withMessage("Description must be 1000 character long.")
    .trim()
];

const offers = [
  body("offerDiscount").isNumeric().withMessage("Offer deiscount must be number..").custom(value => {
    if (value % 1 !== 0) {
      throw new Error("Offer discount can not be in decimal.");
    }
    if (value < 1 || value > 100) {
      throw new Error("Offer discount must be greater than 0% and less than 100%.");
    }
    return true;
  }),
  body("promoCode").isLength({ max: 10 }).withMessage("Promo code must be 10 character long.")
  /*.custom(async (value, { req }) => {
    const id = req.body.id;
    let condition = {
      promoCode: value,
    }
   if (id) {
      condition.id = { $ne: id };
    }
  const pCode = await offer.findAll({
    where: { condition }
  });
  if (pCode.length >= 1) {
    throw new Error("Promo code must be unique");
  } 
  return true;
 }), */
];

const setting = [
  body("SHIPPING_PRICE").optional({
    nullable: true,
    checkFalsy: true
  }).isNumeric({ min: 0 }).withMessage("Shipping price must be number.").isLength({ max: 10 }).withMessage("Shipping Price must be 10 character long."),
  // body('REWARD_POINT_PURCHASE').optional().isNumeric().withMessage('Purchase price must be number..').isLength({ max: 10 }).withMessage('Purchace Price Quantity must be 10 character long.'),
  body("REWARD_POINT_PURCHASE").optional({
    nullable: true,
    checkFalsy: true
  }).isNumeric().withMessage("Reward point must be number..").isLength({ max: 6 }).withMessage("Reward point must be 6 character long.")
];

module.exports = {
  loginValidation,
  forgotPassworValidation,
  signupValidation,
  updateValidation,
  resetpasswordValidation,
  confirmPassword,
  updateAdminValidation,
  confirmResetPassword,
  confirmUserPassword,
  product,
  updateProduct,
  offers,
  setting,
  giftCards,
  updateGiftCard
};
