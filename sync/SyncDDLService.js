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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Props_1 = require("../constants/Props");
var SyncServiceHelper_1 = require("../sync/SyncServiceHelper");
var SysService_1 = require("../SysService");
var PoolConnectionConfig_1 = require("../utils/PoolConnectionConfig");
var moment = require("moment");
var STAGING_ID = "STAGING";
var STORE_ID = process.env.ENV_STORE_ID || "LOCAL";
var log;
var SyncDDLService = /** @class */ (function () {
    function SyncDDLService(slog) {
        log = slog;
        this.sysService = new SysService_1.SysService();
    }
    SyncDDLService.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sync, currentTime, sql, layeredstageDbPool, syncResults, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.info("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                        sync = null;
                        currentTime = new Date();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                    case 2:
                        layeredstageDbPool = (_a.sent()).LayeredStagePool;
                        sql = "select * from sync_source\n            where id='" + STORE_ID + "' \n            and (sync_ddl IS NOT NULL or is_reset = true or sync_cmd is not null)";
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQuery(layeredstageDbPool, sql, log)];
                    case 3:
                        syncResults = _a.sent();
                        syncResults = syncResults.rows;
                        syncResults = syncResults.length > 0 ? syncResults[0] : null;
                        if (!syncResults)
                            return [2 /*return*/, Promise.resolve("")];
                        return [4 /*yield*/, this.checkAndProceed(syncResults, currentTime)];
                    case 4:
                        _a.sent();
                        log.info("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        log.error(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SyncDDLService.prototype.checkAndProceed = function (sync, currentTime) {
        return __awaiter(this, void 0, void 0, function () {
            var promises_1, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.info(JSON.stringify(sync, null, 2));
                        if (!(sync.is_reset == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sysService.UpdateVersion(log)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.UpdateCall("RESET", log)];
                    case 2:
                        _a.sent();
                        throw "RESET";
                    case 3:
                        if (!sync.sync_cmd) return [3 /*break*/, 8];
                        if (!sync.sync_cmd.cmd) return [3 /*break*/, 5];
                        promises_1 = [];
                        sync.sync_cmd.cmd.forEach(function (element) {
                            log.info("((((((((((((((((((((((((((((command))))))))))))))))))))))))))))");
                            log.info(element);
                            promises_1.push(_this.cmdExecuteSingle(element));
                        });
                        return [4 /*yield*/, Promise.all(promises_1)];
                    case 4:
                        result = _a.sent();
                        this.UpdateCall("JSON", log);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.cmdExecute(sync)];
                    case 6:
                        _a.sent();
                        this.UpdateCall("JSON", log);
                        _a.label = 7;
                    case 7: return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.syncDDL(sync, currentTime)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SyncDDLService.prototype.cmdExecute = function (sync) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = sync.sync_cmd;
                        return [4 /*yield*/, this.sysService.CmdService(data, log)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SyncDDLService.prototype.cmdExecuteSingle = function (sync_cmd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sysService.CmdService(sync_cmd, log)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SyncDDLService.prototype.StoreSource = function (storeid, log) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, layeredstageDbPool, stageDbPool, syncResults, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                    case 1:
                        layeredstageDbPool = (_a.sent()).LayeredStagePool;
                        return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                    case 2:
                        stageDbPool = (_a.sent()).StagePool;
                        if (!stageDbPool) return [3 /*break*/, 4];
                        sql = "select * from sync_source where id='" + storeid + "' ";
                        log.info(sql);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQuery(stageDbPool, sql, log)];
                    case 3:
                        syncResults = _a.sent();
                        syncResults = syncResults.rows;
                        syncResults = syncResults.length > 0 ? syncResults[0] : null;
                        return [2 /*return*/, Promise.resolve(syncResults)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        log.error(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SyncDDLService.prototype.UpdateCall = function (type, log, data) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, layeredstageDb, layeredstageDbPool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = null;
                        layeredstageDb = SyncServiceHelper_1.SyncServiceHelper.LayeredStageDBOptions();
                        return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                    case 1:
                        layeredstageDbPool = (_a.sent()).LayeredStagePool;
                        if (type == "RESET") {
                            sql = "UPDATE sync_source SET  is_reset = false, updated_on = '" + moment().toISOString() + "'  WHERE id='" + STORE_ID + "' ";
                        }
                        else if (type == "CMD") {
                            sql = data;
                        }
                        else if (type == "JSON") {
                            sql = "UPDATE sync_source SET  sync_cmd = null, updated_on = '" + moment().toISOString() + "'  WHERE id='" + STORE_ID + "' ";
                        }
                        else if (type == "VERSION") {
                            sql = "UPDATE sync_source SET  type = '" + data + "', updated_on = '" + moment().toISOString() + "'  WHERE id='" + STORE_ID + "' ";
                        }
                        else if (type == "MAC") {
                            sql = "UPDATE sync_source SET  mac_address = '" + data + "', updated_on = '" + moment().toISOString() + "'  WHERE id='" + STORE_ID + "' ";
                        }
                        if (!sql) return [3 /*break*/, 3];
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQueryunPool(layeredstageDbPool, [sql], log)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SyncDDLService.prototype.syncDDL = function (sync, currentTime) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, params, sql, layeredStageDb, stageDb, localDb, layeredStageDbPool, stageDbPool, localDbPool, syncResults, syncResults_1, syncResults_1_1, res, err_1, syncDDLval, index, err_2, e_1_1, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = "";
                        sql = "";
                        layeredStageDb = SyncServiceHelper_1.SyncServiceHelper.LayeredStageDBOptions();
                        stageDb = SyncServiceHelper_1.SyncServiceHelper.StageDBOptions();
                        localDb = SyncServiceHelper_1.SyncServiceHelper.LocalDBOptions();
                        return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                    case 1:
                        layeredStageDbPool = (_b.sent()).LayeredStagePool;
                        return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                    case 2:
                        stageDbPool = (_b.sent()).StagePool;
                        return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                    case 3:
                        localDbPool = (_b.sent()).LocalPool;
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 27, , 28]);
                        params = "";
                        sync.sync_ddl.map(function (ele) {
                            params = params + "'" + ele + "',";
                        });
                        if (params && params.length)
                            params = params.substring(0, params.length - 1);
                        sql = " SELECT id,summary FROM sync_ddl WHERE id IN (" + params + ")";
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQuery(layeredStageDbPool, sql, log)];
                    case 5:
                        syncResults = _b.sent();
                        syncResults = syncResults.rows;
                        if (syncResults.length == 0)
                            throw Props_1.Props.RECORD_NOT_FOUND;
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 20, 21, 26]);
                        syncResults_1 = __asyncValues(syncResults);
                        _b.label = 7;
                    case 7: return [4 /*yield*/, syncResults_1.next()];
                    case 8:
                        if (!(syncResults_1_1 = _b.sent(), !syncResults_1_1.done)) return [3 /*break*/, 19];
                        res = syncResults_1_1.value;
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 16, , 18]);
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 14]);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQueryunPool(localDbPool, [res.summary], log)];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 12:
                        err_1 = _b.sent();
                        log.error(err_1);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ErrorMessage("DDL", err_1, log)];
                    case 13:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 14:
                        syncDDLval = sync.sync_ddl;
                        index = syncDDLval.indexOf(res.id);
                        if (index > -1)
                            syncDDLval.splice(index, 1);
                        if (syncDDLval.length == 0) {
                            sql = "UPDATE sync_source SET  sync_ddl = NULL WHERE id='" + sync.id + "'";
                        }
                        else {
                            sql = "UPDATE sync_source SET  sync_ddl= '{" + syncDDLval + "}' WHERE id='" + sync.id + "'";
                        }
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQueryunPool(layeredStageDbPool, [sql], log)];
                    case 15:
                        _b.sent();
                        return [3 /*break*/, 18];
                    case 16:
                        err_2 = _b.sent();
                        log.error(err_2);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ErrorMessage("DDL", err_2, log)];
                    case 17:
                        _b.sent();
                        return [3 /*break*/, 18];
                    case 18: return [3 /*break*/, 7];
                    case 19: return [3 /*break*/, 26];
                    case 20:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 26];
                    case 21:
                        _b.trys.push([21, , 24, 25]);
                        if (!(syncResults_1_1 && !syncResults_1_1.done && (_a = syncResults_1.return))) return [3 /*break*/, 23];
                        return [4 /*yield*/, _a.call(syncResults_1)];
                    case 22:
                        _b.sent();
                        _b.label = 23;
                    case 23: return [3 /*break*/, 25];
                    case 24:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 25: return [7 /*endfinally*/];
                    case 26: return [3 /*break*/, 28];
                    case 27:
                        err_3 = _b.sent();
                        log.error(err_3);
                        return [3 /*break*/, 28];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    return SyncDDLService;
}());
exports.SyncDDLService = SyncDDLService;
