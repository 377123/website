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
var chillout_1 = __importDefault(require("chillout"));
var lodash_get_1 = __importDefault(require("lodash.get"));
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
        var access, https, optimization, referer, ipFilter, uaFilter;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    access = hostObj.access, https = hostObj.https, optimization = hostObj.optimization;
                    if (!https) return [3 /*break*/, 2];
                    return [4 /*yield*/, cdnclient_service_1.default.setDomainServerCertificate(cdnClient, { domain: domain, https: https })];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    referer = lodash_get_1.default(access, 'referer');
                    if (!referer) return [3 /*break*/, 4];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainReferer(cdnClient, { domain: domain, referer: referer })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    ipFilter = lodash_get_1.default(access, 'ipFilter');
                    if (!ipFilter) return [3 /*break*/, 6];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainIpFilter(cdnClient, { domain: domain, ipFilter: ipFilter })];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    uaFilter = lodash_get_1.default(access, 'uaFilter');
                    if (!uaFilter) return [3 /*break*/, 8];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainUaFilter(cdnClient, { domain: domain, uaFilter: uaFilter })];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    if (!optimization) return [3 /*break*/, 10];
                    return [4 /*yield*/, cdnclient_service_1.default.setCdnDomainOptimization(cdnClient, { domain: domain, optimization: optimization })];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
};
// 生成系统域名
var generateSystemDomain = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, inputs, sources, props, domainConponent, cdnClient, sysDomain;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                credentials = params.credentials, inputs = params.inputs, sources = params.sources;
                props = inputs.props;
                return [4 /*yield*/, core_1.loadComponent('devsapp/domain', 'http://registry.serverlessfans.cn/simple')];
            case 1:
                domainConponent = _a.sent();
                cdnClient = cdnclient_service_1.default.createClient(credentials);
                // eslint-disable-next-line
                inputs.props = __assign(__assign({}, props), { type: 'oss' });
                return [4 /*yield*/, domainConponent.get(inputs)];
            case 2:
                sysDomain = _a.sent();
                return [4 /*yield*/, core_1.modifyProps(lodash_get_1.default(inputs, 'project.projectName'), {
                        hosts: props.hosts.map(function (item) {
                            return item.host === 'auto' ? __assign(__assign({}, item), { host: sysDomain }) : item;
                        }),
                    }, lodash_get_1.default(inputs, 'path.configPath'))];
            case 3:
                _a.sent();
                cdnclient_service_1.default.modifyCdnDomain(cdnClient, { domain: sysDomain, sources: sources });
                return [4 /*yield*/, cdnclient_service_1.default.setDomainServerCertificate(cdnClient, { domain: sysDomain })];
            case 4:
                _a.sent();
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
                if (!!domainDetailMode) return [3 /*break*/, 6];
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
                return [4 /*yield*/, chillout_1.default.waitUntil(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var isStop;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    isStop = false;
                                    _a.label = 1;
                                case 1:
                                    if (!!isStop) return [3 /*break*/, 4];
                                    return [4 /*yield*/, utils_1.sleep(350)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, cdnclient_service_1.default.describeCdnDomainDetail(cdnClient, domain)];
                                case 3:
                                    domainDetailMode = _a.sent();
                                    isStop = !!domainDetailMode.cname;
                                    if (isStop) {
                                        return [2 /*return*/, chillout_1.default.StopIteration];
                                    }
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 4:
                _b.sent();
                return [4 /*yield*/, dnsclient_service_1.default.addDomainRecord(dnsClient, {
                        domainName: topDomain,
                        RR: rrDomainName,
                        type: 'CNAME',
                        value: domainDetailMode.cname,
                    })];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                cdnclient_service_1.default.modifyCdnDomain(cdnClient, { domain: domain, sources: sources });
                _b.label = 7;
            case 7: return [4 /*yield*/, setDomainAdvancedConfig(cdnClient, { domain: domain, hostObj: hostObj })];
            case 8:
                _b.sent();
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
                core_1.Logger.log('如果需要系统帮你生成一个域名，可配置host为 auto ', 'blue');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZG9tYWluLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUEyRTtBQUMzRSxzRUFBeUM7QUFDekMsMEVBQTZDO0FBQzdDLDBFQUE2QztBQUU3QyxrQ0FBOEM7QUFDOUMsc0RBQWdDO0FBQ2hDLDBEQUE2QjtBQUU3Qjs7Ozs7R0FLRztBQUNILElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxNQUFjLEVBQUUsTUFBYztJQUN0RCxPQUFPO1FBQ0wsT0FBTyxFQUFLLE1BQU0sYUFBUSxNQUFNLGtCQUFlO1FBQy9DLElBQUksRUFBRSxLQUFLO1FBQ1gsSUFBSSxFQUFFLEVBQUU7S0FDVCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsSUFBTSx1QkFBdUIsR0FBRyxVQUFPLFNBQVMsRUFBRSxFQUFtQjtRQUFqQixNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQUE7Ozs7OztvQkFDekQsTUFBTSxHQUEwQixPQUFPLE9BQWpDLEVBQUUsS0FBSyxHQUFtQixPQUFPLE1BQTFCLEVBQUUsWUFBWSxHQUFLLE9BQU8sYUFBWixDQUFhO3lCQUU1QyxLQUFLLEVBQUwsd0JBQUs7b0JBQ1AscUJBQU0sMkJBQVUsQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLEVBQUE7O29CQUF6RSxTQUF5RSxDQUFDOzs7b0JBR3RFLE9BQU8sR0FBRyxvQkFBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQzt5QkFDbkMsT0FBTyxFQUFQLHdCQUFPO29CQUNULHFCQUFNLDJCQUFVLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FB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