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
var core_1 = require("@serverless-devs/core");
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var cdnclient_service_1 = __importDefault(require("./cdnclient.service"));
var dnsclient_service_1 = __importDefault(require("./dnsclient.service"));
var utils_1 = require("../utils");
var lodash_get_1 = __importDefault(require("lodash.get"));
var colors_1 = __importDefault(require("colors"));
var LOGCONTEXT = 'WEBSITE';
/**
 * OSS 源站
 * @param region
 * @param bucket
 * @returns
 */
var getCdnOssSources = function (region, bucket) {
    return {
        content: bucket + ".oss-" + region + ".aliyuncs.com",
        type: 'oss',
        port: 80,
    };
};
var setDomainAdvancedConfig = function (cdnClient, _a) {
    var domain = _a.domain, hostObj = _a.hostObj;
    return __awaiter(void 0, void 0, void 0, function () {
        var access, https, optimization, redirects, error_1, message, messageCode, referer, error_2, message, messageCode, ipFilter, error_3, message, messageCode, uaFilter, error_4, message, messageCode, error_5, message, messageCode, error_6, message, messageCode;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    access = hostObj.access, https = hostObj.https, optimization = hostObj.optimization, redirects = hostObj.redirects;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cdnclient_service_1.default.setDomainServerCertificate(cdnClient, { domain: domain, https: https })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    message = lodash_get_1.default(error_1, 'message', '');
                    messageCode = message.split(':')[0];
                    core_1.Logger.error(LOGCONTEXT, "https\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + colors_1.default.green.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/https") + " \u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetDomainServerCertificate\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    core_1.Logger.debug(LOGCONTEXT, error_1);
                    return [3 /*break*/, 4];
                case 4:
                    referer = lodash_get_1.default(access, 'referer');
                    if (!referer) return [3 /*break*/, 8];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainReferer(cdnClient, { domain: domain, referer: referer })];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _b.sent();
                    message = lodash_get_1.default(error_2, 'message', '');
                    messageCode = message.split(':')[0];
                    core_1.Logger.error(LOGCONTEXT, "Referer\u9632\u76D7\u94FE\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + colors_1.default.green.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + colors_1.default.green('Referer防盗链') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainReferer\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    core_1.Logger.debug(LOGCONTEXT, error_2);
                    return [3 /*break*/, 8];
                case 8:
                    ipFilter = lodash_get_1.default(access, 'ipFilter');
                    if (!ipFilter) return [3 /*break*/, 12];
                    _b.label = 9;
                case 9:
                    _b.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainIpFilter(cdnClient, { domain: domain, ipFilter: ipFilter })];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 11:
                    error_3 = _b.sent();
                    message = lodash_get_1.default(error_3, 'message', '');
                    messageCode = message.split(':')[0];
                    core_1.Logger.error(LOGCONTEXT, "IP\u9ED1/\u767D\u540D\u5355\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + colors_1.default.green.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + colors_1.default.green('IP黑/白名单') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainIpFilter\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    core_1.Logger.debug(LOGCONTEXT, error_3);
                    return [3 /*break*/, 12];
                case 12:
                    uaFilter = lodash_get_1.default(access, 'uaFilter');
                    if (!uaFilter) return [3 /*break*/, 16];
                    _b.label = 13;
                case 13:
                    _b.trys.push([13, 15, , 16]);
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainUaFilter(cdnClient, { domain: domain, uaFilter: uaFilter })];
                case 14:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 15:
                    error_4 = _b.sent();
                    message = lodash_get_1.default(error_4, 'message', '');
                    messageCode = message.split(':')[0];
                    core_1.Logger.error(LOGCONTEXT, "UA\u9ED1/\u767D\u540D\u5355\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + colors_1.default.green.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + colors_1.default.green('UA黑/白名单') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainUaFilter\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    core_1.Logger.debug(LOGCONTEXT, error_4);
                    return [3 /*break*/, 16];
                case 16:
                    if (!optimization) return [3 /*break*/, 20];
                    _b.label = 17;
                case 17:
                    _b.trys.push([17, 19, , 20]);
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainOptimization(cdnClient, { domain: domain, optimization: optimization })];
                case 18:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 19:
                    error_5 = _b.sent();
                    message = lodash_get_1.default(error_5, 'message', '');
                    messageCode = message.split(':')[0];
                    core_1.Logger.error(LOGCONTEXT, "\u6027\u80FD\u4F18\u5316\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + colors_1.default.green.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/perform") + " \u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainOptimization\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    core_1.Logger.debug(LOGCONTEXT, error_5);
                    return [3 /*break*/, 20];
                case 20:
                    if (!redirects) return [3 /*break*/, 24];
                    _b.label = 21;
                case 21:
                    _b.trys.push([21, 23, , 24]);
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainRedirects(cdnClient, { domain: domain, redirects: redirects })];
                case 22:
                    _b.sent();
                    return [3 /*break*/, 24];
                case 23:
                    error_6 = _b.sent();
                    message = lodash_get_1.default(error_6, 'message', '');
                    messageCode = message.split(':')[0];
                    core_1.Logger.error(LOGCONTEXT, "\u91CD\u5B9A\u5411\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + colors_1.default.green.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/cache") + " tab " + colors_1.default.green('重写') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainRedirects\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    core_1.Logger.debug(LOGCONTEXT, error_6);
                    return [3 /*break*/, 24];
                case 24: return [2 /*return*/];
            }
        });
    });
};
// 生成系统域名
var generateSystemDomain = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, inputs, props, domainConponent, cdnClient, sysDomain, error_7, message, messageCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                credentials = params.credentials, inputs = params.inputs;
                props = inputs.props;
                return [4 /*yield*/, core_1.loadComponent('devsapp/domain')];
            case 1:
                domainConponent = _a.sent();
                cdnClient = cdnclient_service_1.default.createClient(credentials);
                // eslint-disable-next-line
                inputs.props = __assign(__assign({}, props), { type: 'oss' });
                return [4 /*yield*/, domainConponent.get(inputs)];
            case 2:
                sysDomain = _a.sent();
                core_1.Logger.debug(LOGCONTEXT, "\u7CFB\u7EDF\u57DF\u540D:" + sysDomain);
                return [4 /*yield*/, DescribeUserDomains(cdnClient, sysDomain)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, cdnclient_service_1.default.setDomainServerCertificate(cdnClient, { domain: sysDomain })];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_7 = _a.sent();
                message = lodash_get_1.default(error_7, 'message', '');
                messageCode = message.split(':')[0];
                core_1.Logger.error(LOGCONTEXT, "https\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + colors_1.default.green.underline("https://cdn.console.aliyun.com/domain/detail/" + sysDomain + "/https") + " \u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetDomainServerCertificate\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                core_1.Logger.debug(LOGCONTEXT, error_7);
                return [3 /*break*/, 7];
            case 7:
                core_1.Logger.log('首次生成域名大约10分钟后可以访问', 'yellow');
                core_1.Logger.log("domainName: " + colors_1.default.green.underline(sysDomain));
                return [2 /*return*/];
        }
    });
}); };
/**
 * 修改高级配置前，查看域名是否配置成功
 */
