import User from "../models/user.model.js";

export async function updateUserDetails(req, res) {
  const { name, email, referralCode } = req.body;
  const dataToBeUpdated = {};
  if (name) dataToBeUpdated.name = name;
  if (email) dataToBeUpdated.email = email;
  if (referralCode) {
    const user = await User.findById(req.user._id);
    if (!user.referredBy) {
      const referredByUser = await User.find({
        referralCode: referralCode.toUpperCase(),
      });
      if (referredByUser)
        dataToBeUpdated.referredBy = referralCode.toUpperCase();
    }
  }
  const newUser = await User.findByIdAndUpdate(req.user._id, dataToBeUpdated, {
    new: true,
  });
  if (!newUser)
    return res.status(400).json({ status: "error", message: "User Not Found" });

  res.status(200).json({
    status: "success",
    message: "User Details Updated Successfully",
    user: newUser,
  });
}
