import Alarm from "../models/Alarm.js";
import { sendData, sendError } from "./util/send.js";
import repo from "../data/alarmRepo.js";

//
// helpers
//

function reqToAlarm(req) {
  const body = req.body;
  if (!body.destination || !body.arrival) {
    throw new Error("Invalid body!");
  }

  return new Alarm(null, body.destination, body.arrival);
}

function reqToId(req) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    throw new Error("ID must be a number!");
  }

  return id;
}

//
// crud
//

async function index(req, res) {
  const alarms = await repo.index();
  sendData(res, alarms);
}

async function show(req, res) {
  try {
    const id = reqToId(req);
    const alarm = await repo.show(id);
    sendData(res, alarm);
  } catch (error) {
    sendError(res, 400, error);
  }
}

async function store(req, res) {
  try {
    const alarm = reqToAlarm(req);
    const stored = await repo.store(alarm);
    sendData(res, stored);
  } catch (error) {
    sendError(res, 400, error);
  }
}

async function update(req, res) {
  try {
    const alarm = reqToAlarm(req);
    const id = reqToId(req);
    const updated = await repo.update(id, alarm);
    sendData(res, updated);
  } catch (error) {
    sendError(res, 400, error);
  }
}

async function destroy(req, res) {
  try {
    const id = reqToId(req);
    await repo.destroy(id);
    sendData(res, null);
  } catch (error) {
    sendError(res, 400, error);
  }
}

export default {
  index,
  show,
  store,
  update,
  destroy,
};