var DescribeUserDomains = function (cdnClient, domain) { return __awaiter(void 0, void 0, void 0, function () {
    var userDomains;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.waitUntil(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, cdnclient_service_1.default.DescribeUserDomains(cdnClient, {
                                    domain: domain,
                                    checkDomainShow: true,
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }, function (result) { return lodash_get_1.default(result, 'domainStatus') === 'online'; }, {
                    timeInterval: 3000,
                    timeoutMsg: "\u57DF\u540D " + colors_1.default.green(domain) + " \u751F\u6548\u65F6\u95F4\u7B49\u5F85\u8D85\u65F6",
                    hint: {
                        loading: "\u57DF\u540D " + colors_1.default.green.underline(domain) + " \u914D\u7F6E\u4E2D, \u9996\u6B21\u751F\u6210\u57DF\u540D\u9884\u8BA1\u9700\u898110\u5206\u949F",
                        success: "\u57DF\u540D " + colors_1.default.green.underline(domain) + " \u914D\u7F6E\u6210\u529F",
                        fail: "\u57DF\u540D " + colors_1.default.green.underline(domain) + " \u914D\u7F6E\u5931\u8D25",
                    },
                })];
            case 1:
                userDomains = _a.sent();
                core_1.Logger.debug(LOGCONTEXT, "\u7CFB\u7EDF\u57DF\u540D\u72B6\u6001:" + JSON.stringify(userDomains, null, 2));
                return [2 /*return*/];
        }
    });
}); };
// 绑定到自定义域名
var generateDomain = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, hostObj, sources, domain, cdnClient, dnsClient, _a, topDomain, rrDomainName, domainDetailMode;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                credentials = params.credentials, hostObj = params.hostObj, sources = params.sources;
                domain = hostObj.host;
                cdnClient = cdnclient_service_1.default.createClient(credentials);
                dnsClient = dnsclient_service_1.default.createClient(credentials);
                _a = utils_1.parseDomain(domain), topDomain = _a.topDomain, rrDomainName = _a.rrDomainName;
                return [4 /*yield*/, cdnclient_service_1.default.describeCdnDomainDetail(cdnClient, domain)];
            case 1:
                domainDetailMode = _b.sent();
                core_1.Logger.debug(LOGCONTEXT, "\u67E5\u8BE2\u7ED1\u5B9A\u7684\u57DF\u540D\u4FE1\u606F:" + JSON.stringify(domainDetailMode, null, 2));
                if (!!domainDetailMode) return [3 /*break*/, 7];
                core_1.Logger.debug(LOGCONTEXT, "\u9996\u6B21\u7ED1\u5B9A\u81EA\u5B9A\u4E49\u57DF\u540D:" + domain);
                // 第一次添加会出强制校验
                return [4 /*yield*/, cdnclient_service_1.default.verifyDomainOwner(cdnClient, { domain: domain })];
            case 2:
                // 第一次添加会出强制校验
                _b.sent();
                return [4 /*yield*/, cdnclient_service_1.default.addCDNDomain(cdnClient, {
                        domain: domain,
                        sources: sources,
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, utils_1.waitUntil(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cdnclient_service_1.default.describeCdnDomainDetail(cdnClient, domain)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }, function (result) { return lodash_get_1.default(result, 'cname'); }, {
                        timeInterval: 3000,
                        timeoutMsg: 'DNS 首次配置生效时间等待超时',
                    })];
            case 4:
                domainDetailMode = _b.sent();
                core_1.Logger.debug(LOGCONTEXT, "\u9996\u6B21\u7ED1\u5B9A\u7684\u57DF\u540D\u4FE1\u606F:" + JSON.stringify(domainDetailMode, null, 2));
                return [4 /*yield*/, dnsclient_service_1.default.addDomainRecord(dnsClient, {
                        domainName: topDomain,
                        RR: rrDomainName,
                        type: 'CNAME',
                        value: domainDetailMode.cname,
                    })];
            case 5:
                _b.sent();
                return [4 /*yield*/, DescribeUserDomains(cdnClient, domain)];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7:
                core_1.Logger.debug(LOGCONTEXT, "\u7ED1\u5B9A\u81EA\u5B9A\u4E49\u57DF\u540D:" + domain);
                cdnclient_service_1.default.modifyCdnDomain(cdnClient, { domain: domain, sources: sources });
                _b.label = 8;
            case 8: return [4 /*yield*/, setDomainAdvancedConfig(cdnClient, { domain: domain, hostObj: hostObj })];
            case 9:
                _b.sent();
                core_1.Logger.log('首次生成域名大约10分钟后可以访问', 'yellow');
                core_1.Logger.log("domainName: " + colors_1.default.green.underline(domain));
                return [2 /*return*/];
        }
    });
}); };
exports.default = (function (orinalInputs) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, props, sources, credentials, hosts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = lodash_clonedeep_1.default(orinalInputs);
                props = inputs.props;
                sources = getCdnOssSources(lodash_get_1.default(props, 'region'), lodash_get_1.default(props, 'bucket'));
                credentials = {
                    accessKeyId: lodash_get_1.default(inputs, 'Credentials.AccessKeyID'),
                    accessKeySecret: lodash_get_1.default(inputs, 'Credentials.AccessKeySecret'),
                };
                hosts = props.hosts;
                if (!((hosts === null || hosts === void 0 ? void 0 : hosts.length) > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, Promise.all(hosts.map(function (hostObj) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(hostObj.host === 'auto')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, generateSystemDomain({ credentials: credentials, inputs: inputs, sources: sources })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, generateDomain({ credentials: credentials, hostObj: hostObj, sources: sources })];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                core_1.Logger.log('如果需要系统帮你生成一个域名，可配置host为 auto ', 'yellow');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZG9tYWluLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE4RDtBQUM5RCxzRUFBeUM7QUFDekMsMEVBQTZDO0FBQzdDLDBFQUE2QztBQUU3QyxrQ0FBa0Q7QUFDbEQsMERBQTZCO0FBQzdCLGtEQUE0QjtBQUU1QixJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDN0I7Ozs7O0dBS0c7QUFDSCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsTUFBYyxFQUFFLE1BQWM7SUFDdEQsT0FBTztRQUNMLE9BQU8sRUFBSyxNQUFNLGFBQVEsTUFBTSxrQkFBZTtRQUMvQyxJQUFJLEVBQUUsS0FBSztRQUNYLElBQUksRUFBRSxFQUFFO0tBQ1QsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sdUJBQXVCLEdBQUcsVUFBTyxTQUFTLEVBQUUsRUFBbUI7UUFBakIsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBOzs7Ozs7b0JBQ3pELE1BQU0sR0FBcUMsT0FBTyxPQUE1QyxFQUFFLEtBQUssR0FBOEIsT0FBTyxNQUFyQyxFQUFFLFlBQVksR0FBZ0IsT0FBTyxhQUF2QixFQUFFLFNBQVMsR0FBSyxPQUFPLFVBQVosQ0FBYTs7OztvQkFHekQscUJBQU0sMkJBQVUsQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLEVBQUE7O29CQUF6RSxTQUF5RSxDQUFDOzs7O29CQUVwRSxPQUFPLEdBQUcsb0JBQUcsQ0FBQyxPQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsYUFBTSxDQUFDLEtBQUssQ0FDVixVQUFVLEVBQ1YseUZBQXNCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDMUMsa0RBQWdELE1BQU0sV0FBUSxDQUMvRCxtSUFBOEMsV0FBYSxDQUM3RCxDQUFDO29CQUNGLGFBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQUssQ0FBQyxDQUFDOzs7b0JBRzVCLE9BQU8sR0FBRyxvQkFBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQzt5QkFDbkMsT0FBTyxFQUFQLHdCQUFPOzs7O29CQUVQLHFCQUFNLDJCQUFVLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxFQUFBOztvQkFBcEUsU0FBb0UsQ0FBQzs7OztvQkFFL0QsT0FBTyxHQUFHLG9CQUFHLENBQUMsT0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDcEMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLGFBQU0sQ0FBQyxLQUFLLENBQ1YsVUFBVSxFQUNWLDZHQUEyQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQy9DLGtEQUFnRCxNQUFNLFlBQVMsQ0FDaEUsYUFBUSxnQkFBTSxDQUFDLEtBQUssQ0FDbkIsWUFBWSxDQUNiLHdJQUF5QyxXQUFhLENBQ3hELENBQUM7b0JBQ0YsYUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBSyxDQUFDLENBQUM7OztvQkFLOUIsUUFBUSxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3lCQUNyQyxRQUFRLEVBQVIseUJBQVE7Ozs7b0JBRVIscUJBQU0sMkJBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDLEVBQUE7O29CQUF0RSxTQUFzRSxDQUFDOzs7O29CQUVqRSxPQUFPLEdBQUcsb0JBQUcsQ0FBQyxPQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsYUFBTSxDQUFDLEtBQUssQ0FDVixVQUFVLEVBQ1YsK0dBQXdCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDNUMsa0RBQWdELE1BQU0sWUFBUyxDQUNoRSxhQUFRLGdCQUFNLENBQUMsS0FBSyxDQUNuQixTQUFTLENBQ1YseUlBQTBDLFdBQWEsQ0FDekQsQ0FBQztvQkFDRixhQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFLLENBQUMsQ0FBQzs7O29CQUs5QixRQUFRLEdBQUcsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7eUJBQ3JDLFFBQVEsRUFBUix5QkFBUTs7OztvQkFFUixxQkFBTSwyQkFBVSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUMsRUFBQTs7b0JBQXRFLFNBQXNFLENBQUM7Ozs7b0JBRWpFLE9BQU8sR0FBRyxvQkFBRyxDQUFDLE9BQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxhQUFNLENBQUMsS0FBSyxDQUNWLFVBQVUsRUFDViwrR0FBd0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUM1QyxrREFBZ0QsTUFBTSxZQUFTLENBQ2hFLGFBQVEsZ0JBQU0sQ0FBQyxLQUFLLENBQ25CLFNBQVMsQ0FDVix5SUFBMEMsV0FBYSxDQUN6RCxDQUFDO29CQUNGLGFBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQUssQ0FBQyxDQUFDOzs7eUJBS2hDLFlBQVksRUFBWix5QkFBWTs7OztvQkFFWixxQkFBTSwyQkFBVSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUMsRUFBQTs7b0JBQTlFLFNBQThFLENBQUM7Ozs7b0JBRXpFLE9BQU8sR0FBRyxvQkFBRyxDQUFDLE9BQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxhQUFNLENBQUMsS0FBSyxDQUNWLFVBQVUsRUFDViw0R0FBcUIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUN6QyxrREFBZ0QsTUFBTSxhQUFVLENBQ2pFLGlJQUE0QyxXQUFhLENBQzNELENBQUM7b0JBQ0YsYUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBSyxDQUFDLENBQUM7Ozt5QkFLaEMsU0FBUyxFQUFULHlCQUFTOzs7O29CQUVULHFCQUFNLDJCQUFVLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQyxFQUFBOztvQkFBeEUsU0FBd0UsQ0FBQzs7OztvQkFFbkUsT0FBTyxHQUFHLG9CQUFHLENBQUMsT0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDcEMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLGFBQU0sQ0FBQyxLQUFLLENBQ1YsVUFBVSxFQUNWLHNHQUFvQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQ3hDLGtEQUFnRCxNQUFNLFdBQVEsQ0FDL0QsYUFBUSxnQkFBTSxDQUFDLEtBQUssQ0FDbkIsSUFBSSxDQUNMLDBJQUEyQyxXQUFhLENBQzFELENBQUM7b0JBQ0YsYUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBSyxDQUFDLENBQUM7Ozs7OztDQUdyQyxDQUFDO0FBRUYsU0FBUztBQUNULElBQU0sb0JBQW9CLEdBQUcsVUFBTyxNQUFxQjs7Ozs7Z0JBQy9DLFdBQVcsR0FBYSxNQUFNLFlBQW5CLEVBQUUsTUFBTSxHQUFLLE1BQU0sT0FBWCxDQUFZO2dCQUMvQixLQUFLLEdBQUssTUFBTSxNQUFYLENBQVk7Z0JBQ0QscUJBQU0sb0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFBOztnQkFBdkQsZUFBZSxHQUFHLFNBQXFDO2dCQUN2RCxTQUFTLEdBQUcsMkJBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZELDJCQUEyQjtnQkFDM0IsTUFBTSxDQUFDLEtBQUsseUJBQVEsS0FBSyxLQUFFLElBQUksRUFBRSxLQUFLLEdBQUUsQ0FBQztnQkFFdkIscUJBQU0sZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQTs7Z0JBQTdDLFNBQVMsR0FBRyxTQUFpQztnQkFDbkQsYUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsOEJBQVEsU0FBVyxDQUFDLENBQUM7Z0JBQzlDLHFCQUFNLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBQTs7Z0JBQS9DLFNBQStDLENBQUM7Ozs7Z0JBRzlDLHFCQUFNLDJCQUFVLENBQUMsMEJBQTBCLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUE7O2dCQUE3RSxTQUE2RSxDQUFDOzs7O2dCQUV4RSxPQUFPLEdBQUcsb0JBQUcsQ0FBQyxPQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsYUFBTSxDQUFDLEtBQUssQ0FDVixVQUFVLEVBQ1YseUZBQXNCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDMUMsa0RBQWdELFNBQVMsV0FBUSxDQUNsRSxtSUFBOEMsV0FBYSxDQUM3RCxDQUFDO2dCQUNGLGFBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQUssQ0FBQyxDQUFDOzs7Z0JBRWxDLGFBQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLGFBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBRyxDQUFDLENBQUM7Ozs7S0FDaEUsQ0FBQztBQUVGOztHQUVHO0FBQ0gsSUFBTSxtQkFBbUIsR0FBRyxVQUFPLFNBQVMsRUFBRSxNQUFjOzs7O29CQUN0QyxxQkFBTSxpQkFBUyxDQUNqQzs7O29DQUNTLHFCQUFNLDJCQUFVLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFO29DQUNyRCxNQUFNLFFBQUE7b0NBQ04sZUFBZSxFQUFFLElBQUk7aUNBQ3RCLENBQUMsRUFBQTtvQ0FIRixzQkFBTyxTQUdMLEVBQUM7OztxQkFDSixFQUNELFVBQUMsTUFBTSxJQUFLLE9BQUEsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEtBQUssUUFBUSxFQUF4QyxDQUF3QyxFQUNwRDtvQkFDRSxZQUFZLEVBQUUsSUFBSTtvQkFDbEIsVUFBVSxFQUFFLGtCQUFNLGdCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxzREFBVztvQkFDakQsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxrQkFBTSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9HQUFzQjt3QkFDbkUsT0FBTyxFQUFFLGtCQUFNLGdCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsOEJBQU87d0JBQ3BELElBQUksRUFBRSxrQkFBTSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDhCQUFPO3FCQUNsRDtpQkFDRixDQUNGLEVBQUE7O2dCQWpCSyxXQUFXLEdBQUcsU0FpQm5CO2dCQUNELGFBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLDBDQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUcsQ0FBQyxDQUFDOzs7O0tBQzVFLENBQUM7QUFFRixXQUFXO0FBQ1gsSUFBTSxjQUFjLEdBQUcsVUFBTyxNQUFxQjs7Ozs7Z0JBQ3pDLFdBQVcsR0FBdUIsTUFBTSxZQUE3QixFQUFFLE9BQU8sR0FBYyxNQUFNLFFBQXBCLEVBQUUsT0FBTyxHQUFLLE1BQU0sUUFBWCxDQUFZO2dCQUNuQyxNQUFNLEdBQUssT0FBTyxLQUFaLENBQWE7Z0JBQzNCLFNBQVMsR0FBRywyQkFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDakQsU0FBUyxHQUFHLDJCQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNqRCxLQUE4QixtQkFBVyxDQUFDLE1BQU0sQ0FBQyxFQUEvQyxTQUFTLGVBQUEsRUFBRSxZQUFZLGtCQUFBLENBQXlCO2dCQUVqQyxxQkFBTSwyQkFBVSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBQTs7Z0JBQTlFLGdCQUFnQixHQUFHLFNBQTJEO2dCQUNsRixhQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSw0REFBYSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUcsQ0FBQyxDQUFDO3FCQUcvRSxDQUFDLGdCQUFnQixFQUFqQix3QkFBaUI7Z0JBQ25CLGFBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLDREQUFhLE1BQVEsQ0FBQyxDQUFDO2dCQUNoRCxjQUFjO2dCQUNkLHFCQUFNLDJCQUFVLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxFQUFBOztnQkFEekQsY0FBYztnQkFDZCxTQUF5RCxDQUFDO2dCQUMxRCxxQkFBTSwyQkFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUU7d0JBQ3ZDLE1BQU0sUUFBQTt3QkFDTixPQUFPLFNBQUE7cUJBQ1IsQ0FBQyxFQUFBOztnQkFIRixTQUdFLENBQUM7Z0JBRWdCLHFCQUFNLGlCQUFTLENBQ2hDOzs7d0NBQ1MscUJBQU0sMkJBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUE7d0NBQWxFLHNCQUFPLFNBQTJELEVBQUM7Ozt5QkFDcEUsRUFDRCxVQUFDLE1BQU0sSUFBSyxPQUFBLG9CQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFwQixDQUFvQixFQUNoQzt3QkFDRSxZQUFZLEVBQUUsSUFBSTt3QkFDbEIsVUFBVSxFQUFFLGtCQUFrQjtxQkFDL0IsQ0FDRixFQUFBOztnQkFURCxnQkFBZ0IsR0FBRyxTQVNsQixDQUFDO2dCQUVGLGFBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLDREQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBRyxDQUFDLENBQUM7Z0JBQ25GLHFCQUFNLDJCQUFVLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTt3QkFDMUMsVUFBVSxFQUFFLFNBQVM7d0JBQ3JCLEVBQUUsRUFBRSxZQUFZO3dCQUNoQixJQUFJLEVBQUUsT0FBTzt3QkFDYixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSztxQkFDOUIsQ0FBQyxFQUFBOztnQkFMRixTQUtFLENBQUM7Z0JBQ0gscUJBQU0sbUJBQW1CLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFBOztnQkFBNUMsU0FBNEMsQ0FBQzs7O2dCQUU3QyxhQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxnREFBVyxNQUFRLENBQUMsQ0FBQztnQkFDOUMsMkJBQVUsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDOztvQkFFN0QscUJBQU0sdUJBQXVCLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxFQUFBOztnQkFBN0QsU0FBNkQsQ0FBQztnQkFDOUQsYUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDMUMsYUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFHLENBQUMsQ0FBQzs7OztLQUM3RCxDQUFDO0FBRUYsbUJBQWUsVUFBTyxZQUFZOzs7OztnQkFDMUIsTUFBTSxHQUFHLDBCQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9CLEtBQUssR0FBSyxNQUFNLE1BQVgsQ0FBWTtnQkFDbkIsT0FBTyxHQUFHLGdCQUFnQixDQUFDLG9CQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFLG9CQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLFdBQVcsR0FBRztvQkFDbEIsV0FBVyxFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLHlCQUF5QixDQUFDO29CQUNuRCxlQUFlLEVBQUUsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsNkJBQTZCLENBQUM7aUJBQzVELENBQUM7Z0JBQ00sS0FBSyxHQUFLLEtBQUssTUFBVixDQUFXO3FCQUNwQixDQUFBLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE1BQU0sSUFBRyxDQUFDLENBQUEsRUFBakIsd0JBQWlCO2dCQUNuQixxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBTyxPQUFPOzs7O3lDQUNsQixDQUFBLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFBLEVBQXZCLHdCQUF1QjtvQ0FDekIscUJBQU0sb0JBQW9CLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLEVBQUE7O29DQUE1RCxTQUE0RCxDQUFDOzt3Q0FFN0QscUJBQU0sY0FBYyxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxFQUFBOztvQ0FBdkQsU0FBdUQsQ0FBQzs7Ozs7eUJBRTNELENBQUMsQ0FDSCxFQUFBOztnQkFSRCxTQVFDLENBQUM7OztnQkFFRixhQUFNLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7OztLQUV6RCxFQUFDIn0=