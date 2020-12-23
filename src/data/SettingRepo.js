import { openDb } from "./db/sqliteConnection.js";

//
// read and update
//

async function show(key) {
  const db = await openDb();
  const result = await db.get("SELECT * FROM settings WHERE key = ?", key);
  await db.close();

  const value = result ? result.value : null;
  return value;
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
