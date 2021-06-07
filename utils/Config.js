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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var RawQuery_1 = require("../app/common/RawQuery");
// setx/export ENV_JPOS={ "dbHost":"localhost","dbPort":"5432","dbUser":"test_user","dbPassword":"test1234","dbDatabase":"test_db"  }
exports.dbOptions = {
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Mpos1234",
    database: "mpos_db",
    logging: false,
    synchronize: false,
    entities: [__dirname + "/../entities/**/*{.ts,.js}"],
    connectTimeoutMS: 0,
    extra: {
        max: 10,
        min: 5,
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 0,
    },
};
// =============== QA STAGING DATABASE ==================
exports.stageDbOptions = {
    name: "stage",
    type: "postgres",
    host: "xxxx",
    port: 5432,
    username: "xxxx",
    password: "xxxx",
    database: "xxxx",
    max: 5,
    idleTimeoutMillis: 0,
    slaves: ""
};
exports.syncStageDbOptions = {
    name: "syncstage",
    type: "postgres",
    host: "xxxx",
    port: 5432,
    username: "xxxx",
    password: "xxxx",
    database: "xxxx",
    max: 5,
    idleTimeoutMillis: 0,
    slaves: ""
};
exports.mailOptions = {
    host: "smtp.gmail.com",
    port: 465,
    user: "XXXX",
    pass: "XXXX",
};

exports.SMS_NOIFICATION = {
    url: "xxxxxxx",
    auth: "xxxxxx"
};

