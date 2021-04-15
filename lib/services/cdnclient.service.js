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
                            functionNames: interface_1.ForceHttpsEnum.off + "," + interface_1.ForceHttpsEnum.on,
                        })];
                    case 1:
                        cdnDomainConfigs = _b.sent();
                        forceHttpsOptioned = cdnDomainConfigs.find(function (item) { return item.functionName === interface_1.ForceHttpsEnum.off || item.functionName === interface_1.ForceHttpsEnum.on; });
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
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RuY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvY2RuY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsaUdBQW1FO0FBQ25FLGlFQUFxRDtBQUNyRCwwQ0FXc0I7QUFDdEIsa0NBQXNFO0FBQ3RFLHdDQUF5QztBQUN6QywwREFBNkI7QUFFN0I7SUFBQTtJQXFhQSxDQUFDO0lBcGFDOzs7Ozs7T0FNRztJQUNJLG1CQUFZLEdBQW5CLFVBQW9CLFdBQXlCO1FBQ25DLElBQUEsV0FBVyxHQUFzQixXQUFXLFlBQWpDLEVBQUUsZUFBZSxHQUFLLFdBQVcsZ0JBQWhCLENBQWlCO1FBQ3JELElBQU0sTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNqQyxpQkFBaUI7WUFDakIsV0FBVyxhQUFBO1lBQ1gscUJBQXFCO1lBQ3JCLGVBQWUsaUJBQUE7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsUUFBUTtRQUNSLE1BQU0sQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUM7UUFDckMsT0FBTyxJQUFJLHFCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSx5QkFBa0IsR0FBL0IsVUFDRSxXQUF5QixFQUN6QixFQUFrRDtZQUFoRCxNQUFNLFlBQUEsRUFBRSxJQUFJLFVBQUE7Ozs7Ozt3QkFFUixNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDMUMsZ0NBQWdDLEdBQUcsSUFBSSxZQUFZLENBQUMsZ0NBQWdDLENBQUM7NEJBQ3pGLFVBQVUsRUFBRSxNQUFNOzRCQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDeEI7b0NBQ0UsWUFBWSxFQUFFO3dDQUNaLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO3dDQUNyQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTt3Q0FDakMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTt3Q0FDdkQ7NENBQ0UsT0FBTyxFQUFFLE1BQU07NENBQ2YsUUFBUSxFQUFFLElBQUk7eUNBQ2Y7cUNBQ0Y7b0NBQ0QsWUFBWSxFQUFFLGVBQWU7aUNBQzlCOzZCQUNGLENBQUM7eUJBQ0gsQ0FBQyxDQUFDO3dCQUNILHVCQUF1Qjt3QkFDdkIscUJBQU0sTUFBTSxDQUFDLHlCQUF5QixDQUFDLGdDQUFnQyxDQUFDLEVBQUE7O3dCQUR4RSx1QkFBdUI7d0JBQ3ZCLFNBQXdFLENBQUM7Ozs7O0tBQzFFO0lBRUQ7OztPQUdHO0lBQ1UseUNBQWtDLEdBQS9DLFVBQ0UsV0FBeUIsRUFDekIsTUFBYzs7Ozs7O3dCQUVSLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUMxQyx1Q0FBdUMsR0FBRyxJQUFJLFlBQVksQ0FBQyx1Q0FBdUMsQ0FDdEc7NEJBQ0UsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLFlBQVksRUFBRSxlQUFlO3lCQUM5QixDQUNGLENBQUM7d0JBQ0YsdUJBQXVCO3dCQUN2QixxQkFBTSxNQUFNLENBQUMsZ0NBQWdDLENBQUMsdUNBQXVDLENBQUMsRUFBQTs7d0JBRHRGLHVCQUF1Qjt3QkFDdkIsU0FBc0YsQ0FBQzs7Ozs7S0FDeEY7SUFFRDs7O09BR0c7SUFDVSw4QkFBdUIsR0FBcEMsVUFBcUMsTUFBTSxFQUFFLE1BQWM7Ozs7Ozt3QkFDbkQsOEJBQThCLEdBQUcsSUFBSSxZQUFZLENBQUMsOEJBQThCLENBQUM7NEJBQ3JGLFVBQVUsRUFBRSxNQUFNO3lCQUNuQixDQUFDLENBQUM7Ozs7d0JBRWMscUJBQU0sTUFBTSxDQUFDLHVCQUF1QixDQUFDLDhCQUE4QixDQUFDLEVBQUE7O3dCQUE3RSxNQUFNLEdBQUcsU0FBb0U7d0JBQzdFLGdCQUFnQixHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLDJCQUEyQixDQUFDLENBQUM7d0JBQ2xFLHNCQUFPLGdCQUFnQixFQUFDOzs7d0JBRWxCLE9BQU8sR0FBRyxvQkFBRyxDQUFDLE9BQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQ3BDLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLFdBQVcsS0FBSyxvQkFBb0IsRUFBRTs0QkFDeEMsTUFBTSxJQUFJLEtBQUssQ0FDYixpRkFBaUYsQ0FDbEYsQ0FBQzt5QkFDSDt3QkFDRCxzQkFBTyxJQUFJLEVBQUM7Ozs7O0tBRWY7SUFFRDs7OztPQUlHO0lBQ1Usd0JBQWlCLEdBQTlCLFVBQ0UsTUFBTSxFQUNOLEVBQTZFO1lBQTNFLE1BQU0sWUFBQSxFQUFFLGtCQUF3QixFQUF4QixVQUFVLG1CQUFHLFdBQVcsS0FBQTs7Ozs7O3dCQUU1Qix3QkFBd0IsR0FBRyxJQUFJLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQzs0QkFDekUsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLFVBQVUsWUFBQTt5QkFDWCxDQUFDLENBQUM7Ozs7d0JBRWMscUJBQU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLHdCQUF3QixDQUFDLEVBQUE7O3dCQUFqRSxNQUFNLEdBQUcsU0FBd0Q7d0JBQ3ZFLHNCQUFPLE1BQU0sRUFBQzs7O3dCQUVSLDRCQUE0QixHQUFHLElBQUksWUFBWSxDQUFDLDRCQUE0QixDQUFDOzRCQUNqRixVQUFVLEVBQUUsTUFBTTt5QkFDbkIsQ0FBQyxDQUFDO3dCQUNZLHFCQUFNLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFBOzt3QkFBekUsTUFBTSxHQUFHLFNBQWdFO3dCQUN6RSxhQUFhLEdBQUcsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7d0JBQ2xELE1BQU0sSUFBSSxLQUFLLENBQ2IsNHNCQUNxRCxhQUFhLGVBQ2pFLENBQ0YsQ0FBQzs7Ozs7S0FFTDtJQUVEOzs7O09BSUc7SUFDVSxzQkFBZSxHQUE1QixVQUE2QixNQUFNLEVBQUUsTUFBYyxFQUFFLFlBQXFCOzs7Ozs7d0JBQ2xFLHNCQUFzQixHQUFHLElBQUksWUFBWSxDQUFDLHNCQUFzQixDQUFDOzRCQUNyRSxVQUFVLEVBQUUsTUFBTTt5QkFDbkIsQ0FBQyxDQUFDOzZCQUNDLFlBQVksRUFBWix3QkFBWTs7Ozt3QkFFWixxQkFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLEVBQUE7O3dCQUFwRCxTQUFvRCxDQUFDOzs7Ozs7NEJBS3ZELHFCQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsRUFBQTs7d0JBQXBELFNBQW9ELENBQUM7Ozs7OztLQUV4RDtJQUVEOzs7O09BSUc7SUFDVSxtQkFBWSxHQUF6QixVQUNFLE1BQU0sRUFDTixFQUE0RDtZQUExRCxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQUE7Ozs7Ozt3QkFHWCxtQkFBbUIsR0FBRyxJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQzs0QkFDL0QsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQzVDLENBQUMsQ0FBQzs7Ozt3QkFFRCxxQkFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEVBQUE7O3dCQUE5QyxTQUE4QyxDQUFDOzs7O3dCQUV6QyxPQUFPLEdBQUcsb0JBQUcsQ0FBQyxPQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNwQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDOzs7OztLQUV2RDtJQUVEOzs7O09BSUc7SUFDVSxzQkFBZSxHQUE1QixVQUNFLE1BQU0sRUFDTixFQUE2RDtZQUEzRCxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQUE7Ozs7Ozt3QkFHWCxtQkFBbUIsR0FBRyxJQUFJLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQzs0QkFDbEUsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQzVDLENBQUMsQ0FBQzs7Ozt3QkFFRCxxQkFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLEVBQUE7O3dCQUFqRCxTQUFpRCxDQUFDOzs7O3dCQUU1QyxPQUFPLEdBQUcsb0JBQUcsQ0FBQyxPQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNwQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDOzs7OztLQUV2RDtJQUVEOzs7O09BSUc7SUFDVSxpQ0FBMEIsR0FBdkMsVUFDRSxNQUFNLEVBQ04sRUFBcUQ7WUFBbkQsTUFBTSxZQUFBLEVBQUUsS0FBSyxXQUFBOzs7Ozs7d0JBRVQsOEJBQThCLEdBQUcsSUFBSSxZQUFZLENBQUMsaUNBQWlDLFlBQ3ZGLFVBQVUsRUFBRSxNQUFNLElBQ2YscUJBQWEsQ0FBQyxvQkFBRyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFDNUMsQ0FBQzt3QkFDSCxxQkFBTSxNQUFNLENBQUMsMEJBQTBCLENBQUMsOEJBQThCLENBQUMsRUFBQTs7d0JBQXZFLFNBQXVFLENBQUM7d0JBQ3hFLHFCQUFNLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUU7Z0NBQzFDLE1BQU0sUUFBQTtnQ0FDTixVQUFVLEVBQUUsb0JBQUcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQzs2QkFDM0MsQ0FBQyxFQUFBOzt3QkFIRixTQUdFLENBQUM7d0JBQ0gscUJBQU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLEtBQUssRUFBRSxvQkFBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFBOzt3QkFBckYsU0FBcUYsQ0FBQzs7Ozs7S0FDdkY7SUFFWSx3QkFBaUIsR0FBOUIsVUFDRSxNQUFNLEVBQ04sRUFBb0Q7WUFBbEQsTUFBTSxZQUFBLEVBQUUsS0FBSyxXQUFBOzs7Ozs7d0JBRVQsNkJBQTZCLEdBQUcsSUFBSSxZQUFZLENBQUMsOEJBQThCLENBQUM7NEJBQ3BGLFdBQVcsRUFBRSxNQUFNOzRCQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDeEI7b0NBQ0UsWUFBWSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQ0FDckQsWUFBWSxFQUFFLGNBQWM7aUNBQzdCOzZCQUNGLENBQUM7eUJBQ0gsQ0FBQyxDQUFDO3dCQUNILHFCQUFNLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFBOzt3QkFBbkUsU0FBbUUsQ0FBQzs7Ozs7S0FDckU7SUFFRDs7OztPQUlHO0lBQ1UsMkJBQW9CLEdBQWpDLFVBQ0UsTUFBTSxFQUNOLEVBQTBEO1lBQXhELE1BQU0sWUFBQSxFQUFFLFFBQVEsY0FBQTs7Ozs7O3dCQUVaLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQywyQkFBMkIsQ0FBQzs0QkFDMUQsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLFFBQVEsVUFBQTt5QkFDVCxDQUFDLENBQUM7d0JBQ0gscUJBQU0sTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBekMsU0FBeUMsQ0FBQzs7Ozs7S0FDM0M7SUFFRDs7OztPQUlHO0lBQ1UsK0JBQXdCLEdBQXJDLFVBQ0UsTUFBTSxFQUNOLEVBQW9FO1lBQWxFLE1BQU0sWUFBQSxFQUFFLGFBQWEsbUJBQUE7Ozs7Ozt3QkFFakIsTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLCtCQUErQixDQUFDOzRCQUM5RCxVQUFVLEVBQUUsTUFBTTs0QkFDbEIsYUFBYSxlQUFBO3lCQUNkLENBQUMsQ0FBQzt3QkFDWSxxQkFBTSxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUF0RCxNQUFNLEdBQUcsU0FBNkM7d0JBQzVELHNCQUFPLG9CQUFHLENBQUMsTUFBTSxFQUFFLGlDQUFpQyxDQUFDLEVBQUM7Ozs7S0FDdkQ7SUFFRDs7OztPQUlHO0lBQ1UsNkJBQXNCLEdBQW5DLFVBQ0UsTUFBTSxFQUNOLEVBQW1FO1lBQWpFLE1BQU0sWUFBQSxFQUFFLFVBQVUsZ0JBQUE7Ozs7OzRCQUVLLHFCQUFNLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUU7NEJBQ3JFLE1BQU0sUUFBQTs0QkFDTixhQUFhLEVBQUssMEJBQWMsQ0FBQyxHQUFHLFNBQUksMEJBQWMsQ0FBQyxFQUFJO3lCQUM1RCxDQUFDLEVBQUE7O3dCQUhJLGdCQUFnQixHQUFHLFNBR3ZCO3dCQUNJLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FDOUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsWUFBWSxLQUFLLDBCQUFjLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssMEJBQWMsQ0FBQyxFQUFFLEVBQW5GLENBQW1GLENBQzlGLENBQUM7NkJBRUUsa0JBQWtCLEVBQWxCLHdCQUFrQjt3QkFDcEIsbUJBQW1CO3dCQUNuQixJQUFJLGtCQUFrQixDQUFDLFlBQVksS0FBSywwQkFBYyxDQUFDLFVBQVUsQ0FBQzs0QkFBRSxzQkFBTzt3QkFDM0UsaUJBQWlCO3dCQUNqQixxQkFBTSxNQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUE7O3dCQUQ1RixpQkFBaUI7d0JBQ2pCLFNBQTRGLENBQUM7Ozt3QkFFL0Ysa0JBQWtCO3dCQUNsQixJQUFJLFVBQVUsS0FBSyxTQUFTOzRCQUFFLHNCQUFPO3dCQUUvQiw2QkFBNkIsR0FBRyxJQUFJLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQzs0QkFDcEYsV0FBVyxFQUFFLE1BQU07NEJBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUN4QjtvQ0FDRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29DQUNyRCxZQUFZLEVBQUUsMEJBQWMsQ0FBQyxVQUFVLENBQUM7aUNBQ3pDOzZCQUNGLENBQUM7eUJBQ0gsQ0FBQyxDQUFDO3dCQUNILHFCQUFNLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFBOzt3QkFBbkUsU0FBbUUsQ0FBQzs7Ozs7S0FDckU7SUFFRDs7OztPQUlHO0lBQ1UsMEJBQW1CLEdBQWhDLFVBQ0UsTUFBTSxFQUNOLEVBQTBEO1lBQXhELE1BQU0sWUFBQSxFQUFFLE9BQU8sYUFBQTs7Ozs7NEJBRVEscUJBQU0sTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRTs0QkFDckUsTUFBTSxRQUFBOzRCQUNOLGFBQWEsRUFBSyx1QkFBVyxDQUFDLFNBQVMsU0FBSSx1QkFBVyxDQUFDLFNBQVc7eUJBQ25FLENBQUMsRUFBQTs7d0JBSEksZ0JBQWdCLEdBQUcsU0FHdkI7d0JBQ0ksZUFBZSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FDM0MsVUFBQyxJQUFJOzRCQUNILE9BQUEsSUFBSSxDQUFDLFlBQVksS0FBSyx1QkFBVyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLHVCQUFXLENBQUMsU0FBUzt3QkFBMUYsQ0FBMEYsQ0FDN0YsQ0FBQzs2QkFFRSxDQUFBLE9BQU8sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFBLEVBQXZCLHdCQUF1Qjs2QkFFckIsZUFBZSxFQUFmLHdCQUFlOzZCQUViLENBQUEsT0FBTyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsWUFBWSxDQUFBLEVBQTdDLHdCQUE2Qzt3QkFDL0MscUJBQU0sTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBQTs7d0JBQXpGLFNBQXlGLENBQUM7Ozs7NkJBR3JGLGVBQWUsRUFBZix3QkFBZTt3QkFFakIscUJBQU0sTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtnQ0FDL0MsTUFBTSxRQUFBO2dDQUNOLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUTs2QkFDbkMsQ0FBQyxFQUFBOztvQkFKRixlQUFlO29CQUNmLHNCQUFPLFNBR0wsRUFBQzs7d0JBR0MsNkJBQTZCLEdBQUcsSUFBSSxZQUFZLENBQUMsOEJBQThCLENBQUM7NEJBQ3BGLFdBQVcsRUFBRSxNQUFNOzRCQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLG9CQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt5QkFDbkQsQ0FBQyxDQUFDO3dCQUNILHFCQUFNLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFBOzt3QkFBbkUsU0FBbUUsQ0FBQzs7Ozs7S0FDckU7SUFFRDs7OztPQUlHO0lBQ1UsMkJBQW9CLEdBQWpDLFVBQ0UsTUFBTSxFQUNOLEVBQTZEO1lBQTNELE1BQU0sWUFBQSxFQUFFLFFBQVEsY0FBQTs7Ozs7NEJBRU8scUJBQU0sTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRTs0QkFDckUsTUFBTSxRQUFBOzRCQUNOLGFBQWEsRUFBSyx3QkFBWSxDQUFDLFNBQVMsU0FBSSx3QkFBWSxDQUFDLFNBQVc7eUJBQ3JFLENBQUMsRUFBQTs7d0JBSEksZ0JBQWdCLEdBQUcsU0FHdkI7d0JBQ0ksZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUM1QyxVQUFDLElBQUk7NEJBQ0gsT0FBQSxJQUFJLENBQUMsWUFBWSxLQUFLLHdCQUFZLENBQUMsU0FBUztnQ0FDNUMsSUFBSSxDQUFDLFlBQVksS0FBSyx3QkFBWSxDQUFDLFNBQVM7d0JBRDVDLENBQzRDLENBQy9DLENBQUM7NkJBRUUsQ0FBQSxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQSxFQUF4Qix3QkFBd0I7NkJBRXRCLGdCQUFnQixFQUFoQix3QkFBZ0I7NkJBRWQsQ0FBQSxRQUFRLENBQUMsSUFBSSxLQUFLLGdCQUFnQixDQUFDLFlBQVksQ0FBQSxFQUEvQyx3QkFBK0M7d0JBQ2pELHFCQUFNLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7Z0NBQ3hDLE1BQU0sUUFBQTtnQ0FDTixRQUFRLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTs2QkFDcEMsQ0FBQyxFQUFBOzt3QkFIRixTQUdFLENBQUM7Ozs7NkJBR0UsZ0JBQWdCLEVBQWhCLHdCQUFnQjt3QkFFbEIscUJBQU0sTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtnQ0FDL0MsTUFBTSxRQUFBO2dDQUNOLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFROzZCQUNwQyxDQUFDLEVBQUE7O29CQUpGLGVBQWU7b0JBQ2Ysc0JBQU8sU0FHTCxFQUFDOzt3QkFFQyw2QkFBNkIsR0FBRyxJQUFJLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQzs0QkFDcEYsV0FBVyxFQUFFLE1BQU07NEJBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMscUJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3lCQUNyRCxDQUFDLENBQUM7d0JBQ0gscUJBQU0sTUFBTSxDQUFDLHVCQUF1QixDQUFDLDZCQUE2QixDQUFDLEVBQUE7O3dCQUFuRSxTQUFtRSxDQUFDOzs7OztLQUNyRTtJQXNDSCxhQUFDO0FBQUQsQ0FBQyxBQXJhRCxJQXFhQyJ9