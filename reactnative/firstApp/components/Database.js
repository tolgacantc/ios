// https://github.com/didinj/react-native-sqlite-offline/blob/master/Database.js
// https://www.djamware.com/post/5caec76380aca754f7a9d1f1/react-native-tutorial-sqlite-offline-androidios-mobile-app
import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "tolgacantc.db";
const database_version = "1.0";
const database_displayname = "SQLite Database";
const database_size = 200000;
const table_name = "Records";

export default class Database {

    initDB() {
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    SQLite.openDatabase(
                            database_name,
                            database_version,
                            database_displayname,
                            database_size
                        )
                        .then(DB => {
                            db = DB;
                            console.log("Database OPEN");
                            db.executeSql(`SELECT 1 FROM ${table_name} LIMIT 1`).then(() => {
                                console.log("Database is ready ... executing query ...");
                            }).catch((error) => {
                                console.log("Received error: ", error);
                                console.log("Database not yet ready ... populating data");
                                db.transaction((tx) => {
                                    tx.executeSql(`create table if not exists ${table_name} (id integer primary key not null, action text, date text);`);
                                }).then(() => {
                                    console.log("Table created successfully");
                                }).catch(error => {
                                    console.log(error);
                                });
                            });
                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("echoTest failed - plugin not functional");
                });
        });
    };

    closeDatabase(db) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then(status => {
                    console.log("Database CLOSED");
                })
                .catch(error => {
                    this.errorCB(error);
                });
        } else {
            console.log("Database was not OPENED");
        }
    };

    updateProduct(id, action, actionDate) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql(`UPDATE ${table_name} SET action = ?, date = ? WHERE id = ?`, [action, actionDate, id]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    recordById(record_id) {
        return new Promise((resolve) => {
            const products = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql(`select * from ${table_name} where id = ?`, [record_id]).then(([tx, results]) => {
                        console.log("Query completed");
                        var len = results.rows.length;
                        if (len > 0) {
                            resolve(results.rows.item[0]);
                        }
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


    listRecords() {
        return new Promise((resolve) => {
            const products = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql(`select * from ${table_name} order by date  DESC`, []).then(([tx, results]) => {
                        console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            console.log(`Prod ID: ${row.id}, Prod Name: ${row.action}`)
                            products.push(row);
                        }
                        console.log(products);
                        resolve(products);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    addRecord(action, date) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql(`insert into ${table_name} (action, date) values (?,?)`, [action, date]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
}
