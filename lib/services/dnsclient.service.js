"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
/* eslint-disable @typescript-eslint/indent */
var alidns20150109_1 = __importStar(require("@alicloud/alidns20150109")), $Alidns20150109 = alidns20150109_1;
var $OpenApi = __importStar(require("@alicloud/openapi-client"));
var core_1 = require("@serverless-devs/core");
var Client = /** @class */ (function () {
    function Client() {
    }
    /**
     * ??????AK&SK???????????????Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    Client.createClient = function (credentials) {
        var accessKeyId = credentials.accessKeyId, accessKeySecret = credentials.accessKeySecret;
        var config = new $OpenApi.Config({
            accessKeyId: accessKeyId,
            accessKeySecret: accessKeySecret,
        });
        // ???????????????
        config.endpoint = 'dns.aliyuncs.com';
        return new alidns20150109_1.default(config);
    };
    Client.addDomainRecord = function (client, addDomainRecordParams) {
        return __awaiter(this, void 0, void 0, function () {
            var addDomainRecordRequest, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addDomainRecordRequest = new $Alidns20150109.AddDomainRecordRequest(addDomainRecordParams);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.addDomainRecord(addDomainRecordRequest)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        core_1.Logger.warn('WEBSITE', "\u4F7F\u7528\u963F\u91CCDNS\u89E3\u6790\u5931\u8D25, \u8BF7\u624B\u52A8\u914D\u7F6ECNAME" + addDomainRecordParams.value);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Client.describeDomainInfo = function (client, domain) {
        return __awaiter(this, void 0, void 0, function () {
            var describeDomainInfoRequest, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        describeDomainInfoRequest = new $Alidns20150109.DescribeDomainInfoRequest({
                            domainName: domain,
                        });
                        return [4 /*yield*/, client.describeDomainInfo(describeDomainInfoRequest)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5zY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZG5zY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQThDO0FBQzlDLDZHQUE0RTtBQUM1RSxpRUFBcUQ7QUFDckQsOENBQStDO0FBb0IvQztJQUFBO0lBaURBLENBQUM7SUFoREM7Ozs7OztPQU1HO0lBQ0ksbUJBQVksR0FBbkIsVUFBb0IsV0FBeUI7UUFDbkMsSUFBQSxXQUFXLEdBQXNCLFdBQVcsWUFBakMsRUFBRSxlQUFlLEdBQUssV0FBVyxnQkFBaEIsQ0FBaUI7UUFDckQsSUFBTSxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2pDLFdBQVcsYUFBQTtZQUNYLGVBQWUsaUJBQUE7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsUUFBUTtRQUNSLE1BQU0sQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7UUFDckMsT0FBTyxJQUFJLHdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVZLHNCQUFlLEdBQTVCLFVBQTZCLE1BQU0sRUFBRSxxQkFBdUM7Ozs7Ozt3QkFDcEUsc0JBQXNCLEdBQUcsSUFBSSxlQUFlLENBQUMsc0JBQXNCLENBQ3ZFLHFCQUFxQixDQUN0QixDQUFDOzs7O3dCQUVlLHFCQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsRUFBQTs7d0JBQTdELE1BQU0sR0FBRyxTQUFvRDt3QkFDbkUsc0JBQU8sTUFBTSxFQUFDOzs7d0JBRWQsYUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNkZBQTBCLHFCQUFxQixDQUFDLEtBQU8sQ0FBQyxDQUFDOzs7Ozs7S0FFbkY7SUFFWSx5QkFBa0IsR0FBL0IsVUFBZ0MsTUFBTSxFQUFFLE1BQWM7Ozs7Ozt3QkFDOUMseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQUMseUJBQXlCLENBQUM7NEJBQzlFLFVBQVUsRUFBRSxNQUFNO3lCQUNuQixDQUFDLENBQUM7d0JBQ1kscUJBQU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDLHlCQUF5QixDQUFDLEVBQUE7O3dCQUFuRSxNQUFNLEdBQUcsU0FBMEQ7d0JBQ3pFLHNCQUFPLE1BQU0sRUFBQzs7OztLQUNmO0lBWUgsYUFBQztBQUFELENBQUMsQUFqREQsSUFpREMifQ==