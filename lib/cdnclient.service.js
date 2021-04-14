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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var cdn20180510_1 = __importStar(require("@alicloud/cdn20180510")), $Cdn20180510 = cdn20180510_1;
var $OpenApi = __importStar(require("@alicloud/openapi-client"));
var utils_1 = require("./utils");
var contants_1 = require("./contants");
var lodash_get_1 = __importDefault(require("lodash.get"));
var Client = /** @class */ (function () {
    function Client() {
    }
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    Client.createClient = function (credentials) {
        var accessKeyId = credentials.accessKeyId, accessKeySecret = credentials.accessKeySecret;
        var config = new $OpenApi.Config({
            // 您的AccessKey ID
            accessKeyId: accessKeyId,
            // 您的AccessKey Secret
            accessKeySecret: accessKeySecret,
        });
        // 访问的域名
        config.endpoint = 'cdn.aliyuncs.com';
        return new cdn20180510_1.default(config);
    };
    /**
     * 设置edge script灰度配置
     * @param accessKeyId
     * @param accessKeySecret
     */
    Client.setEsStagingConfig = function (credentials, _a) {
        var domain = _a.domain, rule = _a.rule;
        return __awaiter(this, void 0, void 0, function () {
            var client, setCdnDomainStagingConfigRequest, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        client = Client.createClient(credentials);
                        setCdnDomainStagingConfigRequest = new $Cdn20180510.SetCdnDomainStagingConfigRequest({
                            domainName: domain,
                            functions: JSON.stringify([
                                {
                                    functionArgs: [
                                        { argName: 'enable', argValue: 'on' },
                                        { argName: 'pri', argValue: '0' },
                                        { argName: 'name', argValue: 'serverless_dev_auto_es' },
                                        {
                                            argName: 'rule',
                                            argValue: rule,
                                        },
                                    ],
                                    functionName: 'edge_function',
                                },
                            ]),
                        });
                        return [4 /*yield*/, client.setCdnDomainStagingConfig(setCdnDomainStagingConfigRequest)];
                    case 1:
                        result = _b.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 将edge script灰度配置发布到线上环境
     * @param credentials
     */
    Client.publishEsStagingConfigToProduction = function (credentials, domain) {
        return __awaiter(this, void 0, void 0, function () {
            var client, publishStagingConfigToProductionRequest, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = Client.createClient(credentials);
                        publishStagingConfigToProductionRequest = new $Cdn20180510.PublishStagingConfigToProductionRequest({
                            domainName: domain,
                            functionName: 'edge_function',
                        });
                        return [4 /*yield*/, client.publishStagingConfigToProduction(publishStagingConfigToProductionRequest)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 获取CDN域名的详细信息
     * @param credentials
     */
    Client.describeCdnDomainDetail = function (client, domain) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, topDomain, rrDomainName, describeCdnDomainDetailRequest, result, domainDetailMode, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = utils_1.generateDomain(domain), topDomain = _a.topDomain, rrDomainName = _a.rrDomainName;
                        describeCdnDomainDetailRequest = new $Cdn20180510.DescribeCdnDomainDetailRequest({
                            domainName: rrDomainName + "." + topDomain,
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.describeCdnDomainDetail(describeCdnDomainDetailRequest)];
                    case 2:
                        result = _b.sent();
                        domainDetailMode = lodash_get_1.default(result, 'body.getDomainDetailModel');
                        return [2 /*return*/, domainDetailMode];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 域名归属校验
     * @param client
     * @param param1
     */
    Client.verifyDomainOwner = function (client, _a) {
        var domain = _a.domain, _b = _a.verifyType, verifyType = _b === void 0 ? 'bothCheck' : _b;
        return __awaiter(this, void 0, void 0, function () {
            var verifyDomainOwnerRequest, result, error_2, describeVerifyContentRequest, result, verifyContent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        verifyDomainOwnerRequest = new $Cdn20180510.VerifyDomainOwnerRequest({
                            domainName: domain,
                            verifyType: verifyType,
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, client.verifyDomainOwner(verifyDomainOwnerRequest)];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _c.sent();
                        describeVerifyContentRequest = new $Cdn20180510.DescribeVerifyContentRequest({
                            domainName: domain,
                        });
                        return [4 /*yield*/, client.describeVerifyContent(describeVerifyContentRequest)];
                    case 4:
                        result = _c.sent();
                        verifyContent = lodash_get_1.default(result, 'body.content');
                        throw new Error("2020\u5E746\u670812\u65E5\u8D77\uFF0C\u5F53\u60A8\u9996\u6B21\u5C06\u65B0\u57DF\u540D\u6DFB\u52A0\u81F3\u963F\u91CC\u4E91CDN\u65F6\uFF0C\u9700\u6309\u8981\u6C42\u505A\u57DF\u540D\u5F52\u5C5E\u6743\u9A8C\u8BC1\uFF0C\u5F53\u60A8\u6309\u8981\u6C42\u914D\u7F6EDNS\u89E3\u6790\u6216\u6587\u4EF6\u9A8C\u8BC1\u540E\uFF0C\u624D\u80FD\u6B63\u5E38\u8C03\u7528AddCdnDomain\u63A5\u53E3\u6DFB\u52A0\u57DF\u540D\u3002 \u57DF\u540D\u5F52\u5C5E\u6743\u9A8C\u8BC1\u8BF7\u53C2\u89C1https://help.aliyun.com/document_detail/169377.html\n        \u8BF7\u524D\u5F80\u57DF\u540DDNS\u670D\u52A1\u5546\u914D\u7F6E\u8BE5TXT\u8BB0\u5F55\uFF1A\u8BB0\u5F55\u7C7B\u578B:TXT\uFF0C\u4E3B\u673A\u8BB0\u5F55:verification\uFF0C\u8BB0\u5F55\u503C:" + verifyContent + "\n        ");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除域名
     * @param client
     * @param domain
     */
    Client.deleteCdnDomain = function (client, domain, isThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteCdnDomainRequest, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteCdnDomainRequest = new $Cdn20180510.DeleteCdnDomainRequest({
                            domainName: domain,
                        });
                        if (!isThrowError) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.deleteCdnDomain(deleteCdnDomainRequest)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, client.deleteCdnDomain(deleteCdnDomainRequest)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 添加CDN域名
     * @param client
     * @param param1
     */
    Client.addCDNDomain = function (client, _a) {
        var domain = _a.domain, sources = _a.sources;
        return __awaiter(this, void 0, void 0, function () {
            var _b, topDomain, rrDomainName, addCdnDomainRequest, cdnResult, error_4, message, messageCode;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = utils_1.generateDomain(domain), topDomain = _b.topDomain, rrDomainName = _b.rrDomainName;
                        addCdnDomainRequest = new $Cdn20180510.AddCdnDomainRequest({
                            cdnType: 'web',
                            domainName: rrDomainName + "." + topDomain,
                            sources: JSON.stringify([].concat(sources)),
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.addCdnDomain(addCdnDomainRequest)];
                    case 2:
                        cdnResult = _c.sent();
                        return [2 /*return*/, cdnResult];
                    case 3:
                        error_4 = _c.sent();
                        message = lodash_get_1.default(error_4, 'message', '');
                        messageCode = message.split(':')[0];
                        console.error(contants_1.CDN_ERRORS[messageCode] || message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 修改添加CDN域名
     * @param client
     * @param param1
     */
    Client.modifyCdnDomain = function (client, _a) {
        var domain = _a.domain, sources = _a.sources;
        return __awaiter(this, void 0, void 0, function () {
            var _b, topDomain, rrDomainName, addCdnDomainRequest, cdnResult, error_5, message, messageCode;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = utils_1.generateDomain(domain), topDomain = _b.topDomain, rrDomainName = _b.rrDomainName;
                        addCdnDomainRequest = new $Cdn20180510.ModifyCdnDomainRequest({
                            domainName: rrDomainName + "." + topDomain,
                            sources: JSON.stringify([].concat(sources)),
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.modifyCdnDomain(addCdnDomainRequest)];
                    case 2:
                        cdnResult = _c.sent();
                        return [2 /*return*/, cdnResult];
                    case 3:
                        error_5 = _c.sent();
                        message = lodash_get_1.default(error_5, 'message', '');
                        messageCode = message.split(':')[0];
                        console.error(contants_1.CDN_ERRORS[messageCode] || message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RuY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2RuY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLGlHQUFtRTtBQUNuRSxpRUFBcUQ7QUFFckQsaUNBQXlDO0FBQ3pDLHVDQUF3QztBQUN4QywwREFBNkI7QUFFN0I7SUFBQTtJQXVPQSxDQUFDO0lBdE9DOzs7Ozs7T0FNRztJQUNJLG1CQUFZLEdBQW5CLFVBQW9CLFdBQXlCO1FBQ25DLElBQUEsV0FBVyxHQUFzQixXQUFXLFlBQWpDLEVBQUUsZUFBZSxHQUFLLFdBQVcsZ0JBQWhCLENBQWlCO1FBQ3JELElBQU0sTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNqQyxpQkFBaUI7WUFDakIsV0FBVyxhQUFBO1lBQ1gscUJBQXFCO1lBQ3JCLGVBQWUsaUJBQUE7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsUUFBUTtRQUNSLE1BQU0sQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7UUFDckMsT0FBTyxJQUFJLHFCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSx5QkFBa0IsR0FBL0IsVUFDRSxXQUF5QixFQUN6QixFQUFrRDtZQUFoRCxNQUFNLFlBQUEsRUFBRSxJQUFJLFVBQUE7Ozs7Ozt3QkFFUixNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDMUMsZ0NBQWdDLEdBQUcsSUFBSSxZQUFZLENBQUMsZ0NBQWdDLENBQUM7NEJBQ3pGLFVBQVUsRUFBRSxNQUFNOzRCQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDeEI7b0NBQ0UsWUFBWSxFQUFFO3dDQUNaLEVBQUUsT0FBTyxF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