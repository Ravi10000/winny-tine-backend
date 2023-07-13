import Banner from "../models/banner.model.js";

export const addBanner = async (req, res, next) => {
  try {
    await Banner.create({
      ...req.body,
      addedBy: req.user._id,
      image: req.file.originalname,
    });
    return res.status(201).json({
      success: true,
      status: "success",
      message: "Banner Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBanners = async (req, res, next) => {
  try {
    const data = await Banner.find({});
    return res.status(201).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getBannerById = async (req, res, next) => {
  try {
    const data = await Banner.findById(req.params.bannerId);
    return res.status(200).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = req.file.originalname;
    await Banner.findByIdAndUpdate(req.params.bannerId, {
      ...updates,
      updatedBy: req.user._id,
    });
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Banner Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export async function deleteBanner(req, res, next) {
  try {
    const bannerId = req.params.bannerId;
    await Banner.findByIdAndDelete(bannerId);
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Banner Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
}
