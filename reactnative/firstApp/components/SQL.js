import SQLite from "react-native-sqlite-storage";

const tableName = "child_records";
const db = 
    SQLite.openDatabase({
        name: "TestDatabase",
        location: "default"
    }).then((db) => {
        console.log("Database open!");
    });

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