exports.setEnvConfig = function () {
    var envData = process.env.ENV_JPOS;
    console.log(envData);
    if (envData) {
        envData = JSON.parse(envData);
        if (envData.dbHost) {
            exports.dbOptions.host = envData.dbHost;
            exports.dbOptions.port = envData.dbPort;
            exports.dbOptions.username = envData.dbUser;
            exports.dbOptions.password = envData.dbPassword;
            exports.dbOptions.database = envData.dbDatabase;
            exports.dbOptions.logging = false;
        }
    }
    console.log(envData);
    exports.setSyncStagingConfig();
    exports.setStagingConfig();
    exports.setSyncUrl();	
};
var CrpytoData_1 = require("./CrpytoData");
var fs_1 = require("fs");
var Props_1 = require("../constants/Props");
exports.setStagingConfig = function () {
    try {
        var data = fs_1.readFileSync(__dirname + "/../id_rsa", "utf-8");
        console.log("readFileSync Data:", data);
        var decodeData = CrpytoData_1.decrypt(JSON.parse(data));
        data = JSON.parse(decodeData);
        if (data) {
            exports.stageDbOptions.host = data.dbHost;
                exports.stageDbOptions.port = data.dbPort;
                exports.stageDbOptions.username = data.dbUser;
                exports.stageDbOptions.database = data.dbDatabase;
                exports.stageDbOptions.password = data.dbPassword;
                exports.stageDbOptions.slaves = data.slaves;
                console.log(" \n\n Production DB set succesfully .... \n\n ");
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.setSyncStagingConfig = function () {
    try {
        var data = fs_1.readFileSync(__dirname + "/../sync_id_rsa", "utf-8");
        if (data) {
            var decodeData = CrpytoData_1.decrypt(JSON.parse(data));
            data = JSON.parse(decodeData);
            if (data) {
                exports.syncStageDbOptions.host = data.dbHost;
                exports.syncStageDbOptions.port = data.dbPort;
                exports.syncStageDbOptions.username = data.dbUser;
                exports.syncStageDbOptions.database = data.dbDatabase;
                exports.syncStageDbOptions.password = data.dbPassword;
                exports.syncStageDbOptions.slaves = data.slaves;
                console.log(" \n\n Sync Production DB set succesfully .... \n\n ");
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.syncConfig = {
    url: "",
    syncUrl: "",
    token: ""
};
exports.setSyncUrl = function () {
    try {
        var data = fs_1.readFileSync(__dirname + "/../sync_url_id_rsa", "utf-8");
        if (data) {
            // console.log(data)
            var decodeData = CrpytoData_1.decrypt(JSON.parse(data));
            data = JSON.parse(decodeData);
            // console.log(data);
            if (data) {
                // data.syncUrl = 'localhost:5100'
                exports.syncConfig.url = "https://" + data.url + "/api/";
                exports.syncConfig.syncUrl = "https://" + data.syncUrl + "/api/";
                exports.syncConfig.token = data.token;
                console.log(" \n\n SyncUrl set succesfully .... \n\n ", exports.syncConfig);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};

exports.baseAuth = {
    user: "xxxx",
    password: "xxxxx",
};
exports.DbEnvConfig = function () { return __awaiter(_this, void 0, void 0, function () {
    var redeem, ecommerce, syncApi, token, testStoreIds, smsCred;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("REDEEM_POS")];
            case 1:
                redeem = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("ECOMMERCE_PAYMENT")];
            case 2:
                ecommerce = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("SYNC_ADMIN_API")];
            case 3:
                syncApi = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("TOKEN")];
            case 4:
                token = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("OFFLINE_STORES")];
            case 5:
                testStoreIds = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("SMS")];
            case 6:
                smsCred = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("SMS_NOTIFICATION_IN_SYNC")];
            case 7:
                exports.SMS_NOIFICATION = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("BASE_AUTH")];
            case 8:
                exports.baseAuth = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("SYNC_SERVICE_API")];
            case 9:
                exports.syncConfig = _a.sent();
                console.log("syncConfig:\n", exports.syncConfig);
                Props_1.Props.AXAPTA_URL = redeem.url;
                Props_1.Props.REDEEM_URL = redeem.url + "Authenticate";
                Props_1.Props.REDEEM_CLIENT_ID = redeem.username;
                Props_1.Props.REDEEM_CLIENT_SECRET = redeem.password;
                Props_1.Props.ECOMMERCE_PAYMENT_URL = ecommerce.url;
                Props_1.Props._URL = syncApi.url;
                Props_1.Props._TOKEN = token.token;
                Props_1.Props.EXPIRE_TIME = token.expiresAt;
                Props_1.Props.testStoreIds = testStoreIds.data;
                Props_1.Props.SMS_USER = smsCred.user;
                Props_1.Props.SMS_PASS = smsCred.pass;
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("MAIL")];
            case 10:
                exports.mailOptions = _a.sent();
                return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("SALES_CHECK")];
            case 11:
                exports.SALES_CHECK = _a.sent();
                console.log(exports.SALES_CHECK);
                return [2 /*return*/];
        }
    });
}); };
exports.SALES_CHECK = {
    SYNC_SALES: "select * from sync_sales_check ss where ss.id = 'XXXX-XXXX' ",
    KEYS: [
        "PACKINGSLIP",
        "SALESORDER",
        "INVENTORYMOVEMENT",
        "RETURNORDER",
        "ORDERRECEIVE",
        "ORDERSHIPMENT",
        "DESIGNERSERVICE",
        "DESIGNERSERVICERETURN",
    ],
    POSTED: "select  transkind, count(1),  inventlocationid from salestable  where  inventlocationid = 'XXXX-XXXX' and status in ( 'POSTED', 'PRINTED') and transkind in ( 'PACKINGSLIP', 'SALESORDER', 'INVENTORYMOVEMENT', 'RETURNORDER', 'ORDERRECEIVE', 'ORDERSHIPMENT', 'DESIGNERSERVICE', 'DESIGNERSERVICERETURN') and lastmodifieddate <= 'YYYY-MM-DDTHH:mm:SS' group by  transkind, inventlocationid order by  inventlocationid, transkind",
    NOT_POSTED: "select  transkind, count(1),  inventlocationid from salestable  where  inventlocationid = 'XXXX-XXXX' and status NOT in ( 'POSTED', 'PRINTED') and transkind in ( 'PACKINGSLIP', 'SALESORDER', 'INVENTORYMOVEMENT', 'RETURNORDER', 'ORDERRECEIVE', 'ORDERSHIPMENT', 'DESIGNERSERVICE', 'DESIGNERSERVICERETURN') and lastmodifieddate <= 'YYYY-MM-DDTHH:mm:SS' group by  transkind, inventlocationid order by  inventlocationid, transkind",
    SALES_LINES: "select  'LINES', count(s.status), s.inventlocationid from salesline sl inner join salestable s on sl.salesid = s.salesid where  s.inventlocationid = 'XXXX-XXXX' and s.status in ('POSTED', 'PRINTED') and s.transkind in ( 'PACKINGSLIP', 'SALESORDER', 'INVENTORYMOVEMENT', 'RETURNORDER', 'ORDERRECEIVE', 'ORDERSHIPMENT', 'DESIGNERSERVICE', 'DESIGNERSERVICERETURN') and s.lastmodifieddate <= 'YYYY-MM-DDTHH:mm:SS' group by  s.inventlocationid, s.transkind order by  s.inventlocationid",
};
exports.getSyncDb = function () {
    return exports.syncStageDbOptions;
};
exports.getStageDb = function () {
    return exports.stageDbOptions;
};
exports.getSyncUrl = function () {
    return exports.syncConfig;
};

