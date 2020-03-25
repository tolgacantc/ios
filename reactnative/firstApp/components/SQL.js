import * as SQLite from 'expo-sqlite'

const tableName = "child_records";
const db = SQLite.openDatabase("child_records");

export default class SQL {
  static InitDatabase() {
    db.transaction(tx => {
      tx.executeSql(
        `create table if not exists ${tableName} (id integer primary key not null, action text, date text);`
      );
    });
  }

  static AddRecord = (action, actionTime) => {
    db.transaction(
      tx => {
		console.log(action);
		console.log(actionTime);
        tx.executeSql(`insert into ${tableName} (action, date) values (?,?)`, [
          action,
          actionTime
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
          `select * from ${tableName} order by date DESC`,
          null,
          (_, { rows: { _array } }) => {
            resolve(_array);
          }
        );
      });
    });
  };
}

