const { response } = require('express');
const { json } = require('express/lib/response');

const Event = require('../models/Event.model');

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');

  res.status(200).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact support for more information',
    });
  }
};

const updateEvent = async (req, res = response) => {
  // const event = await Event.updateOne();

  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'No such event found with that id',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized to perform action',
      });
    }

    const newDataEvent = { ...req.body, user: uid };

    const newUpdatedEvent = await Event.findByIdAndUpdate(
      eventId,
      newDataEvent,
      { new: true }
    );

    res.json({
      ok: true,
      event: newUpdatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact support for more information',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.json({
        ok: false,
        msg: 'No such event found with that id',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized to perform action',
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      msg: 'Event deleted successfully',
      event: deletedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact support for more information',
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
