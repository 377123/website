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
var utils_1 = require("../utils");
var contants_1 = require("../contants");
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
            var client, setCdnDomainStagingConfigRequest;
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
                        // 复制代码运行请自行打印 API 的返回值
                        return [4 /*yield*/, client.setCdnDomainStagingConfig(setCdnDomainStagingConfigRequest)];
                    case 1:
                        // 复制代码运行请自行打印 API 的返回值
                        _b.sent();
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
            var client, publishStagingConfigToProductionRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = Client.createClient(credentials);
                        publishStagingConfigToProductionRequest = new $Cdn20180510.PublishStagingConfigToProductionRequest({
                            domainName: domain,
                            functionName: 'edge_function',
                        });
                        // 复制代码运行请自行打印 API 的返回值
                        return [4 /*yield*/, client.publishStagingConfigToProduction(publishStagingConfigToProductionRequest)];
                    case 1:
                        // 复制代码运行请自行打印 API 的返回值
                        _a.sent();
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
            var describeCdnDomainDetailRequest, result, domainDetailMode, error_1, message, messageCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        describeCdnDomainDetailRequest = new $Cdn20180510.DescribeCdnDomainDetailRequest({
                            domainName: domain,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.describeCdnDomainDetail(describeCdnDomainDetailRequest)];
                    case 2:
                        result = _a.sent();
                        domainDetailMode = lodash_get_1.default(result, 'body.getDomainDetailModel');
                        return [2 /*return*/, domainDetailMode];
                    case 3:
                        error_1 = _a.sent();
                        message = lodash_get_1.default(error_1, 'message', '');
                        messageCode = message.split(':')[0];
                        if (messageCode === 'CdnServiceNotFound') {
                            throw new Error('您的帐户尚未开通CDN服务，请前往 https://common-buy.aliyun.com/?commodityCode=cdn#/open 页面进行开通');
                        }
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
            var addCdnDomainRequest, cdnResult, error_4, message, messageCode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        addCdnDomainRequest = new $Cdn20180510.AddCdnDomainRequest({
                            cdnType: 'web',
                            domainName: domain,
                            sources: JSON.stringify([].concat(sources)),
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.addCdnDomain(addCdnDomainRequest)];
                    case 2:
                        cdnResult = _b.sent();
                        return [2 /*return*/, cdnResult];
                    case 3:
                        error_4 = _b.sent();
                        message = lodash_get_1.default(error_4, 'message', '');
                        messageCode = message.split(':')[0];
                        throw new Error(contants_1.CDN_ERRORS[messageCode] || message);
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
            var addCdnDomainRequest, cdnResult, error_5, message, messageCode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        addCdnDomainRequest = new $Cdn20180510.ModifyCdnDomainRequest({
                            domainName: domain,
                            sources: JSON.stringify([].concat(sources)),
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.modifyCdnDomain(addCdnDomainRequest)];
                    case 2:
                        cdnResult = _b.sent();
                        return [2 /*return*/, cdnResult];
                    case 3:
                        error_5 = _b.sent();
                        message = lodash_get_1.default(error_5, 'message', '');
                        messageCode = message.split(':')[0];
                        throw new Error(contants_1.CDN_ERRORS[messageCode] || message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 增加HTTP证书
     * @param client
     * @param param1
     */
    Client.setDomainServerCertificate = function (client, _a) {
        var domain = _a.domain, https = _a.https;
        return __awaiter(this, void 0, void 0, function () {
            var domainServerCertificateRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        domainServerCertificateRequest = new $Cdn20180510.SetDomainServerCertificateRequest(__assign({ domainName: domain }, utils_1.parseCertInfo(lodash_get_1.default(https, 'certInfo', {}))));
                        return [4 /*yield*/, client.setDomainServerCertificate(domainServerCertificateRequest)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Client.setCdnDomainForceHttps(client, {
                                domain: domain,
                                forceHttps: lodash_get_1.default(https, 'forceHttps', 'on'),
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, Client.setCdnDomainHttp2(client, { domain: domain, http2: lodash_get_1.default(https, 'http2', 'off') })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.setCdnDomainHttp2 = function (client, _a) {
        var domain = _a.domain, http2 = _a.http2;
        return __awaiter(this, void 0, void 0, function () {
            var cdnDomainStagingConfigRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cdnDomainStagingConfigRequest = new $Cdn20180510.BatchSetCdnDomainConfigRequest({
                            domainNames: domain,
                            functions: JSON.stringify([
                                {
                                    functionArgs: [{ argName: 'http2', argValue: http2 }],
                                    functionName: 'https_option',
                                },
                            ]),
                        });
                        return [4 /*yield*/, client.batchSetCdnDomainConfig(cdnDomainStagingConfigRequest)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 删除加速域名的配置
     * @param client
     * @param param1
     */
    Client.DeleteSpecificConfig = function (client, _a) {
        var domain = _a.domain, configId = _a.configId;
        return __awaiter(this, void 0, void 0, function () {
            var option;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        option = new $Cdn20180510.DeleteSpecificConfigRequest({
                            domainName: domain,
                            configId: configId,
                        });
                        return [4 /*yield*/, client.deleteSpecificConfig(option)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 获取加速域名的配置信息。
     * @param client
     * @param param1
     */
    Client.DescribeCdnDomainConfigs = function (client, _a) {
        var domain = _a.domain;
        return __awaiter(this, void 0, void 0, function () {
            var option, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        option = new $Cdn20180510.DescribeCdnDomainConfigsRequest({
                            domainName: domain,
                            functionNames: 'https_force,http_force,https_option,https_tls_version,HSTS',
                        });
                        return [4 /*yield*/, client.describeCdnDomainConfigs(option)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, lodash_get_1.default(result, 'body.domainConfigs.domainConfig')];
                }
            });
        });
    };
    /**
     * @description 强制HTTPS跳转
     * @param client
     * @param param1
     */
    Client.setCdnDomainForceHttps = function (client, _a) {
        var domain = _a.domain, forceHttps = _a.forceHttps;
        return __awaiter(this, void 0, void 0, function () {
            var cdnDomainConfigs, forceHttpsOptioned, cdnDomainStagingConfigRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Client.DescribeCdnDomainConfigs(client, { domain: domain })];
                    case 1:
                        cdnDomainConfigs = _b.sent();
                        forceHttpsOptioned = cdnDomainConfigs.find(function (item) { return item.functionName === utils_1.ForceHttpsEnum.off || item.functionName === utils_1.ForceHttpsEnum.on; });
                        if (!forceHttpsOptioned) return [3 /*break*/, 3];
                        // 当前状态和设置的值相同，直接返回
                        if (forceHttpsOptioned.functionName === utils_1.ForceHttpsEnum[forceHttps])
                            return [2 /*return*/];
                        // 不相同，则需要先删除当前状态
                        return [4 /*yield*/, Client.DeleteSpecificConfig(client, { domain: domain, configId: forceHttpsOptioned.configId })];
                    case 2:
                        // 不相同，则需要先删除当前状态
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        // 默认default，不需要设置
                        if (forceHttps === 'default')
                            return [2 /*return*/];
                        cdnDomainStagingConfigRequest = new $Cdn20180510.BatchSetCdnDomainConfigRequest({
                            domainNames: domain,
                            functions: JSON.stringify([
                                {
                                    functionArgs: [{ argName: 'enable', argValue: 'on' }],
                                    functionName: utils_1.ForceHttpsEnum[forceHttps],
                                },
                            ]),
                        });
                        return [4 /*yield*/, client.batchSetCdnDomainConfig(cdnDomainStagingConfigRequest)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Referer防盗链
     * @param client
     * @param param1
     */
    Client.setCdnDomainReferer = function (client, _a) {
        var domain = _a.domain, referer = _a.referer;
        return __awaiter(this, void 0, void 0, function () {
            var cdnDomainStagingConfigRequest, cdnResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cdnDomainStagingConfigRequest = new $Cdn20180510.BatchSetCdnDomainConfigRequest({
                            domainNames: domain,
                            functions: JSON.stringify([utils_1.parseReferer(referer)]),
                        });
                        return [4 /*yield*/, client.batchSetCdnDomainConfig(cdnDomainStagingConfigRequest)];
                    case 1:
                        cdnResult = _b.sent();
                        return [2 /*return*/, cdnResult];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RuY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvY2RuY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsaUdBQW1FO0FBQ25FLGlFQUFxRDtBQUVyRCxrQ0FBdUU7QUFDdkUsd0NBQXlDO0FBQ3pDLDBEQUE2QjtBQUU3QjtJQUFBO0lBNlZBLENBQUM7SUE1VkM7Ozs7OztPQU1HO0lBQ0ksbUJBQVksR0FBbkIsVUFBb0IsV0FBeUI7UUFDbkMsSUFBQSxXQUFXLEdBQXNCLFdBQVcsWUFBakMsRUFBRSxlQUFlLEdBQUssV0FBVyxnQkFBaEIsQ0FBaUI7UUFDckQsSUFBTSxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2pDLGlCQUFpQjtZQUNqQixXQUFXLGFBQUE7WUFDWCxxQkFBcUI7WUFDckIsZUFBZSxpQkFBQTtTQUNoQixDQUFDLENBQUM7UUFDSCxRQUFRO1FBQ1IsTUFBTSxDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztRQUNyQyxPQUFPLElBQUkscUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLHlCQUFrQixHQUEvQixVQUNFLFdBQXlCLEVBQ3pCLEVBQWtEO1lBQWhELE1BQU0sWUFBQSxFQUFFLElBQUksVUFBQTs7Ozs7O3dCQUVSLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUMxQyxnQ0FBZ0MsR0FBRyxJQUFJLFlBQVksQ0FBQyxnQ0FBZ0MsQ0FBQzs0QkFDekYsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUN4QjtvQ0FDRSxZQUFZ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