import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  startDateTime: {
    type: String,
  },
  eventType: {
    type: String,
    enum: ["APP_LAUNCH"],
    required: true,
  },
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
