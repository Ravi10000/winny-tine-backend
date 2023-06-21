import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    icon: String,
    image: String,
    text: String,
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
