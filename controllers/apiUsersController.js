const ApiUser = require("../model/ApiUser");

const getAllUsers = async (req, res) => {
  const users = await ApiUser.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json({
    status: true,
    message: "Action was successful",
    data: users,
  });
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await ApiUser.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await ApiUser.deleteOne({ _id: req.body.id });
  res.json({
    status: true,
    message: "Action was successful",
    data: result,
  });
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await ApiUser.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json({
    status: true,
    message: "Action was successful",
    data: user,
  });
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
