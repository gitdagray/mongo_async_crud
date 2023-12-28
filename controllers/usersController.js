const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateReferralCode = require("../utils/generateReferralCode");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) res.send(204).json({ message: "No users found." });
  res.json({
    status: true,
    message: "Action was successful",
    data: users,
  });
};

const createNewUser = async (req, res) => {
  if (!req?.body?.name || !req?.body?.email || !req?.body?.password) {
    res.status(400).json({ message: "name, email and password are required" });
  }
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const referralCode = generateReferralCode();
    await User.create({
      name: req.body.name,
      email: req.body.email,
      referred_by: req.body.referred_by,
      referral_code: referralCode,
      password: hashedPwd,
    });
    res.status(201).json({
      status: true,
      message: "Action was successful",
      data: {
        user: {
          // id: _id,
          name: req.body.name,
          email: req.body.email,
          referred_by: req.body.referred_by,
          status: "active",
          referral_code: referralCode,
          package: {},
          roles: {
            User: 2001,
          },
          created_at: new Date(),
          updated_at: new Date(),
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches ID ${req.body.id}` });
  }
  if (req.body?.firstname) user.firstname = req.body.firstname;
  if (req.body?.lastname) user.lastname = req.body.lastname;
  const result = await user.save();
  res.json({
    status: true,
    message: "Action was successful",
    data: { result, updated_at: Date.now },
  });
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches ID ${req.body.id}` });
  }
  const result = await User.deleteOne({ _id: req.body.id });
  res.json({
    status: true,
    message: "Action was successful",
    data: result,
  });
};

const getUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches ID ${req.params.id}` });
  }
  res.json({
    status: true,
    message: "Action was successful",
    data: user,
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
