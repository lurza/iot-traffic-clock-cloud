import { openDb } from "./database/sqliteConnection.js";

//
// helpers
//

async function show(key) {
  const db = await openDb();
  const result = await db.get("SELECT * FROM settings WHERE key = ?", key);
  await db.close();

  return result;
}

async function update(key, value) {
  const db = await openDb();
  await db.run("UPDATE settings SET value = ? WHERE key = ?", value, key);
  await db.close();
  return value;
}

export default {
  show,
  update,
};
