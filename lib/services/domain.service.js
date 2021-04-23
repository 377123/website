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
        var access, https, optimization, redirects, referer, ipFilter, uaFilter;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    access = hostObj.access, https = hostObj.https, optimization = hostObj.optimization, redirects = hostObj.redirects;
                    // https 配置
                    return [4 /*yield*/, cdnclient_service_1.default.setDomainServerCertificate(cdnClient, { domain: domain, https: https })];
                case 1:
                    // https 配置
                    _b.sent();
                    referer = lodash_get_1.default(access, 'referer');
                    if (!referer) return [3 /*break*/, 3];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainReferer(cdnClient, { domain: domain, referer: referer })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    ipFilter = lodash_get_1.default(access, 'ipFilter');
                    if (!ipFilter) return [3 /*break*/, 5];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainIpFilter(cdnClient, { domain: domain, ipFilter: ipFilter })];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    uaFilter = lodash_get_1.default(access, 'uaFilter');
                    if (!uaFilter) return [3 /*break*/, 7];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainUaFilter(cdnClient, { domain: domain, uaFilter: uaFilter })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    if (!optimization) return [3 /*break*/, 9];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainOptimization(cdnClient, { domain: domain, optimization: optimization })];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9:
                    if (!redirects) return [3 /*break*/, 11];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainRedirects(cdnClient, { domain: domain, redirects: redirects })];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    });
};
// 生成系统域名
var generateSystemDomain = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, inputs, props, domainConponent, cdnClient, sysDomain;
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
                return [4 /*yield*/, cdnclient_service_1.default.setDomainServerCertificate(cdnClient, { domain: sysDomain })];
            case 4:
                _a.sent();
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
                        loading: "\u57DF\u540D " + colors_1.default.green.underline(domain) + " \u914D\u7F6E\u4E2D, \u9884\u8BA1\u9700\u898110\u5206\u949F",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZG9tYWluLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE4RDtBQUM5RCxzRUFBeUM7QUFDekMsMEVBQTZDO0FBQzdDLDBFQUE2QztBQUU3QyxrQ0FBa0Q7QUFDbEQsMERBQTZCO0FBQzdCLGtEQUE0QjtBQUU1QixJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDN0I7Ozs7O0dBS0c7QUFDSCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsTUFBYyxFQUFFLE1BQWM7SUFDdEQsT0FBTztRQUNMLE9BQU8sRUFBSyxNQUFNLGFBQVEsTUFBTSxrQkFBZTtRQUMvQyxJQUFJLEVBQUUsS0FBSztRQUNYLElBQUksRUFBRSxFQUFFO0tBQ1QsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sdUJBQXVCLEdBQUcsVUFBTyxTQUFTLEVBQUUsRUFBbUI7UUFBakIsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBOzs7Ozs7b0JBQ3pELE1BQU0sR0FBcUMsT0FBTyxPQUE1QyxFQUFFLEtBQUssR0FBOEIsT0FBTyxNQUFyQyxFQUFFLFlBQVksR0FBZ0IsT0FBTyxhQUF2QixFQUFFLFNBQVMsR0FBSyxPQUFPLFVBQVosQ0FBYTtvQkFDM0QsV0FBVztvQkFDWCxxQkFBTSwyQkFBVSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsRUFBQTs7b0JBRHpFLFdBQVc7b0JBQ1gsU0FBeUUsQ0FBQztvQkFFcEUsT0FBTyxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3lCQUNuQyxPQUFPLEVBQVAsd0JBQU87b0JBQ1QscUJBQU0sMkJBQVUsQ0FBQyxtQkFB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