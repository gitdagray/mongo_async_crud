const ApiUser = require("../model/ApiUser");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  // check for duplicate usernames in the db
  const duplicate = await ApiUser.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //store the new user
    const result = await ApiUser.create({
      email,
      password: hashedPassword,
    });
    console.log(result);
    res.status(201).json({ success: `New user ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
