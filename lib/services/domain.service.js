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
var logger = new core_1.Logger('WEBSITE');
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
                    logger.error("https\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/https") + " \u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetDomainServerCertificate\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    logger.debug(error_1);
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
                    logger.error("Referer\u9632\u76D7\u94FE\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + core_1.colors.green('Referer防盗链') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainReferer\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    logger.debug(error_2);
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
                    logger.error("IP\u9ED1/\u767D\u540D\u5355\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + core_1.colors.green('IP黑/白名单') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainIpFilter\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    logger.debug(error_3);
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
                    logger.error("UA\u9ED1/\u767D\u540D\u5355\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/access") + " tab " + core_1.colors.green('UA黑/白名单') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainUaFilter\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    logger.debug(error_4);
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
                    logger.error("\u6027\u80FD\u4F18\u5316\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/perform") + " \u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainOptimization\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    logger.debug(error_5);
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
                    logger.error("\u91CD\u5B9A\u5411\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + domain + "/cache") + " tab " + core_1.colors.green('重写') + " \u754C\u9762\u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetCdnDomainRedirects\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                    logger.debug(error_6);
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
                logger.debug("\u7CFB\u7EDF\u57DF\u540D:" + sysDomain);
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
                logger.error("https\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u524D\u5F80\u63A7\u5236\u53F0\u9875\u9762 " + core_1.colors.cyan.underline("https://cdn.console.aliyun.com/domain/detail/" + sysDomain + "/https") + " \u8FDB\u884C\u624B\u52A8\u64CD\u4F5C\uFF0C\u51FD\u6570\u540D\uFF1AsetDomainServerCertificate\uFF0C\u9519\u8BEF\u7801\uFF1A" + messageCode);
                logger.debug(error_7);
                return [3 /*break*/, 7];
            case 7:
                logger.log("\ndomainName: " + core_1.colors.cyan.underline("http://" + sysDomain));
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
                        loading: "\u57DF\u540D " + core_1.colors.cyan.underline(domain) + " \u914D\u7F6E\u4E2D, \u9996\u6B21\u751F\u6210\u57DF\u540D\u9884\u8BA1\u9700\u898110\u5206\u949F",
                        success: "\u57DF\u540D " + core_1.colors.cyan.underline(domain) + " \u914D\u7F6E\u6210\u529F",
                        fail: "\u57DF\u540D " + core_1.colors.cyan.underline(domain) + " \u914D\u7F6E\u5931\u8D25",
                    },
                })];
            case 1:
                userDomains = _a.sent();
                logger.debug("\u7CFB\u7EDF\u57DF\u540D\u72B6\u6001:" + JSON.stringify(userDomains, null, 2));
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
                logger.debug("\u67E5\u8BE2\u7ED1\u5B9A\u7684\u57DF\u540D\u4FE1\u606F:" + JSON.stringify(domainDetailMode, null, 2));
                if (!!domainDetailMode) return [3 /*break*/, 7];
                logger.debug("\u9996\u6B21\u7ED1\u5B9A\u81EA\u5B9A\u4E49\u57DF\u540D:" + domain);
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
                logger.debug("\u9996\u6B21\u7ED1\u5B9A\u7684\u57DF\u540D\u4FE1\u606F:" + JSON.stringify(domainDetailMode, null, 2));
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
                logger.debug("\u7ED1\u5B9A\u81EA\u5B9A\u4E49\u57DF\u540D:" + domain);
                cdnclient_service_1.default.modifyCdnDomain(cdnClient, { domain: domain, sources: sources });
                _b.label = 8;
            case 8: return [4 /*yield*/, setDomainAdvancedConfig(cdnClient, { domain: domain, hostObj: hostObj })];
            case 9:
                _b.sent();
                logger.log("\ndomainName: " + core_1.colors.cyan.underline("http://" + domain));
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
                logger.log('如果需要系统帮你生成一个域名，可配置host为 auto ', 'yellow');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZG9tYWluLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUFzRTtBQUN0RSxzRUFBeUM7QUFDekMsMEVBQTZDO0FBQzdDLDBFQUE2QztBQUU3QyxrQ0FBa0Q7QUFDbEQsMERBQTZCO0FBQzdCLElBQU0sTUFBTSxHQUFHLElBQUksYUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXJDOzs7OztHQUtHO0FBQ0gsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLE1BQWMsRUFBRSxNQUFjO0lBQ3RELE9BQU87UUFDTCxPQUFPLEVBQUssTUFBTSxhQUFRLE1BQU0sa0JBQWU7UUFDL0MsSUFBSSxFQUFFLEtBQUs7UUFDWCxJQUFJLEVBQUUsRUFBRTtLQUNULENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLHVCQUF1QixHQUFHLFVBQU8sU0FBUyxFQUFFLEVBQW1CO1FBQWpCLE1BQU0sWUFBQSxFQUFFLE9BQU8sYUFBQTs7Ozs7O29CQUN6RCxNQUFNLEdBQXFDLE9BQU8sT0FBNUMsRUFBRSxLQUFLLEdBQThCLE9BQU8sTUFBckMsRUFBRSxZQUFZLEdBQWdCLE9BQU8sYUFBdkIsRUFBRSxTQUFTLEdBQUssT0FBTyxVQUFaLENBQWE7Ozs7b0JBR3pELHFCQUFNLDJCQUFVLENBQUMsMEJBQTBCLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxFQUFBOztvQkFBekUsU0FBeUUsQ0FBQzs7OztvQkFFcEUsT0FBTyxHQUFHLG9CQUFHLENBQUMsT0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDcEMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENB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