import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    expiryDate: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /\d{2}\/\d{2}\/\d{4}/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid format!, accpeted format is DD/MM/YYYY`,
      },
    },
    addedBy: {
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
