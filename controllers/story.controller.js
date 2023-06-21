import Story from "../models/story.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addStory(req, res) {
  try {
    const { text, status } = req.body;
    const icon = req?.files?.icon[0]?.filename;
    const image = req?.files?.image[0]?.filename;

    if (!icon) {
      if (image) deleteFile(image);
      return res.status(400).json({ message: "icon is required" });
    }

    const storyData = {
      icon,
      createdBy: req.user._id,
    };

    if (status) {
      if (!["ACTIVE", "INACTIVE"].includes(status)) {
        if (icon) deleteFile(icon);
        if (image) deleteFile(image);
        return res
          .status(400)
          .json({ message: "Invalid status, can only be ACTIVE OR INACTIVE" });
      }
      storyData.status = status;
    }

    if (!text && !image) {
      if (icon) deleteFile(icon);
      return res.status(400).json({ message: "text or image required" });
    }

    if (text) {
      storyData.text = text;
    }
    if (image) {
      storyData.image = image;
    }

    const story = await Story.create(storyData);
    return res.status(201).json({
      status: "success",
      message: "Story Created Successfully",
      story,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
}
export async function updateStory(req, res) {
  try {
    const { text, status, storyId } = req.body;
    const icon =
      req?.files?.icon?.length > 0 && req?.files?.icon?.[0]?.filename;
    const image =
      req?.files?.image?.length > 0 && req?.files?.image?.[0]?.filename;

    if (!storyId) {
      return res.status(400).json({ message: "storyId is required" });
    }
    const oldStory = await Story.findById(storyId);
    if (!oldStory) {
      if (icon) deleteFile(icon);
      if (image) deleteFile(image);
      return res.status(400).json({ message: "storyId is invalid" });
    }

    const storyData = {
      updatedBy: req.user._id,
    };
    if (icon) storyData.icon = icon;
    if (text) storyData.text = text;
    if (image) storyData.image = image;

    if (status) {
      if (!["ACTIVE", "INACTIVE"].includes(status)) {
        if (icon) deleteFile(icon);
        if (image) deleteFile(image);
        return res
          .status(400)
          .json({ message: "Invalid status, can only be ACTIVE OR INACTIVE" });
      }
      storyData.status = status;
    }

    const story = await Story.findByIdAndUpdate(storyId, storyData);
    if (!story) {
      if (icon) deleteFile(icon);
      if (image) deleteFile(image);
      return res
        .status(400)
        .json({ status: "error", message: "something went wrong" });
    }
    if (icon) deleteFile(oldStory.icon);
    if (image) deleteFile(oldStory.image);

    return res.status(201).json({
      status: "success",
      message: "Story Created Successfully",
      story,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function getStories(req, res) {
  const { status } = req.query;
  const q = {};
  if (status) {
    if (!["ACTIVE", "INACTIVE"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status, can only be ACTIVE OR INACTIVE" });
    }
    q.status = status;
  }
  const story = await Story.find(q);
  return res
    .status(200)
    .json({ status: "success", message: "Stories Sent Successfully", story });
}
