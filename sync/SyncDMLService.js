"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SyncServiceHelper_1 = require("../sync/SyncServiceHelper");
var Props_1 = require("../constants/Props");
var moment = require("moment");
var Config = __importStar(require("../utils/Config"));
var SyncCache_1 = require("./SyncCache");
var Log_1 = require("../utils/Log");
var STAGING_ID = "STAGING";
var STORE_ID = process.env.ENV_STORE_ID || "LOCAL-TEST";
var SyncDMLService = /** @class */ (function () {
    function SyncDMLService(slog) {
        // async syncDb(sourceDb: any, targetDb: any, token:string, sync: any, currentTime: string) {
        //   //console.table(sync);
        //   //if (sync.source_id != STAGING_ID || sync.source_id == STAGING_ID) throw "simple throw";
        //   let updateSyncConfig = SyncServiceHelper.LayeredStageDBOptions();
        //   let batchSql: any[] = [];
        //   let sql: any;
        //   let isChunkEnd = false;
        //   let offset: number = 0;
        //   let isTableUpdated = true;
        //   let lastUpdate = currentTime;
        //   //let lastUpdate = await this.buildLastUpdatedDate(sourceDb, sync);
        //   this.log.info("************* Last Update: " + lastUpdate + " *************");
        //   try {
        //     let rowsAvalible: any = null;
        //     let rowsNotAvalible: any = null;
        //     while (isChunkEnd == false) {
        //       this.log.info("************* ***** *************");
        //       rowsAvalible = null;
        //       rowsNotAvalible = null;
        //       batchSql = [];
        //       sql = this.buildDMLSelectQuery(sync, offset, currentTime);
        //       const soruceRes: any = await SyncServiceHelper.ExecuteQueryApi(sourceDb+'executequery',token, sync.map_table, sql, this.log);
        //       if (soruceRes && soruceRes.rows.length != 0) {
        //         let rowsLength = soruceRes.rows.length;
        //         let primaryKeys = soruceRes.rows.map((ele: any) => ele[sync.map_pk]);
        //         sql = await SyncServiceHelper.ChackAvalibleQuery(
        //           sync.map_table,
        //           soruceRes.metaData,
        //           primaryKeys,
        //           sync.map_pk,
        //           this.log
        //         );
        //         let res: any = await SyncServiceHelper.ExecuteQueryApi(targetDb+'executequery', token, sync.map_table, sql, this.log);
        //         rowsAvalible = res.rows.map((ele: any) => ele[sync.map_pk]);
        //         rowsNotAvalible = primaryKeys.filter((ele: any) => rowsAvalible.indexOf(ele) < 0);
        //         this.log.debug("\t\tUpdate Records: " + sync.map_table + " --> " + rowsAvalible.length);
        //         this.log.debug("\t\tInsert Records: " + sync.map_table + " --> " + rowsNotAvalible.length);
        //         let metaDataTable: any = await SyncServiceHelper.MetadataTable(targetDb, sync.map_table);
        //         if (rowsAvalible && rowsAvalible.length > 0) {
        //           sql = await SyncServiceHelper.PrepareQuery(
        //             sync.map_table,
        //             metaDataTable,
        //             soruceRes.rows,
        //             rowsAvalible,
        //             "UPDATE",
        //             sync.map_pk,
        //             this.log
        //           );
        //           batchSql.push(sql);
        //         }
        //         if (rowsNotAvalible && rowsNotAvalible.length > 0) {
        //           sql = await SyncServiceHelper.PrepareQuery(
        //             sync.map_table,
        //             metaDataTable,
        //             soruceRes.rows,
        //             rowsNotAvalible,
        //             "INSERT",
        //             sync.map_pk,
        //             this.log
        //           );
        //           batchSql.push(sql);
        //         }
        //         if (batchSql && batchSql.length > 0) {
        //           //TODO:
        //           // await SyncServiceHelper.BatchQueryApi(targetDb+'batchquery', batchSql, this.log);
        //         }
        //         offset = offset + this.limitData;
        //         this.log.warn("Offset: " + offset);
        //         /** check loop ends */
        //         if (rowsLength < this.limitData) {
        //           this.log.debug("completed batch data ...");
        //           isChunkEnd = true;
        //         }
        //       } else {
        //         isTableUpdated = false;
        //         this.log.debug("No data found...");
        //         isChunkEnd = true;
        //       }
        //       this.log.info("************* ***** *************");
        //     }
        //     this.log.debug(":::::::::::::::::::UPDATE " + sync.id + " START ::::::::::::::::::::::");
        //     let updateQuery = null;
        //     if (isTableUpdated == true) {
        //       updateQuery = `update sync_table set last_update = '${lastUpdate}', updated_on = '${currentTime}'  where id='${sync.id}'`;
        //     } else {
        //       updateQuery = `update sync_table set  updated_on = '${currentTime}'  where id='${sync.id}'`;
        //     }
        //     await SyncServiceHelper.BatchQuery(updateSyncConfig, [updateQuery], this.log);
        //     this.log.debug(":::::::::::::::::::UPDATE " + sync.id + " END ::::::::::::::::::::::\n\n");
        //   } catch (err) {
        //     this.log.warn(":::::::::::::::::::CATCH BLOCK START ::::::::::::::::::::::");
        //     this.log.error(err);
        //     let updateQuery = null;
        //     if (err == Props.RECORD_NOT_FOUND) {
        //       updateQuery = `update sync_table set updated_on = '${currentTime}'  where id='${sync.id}'`;
        //     } else {
        //       updateQuery = `update sync_table set updated_on = '${currentTime}'  where id='${sync.id}'`;
        //     }
        //     await SyncServiceHelper.BatchQuery(updateSyncConfig, [updateQuery], this.log);
        //     await SyncServiceHelper.ErrorMessage("DML", err, this.log);
        //     this.log.warn(":::::::::::::::::::CATCH BLOCK ENDS ::::::::::::::::::::::");
        //     throw err;
        //   }
        // }
        this.limitData = 200;
        Config.setEnvConfig();
        this.log = slog;
    }
    SyncDMLService.prototype.deleteExecute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var layerStageDbConfig, syncUrl, stagUrl, token, localUrl, sql, syncResults, sysDeleteQuery, tableDeleteQuery, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log.info("#################### DeleteExecute " + STORE_ID + " - " + new Date().toISOString() + " #######################");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        layerStageDbConfig = SyncServiceHelper_1.SyncServiceHelper.LayeredStageDBOptions();
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.syncUrl()];
                    case 2:
                        syncUrl = _a.sent();
                        stagUrl = syncUrl.url + "syncdata/";
                        token = syncUrl.token;
                        localUrl = "http://localhost:5000/api/syncdata/";
                        sql = "SELECT table_id, table_name, table_value, deleted_on FROM sync_delete_data order by deleted_on asc limit 250";
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQueryApi(localUrl + "executequery", token, "sync_delete_data", sql, this.log)];
                    case 3:
                        syncResults = _a.sent();
                        syncResults = syncResults ? syncResults.rows : [];
                        syncResults = syncResults.length > 0 ? syncResults : null;
                        this.log.debug(JSON.stringify(syncResults, null, 2));
                        if (!syncResults)
                            return [2 /*return*/, Promise.resolve("")];
                        sysDeleteQuery = this.buildDMLSyncDeleteQuery(syncResults);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQueryApi(stagUrl + "batchquery", token, sysDeleteQuery, this.log)];
                    case 4:
                        _a.sent();
                        tableDeleteQuery = this.buildDMLDeleteQuery(syncResults);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQueryApi(localUrl + "batchquery", token, tableDeleteQuery, this.log)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        this.log.warn(":::::::::::::::::::CATCH DELETE BLOCK START ::::::::::::::::::::::");
                        this.log.error(err_1);
                        throw err_1;
                    case 7:
                        this.log.info("#################### DeleteExecute #######################");
                        return [2 /*return*/];
                }
            });
        });
    };
    SyncDMLService.prototype.execute = function (type, priority) {
        if (priority === void 0) { priority = 9; }
        return __awaiter(this, void 0, void 0, function () {
            var layeredStageDbConfig, syncUrl, stagUrl, token, localUrl, sql, utcDate, utcDateTime, currentTime, syncResults, sourceDB, targetDB, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log.info("###########################################");
                        // App.Sleep(2000);
                        this.log.debug("!!!!!!!!!!!!!!!!!!!! " + STORE_ID + " - " + new Date().toISOString() + "!!!!!!!!!!!!!!!!!!!!");
                        layeredStageDbConfig = SyncServiceHelper_1.SyncServiceHelper.LayeredStageDBOptions();
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.syncUrl()];
                    case 1:
                        syncUrl = _a.sent();
                        stagUrl = syncUrl.url + "syncdata/";
                        token = syncUrl.token;
                        localUrl = "http://localhost:5000/api/syncdata/";
                        sql = "SELECT to_char (now(), 'YYYY-MM-DD\"T\"HH24:MI:SS') as utc_date";
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQuery(layeredStageDbConfig, sql, this.log)];
                    case 2:
                        utcDate = _a.sent();
                        utcDateTime = utcDate.rows[0]["utc_date"];
                        currentTime = moment().toISOString();
                        this.log.info("Db Date: " + utcDateTime);
                        this.log.info("currentTime Date: " + currentTime);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        if (stagUrl == localUrl) {
                            throw { message: "Invalid DB config Data" };
                        }
                        if (type == "M") {
                            sql = " select * from sync_table \n          where (target_id = '" + STORE_ID + "' ) \n          and active = true \n          and priority = " + priority + " \n          order by updated_on  ASC \n          limit 1";
                        }
                        else {
                            sql = " select * from sync_table \n          where (source_id = '" + STORE_ID + "' ) \n          and active = true \n          and priority = " + priority + "\n          order by updated_on  ASC \n          limit 1";
                        }
                        this.log.info("==========================", sql);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQuery(layeredStageDbConfig, sql, this.log)];
                    case 4:
                        syncResults = _a.sent();
                        syncResults = syncResults ? syncResults.rows : [];
                        syncResults = syncResults.length > 0 ? syncResults[0] : null;
                        this.log.debug(JSON.stringify(syncResults, null, 2));
                        this.log.info("==========================");
                        if (!syncResults)
                            return [2 /*return*/, Promise.resolve("")];
                        if (!(syncResults.source_id != syncResults.target_id)) return [3 /*break*/, 6];
                        sourceDB = syncResults.source_id == STAGING_ID ? stagUrl : localUrl;
                        targetDB = syncResults.target_id == STORE_ID ? localUrl : stagUrl;
                        // if (syncResults.source_id != STAGING_ID) {
                        //   syncResults.last_update = moment(syncResults.last_update)
                        //     .format()
                        //     .split("+")[0];
                        // }
                        this.log.warn("\n\n((((((<<<< " + syncResults.map_table + "::" + syncResults.last_update + " >>>>))))))\n\n");
                        try {
                            this.limitData = syncResults && syncResults.batch_size ? parseInt(syncResults.batch_size) : 200;
                        }
                        catch (e) {
                            Log_1.log.debug(e);
                            this.limitData = 200;
                        }
                        return [4 /*yield*/, this.cacheData(sourceDB, targetDB, token, syncResults, currentTime)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this.log.error(error_1);
                        throw error_1;
                    case 8:
                        this.log.info("###########################################");
                        return [2 /*return*/];
                }
            });
        });
    };
    SyncDMLService.prototype.cacheData = function (sourceDb, targetDb, token, sync, currentTime) {
        return __awaiter(this, void 0, void 0, function () {
            var updateSyncConfig, isFistLoop, isChunkEnd, batchItems, rows, offset, updateQuery, lastSyncDate, lastUpdate, sql, rowsLength, isDataFound, soruceRes, metaDataTable, rows_1, err_2, updateQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateSyncConfig = SyncServiceHelper_1.SyncServiceHelper.LayeredStageDBOptions();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 24, , 27]);
                        isFistLoop = true;
                        isChunkEnd = false;
                        batchItems = [];
                        if (!(sync.cache_restart == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, SyncCache_1.SyncCache.setItem(sync.id + "-rows", [])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, SyncCache_1.SyncCache.getItem(sync.id + "-rows")];
                    case 4:
                        rows = _a.sent();
                        offset = rows ? rows.length : 0;
                        updateQuery = null;
                        return [4 /*yield*/, SyncCache_1.SyncCache.getItem(sync.id + "-last_date")];
                    case 5:
                        lastSyncDate = _a.sent();
                        lastUpdate = lastSyncDate ? lastSyncDate : currentTime;
                        /** need to restart data */
                        if (offset == 0) {
                            updateQuery = "update sync_table set  cache_done = false, cache_restart=false  where id='" + sync.id + "'";
                            SyncServiceHelper_1.SyncServiceHelper.BatchQuery(updateSyncConfig, [updateQuery], this.log);
                            offset = 0;
                        }
                        /** previous cache data retriew  */
                        if (offset != 0) {
                            batchItems = rows.slice();
                        }
                        sql = void 0;
                        rowsLength = 0;
                        isDataFound = false;
                        _a.label = 6;
                    case 6:
                        if (!(isChunkEnd == false && sync.cache_done == false)) return [3 /*break*/, 17];
                        sql = this.buildDMLSelectQuery(sync, offset, lastUpdate);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQueryApi(sourceDb + "executequery", token, sync.map_table, sql, this.log)];
                    case 7:
                        soruceRes = _a.sent();
                        if (!(soruceRes && soruceRes.rows.length != 0)) return [3 /*break*/, 15];
                        rowsLength = soruceRes.rows.length;
                        this.log.warn("rowsLength: " + rowsLength);
                        if (!(isFistLoop == true)) return [3 /*break*/, 12];
                        return [4 /*yield*/, SyncCache_1.SyncCache.setItem(sync.id + "-row_metadata", soruceRes.metaData)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.MetadataTable(null, sync.map_table)];
                    case 9:
                        metaDataTable = _a.sent();
                        return [4 /*yield*/, SyncCache_1.SyncCache.setItem(sync.id + "-table_metadata", metaDataTable)];
                    case 10:
                        _a.sent();
                        isFistLoop = false;
                        return [4 /*yield*/, SyncCache_1.SyncCache.setItem(sync.id + "-last_date", lastUpdate)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        batchItems = batchItems.concat(soruceRes.rows);
                        offset = offset + this.limitData;
                        this.log.warn("Offset: " + offset);
                        return [4 /*yield*/, SyncCache_1.SyncCache.setItem(sync.id + "-rows", batchItems)];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, SyncCache_1.SyncCache.getItem(sync.id + "-rows")];
                    case 14:
                        rows_1 = _a.sent();
                        console.log(sync.id + " rows completed:::: ", rows_1 ? rows_1.length : 0);
                        /** check loop ends */
                        if (rowsLength < this.limitData) {
                            this.log.debug("completed batch data ...");
                            isChunkEnd = true;
                        }
                        return [3 /*break*/, 16];
                    case 15:
                        this.log.debug("No data found...");
                        isChunkEnd = true;
                        _a.label = 16;
                    case 16: return [3 /*break*/, 6];
                    case 17:
                        updateQuery = "update sync_table set cache_done = true, cache_restart=false  where id='" + sync.id + "'";
                        SyncServiceHelper_1.SyncServiceHelper.BatchQuery(updateSyncConfig, [updateQuery], this.log);
                        if (!(batchItems && batchItems.length > 0)) return [3 /*break*/, 20];
                        return [4 /*yield*/, SyncCache_1.SyncCache.setItem(sync.id + "-last_date", lastUpdate)];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, SyncCache_1.SyncCache.setItem(sync.id + "-rows", batchItems)];
                    case 19:
                        _a.sent();
                        isDataFound = true;
                        rows = batchItems;
                        _a.label = 20;
                    case 20:
                        if (!(rows && rows.length > 0)) return [3 /*break*/, 23];
                        return [4 /*yield*/, this.cacheUpdate(sourceDb, targetDb, token, sync, lastUpdate)];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, SyncCache_1.SyncCache.getItem(sync.id + "-rows")];
                    case 22:
                        rows = _a.sent();
                        return [3 /*break*/, 20];
                    case 23:
                        updateQuery = [];
                        updateQuery.push("update sync_table set cache_done = false, cache_restart=true  where id='" + sync.id + "'");
                        if (isDataFound) {
                            updateQuery.push("update sync_table set last_update = '" + lastUpdate + "', updated_on = '" + currentTime + "'  where id='" + sync.id + "'");
                        }
                        else {
                            updateQuery.push("update sync_table set cache_done = false, cache_restart=true,  updated_on = '" + currentTime + "'  where id='" + sync.id + "'");
                        }
                        SyncServiceHelper_1.SyncServiceHelper.BatchQuery(updateSyncConfig, updateQuery, this.log);
                        return [3 /*break*/, 27];
                    case 24:
                        err_2 = _a.sent();
                        this.log.warn(":::::::::::::::::::CATCH BLOCK START ::::::::::::::::::::::");
                        this.log.error(err_2);
                        updateQuery = null;
                        if (err_2 == Props_1.Props.RECORD_NOT_FOUND) {
                            updateQuery = "update sync_table set updated_on = '" + currentTime + "'  where id='" + sync.id + "'";
                        }
                        else {
                            updateQuery = "update sync_table set updated_on = '" + currentTime + "'  where id='" + sync.id + "'";
                        }
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQuery(updateSyncConfig, [updateQuery], this.log)];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ErrorMessage("DML", err_2, this.log)];
                    case 26:
                        _a.sent();
                        this.log.warn(":::::::::::::::::::CATCH BLOCK ENDS ::::::::::::::::::::::");
                        throw err_2;
                    case 27: return [2 /*return*/];
                }
            });
        });
    };
    SyncDMLService.prototype.cacheUpdate = function (sourceDb, targetDb, token, sync, currentTime) {
        return __awaiter(this, void 0, void 0, function () {
            var rowsAvalible_1, rowsNotAvalible, rows, patchRow, batchSql, sql, metaDataTable, primaryKeys, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 14]);
                        rowsAvalible_1 = null;
                        rowsNotAvalible = null;
                        rows = null;
                        patchRow = null;
                        batchSql = [];
                        return [4 /*yield*/, SyncCache_1.SyncCache.getItem(sync.id + "-rows")];
                    case 1:
                        rows = _a.sent();
                        sql = null;
                        return [4 /*yield*/, SyncCache_1.SyncCache.getItem(sync.id + "-table_metadata")];
                    case 2:
                        metaDataTable = _a.sent();
                        if (!(rows && rows.length > 0)) return [3 /*break*/, 12];
                        try {
                            this.limitData = sync && sync.batch_size ? parseInt(sync.batch_size) : 200;
                        }
                        catch (e) {
                            Log_1.log.debug(e);
                            this.limitData = 200;
                        }
                        patchRow = rows.splice(0, this.limitData);
                        Log_1.log.debug("Patch length :" + patchRow.length + "   --> cache length :" + rows.length);
                        primaryKeys = patchRow.map(function (ele) { return ele[sync.map_pk]; });
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ChackAvalibleQuery(sync.map_table, null, primaryKeys, sync.map_pk, this.log)];
                    case 3:
                        sql = _a.sent();
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQueryApi(targetDb + "executequery", token, sync.map_table, sql, this.log)];
                    case 4:
                        res = _a.sent();
                        rowsAvalible_1 = res.rows.map(function (ele) { return ele[sync.map_pk]; });
                        rowsNotAvalible = primaryKeys.filter(function (ele) { return rowsAvalible_1.indexOf(ele) < 0; });
                        this.log.debug("\t\tUpdate Records: " + sync.map_table + " --> " + rowsAvalible_1.length);
                        this.log.debug("\t\tInsert Records: " + sync.map_table + " --> " + rowsNotAvalible.length);
                        if (!(rowsAvalible_1 && rowsAvalible_1.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.PrepareQuery(sync.map_table, metaDataTable, patchRow, rowsAvalible_1, "UPDATE", sync.map_pk, this.log)];
                    case 5:
                        sql = _a.sent();
                        batchSql.push(sql);
                        _a.label = 6;
                    case 6:
                        if (!(rowsNotAvalible && rowsNotAvalible.length > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.PrepareQuery(sync.map_table, metaDataTable, patchRow, rowsNotAvalible, "INSERT", sync.map_pk, this.log)];
                    case 7:
                        sql = _a.sent();
                        batchSql.push(sql);
                        _a.label = 8;
                    case 8:
                        if (!(batchSql && batchSql.length > 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQueryApi(targetDb + "batchquery", token, batchSql, this.log)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, SyncCache_1.SyncCache.setItem(sync.id + "-rows", rows)];
                    case 11:
                        _a.sent();
                        this.log.warn(sync.id + "cache rows: " + rows.length);
                        _a.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_3 = _a.sent();
                        throw err_3;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    // async fallBackData() {
    //   let layeredstageDbConfig = SyncServiceHelper.LayeredStageDBOptions();
    //   let sql = `select *  from sync_fallback where target_id='${STORE_ID}' and is_synced = false order by from_date asc limit 10`;
    //   try {
    //     const soruceRes: any = await SyncServiceHelper.ExecuteQueryApi(layeredstageDbConfig, sql, this.log);
    //     if (soruceRes && soruceRes.rows && soruceRes.rows) {
    //       return soruceRes.rows;
    //     } else {
    //       return null;
    //     }
    //   } catch (err) {
    //     throw err;
    //   }
    // }
    // async fallBackDataUpdate(id: string) {
    //   let layeredstageDbConfig = SyncServiceHelper.LayeredStageDBOptions();
    //   let sql = `update sync_fallback set is_synced = true  where id = '${id}'`;
    //   try {
    //     const soruceRes: any = await SyncServiceHelper.BatchQueryApi(layeredstageDbConfig, [sql], this.log);
    //   } catch (err) {
    //     throw err;
    //   }
    // }
    SyncDMLService.prototype.buildLastUpdatedDate = function (sourceDb, token, sync) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, soruceRes, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "select " + sync.sync_column + " as updated_date from " + sync.map_table + " order by  " + sync.sync_column + " desc limit 1";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQueryApi(sourceDb + "executequery", token, sync.map_table, sql, this.log)];
                    case 2:
                        soruceRes = _a.sent();
                        if (soruceRes && soruceRes.rows && soruceRes.rows[0]) {
                            return [2 /*return*/, soruceRes.rows[0]["updated_date"]];
                        }
                        else {
                            return [2 /*return*/, moment().toISOString()];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        throw err_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SyncDMLService.prototype.buildDMLSelectQuery = function (sync, offset, currentTime) {
        var sql = "select * from " + sync.map_table + " where " + sync.cond + "  \n    and " + sync.sync_column + " >= '" + sync.last_update + "' and  " + sync.sync_column + " <= '" + currentTime + "'\n    offset " + offset + " limit " + this.limitData;
        return sql;
    };
    SyncDMLService.prototype.buildDMLSyncDeleteQuery = function (deleteData) {
        var list = [];
        deleteData.map(function (val) {
            list.push("delete from " + val.table_name + " where " + val.table_id + "='" + val.table_value + "'");
        });
        return list;
    };
    SyncDMLService.prototype.buildDMLDeleteQuery = function (deleteData) {
        var list = [];
        deleteData.map(function (val) {
            list.push("delete from sync_delete_data where table_name='" + val.table_name + "' and table_id='" + val.table_id + "' and table_value='" + val.table_value + "'");
        });
        return list;
    };
    return SyncDMLService;
}());
exports.SyncDMLService = SyncDMLService;
