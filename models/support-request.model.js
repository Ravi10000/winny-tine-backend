import mongoose from "mongoose";

// const replySchema = new mongoose.Schema(
//   {
//     reply: {
//       type: String,
//       required: true,
//     },
//     repliedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

const supportRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "RESOLVED"],
      default: "OPEN",
    },
    reply: String,
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repliedAt: Date,
  },
  { timestamps: true }
);

const SupportRequest = mongoose.model("SupportRequest", supportRequestSchema);
export default SupportRequest;
