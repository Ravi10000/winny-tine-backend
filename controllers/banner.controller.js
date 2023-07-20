import Banner from "../models/banner.model.js";
import { deleteFile } from "../utils/delete-file.js";

export const addBanner = async (req, res, next) => {
  try {
    await Banner.create({
      ...req.body,
      addedBy: req.user._id,
      image: req.file.filename,
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
    const bannerId = req.params.bannerId;
    const { filename } = req.file || {};

    if (req.file) {
      const { image } = await Banner.findById(bannerId);
      if (filename) deleteFile(image);
    }
    const updates = { ...req.body };
    if (filename) updates.image = filename;
    await Banner.findByIdAndUpdate(bannerId, {
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

export function deleteBanner(req, res, next) {
  const bannerId = req.params.bannerId;
  Banner.findByIdAndDelete(bannerId).then((data) => {
    deleteFile(data.image);
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Banner Deleted Successfully",
    });
  });
}
