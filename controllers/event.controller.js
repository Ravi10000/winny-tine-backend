import Event from "../models/event.model.js";

export function activeUser(req, res, next) {
  const { eventType } = req.body;
  const userid = req.user._id;
  Event.findOne({ userid })
    .then((data) => {
      if (data) {
        data.startDateTime = new Date();
        if (eventType) data.eventType = eventType;
        data.save();
      } else {
        return Event.create({
          eventType,
          startDateTime: new Date(),
          userid,
        });
      }
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        status: "success",
      });
    })
    .catch(next);
}

export async function getAllActiveUser(req, res, next) {
  try {
    const data = await Event.find({});
    return res.status(200).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDailyActiveuser(req, res, next) {
  try {
    const data = await Event.find({
      startDateTime: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    });
    return res.status(200).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
}
