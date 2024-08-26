const messageRouter = require("express").Router();
const Message = require("../models/message");
const User = require("../models/users");
const message = require("../models/message");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const middleware = require("../utils/middleware");
const mongoose = require("mongoose");
const Notif = require("../models/notif");

messageRouter.get("/", async (req, res) => {
  const messages = await Message.find({});
  res.json(messages);
});

// Get all messages between a sender and a receiver
messageRouter.get("/fetch", async (req, res) => {
  const { sender, receiver } = req.query;

  const messages = await Message.find({
    sender,
    receiver,
  });

  res.json(messages);
});

// Get a message by id
messageRouter.get("/:id", async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);
  const message = await Message.find({ _id });
  res.json(message);
});

// Get all the messages that correspond btw users

const details = async (sender, receiver) => {
  const messages = await Message.find({
    sender: sender._id,
    receiver: receiver._id,
  });
  return messages.length;
};

// Get sort number
const getSortNumber = async (sender, receiver) => {
  const length1 = await details(sender, receiver);
  const length2 = await details(receiver, sender);
  return length1 + length2 + 1;
};

messageRouter.post("/", middleware.userExtractor, async (req, res) => {
  const { string, files, sender, receiver } = req.body;
  const user = req.user;

  // Make sure the message details exist
  if (!string && files.length <= 0) {
    return res.status(400).json({
      err: "message must have a body",
    });
  }

  // The sender must match the user in request obj
  if (user._id.toString() !== sender) {
    return res.status(403).json({
      err: "Sender and account user conglict identified",
    });
  }

  // Sender cannot message receiver
  if (sender === receiver) {
    return res.status(400).json({
      err: "user cannot message the same user",
    });
  }

  // Get the message sender and receiver
  const senderDB = user;
  const receiverDB = await User.findById(receiver);

  if (!senderDB || !receiverDB) {
    return res.status(400).json({
      err: "receiver or sender details cannot be found",
    });
  }

  const message = new Message({
    string,
    files: files || [],
    date: req.date,
    sender: senderDB._id,
    receiver: receiverDB._id,
    sortNumber: await getSortNumber(senderDB, receiverDB),
  });

  const savedMessage = await message.save();

  // Notify receiver of new message
  // TODO: Update Notification and save it to the receiver side
  const notif = await Notif.findOne({
    sender: senderDB._id,
    receiver: receiverDB._id,
  });

  if (string?.length > 10) {
  }
  const reducedString =
    string?.length > 10 ? `${string.substring(0, 10)}...` : string;

  // If notification object between users does not exist, create it
  let newNotif;
  if (!notif) {
    const notifObj = new Notif({
      sender: senderDB._id,
      receiver: receiverDB._id,
      message: reducedString,
      date: req.date,
      count: 1,
    });

    newNotif = await notifObj.save();

    // Register the new notification object
    // in both sender and receiver data objects
    receiverDB.notif = receiverDB.notif.concat(newNotif._id);
    senderDB.notif = senderDB.notif.concat(newNotif._id);
  } else {
    newNotif = await Notif.findByIdAndUpdate(
      notif._id,
      {
        $set: {
          count: notif.count + 1,
          message: reducedString,
          date: req.date,
        },
      },
      {
        new: true,
      }
    );
  }

  if (!newNotif) {
    return res.status(500).json({
      err: "Error Updating notification document",
    });
  }

  // Add message in sender's messages array
  senderDB.messages = senderDB.messages.concat(savedMessage._id);
  await senderDB.save();

  // Add message in receiver's messages array
  // also add notification to receiver's notif array
  receiverDB.messages = receiverDB.messages.concat(savedMessage._id);
  await receiverDB.save();

  res.status(201).json(savedMessage);
});

module.exports = messageRouter;
