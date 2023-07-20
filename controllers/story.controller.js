import Story from "../models/story.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addStory(req, res, next) {
  try {
    const image = req.files["image"][0].filename;
    const profileImage = req.files["profileImage"][0].filename;

    await Story.create({
      ...req.body,
      image,
      profileImage,
      addedBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      status: "success",
      message: "Story Created Successfully",
    });
  } catch (err) {
    next(err);
  }
}
export async function updateStory(req, res, next) {
  try {
    const storyId = req.params.storyId;
    const { image, profileImage } = req.files || {};

    if (req.files) {
      const { image: oldImage, profileImage: oldProfileImage } =
        await Story.findById(storyId);
      if (image) deleteFile(oldImage);
      if (profileImage) deleteFile(oldProfileImage);
    }

    const update = { ...req.body };
    if (image) update.image = image[0].filename;
    if (profileImage) update.profileImage = profileImage[0].filename;

    await Story.findByIdAndUpdate(storyId, update);

    return res.status(201).json({
      success: true,
      status: "success",
      message: "Story Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function getStories(req, res) {
  try {
    const data = await Story.find({});
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Stories Sent Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getStoryById(req, res) {
  try {
    const storyId = req.params.storyId;
    const data = await Story.findById(storyId);
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Story Sent Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export function deleteStory(req, res, next) {
  const storyId = req.params.storyId;
  Story.findByIdAndDelete(storyId)
    .then((data) => {
      const { image, profileImage } = data;
      deleteFile(image);
      deleteFile(profileImage);
      return res.status(200).json({
        success: true,
        status: "success",
        message: "Story Deleted Successfully",
      });
    })
    .catch(next);
}
