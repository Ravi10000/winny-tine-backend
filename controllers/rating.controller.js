import Rating from "../models/rating.model.js";

export async function add_n_updateRating(req, res) {
  const { star, description } = req.body;

  if (!star) {
    return res.status(400).json({ message: "star is required" });
  }

  const validStarRatings = ["Terrible", "Bad", "Okay", "Good", "Amazing"];

  if (!validStarRatings.includes(star)) {
    return res.status(400).json({ message: "Invalid star rating" });
  }

  const ratingData = {
    star,
    user: req.user._id,
  };
  if (description) {
    ratingData.description = description;
  }

  const existingRating = await Rating.findOne({ user: req.user._id });
  if (existingRating) {
    existingRating.star = ratingData.star;
    existingRating.description = ratingData.description;
    await existingRating.save();
    return res.status(200).json({
      
      success:true,
      status: "success",
      message: "Rating Updated Successfully",
      rating: existingRating,
    });
  }

  const rating = await Rating.create(ratingData);
  return res
    .status(201)
    .json({ 
      success:true,
      status: "success", message: "Rating Added Successfully", rating });
}

export async function getMyRating(req, res) {
  const rating = await Rating.findOne({ user: req.user._id });
  if (!rating) {
    return res
      .status(404)
      .json({ status: "error", message: "Rating not found" });
  }
  return res.status(200).json({ 
    success:true,
    status: "success", rating });
}

export async function getAllRatings(req, res) {
  const ratings = await Rating.find().populate("user", "fullname email mobile");
  return res.status(200).json({ 
    success:true,
    status: "success", ratings });
}
