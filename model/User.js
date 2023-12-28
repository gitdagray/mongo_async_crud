const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  slug: String,
  phone_verified: Boolean,
  document_verified: Boolean,
  balance: Number,
  blocked_at: Date,
  status: String,
  package: { type: Object },
  referral_code: {
    type: String,
  },
  referred_by: {
    type: String,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
