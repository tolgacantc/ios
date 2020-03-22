import * as SQLite from 'expo-sqlite'

const tableName = "first_app_records";
const db = SQLite.openDatabase("first_app_records");

export default class SQL {
  static InitDatabase() {
    db.transaction(tx => {
      tx.executeSql(
        `create table if not exists ${tableName} (id integer primary key not null, name text, date text);`
      );
    });
  }

  static AddRecord = text => {
    db.transaction(
      tx => {
		console.log("recording");
        tx.executeSql(`insert into ${tableName} (name, date) values (?,?)`, [
          text,
          new Date().toUTCString()
        ]);
      },
      null,
      null
    );
  };

  static GetRecords = () => {
    return new Promise((resolve, reject) => {
      db.transaction(async tx => {
        await tx.executeSql(
          `select * from ${tableName} order by id DESC`,
          null,
          (_, { rows: { _array } }) => {
            resolve(_array);
          }
        );
      });
    });
  };
}

