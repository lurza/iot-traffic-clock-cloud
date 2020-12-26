import Alarm from "../models/Alarm.js";
import { openDb } from "./database/sqliteConnection.js";

//
// helpers
//

function rowToAlarm(row) {
    return new Alarm(row.id, row.destination, row.arrival);
}

//
// crud
//

async function index() {
    const db = await openDb();
    const result = await db.all("SELECT * FROM alarms");
    await db.close();

    const alarms = result ? result.map(rowToAlarm) : [];
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
        "INSERT INTO alarms(destination, arrival) VALUES(?, ?)",
        alarm.destination,
        alarm.arrival
    );
    await db.close();

    return new Alarm(result.lastID, alarm.destination, alarm.arrival);
}

async function update(id, alarm) {
    const db = await openDb();
    await db.run(
        "UPDATE alarms SET destination=?, arrival=? WHERE id = ?",
        alarm.destination,
        alarm.arrival,
        id
    );
    await db.close();

    return new Alarm(id, alarm.destination, alarm.arrival);
}

async function destroy(id) {
    const db = await openDb();
    await db.run("DELETE FROM alarms WHERE id = ?", id);
    await db.close();
}

export default {
    index,
    show,
    store,
    update,
    destroy,
};
