"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("./utils/Log");
var App_1 = require("./utils/App");
var SyncServiceHelper_1 = require("./sync/SyncServiceHelper");
var Config = __importStar(require("./utils/Config"));
var cron = require("node-cron");
var dns = require("dns").promises;
var STORE_ID = process.env.ENV_STORE_ID || "HYD-001";
Config.setEnvConfig();
Config.DbEnvConfig();
var PoolConnectionConfig_1 = require("./utils/PoolConnectionConfig");
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    var syncResults, lastUpdate, lastUpdateSalesLine, lastUpdateSQL, _a, _b, sqlQuery, postedQuery, notPostedQuery, lastUpdateSalesLineSQL, _c, _d, salesLineQuery, data, _e, _f, entity, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, sqlList, update_query, _u, _v, error_1;
    return __generator(this, function (_w) {
        switch (_w.label) {
            case 0:
                syncResults = null;
                _w.label = 1;
            case 1:
                _w.trys.push([1, 28, , 29]);
                Log_1.saleslog.info("***************************** BEGIN ***********************************");
                Log_1.saleslog.info(JSON.stringify(Config.SALES_CHECK));
                lastUpdate = new Date().toISOString();
                lastUpdateSalesLine = new Date().toISOString();
                lastUpdateSQL = "select * from sync_table where map_table='salestable' and source_id ='" + STORE_ID + "'";
                _b = (_a = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_w.sent()).StagePool, lastUpdateSQL, Log_1.saleslog])];
            case 3:
                syncResults = _w.sent();
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults[0] : null;
                Log_1.saleslog.info("last updated date: " + JSON.stringify(syncResults));
                if (syncResults) {
                    lastUpdate = syncResults.last_update;
                }
                sqlQuery = Config.SALES_CHECK.SYNC_SALES.replace("XXXX-XXXX", STORE_ID);
                postedQuery = Config.SALES_CHECK.POSTED.replace("XXXX-XXXX", STORE_ID).replace("YYYY-MM-DDTHH:mm:SS", lastUpdate);
                notPostedQuery = Config.SALES_CHECK.NOT_POSTED.replace("XXXX-XXXX", STORE_ID).replace("YYYY-MM-DDTHH:mm:SS", lastUpdate);
                lastUpdateSalesLineSQL = "select * from sync_table where map_table='salesline' and source_id ='" + STORE_ID + "'";
                _d = (_c = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 4: return [4 /*yield*/, _d.apply(_c, [(_w.sent()).StagePool, lastUpdateSalesLineSQL, Log_1.saleslog])];
            case 5:
                syncResults = _w.sent();
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults[0] : { last_update: new Date().toISOString() };
                Log_1.saleslog.info("sales line last updated date: " + JSON.stringify(syncResults));
                if (syncResults) {
                    lastUpdateSalesLine = syncResults.last_update;
                }
                salesLineQuery = Config.SALES_CHECK.SALES_LINES.replace("XXXX-XXXX", STORE_ID).replace("YYYY-MM-DDTHH:mm:SS", syncResults.last_update);
                _f = (_e = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 6: return [4 /*yield*/, _f.apply(_e, [(_w.sent()).StagePool, sqlQuery, Log_1.saleslog])];
            case 7:
                data = _w.sent();
                if (!(data && data.rows.length > 0)) return [3 /*break*/, 26];
                entity = {
                    id: STORE_ID,
                    posted_store: {},
                    posted_stage: {},
                    not_posted_store: {},
                    not_posted_stage: {},
                    sales_line_store: 0,
                    sales_line_stage: 0,
                    not_sync_data: {
                        posted: {},
                        not_posted: {},
                        sales_line: "",
                    },
                    updated_by: STORE_ID,
                    updated_on: lastUpdate,
                };
                _h = (_g = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 8: return [4 /*yield*/, _h.apply(_g, [(_w.sent()).LocalPool, postedQuery, Log_1.saleslog])];
            case 9:
                syncResults = _w.sent();
                Log_1.saleslog.info(syncResults);
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults : null;
                Log_1.saleslog.info("posted store syncResults: " + JSON.stringify(syncResults));
                entity.posted_store = dataListToEntity(syncResults);
                _k = (_j = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 10: return [4 /*yield*/, _k.apply(_j, [(_w.sent()).StagePool, postedQuery, Log_1.saleslog])];
            case 11:
                syncResults = _w.sent();
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults : null;
                Log_1.saleslog.info("posted stage syncResults: " + JSON.stringify(syncResults));
                entity.posted_stage = dataListToEntity(syncResults);
                _m = (_l = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 12: return [4 /*yield*/, _m.apply(_l, [(_w.sent()).LocalPool, notPostedQuery, Log_1.saleslog])];
            case 13:
                syncResults = _w.sent();
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults : null;
                Log_1.saleslog.info("notPosted store syncResults: " + JSON.stringify(syncResults));
                entity.not_posted_store = dataListToEntity(syncResults);
                _p = (_o = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 14: return [4 /*yield*/, _p.apply(_o, [(_w.sent()).StagePool, notPostedQuery, Log_1.saleslog])];
            case 15:
                syncResults = _w.sent();
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults : null;
                Log_1.saleslog.info("notPosted stage syncResults: " + JSON.stringify(syncResults));
                entity.not_posted_stage = dataListToEntity(syncResults);
                Log_1.saleslog.info("SALE_LINE_QUERY : " + salesLineQuery);
                _r = (_q = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 16: return [4 /*yield*/, _r.apply(_q, [(_w.sent()).LocalPool, salesLineQuery, Log_1.saleslog])];
            case 17:
                syncResults = _w.sent();
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults[0] : null;
                Log_1.saleslog.info("SALES_LINES store syncResults: " + JSON.stringify(syncResults));
                if (syncResults) {
                    entity.sales_line_store = syncResults.count;
                }
                _t = (_s = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 18: return [4 /*yield*/, _t.apply(_s, [(_w.sent()).StagePool, salesLineQuery, Log_1.saleslog])];
            case 19:
                syncResults = _w.sent();
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults[0] : null;
                Log_1.saleslog.info("SALES_LINES stage syncResults: " + JSON.stringify(syncResults));
                if (syncResults) {
                    entity.sales_line_stage = syncResults.count;
                }
                sqlList = [];
                return [4 /*yield*/, salesValidate(Config.SALES_CHECK.KEYS, entity, lastUpdate, sqlList)];
            case 20:
                _w.sent();
                if (!(entity.sales_line_store != entity.sales_line_stage)) return [3 /*break*/, 22];
                return [4 /*yield*/, salesLineValidate(entity, lastUpdateSalesLine, sqlList)];
            case 21:
                _w.sent();
                _w.label = 22;
            case 22:
                update_query = " UPDATE public.sync_sales_check\n      SET \n      posted_store='" + JSON.stringify(entity.posted_store) + "', \n      posted_stage='" + JSON.stringify(entity.posted_stage) + "', \n      not_posted_store='" + JSON.stringify(entity.not_posted_store) + "', \n      not_posted_stage='" + JSON.stringify(entity.not_posted_stage) + "', \n      sales_line_store= " + entity.sales_line_store + ",\n      sales_line_stage= " + entity.sales_line_stage + ",\n      not_sync_data='" + JSON.stringify(entity.not_sync_data) + "', \n      updated_by='" + STORE_ID + "', \n      updated_on='" + entity.updated_on + "'\n      WHERE id='" + STORE_ID + "'\n      ";
                sqlList.push(update_query);
                Log_1.saleslog.info(sqlList);
                if (!(sqlList && sqlList.length > 0)) return [3 /*break*/, 25];
                _v = (_u = SyncServiceHelper_1.SyncServiceHelper).BatchQueryunPool;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 23: return [4 /*yield*/, _v.apply(_u, [(_w.sent()).StagePool, sqlList, Log_1.saleslog])];
            case 24:
                _w.sent();
                _w.label = 25;
            case 25: return [3 /*break*/, 27];
            case 26:
                Log_1.saleslog.error("STORE_ID not found in the sync_sales_table");
                _w.label = 27;
            case 27: return [3 /*break*/, 29];
            case 28:
                error_1 = _w.sent();
                Log_1.saleslog.error(error_1);
                return [3 /*break*/, 29];
            case 29:
                Log_1.saleslog.info("***************************** END ***********************************");
                return [2 /*return*/];
        }
    });
}); };
var dataListToEntity = function (list) {
    var item = {};
    var ele = null;
    list = list || [];
    var keys = Config.SALES_CHECK.KEYS;
    keys.forEach(function (val) {
        ele = list.find(function (res) { return res.transkind === val; });
        if (ele) {
            item[val] = ele.count || 0;
        }
        else {
            item[val] = 0;
        }
    });
    return item;
};
var salesLineValidate = function (entity, lastUpdate, sqlList) { return __awaiter(_this, void 0, void 0, function () {
    var backDate, syncReUpdate, syncResults, sql, stageData, storeData, data, _a, _b, syncResultsLocal, _c, _d, _loop_1, _i, data_1, val;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                backDate = App_1.App.DaysBack(new Date(lastUpdate), 100, true).toISOString();
                syncReUpdate = {
                    id: "",
                    store_id: STORE_ID,
                    table_name: "salesline",
                    table_pk: "id",
                    table_pk_value: "",
                    type: "T",
                    sync_date: lastUpdate,
                    add_on: {},
                };
                syncResults = null;
                sql = null;
                stageData = [];
                storeData = [];
                data = [];
                sql = "select  * from salesline  where  inventlocationid = '" + STORE_ID + "' and status in ('POSTED', 'PRINTED')  and lastmodifieddate < '" + lastUpdate + "' and lastmodifieddate >= '" + backDate + "'";
                _b = (_a = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 1: return [4 /*yield*/, _b.apply(_a, [(_e.sent()).StagePool, sql, Log_1.saleslog])];
            case 2:
                syncResults = _e.sent();
                syncResults = syncResults ? syncResults.rows : [];
                stageData = syncResults.map(function (ele) { return ele["id"]; });
                _d = (_c = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 3: return [4 /*yield*/, _d.apply(_c, [(_e.sent()).LocalPool, sql, Log_1.saleslog])];
            case 4:
                syncResultsLocal = _e.sent();
                syncResultsLocal = syncResultsLocal ? syncResultsLocal.rows : [];
                storeData = syncResultsLocal.map(function (ele) { return ele["id"]; });
                data = storeData.filter(function (ele) { return stageData.indexOf(ele) < 0; });
                if (!(data && data.length > 0)) return [3 /*break*/, 8];
                entity.sales_line = data.join(",");
                _loop_1 = function (val) {
                    var item, _a, _b, index, obj;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                item = syncResultsLocal.find(function (ele) { return ele.id == val; });
                                sql = SyncServiceHelper_1.SyncServiceHelper.SyncReUpdateSQL("SELECT", syncReUpdate);
                                _b = (_a = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).LocalPool, sql, Log_1.saleslog])];
                            case 2:
                                syncResults = _c.sent();
                                syncResults = syncResults ? syncResults.rows : [];
                                index = syncResults.findIndex(function (ele) { return ele.table_pk_value === val; });
                                if (index < 0) {
                                    obj = Object.assign(__assign({}, syncReUpdate), { id: App_1.App.UniqueCode(), table_pk_value: val, add_on: item });
                                    sqlList.push(SyncServiceHelper_1.SyncServiceHelper.SyncReUpdateSQL("INSERT", obj));
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, data_1 = data;
                _e.label = 5;
            case 5:
                if (!(_i < data_1.length)) return [3 /*break*/, 8];
                val = data_1[_i];
                return [5 /*yield**/, _loop_1(val)];
            case 6:
                _e.sent();
                _e.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/];
        }
    });
}); };
var salesValidate = function (keys, entity, lastUpdate, sqlList) { return __awaiter(_this, void 0, void 0, function () {
    var syncReUpdate, syncResults, sql, stageData, storeData, data, backDate, _i, keys_1, ele, _a, _b, syncResultsLocal, _c, _d, _loop_2, _e, data_2, val, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                syncReUpdate = {
                    id: "",
                    store_id: STORE_ID,
                    table_name: "salestable",
                    table_pk: "salesid",
                    table_pk_value: "",
                    type: "T",
                    sync_date: lastUpdate,
                    add_on: {},
                };
                syncResults = null;
                sql = null;
                stageData = [];
                storeData = [];
                data = [];
                backDate = App_1.App.DaysBack(new Date(lastUpdate), 100, true).toISOString();
                _i = 0, keys_1 = keys;
                _k.label = 1;
            case 1:
                if (!(_i < keys_1.length)) return [3 /*break*/, 15];
                ele = keys_1[_i];
                if (!(entity.posted_store[ele] != entity.posted_stage[ele])) return [3 /*break*/, 9];
                Log_1.saleslog.error(STORE_ID +
                    " -> posted " +
                    ele +
                    " (store/stage): " +
                    entity.posted_store[ele] +
                    " / " +
                    entity.posted_stage[ele]);
                sql = "select * from salestable  where syncstatus in (0,2) and inventlocationid = '" + STORE_ID + "' and status in ('POSTED', 'PRINTED') and transkind in ( '" + ele + "') and lastmodifieddate < '" + lastUpdate + "' and lastmodifieddate >= '" + backDate + "' ";
                _b = (_a = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_k.sent()).StagePool, sql, Log_1.saleslog])];
            case 3:
                syncResults = _k.sent();
                syncResults = syncResults ? syncResults.rows : [];
                stageData = syncResults.map(function (ele) { return ele["salesid"]; });
                _d = (_c = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 4: return [4 /*yield*/, _d.apply(_c, [(_k.sent()).LocalPool, sql, Log_1.saleslog])];
            case 5:
                syncResultsLocal = _k.sent();
                syncResultsLocal = syncResultsLocal ? syncResultsLocal.rows : [];
                storeData = syncResultsLocal.map(function (ele) { return ele["salesid"]; });
                data = storeData.filter(function (ele) { return stageData.indexOf(ele) < 0; });
                if (!(data && data.length > 0)) return [3 /*break*/, 9];
                entity.not_sync_data.posted[ele] = data.join(",");
                _loop_2 = function (val) {
                    var item, _a, _b, index, obj;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                item = syncResultsLocal.find(function (ele) { return ele.salesid == val; });
                                sql = SyncServiceHelper_1.SyncServiceHelper.SyncReUpdateSQL("SELECT", syncReUpdate);
                                _b = (_a = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
                            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).LocalPool, sql, Log_1.saleslog])];
                            case 2:
                                syncResults = _c.sent();
                                syncResults = syncResults ? syncResults.rows : [];
                                index = syncResults.findIndex(function (ele) { return ele.table_pk_value === val; });
                                if (index < 0) {
                                    obj = Object.assign(__assign({}, syncReUpdate), { id: App_1.App.UniqueCode(), table_pk_value: val, add_on: item });
                                    sqlList.push(SyncServiceHelper_1.SyncServiceHelper.SyncReUpdateSQL("INSERT", obj));
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _e = 0, data_2 = data;
                _k.label = 6;
            case 6:
                if (!(_e < data_2.length)) return [3 /*break*/, 9];
                val = data_2[_e];
                return [5 /*yield**/, _loop_2(val)];
            case 7:
                _k.sent();
                _k.label = 8;
            case 8:
                _e++;
                return [3 /*break*/, 6];
            case 9:
                if (!(entity.not_posted_store[ele] != entity.not_posted_store[ele])) return [3 /*break*/, 14];
                Log_1.saleslog.error(STORE_ID +
                    " -> not_posted " +
                    ele +
                    " (store/stage): " +
                    entity.posted_store[ele] +
                    " / " +
                    entity.posted_stage[ele]);
                sql = "select  * from salestable  where syncstatus in (0,2) and inventlocationid = '" + STORE_ID + "' and status NOT in ('POSTED', 'PRINTED') and transkind in ( '" + ele + "') and lastmodifieddate < '" + lastUpdate + "' and lastmodifieddate >= '" + backDate + "' ";
                _g = (_f = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 10: return [4 /*yield*/, _g.apply(_f, [(_k.sent()).StagePool, sql, Log_1.saleslog])];
            case 11:
                syncResults = _k.sent();
                syncResults = syncResults ? syncResults.rows : [];
                stageData = syncResults.map(function (ele) { return ele["salesid"]; });
                _j = (_h = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 12: return [4 /*yield*/, _j.apply(_h, [(_k.sent()).LocalPool, sql, Log_1.saleslog])];
            case 13:
                syncResults = _k.sent();
                syncResults = syncResults ? syncResults.rows : [];
                storeData = syncResults.map(function (ele) { return ele["salesid"]; });
                data = storeData.filter(function (ele) { return stageData.indexOf(ele) < 0; });
                if (data && data.length > 0) {
                    entity.not_sync_data.not_posted[ele] = data.join(",");
                    // data.map((val: any) => {
                    //   let obj = Object.assign(
                    //     { ...syncReUpdate },
                    //     { id: App.UniqueCode(), table_pk_value: val, add_on: { salesid: val } }
                    //   );
                    //   sqlList.push(SyncServiceHelper.SyncReUpdateSQL("INSERT", obj));
                    // });
                }
                _k.label = 14;
            case 14:
                _i++;
                return [3 /*break*/, 1];
            case 15: return [2 /*return*/, sqlList];
        }
    });
}); };
var syncRun = function () { return __awaiter(_this, void 0, void 0, function () {
    var syncResults, sql, sqlList, obj, syncReUpdateConst, _a, _b, syncReUpdate, _i, syncResults_1, row, _c, _d, _e, _f, error_2;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                syncResults = null;
                sql = null;
                sqlList = [];
                obj = null;
                Log_1.saleslog.info("***************************** syncRun START ***********************************");
                _g.label = 1;
            case 1:
                _g.trys.push([1, 16, , 17]);
                syncReUpdateConst = {
                    id: "",
                    store_id: STORE_ID,
                    table_name: "salestable','salesline",
                    table_pk: "salesid",
                    table_pk_value: "",
                    type: "T",
                    add_on: {},
                };
                return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.SyncReUpdateSQL("SELECT", syncReUpdateConst)];
            case 2:
                sql = _g.sent();
                _b = (_a = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 3: return [4 /*yield*/, _b.apply(_a, [(_g.sent()).StagePool, sql, Log_1.saleslog])];
            case 4:
                syncResults = _g.sent();
                syncResults = syncResults ? syncResults.rows : [];
                syncResults = syncResults.length > 0 ? syncResults : null;
                if (!syncResults) return [3 /*break*/, 15];
                syncResults = syncResults.filter(function (ele) { return ele.is_resync == true; });
                Log_1.saleslog.info(JSON.stringify(syncResults));
                syncReUpdate = null;
                _i = 0, syncResults_1 = syncResults;
                _g.label = 5;
            case 5:
                if (!(_i < syncResults_1.length)) return [3 /*break*/, 9];
                row = syncResults_1[_i];
                syncReUpdate = Object.assign(__assign({}, syncReUpdateConst), row);
                return [4 /*yield*/, buildQuery(syncReUpdate, row, sqlList)];
            case 6:
                _g.sent();
                return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.SyncReUpdateSQL("UPDATE", syncReUpdate)];
            case 7:
                sql = _g.sent();
                if (sql) {
                    sqlList.push(sql);
                }
                _g.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 5];
            case 9:
                if (!(sqlList && sqlList.length > 0)) return [3 /*break*/, 15];
                Log_1.saleslog.info("syncReUpdate.type :" + syncReUpdate.type);
                Log_1.saleslog.info(sqlList);
                if (!(syncReUpdate.type === "T")) return [3 /*break*/, 12];
                _d = (_c = SyncServiceHelper_1.SyncServiceHelper).BatchQueryunPool;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 10: return [4 /*yield*/, _d.apply(_c, [(_g.sent()).StagePool, sqlList, Log_1.saleslog])];
            case 11:
                _g.sent();
                return [3 /*break*/, 15];
            case 12:
                _f = (_e = SyncServiceHelper_1.SyncServiceHelper).BatchQueryunPool;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 13: return [4 /*yield*/, _f.apply(_e, [(_g.sent()).LocalPool, sqlList, Log_1.saleslog])];
            case 14:
                _g.sent();
                _g.label = 15;
            case 15: return [3 /*break*/, 17];
            case 16:
                error_2 = _g.sent();
                Log_1.saleslog.error(error_2);
                return [3 /*break*/, 17];
            case 17:
                Log_1.saleslog.info("***************************** syncRun END ***********************************");
                return [2 /*return*/];
        }
    });
}); };
var buildQuery = function (syncReUpdate, dbSyncReUpdate, batchSql) { return __awaiter(_this, void 0, void 0, function () {
    var syncResults, stageData, storeData, sql, syncResultsStage, _a, _b, syncResultsLocal, _c, _d, sync, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                syncResults = null;
                stageData = null;
                storeData = null;
                return [4 /*yield*/, SyncServiceHelper_1.SyncServiceHelper.BuildDMLSelectPkQuery(syncReUpdate.table_name, syncReUpdate.table_pk, dbSyncReUpdate["table_pk_value"])];
            case 1:
                sql = _l.sent();
                _b = (_a = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_l.sent()).StagePool, sql, Log_1.saleslog])];
            case 3:
                syncResultsStage = _l.sent();
                stageData = syncResultsStage ? syncResultsStage.rows : [];
                stageData = stageData.length > 0 ? stageData[0] : null;
                _d = (_c = SyncServiceHelper_1.SyncServiceHelper).ExecuteQuery;
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 4: return [4 /*yield*/, _d.apply(_c, [(_l.sent()).LocalPool, sql, Log_1.saleslog])];
            case 5:
                syncResultsLocal = _l.sent();
                storeData = syncResultsLocal ? syncResultsLocal.rows : [];
                storeData = storeData.length > 0 ? storeData[0] : null;
                sync = {
                    map_table: syncReUpdate.table_name,
                    map_pk: syncReUpdate.table_pk,
                };
                if (!(syncReUpdate.type === "T" && storeData)) return [3 /*break*/, 8];
                _f = (_e = SyncServiceHelper_1.SyncServiceHelper).BuildBatchQuery;
                _g = [syncResultsLocal, sync, Log_1.saleslog];
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 6: return [4 /*yield*/, _f.apply(_e, _g.concat([(_l.sent()).StagePool, SyncServiceHelper_1.SyncServiceHelper.StageDBOptions(), batchSql]))];
            case 7:
                _l.sent();
                return [3 /*break*/, 12];
            case 8:
                if (!(syncReUpdate.type === "M" && stageData)) return [3 /*break*/, 11];
                _j = (_h = SyncServiceHelper_1.SyncServiceHelper).BuildBatchQuery;
                _k = [syncResultsStage, sync, Log_1.saleslog];
                return [4 /*yield*/, PoolConnectionConfig_1.PoolConnectionConfig];
            case 9: return [4 /*yield*/, _j.apply(_h, _k.concat([(_l.sent()).LocalPool, SyncServiceHelper_1.SyncServiceHelper.LocalDBOptions(), batchSql]))];
            case 10:
                _l.sent();
                return [3 /*break*/, 12];
            case 11:
                sql = null;
                _l.label = 12;
            case 12: return [2 /*return*/, sql];
        }
    });
}); };
cron.schedule("* * * * *", function () { return __awaiter(_this, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, checkInternet()];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 4];
                return [4 /*yield*/, main()];
            case 2:
                _a.sent();
                return [4 /*yield*/, syncRun()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                Log_1.saleslog.warn(">>>>>>>>>>>>>>>>> No Internet connection <<<<<<<<<<<<<<<<<<<<");
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                Log_1.saleslog.error(error_3);
                Log_1.saleslog.error("******* Error on sync sales check **********");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
var checkInternet = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dns
                .lookup("google.com")
                .then(function () { return true; })
                .catch(function () { return false; })];
    });
}); };
