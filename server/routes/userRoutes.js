const express = require("express");
const Users = require("../models/userModel");
const Protect = require("../middlewares/authMiddleware");
const {
  resizeUserPhoto,
  uploadUserPhoto,
} = require("../middlewares/imgMiddleware");
const { createUser, login } = require("../controllers/userController");
const router = express.Router();

//REGISTER

router.post(
  "/user",
  uploadUserPhoto,
  resizeUserPhoto,
  async (req, res, next) => {
    const user = await req.body;
    console.log(req.pic, "aas");
    createUser(user)
      .then((doc) => res.json(doc))
      .catch((err) => next(err));
    console.log("registered!");
  }
);

//LOGIN
router.post("/login", async (req, res, next) => {
  const { name, password } = req.body;
  const userCheck = await Users.findOne({ name }).select("-password").exec();
  try {
    if (userCheck) {
      const token = await login({ name, password }, next);
      res.json({ token, userCheck });
    }
  } catch (e) {
    throw "Error2";
  }
});

//SEARCH
router.get("/user", Protect, async (req, res, next) => {
  const keyWord = (await req.query.search)
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const members = await Users.find(keyWord).find({
    _id: { $ne: req.user._id },
  });
  res.json(members);
});

module.exports = router;
