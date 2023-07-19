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

export async function getActiveUser(req, res, next) {
  try {
    const { groupby } = req.query;
    let data;
    if (groupby) {
      switch (groupby.toLowerCase().trim()) {
        case "daily":
          data = Event.find({
            startDateTime: {
              $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          });
          break;
        case "weekly":
          let weeklyDate = new Date();
          weeklyDate.setDate(weeklyDate.getDate() - 7);
          data = Event.find({
            startDateTime: {
              $gte: weeklyDate,
            },
          });
          break;
        case "monthly":
          let monthlyDate = new Date();
          monthlyDate.setFullYear(monthlyDate.getFullYear() - 1);
          data = Event.find({
            startDateTime: {
              $gte: monthlyDate,
            },
          });
          break;
        default:
          throw new Error(
            `${groupby} query is not valid, try daily, weekly and monthly`
          );
      }
      data = await data;
    } else {
      data = await Event.find({});
    }
    return res.status(200).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
}
