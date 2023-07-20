import News from "../models/news.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addNews(req, res, next) {
  try {
    await News.create({
      ...req.body,
      image: req.file.filename,
      addedBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      status: "success",
      message: "News Created Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export const getAllNews = async (req, res, next) => {
  try {
    const data = await News.find({}).sort({ _id: -1 });
    return res.status(201).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsById = async (req, res, next) => {
  try {
    const data = await News.findById(req.params.newsId);
    return res.status(200).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export async function updateNews(req, res, next) {
  try {
    const newsId = req.params.newsId;
    const { filename } = req.file || {};

    if (req.file) {
      const { image } = await News.findById(newsId);
      if (filename) deleteFile(image);
    }

    const update = { ...req.body };
    if (filename) update.image = filename;

    await News.findByIdAndUpdate(newsId, update);

    return res.status(201).json({
      success: true,
      status: "success",
      message: "News Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export function deleteNews(req, res, next) {
  const newsId = req.params.newsId;
  News.findByIdAndDelete(newsId)
    .then((data) => {
      deleteFile(data.image);
      return res.status(200).json({
        success: true,
        status: "success",
        message: "News Deleted Successfully",
      });
    })
    .catch(next);
}
