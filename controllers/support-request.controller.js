import SupportRequest from "../models/support-request.model.js";

export async function createSupportRequest(req, res) {
  const { description } = req.body;
  if (!description)
    return res.status(400).json({ message: "Description is required" });

  const supportRequest = await SupportRequest.create({
    user: req.user._id,
    description,
  });

  res.status(201).json({
    status: "success",
    message: "Support Request Created",
    supportRequest,
  });
}

export async function getAllSupportRequests(req, res) {
  const supportRequests = await SupportRequest.find({}).populate("user");
  res.status(200).json({
    status: "success",
    message: "All Support Requests",
    supportRequests,
  });
}
export async function getMySupportRequests(req, res) {
  const supportRequests = await SupportRequest.find({
    user: req.user._id,
  });
  res.status(200).json({
    status: "success",
    message: "My Support Requests",
    supportRequests,
  });
}

export async function updateRequest(req, res) {
  const { reply, status, requestId } = req.body;
  if (!reply) return res.status(400).json({ message: "Reply is required" });

  const supportRequest = await SupportRequest.findById(requestId);
  if (!supportRequest)
    return res.status(400).json({ message: "Support Request Not Found" });

  supportRequest.reply = reply;
  supportRequest.repliedAt = Date.now();
  supportRequest.repliedBy = req.user._id;
  if (status) {
    if (status === "RESOLVED" || status === "OPEN") {
      supportRequest.status = status;
    }
  }

  await supportRequest.save();

  res.status(200).json({
    status: "success",
    message: "Reply Added Successfully",
    supportRequest,
  });
}
