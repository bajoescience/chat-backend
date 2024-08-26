const Notif = require("../models/notif");

const notifRouter = require("express").Router();

notifRouter.get("/", async (req, res) => {
  const notifs = await Notif.find({});
  res.json(notifs);
});

notifRouter.get("/check", async (req, res) => {
  const { sender, receiver } = req.query;

  if (!sender || !receiver) {
    return res.status(403).json({
      err: "Sender or Receiver id not valid",
    });
  }

  // Get notifications that match the query
  const filteredNotifs = await Notif.findOne({ sender, receiver });

  res.json(filteredNotifs);
});

notifRouter.put("/:id", async (req, res) => {
  const newNotif = req.body;

  if (!newNotif) {
    return res.status(403).json({
      error: "Notif object is not a valid notification",
    });
  }

  const changedNotif = await Notif.findByIdAndUpdate(req.params.id, newNotif, {
    new: true,
  });

  res.json(changedNotif);
});

module.exports = notifRouter;
