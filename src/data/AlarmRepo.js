import { Alarm } from "../models/Alarm.js";
import { openDb } from "./db/sqliteConnection.js";

export class AlarmRepo {
  rowToAlarm(row) {
    return new Alarm(row.id, row.destination, row.arrival_time);
  }

  async getAll() {
    const db = await openDb();
    const result = await db.all("SELECT * FROM alarms");
    await db.close();

    const alarms = result.map(this.rowToAlarm);
    return alarms;
  }

  async add(alarm) {
    const db = await openDb();
    const result = await db.run(
      "INSERT INTO alarms(destination, arrival_time) VALUES(?, ?)",
      alarm.destination,
      alarm.arrivalTime
    );
    await db.close();

    return result;
  }
}
