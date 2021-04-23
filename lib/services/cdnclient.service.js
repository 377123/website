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
var interface_1 = require("../interface");
var utils_1 = require("../utils");
var contants_1 = require("../contants");
var lodash_get_1 = __importDefault(require("lodash.get"));
var core_1 = require("@serverless-devs/core");
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
            var addCdnDomainRequest, error_4, message, messageCode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        addCdnDomainRequest = new $Cdn20180510.AddCdnDomainRequest({
                            scope: 'global',
                            cdnType: 'web',
                            domainName: domain,
                            sources: JSON.stringify([].concat(sources)),
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.addCdnDomain(addCdnDomainRequest)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
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
            var addCdnDomainRequest, error_5, message, messageCode;
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
                        _b.sent();
                        return [3 /*break*/, 4];
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
                                forceHttps: lodash_get_1.default(https, 'protocol', 'https'),
                            })];
                    case 2:
                        _b.sent();
                        if (lodash_get_1.default(https, 'certInfo.switch') === 'off' && https.http2 === 'on') {
                            core_1.Logger.log('HTTP/2是最新的HTTP协议，开启前您需要先配置HTTPS证书', 'red');
                        }
                        if (!(lodash_get_1.default(https, 'certInfo.switch') === 'on')) return [3 /*break*/, 4];
                        return [4 /*yield*/, Client.setCdnDomainHttp2(client, { domain: domain, http2: lodash_get_1.default(https, 'http2', 'off') })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
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
        var domain = _a.domain, functionNames = _a.functionNames;
        return __awaiter(this, void 0, void 0, function () {
            var option, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        option = new $Cdn20180510.DescribeCdnDomainConfigsRequest({
                            domainName: domain,
                            functionNames: functionNames,
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
     * @description 获取用户的加速域名信息
     * @param client
     * @param param1
     */
    Client.DescribeUserDomains = function (client, _a) {
        var domain = _a.domain, checkDomainShow = _a.checkDomainShow;
        return __awaiter(this, void 0, void 0, function () {
            var option, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        option = new $Cdn20180510.DescribeUserDomainsRequest({
                            domainName: domain,
                            checkDomainShow: checkDomainShow,
                        });
                        return [4 /*yield*/, client.describeUserDomains(option)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, lodash_get_1.default(result, 'body.domains.pageData[0]')];
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
                    case 0: return [4 /*yield*/, Client.DescribeCdnDomainConfigs(client, {
                            domain: domain,
                            functionNames: interface_1.ForceHttpsEnum.http + "," + interface_1.ForceHttpsEnum.https,
                        })];
                    case 1:
                        cdnDomainConfigs = _b.sent();
                        forceHttpsOptioned = cdnDomainConfigs.find(function (item) {
                            return item.functionName === interface_1.ForceHttpsEnum.http || item.functionName === interface_1.ForceHttpsEnum.https;
                        });
                        if (!forceHttpsOptioned) return [3 /*break*/, 3];
                        // 当前状态和设置的值相同，直接返回
                        if (forceHttpsOptioned.functionName === interface_1.ForceHttpsEnum[forceHttps])
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
                                    functionName: interface_1.ForceHttpsEnum[forceHttps],
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
            var cdnDomainConfigs, refererOptioned, cdnDomainStagingConfigRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Client.DescribeCdnDomainConfigs(client, {
                            domain: domain,
                            functionNames: interface_1.RefererEnum.whitelist + "," + interface_1.RefererEnum.blacklist,
                        })];
                    case 1:
                        cdnDomainConfigs = _b.sent();
                        refererOptioned = cdnDomainConfigs.find(function (item) {
                            return item.functionName === interface_1.RefererEnum.whitelist || item.functionName === interface_1.RefererEnum.blacklist;
                        });
                        if (!(referer.switch === 'on')) return [3 /*break*/, 4];
                        if (!refererOptioned) return [3 /*break*/, 3];
                        if (!(referer.type !== refererOptioned.functionName)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Client.DeleteSpecificConfig(client, { domain: domain, configId: refererOptioned.configId })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        if (!refererOptioned) return [3 /*break*/, 6];
                        return [4 /*yield*/, Client.DeleteSpecificConfig(client, {
                                domain: domain,
                                configId: refererOptioned.configId,
                            })];
                    case 5: 
                    // 未开启，且设置过 则删除
                    return [2 /*return*/, _b.sent()];
                    case 6:
                        cdnDomainStagingConfigRequest = new $Cdn20180510.BatchSetCdnDomainConfigRequest({
                            domainNames: domain,
                            functions: JSON.stringify([utils_1.parseReferer(referer)]),
                        });
                        return [4 /*yield*/, client.batchSetCdnDomainConfig(cdnDomainStagingConfigRequest)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description IP黑/白名单
     * @param client
     * @param param1
     */
    Client.setCdnDomainIpFilter = function (client, _a) {
        var domain = _a.domain, ipFilter = _a.ipFilter;
        return __awaiter(this, void 0, void 0, function () {
            var cdnDomainConfigs, ipFilterOptioned, cdnDomainStagingConfigRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Client.DescribeCdnDomainConfigs(client, {
                            domain: domain,
                            functionNames: interface_1.IpFilterEnum.whitelist + "," + interface_1.IpFilterEnum.blacklist,
                        })];
                    case 1:
                        cdnDomainConfigs = _b.sent();
                        ipFilterOptioned = cdnDomainConfigs.find(function (item) {
                            return item.functionName === interface_1.IpFilterEnum.whitelist ||
                                item.functionName === interface_1.IpFilterEnum.blacklist;
                        });
                        if (!(ipFilter.switch === 'on')) return [3 /*break*/, 4];
                        if (!ipFilterOptioned) return [3 /*break*/, 3];
                        if (!(ipFilter.type !== ipFilterOptioned.functionName)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Client.DeleteSpecificConfig(client, {
                                domain: domain,
                                configId: ipFilterOptioned.configId,
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        if (!ipFilterOptioned) return [3 /*break*/, 6];
                        return [4 /*yield*/, Client.DeleteSpecificConfig(client, {
                                domain: domain,
                                configId: ipFilterOptioned.configId,
                            })];
                    case 5: 
                    // 未开启，且设置过 则删除
                    return [2 /*return*/, _b.sent()];
                    case 6:
                        cdnDomainStagingConfigRequest = new $Cdn20180510.BatchSetCdnDomainConfigRequest({
                            domainNames: domain,
                            functions: JSON.stringify([utils_1.parseIpFilter(ipFilter)]),
                        });
                        return [4 /*yield*/, client.batchSetCdnDomainConfig(cdnDomainStagingConfigRequest)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description UA黑/白名单
     * @param client
     * @param param1
     */
    Client.setCdnDomainUaFilter = function (client, _a) {
        var domain = _a.domain, uaFilter = _a.uaFilter;
        return __awaiter(this, void 0, void 0, function () {
            var cdnDomainConfigs, uaFilterOptioned, cdnDomainStagingConfigRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Client.DescribeCdnDomainConfigs(client, {
                            domain: domain,
                            functionNames: 'ali_ua',
                        })];
                    case 1:
                        cdnDomainConfigs = _b.sent();
                        uaFilterOptioned = cdnDomainConfigs.find(function (item) { return item.functionName === 'ali_ua'; });
                        if (!(uaFilter.switch === 'on')) return [3 /*break*/, 4];
                        if (!uaFilterOptioned) return [3 /*break*/, 3];
                        if (!(uaFilter.type !== uaFilterOptioned.functionName)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Client.DeleteSpecificConfig(client, {
                                domain: domain,
                                configId: uaFilterOptioned.configId,
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        if (!uaFilterOptioned) return [3 /*break*/, 6];
                        return [4 /*yield*/, Client.DeleteSpecificConfig(client, {
                                domain: domain,
                                configId: uaFilterOptioned.configId,
                            })];
                    case 5: 
                    // 未开启，且设置过 则删除
                    return [2 /*return*/, _b.sent()];
                    case 6:
                        cdnDomainStagingConfigRequest = new $Cdn20180510.BatchSetCdnDomainConfigRequest({
                            domainNames: domain,
                            functions: JSON.stringify([utils_1.parseUaFilter(uaFilter)]),
                        });
                        return [4 /*yield*/, client.batchSetCdnDomainConfig(cdnDomainStagingConfigRequest)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 性能优化
     * @param client
     * @param param1
     */
    Client.setCdnDomainOptimization = function (client, _a) {
        var domain = _a.domain, optimization = _a.optimization;
        return __awaiter(this, void 0, void 0, function () {
            var cdnDomainStagingConfigRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cdnDomainStagingConfigRequest = new $Cdn20180510.BatchSetCdnDomainConfigRequest({
                            domainNames: domain,
                            functions: JSON.stringify(utils_1.parseOptimization(optimization)),
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
     * @description 重定向
     * @param client
     * @param param1
     */
    Client.setCdnDomainRedirects = function (client, _a) {
        var domain = _a.domain, redirects = _a.redirects;
        return __awaiter(this, void 0, void 0, function () {
            var cdnDomainConfigs, configIds, cdnDomainStagingConfigRequest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Client.DescribeCdnDomainConfigs(client, {
                            domain: domain,
                            functionNames: "host_redirect",
                        })];
                    case 1:
                        cdnDomainConfigs = _b.sent();
                        configIds = cdnDomainConfigs.map(function (item) { return item.configId; });
                        if (!(configIds.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Client.DeleteSpecificConfig(client, { domain: domain, configId: configIds.join(',') })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        cdnDomainStagingConfigRequest = new $Cdn20180510.BatchSetCdnDomainConfigRequest({
                            domainNames: domain,
                            functions: JSON.stringify(utils_1.parseRedirects(redirects)),
                        });
                        return [4 /*yield*/, client.batchSetCdnDomainConfig(cdnDomainStagingConfigRequest)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RuY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvY2RuY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsaUdBQW1FO0FBQ25FLGlFQUFxRDtBQUNyRCwwQ0Fhc0I7QUFDdEIsa0NBT2tCO0FBQ2xCLHdDQUF5QztBQUN6QywwREFBNkI7QUFDN0IsOENBQStDO0FBRS9DO0lBQUE7SUF5ZUEsQ0FBQztJQXhlQzs7Ozs7O09BTUc7SUFDSSxtQkFBWSxHQUFuQixVQUFvQixXQUF5QjtRQUNuQyxJQUFBLFdBQVcsR0FBc0IsV0FBVyxZQUFqQyxFQUFFLGVBQWUsR0FBSyxXQUFXLGdCQUFoQixDQUFpQjtRQUNyRCxJQUFNLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDakMsaUJBQWlCO1lBQ2pCLFdBQVcsYUFBQTtZQUNYLHFCQUFxQjtZQUNyQixlQUFlLGlCQUFBO1NBQ2hCLENBQUMsQ0FBQztRQUNILFFBQVE7UUFDUixNQUFNLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLE9BQU8sSUFBSSxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UseUJBQWtCLEdBQS9CLFVBQ0UsV0FBeUIsRUFDekIsRUFBa0Q7WUFBaEQsTUFBTSxZQUFBLEVBQUUsSUFBSSxVQUFBOzs7Ozs7d0JBRVIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzFDLGdDQUFnQyxHQUFHLElBQUksWUFBWSxDQUFDLGdDQUFnQyxDQUFDOzRCQUN6RixVQUFVLEVBQUUsTUFBTTs0QkFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxT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