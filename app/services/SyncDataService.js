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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Config_1 = require("../../utils/Config");
var SyncDataService = /** @class */ (function () {
    function SyncDataService() {
    }
    SyncDataService.prototype.excecuteQuery = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, data, fields, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRunner = typeorm_1.getConnection().createQueryRunner();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 6]);
                        data = void 0;
                        return [4 /*yield*/, queryRunner.query(reqData.query)];
                    case 2:
                        data = _a.sent();
                        fields = void 0;
                        return [2 /*return*/, { rows: data, fields: fields }];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [4 /*yield*/, queryRunner.release()];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SyncDataService.prototype.batchQuery = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, _i, _a, sql, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryRunner = typeorm_1.getConnection().createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 11, 13]);
                        _i = 0, _a = reqData.data;
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        sql = _a[_i];
                        return [4 /*yield*/, queryRunner.query(sql)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 8:
                        _b.sent();
                        return [2 /*return*/, { status: 1, message: "DONE" }];
                    case 9:
                        error_2 = _b.sent();
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 10:
                        _b.sent();
                        throw { status: 0, message: error_2 };
                    case 11: return [4 /*yield*/, queryRunner.release()];
                    case 12:
                        _b.sent();
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    SyncDataService.prototype.metaTableQuery = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, data, query, fields, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRunner = typeorm_1.getConnection().createQueryRunner();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 6]);
                        data = void 0;
                        query = "\n                SELECT DISTINCT\n                C.ordinal_position AS POS,\n                  C.column_name              AS NAME,\n                      C.is_nullable              AS IS_NULLABLE,\n                      C.udt_name                 AS DATA_TYPE,\n                      C.character_maximum_length AS MAX_LENGTH,\n                      ( CASE\n                          WHEN TC.constraint_type = 'PRIMARY KEY' THEN 'ID'\n                          WHEN TC.constraint_type = 'UNIQUE' THEN NULL\n                          ELSE CCU.table_name\n                        END ) AS REF\n            FROM   information_schema.columns C\n              LEFT JOIN information_schema.key_column_usage AS KCU\n                    ON ( KCU.table_name = c.table_name\n                          AND KCU.column_name = c.column_name )\n              LEFT JOIN information_schema.table_constraints TC\n                    ON TC.table_name = C.table_name\n                        AND TC.table_catalog = C.table_catalog\n                        AND TC.constraint_name = kcu.constraint_name\n              LEFT JOIN information_schema.constraint_column_usage CCU\n                    ON CCU.constraint_name = TC.constraint_name\n                        AND C.table_catalog = CCU.table_catalog\n            WHERE  C.table_catalog = '" + Config_1.dbOptions.database + "'\n              AND C.table_name = '" + reqData.map_table + "'\n            ORDER  BY C.ordinal_position;\n        ";
                        return [4 /*yield*/, queryRunner.query(query)];
                    case 2:
                        data = _a.sent();
                        fields = void 0;
                        return [2 /*return*/, { rows: data, fields: fields }];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [4 /*yield*/, queryRunner.release()];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SyncDataService;
}());
exports.SyncDataService = SyncDataService;
