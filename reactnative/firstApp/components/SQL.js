import * as SQLite from 'expo-sqlite'

const tableName = "records";
const db = SQLite.openDatabase("babyTracker.db");

export default class SQL {
    static InitDatabase() {
        db.transaction(tx => {
            tx.executeSql(
                `create table if not exists ${tableName} (id integer primary key not null, action text, date text, desc text);`
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
                    (_, {
                        rows: {
                            _array
                        }
                    }) => {
                        resolve(_array);
                    }
                );
            });
        });
    };

    static DeleteRecord = (keyId) => {
        db.transaction(
            tx => {
                console.log("DELETING", keyId);
                tx.executeSql(`delete from ${tableName} where id=?`, [keyId]);
            },
            null,
            null
        );
    };


}
