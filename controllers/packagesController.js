const Package = require("../model/Package");
const User = require("../model/User");

const getAllPackages = async (req, res) => {
  const packages = await Package.find();
  if (!packages) res.send(204).json({ message: "No packages found." });
  res.json(packages);
};

const createPackage = async (req, res) => {
  if (!req?.body?.price || !req?.body?.mining_rate_per_day) {
    res
      .status(400)
      .json({ message: "price and mining rate per day are required" });
  }

  try {
    const { price, mining_rate_per_day } = req.body;
    const result = await Package.create({
      price: price,
      mining_rate_per_day: mining_rate_per_day,
    });
    res
      .status(201)
      .json({ status: true, message: "Action was successful", data: result });
  } catch (error) {
    console.error(error);
  }
};

const selectPackage = async (req, res) => {
  //   console.log("User Id: ", req.id);
  try {
    const user = await User.findOne({ _id: req.user.id }).exec();
    if (!user)
      return res
        .status(400)
        .json({ message: `No user matches ID ${req.user.id}` });

    const id = req.params.id;

    // console.log("Package Id", id);
    const selectedPackage = await Package.findOne({ _id: id }).exec();
    if (!selectedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    user.package = selectedPackage;
    const result = await user.save();
    // console.log("result: ", result);
    res.status(200).json({
      status: true,
      message: "Action was successful",
      data: selectedPackage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePackage = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Package ID is required" });
  }
  try {
    const package = await Package.findOne({ _id: req.body.id }).exec();
    // console.log("Package: ", package);
    if (!package) {
      return res
        .status(400)
        .json({ message: `No package matches ID ${req.body.id}` });
    }
    if (req.body?.price) package.price = req.body.price;
    if (req.body?.mining_rate_per_day)
      package.mining_rate_per_day = req.body.mining_rate_per_day;
    const result = await package.save();
    res.json({
      status: true,
      message: "Action was successful",
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const deletePackage = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Package ID is required" });
  }
  try {
    const package = await Package.findOne({ _id: req.params.id }).exec();
    if (!package) {
      return res
        .status(400)
        .json({ message: `No package matches ID ${req.params.id}` });
    }
    const result = await Package.deleteOne({ _id: req.params.id });
    res.json({
      status: true,
      message: "Action was successful",
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const getPackage = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Package ID is required" });
  }
  const package = await Package.findOne({ _id: req.params.id }).exec();
  if (!package) {
    return res
      .status(400)
      .json({ message: `No package matches ID ${req.params.id}` });
  }
  res.json({
    status: true,
    message: "Action was successful",
    data: package,
  });
};

module.exports = {
  createPackage,
  selectPackage,
  updatePackage,
  deletePackage,
  getPackage,
  getAllPackages,
};
