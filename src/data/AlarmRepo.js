import Alarm from "../models/Alarm.js";
import { openDb } from "./db/sqliteConnection.js";

//
// helpers
//

function rowToAlarm(row) {
  return new Alarm(row.id, row.destination, row.arrival_time);
}

//
// crud
//

async function index() {
  const db = await openDb();
  const result = await db.all("SELECT * FROM alarms");
  await db.close();

  const alarms = result.map(rowToAlarm);
  return alarms;
}

async function show(id) {
  const db = await openDb();
  const result = await db.get("SELECT * FROM alarms WHERE id = ?", id);
  await db.close();

  const alarm = result ? rowToAlarm(result) : null;
  return alarm;
}

async function store(alarm) {
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO alarms(destination, arrival_time) VALUES(?, ?)",
    alarm.destination,
    alarm.arrivalTime
  );
  await db.close();

  return new Alarm(result.lastID, alarm.destination, alarm.arrivalTime);
}

async function update(id, alarm) {
  const db = await openDb();
  await db.run(
    "UPDATE alarms SET destination=?, arrival_time=? WHERE id = ?",
    alarm.destination,
    alarm.arrivalTime,
    id
  );
  await db.close();

  return new Alarm(id, alarm.destination, alarm.arrivalTime);
}

async function destroy(id) {
  const db = await openDb();
  const result = await db.run("DELETE FROM alarms WHERE id = ?", id);
  await db.close();
  console.log(result);
}

export default {
  index,
  show,
  store,
  update,
  destroy,
};
