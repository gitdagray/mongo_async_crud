const generateReferralCode = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let referralCode = "";

  for (let i = 0; i < 6; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return referralCode;
};

module.exports = generateReferralCode;
