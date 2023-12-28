const ApiUser = require("../model/ApiUser");
const User = require("../model/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  const user =
    (await ApiUser.findOne({ email }).exec()) ||
    (await User.findOne({ email }).exec());
  if (!user) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const roles = Object.values(user.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          package: user.package,
          slug: user.slug,
          status: user.status,
          phone_verified: null,
          document_verified: null,
          balance: 0 ?? user.balance,
          referred_by: user.referred_by,
          referral_code: user.referral_code,
          roles: roles,
          created_at: user.created_at,
          blocked_at: user.blocked_at,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600s" }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    user.refreshToken = refreshToken;
    const result = await user.save();
    // console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      status: true,
      message: "Action was successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          package: user.package,
          slug: null ?? user.slug,
          status: "active" ?? user.status,
          phone_verified: null,
          document_verified: null,
          balance: 0 ?? user.balance,
          referred_by: user.referred_by,
          referral_code: null ?? user.referral_code,
          roles: roles,
          created_at: user.created_at,
          blocked_at: null,
        },
        access_token: accessToken,
      },
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
