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
var SyncService_1 = require("./SyncService");
var moment = require("moment");
var STAGING_ID = "STAGING";
var STORE_ID = process.env.ENV_STORE_ID || "LOCAL";
var log;
var SyncDDLService = /** @class */ (function () {
    function SyncDDLService(slog) {
        log = slog;
    }
    SyncDDLService.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sync, currentTime, sql, syncUrl, layeredStageUrl, stagUrl, token, syncResults, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.info("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                        sync = null;
                        currentTime = new Date();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.syncUrl()];
                    case 2:
                        syncUrl = _a.sent();
                        layeredStageUrl = syncUrl.syncUrl + "syncdata/";
                        stagUrl = syncUrl.url + "syncdata/";
                        token = syncUrl.token;
                        sql = "select * from sync_source\n            where id='" + STORE_ID + "' \n            and (sync_ddl IS NOT NULL or is_reset = true or sync_cmd is not null)";
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQueryApi(layeredStageUrl + 'executequery', token, 'sync_source', sql, log)];
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
                        log.error("execute query error -------", error_1);
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SyncDDLService.prototype.checkAndProceed = function (sync, currentTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.info(JSON.stringify(sync, null, 2));
                        if (!(sync.is_reset == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, SysService_1.SysService.UpdateVersion(log)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.UpdateCall("RESET", log)];
                    case 2:
                        _a.sent();
                        throw "RESET";
                    case 3:
                        if (!sync.sync_cmd) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.cmdExecute(sync)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.syncDDL(sync, currentTime)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SyncDDLService.prototype.cmdExecute = function (sync) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = sync.sync_cmd;
                SyncService_1.SyncService.CmdService(data, log);
                return [2 /*return*/];
            });
        });
    };
    SyncDDLService.prototype.syncDDL = function (sync, currentTime) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, params, sql, syncUrl, layeredStageUrl, stagUrl, token, localDb, syncResults, syncResults_1, syncResults_1_1, res, err_1, syncDDLval, index, err_2, e_1_1, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = "";
                        sql = "";
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.syncUrl()];
                    case 1:
                        syncUrl = _b.sent();
                        layeredStageUrl = syncUrl.syncUrl + "syncdata/";
                        stagUrl = syncUrl.url + "syncdata/";
                        token = syncUrl.token;
                        localDb = SyncServiceHelper_1.SyncServiceHelper.LocalDBOptions();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 25, , 26]);
                        params = "";
                        sync.sync_ddl.map(function (ele) {
                            params = params + "'" + ele + "',";
                        });
                        if (params && params.length)
                            params = params.substring(0, params.length - 1);
                        sql = " SELECT id,summary FROM sync_ddl WHERE id IN (" + params + ")";
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ExecuteQueryApi(layeredStageUrl + 'executequery', token, 'sync_ddl', sql, log)];
                    case 3:
                        syncResults = _b.sent();
                        syncResults = syncResults.rows;
                        if (syncResults.length == 0)
                            throw Props_1.Props.RECORD_NOT_FOUND;
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 18, 19, 24]);
                        syncResults_1 = __asyncValues(syncResults);
                        _b.label = 5;
                    case 5: return [4 /*yield*/, syncResults_1.next()];
                    case 6:
                        if (!(syncResults_1_1 = _b.sent(), !syncResults_1_1.done)) return [3 /*break*/, 17];
                        res = syncResults_1_1.value;
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 14, , 16]);
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 12]);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQuery(localDb, [res.summary], log)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 10:
                        err_1 = _b.sent();
                        log.error(err_1);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ErrorMessage("DDL", err_1, log)];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 12:
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
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BatchQueryApi(layeredStageUrl + 'batchquery', token, [sql], log)];
                    case 13:
                        _b.sent();
                        return [3 /*break*/, 16];
                    case 14:
                        err_2 = _b.sent();
                        log.error(err_2);
                        return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.ErrorMessage("DDL", err_2, log)];
                    case 15:
                        _b.sent();
                        return [3 /*break*/, 16];
                    case 16: return [3 /*break*/, 5];
                    case 17: return [3 /*break*/, 24];
                    case 18:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 24];
                    case 19:
                        _b.trys.push([19, , 22, 23]);
                        if (!(syncResults_1_1 && !syncResults_1_1.done && (_a = syncResults_1.return))) return [3 /*break*/, 21];
                        return [4 /*yield*/, _a.call(syncResults_1)];
                    case 20:
                        _b.sent();
                        _b.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 23: return [7 /*endfinally*/];
                    case 24: return [3 /*break*/, 26];
                    case 25:
                        err_3 = _b.sent();
                        log.error(err_3);
                        throw err_3;
                    case 26: return [2 /*return*/];
                }
            });
        });
    };
    return SyncDDLService;
}());
exports.SyncDDLService = SyncDDLService;
