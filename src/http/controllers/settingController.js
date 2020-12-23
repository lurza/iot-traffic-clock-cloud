import Setting from "../../models/Setting.js";
import { sendData, sendError } from "./util/send.js";
import repo from "../../data/settingRepo.js";

//
// helpers
//

function reqToSetting(req) {
  const body = req.body;
  if (!body.value) {
    throw new Error("Invalid body!");
  }

  return new Setting(null, body.value);
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
    const setting = await repo.show(key);
    sendData(res, setting);
  } catch (error) {
    sendError(res, 400, error);
  }
}

async function update(req, res) {
  try {
    const setting = reqToSetting(req);
    const key = reqToKey(req);
    const updated = await repo.update(key, setting);
    sendData(res, updated);
  } catch (error) {
    sendError(res, 400, error);
  }
}

export default {
  show,
  update,
};
