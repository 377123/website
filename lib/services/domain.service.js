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
var sleep_1 = __importDefault(require("sleep"));
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
                    core_1.Logger.error(LOGCONTEXT, "https\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/https") + " \u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetDomainServerCertificate\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
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
                    core_1.Logger.error(LOGCONTEXT, "Referer\u9632\u76D7\u94FE\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + core_1.colors.green('Referer防盗链') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainReferer\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
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
                    core_1.Logger.error(LOGCONTEXT, "IP\u9ED1/\u767D\u540D\u5355\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + core_1.colors.green('IP黑/白名单') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainIpFilter\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
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
                    core_1.Logger.error(LOGCONTEXT, "UA\u9ED1/\u767D\u540D\u5355\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + core_1.colors.green('UA黑/白名单') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainUaFilter\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
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
                    core_1.Logger.error(LOGCONTEXT, "\u6027\u80FD\u4F18\u5316\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/perform") + " \u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainOptimization\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
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
                    core_1.Logger.error(LOGCONTEXT, "\u91CD\u5B9A\u5411\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/cache") + " tab " + core_1.colors.green('重写') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainRedirects\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    core_1.Logger.debug(LOGCONTEXT, error_6);
                    return [3 /*break*/, 24];
                case 24: return [2 /*return*/];
            }
        });
    });
};
// 生成系统域名
var generateSystemDomain = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, inputs, props, domainConponent, cdnClient, sysDomain, i, e_1;
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
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < 5)) return [3 /*break*/, 7];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                sleep_1.default.sleep(5);
                return [4 /*yield*/, domainConponent.get(inputs)];
            case 4:
                sysDomain = _a.sent();
                return [3 /*break*/, 7];
            case 5:
                e_1 = _a.sent();
                sleep_1.default.sleep(1);
                return [3 /*break*/, 6];
            case 6:
                i++;
                return [3 /*break*/, 2];
            case 7:
                core_1.Logger.debug(LOGCONTEXT, "Test Domain: " + sysDomain);
                return [4 /*yield*/, DescribeUserDomains(cdnClient, sysDomain)];
            case 8:
                _a.sent();
                // try {
                //   await CdnService.setDomainServerCertificate(cdnClient, { domain: sysDomain });
                // } catch (error) {
                //   const message = get(error, 'message', '');
                //   const messageCode = message.split(':')[0];
                //   Logger.error(
                //     LOGCONTEXT,
                //     `https配置失败，请前往控制台页面 ${colors.cyan.underline(
                //       `https://cdn.console.aliyun.com/domain/detail/${sysDomain}/https`,
                //     )} 进行手动操作，函数名：setDomainServerCertificate，错误码：${messageCode}`,
                //   );
                //   Logger.debug(LOGCONTEXT, error);
                // }
                core_1.Logger.log("\ndomainName: " + core_1.colors.cyan.underline("http://" + sysDomain));
                return [2 /*return*/, { domain: sysDomain }];
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
                    timeoutMsg: "\u57DF\u540D " + core_1.colors.green(domain) + " \u751F\u6548\u65F6\u95F4\u7B49\u5F85\u8D85\u65F6",
                    hint: {
                        loading: "In the configuration of domain name " + core_1.colors.cyan.underline(domain) + ", it takes a long time to generate a domain name for the first time. Please wait patiently",
                        success: "The domain name " + core_1.colors.cyan.underline(domain) + " is configured successfully",
                        fail: "Failed to configure the domain name " + core_1.colors.cyan.underline(domain),
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
                core_1.Logger.log("\ndomainName: " + core_1.colors.cyan.underline("http://" + domain));
                return [2 /*return*/, { domain: domain }];
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
                return [4 /*yield*/, Promise.all(hosts.map(function (hostObj, index) { return __awaiter(void 0, void 0, void 0, function () {
                        var domainInfo;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(hostObj.host === 'auto')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, generateSystemDomain({ credentials: credentials, inputs: inputs, sources: sources })];
                                case 1:
                                    domainInfo = _a.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, generateDomain({ credentials: credentials, hostObj: hostObj, sources: sources })];
                                case 3:
                                    domainInfo = _a.sent();
                                    _a.label = 4;
                                case 4:
                                    props.hosts[index].domain = domainInfo.domain;
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                return [2 /*return*/, inputs];
            case 2:
                core_1.Logger.log('如果需要系统帮你生成一个域名，可配置host为 auto ', 'yellow');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZG9tYWluLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUFzRTtBQUN0RSxzRUFBeUM7QUFDekMsMEVBQTZDO0FBQzdDLDBFQUE2QztBQUU3QyxrQ0FBa0Q7QUFDbEQsMERBQTZCO0FBQzdCLGdEQUEwQjtBQUUxQixJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDN0I7Ozs7O0dBS0c7QUFDSCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsTUFBYyxFQUFFLE1BQWM7SUFDdEQsT0FBTztRQUNMLE9BQU8sRUFBSyxNQUFNLGFBQVEsTUFBTSxrQkFBZTtRQUMvQyxJQUFJLEVBQUUsS0FBSztRQUNYLElBQUksRUFBRSxFQUFFO0tBQ1QsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sdUJBQXVCLEdBQUcsVUFBTyxTQUFTLEVBQUUsRUFBbUI7UUFBakIsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBOzs7Ozs7b0JBQ3pELE1BQU0sR0FBcUMsT0FBTyxPQUE1QyxFQUFFLEtBQUssR0FBOEIsT0FBTyxNQUFyQyxFQUFFLFlBQVksR0FBZ0IsT0FBTyxhQUF2QixFQUFFLFNBQVMsR0FBSyxPQUFPLFVBQVosQ0FBYTs7OztvQkFHekQscUJBQU0sMkJBQVUsQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLEVBQUE7O29CQUF6RSxTQUF5RSxDQUFDOzs7O29CQUVwRSxPQUFPLEdBQUcsb0JBQUcsQ0FBQyxPQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFD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