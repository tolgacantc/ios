import SQL from "./SQL";

export default class DataFetcher {
    static Init() {
        SQL.InitDatabase();
    }

    static AddRecord = (action, actionTime) => {
        SQL.AddRecord(action, actionTime);
    }

    static DeleteRecord = (keyId) => {
        SQL.DeleteRecord(keyId);
    }

    static GetRecords = () => {
        return SQL.GetRecords();
    }
}
