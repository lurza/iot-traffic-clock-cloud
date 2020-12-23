import { sendData, sendError } from "./util/send.js";
import repo from "../../data/settingRepo.js";

function reqToValue(req) {
  const value = req.body.value;

  if (!value) {
    throw new Error("Invalid body!");
  }

  return value;
}

function reqToKey(req) {
  const key = req.params.key;
  if (!key) {
    throw new Error("Invalid key!");
  }

  return key;
}

//
// show and update
//

async function show(req, res) {
  try {
    const key = reqToKey(req);
    const value = await repo.show(key);
    sendData(res, value);
  } catch (error) {
    sendError(res, 400, error);
  }
}

async function update(req, res) {
  try {
    const updatedValue = reqToValue(req);
    const key = reqToKey(req);
    await repo.update(key, updatedValue);
    sendData(res, updatedValue);
  } catch (error) {
    sendError(res, 400, error);
  }
}

export default {
  show,
  update,
};
