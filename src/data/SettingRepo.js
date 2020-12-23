import Setting from "../models/Setting.js";
import { openDb } from "./database/sqliteConnection.js";

//
// helpers
//

function rowToSetting(row) {
  return new Setting(row.key, row.value);
}

//
// show and update
//

async function show(key) {
  const db = await openDb();
  const result = await db.get("SELECT * FROM settings WHERE key = ?", key);
  await db.close();

  const setting = result ? rowToSetting(result) : null;
  return setting;
}

async function update(key, setting) {
  const db = await openDb();
  await db.run(
    "UPDATE settings SET value = ? WHERE key = ?",
    setting.value,
    key
  );
  await db.close();

  return new Setting(key, setting.value);
}

export default {
  show,
  update,
};
