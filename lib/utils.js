"use strict";
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
exports.waitUntil = exports.parseRedirects = exports.parseOptimization = exports.parseCertInfo = exports.parseUaFilter = exports.parseIpFilter = exports.parseReferer = exports.sleep = exports.parseDomain = void 0;
var interface_1 = require("./interface");
var lodash_get_1 = __importDefault(require("lodash.get"));
var chillout_1 = __importDefault(require("chillout"));
var core_1 = require("@serverless-devs/core");
var logger = new core_1.Logger('WEBSITE');
exports.parseDomain = function (domain) {
    var arr = domain.split('.');
    return {
        topDomain: arr.slice(arr.length - 2).join('.'),
        rrDomainName: arr.slice(0, arr.length - 2).join('.'),
    };
};
function sleep(msec) {
    return new Promise(function (resolve) { return setTimeout(resolve, msec); });
}
exports.sleep = sleep;
function parseReferer(params) {
    var type = params.type, allowEmpty = params.allowEmpty, rules = params.rules;
    if (type === 'whitelist') {
        return {
            functionName: interface_1.RefererEnum.whitelist,
            functionArgs: [
                {
                    argName: 'allow_empty',
                    argValue: allowEmpty ? 'on' : 'off',
                },
                {
                    argName: 'refer_domain_allow_list',
                    argValue: rules.join(','),
                },
            ],
        };
    }
    else {
        return {
            functionName: interface_1.RefererEnum.blacklist,
            functionArgs: [
                {
                    argName: 'allow_empty',
                    argValue: allowEmpty ? 'on' : 'off',
                },
                {
                    argName: 'refer_domain_deny_list',
                    argValue: rules.join(','),
                },
            ],
        };
    }
}
exports.parseReferer = parseReferer;
function parseIpFilter(params) {
    var type = params.type, rules = params.rules;
    if (type === 'whitelist') {
        return {
            functionName: interface_1.IpFilterEnum.whitelist,
            functionArgs: [
                {
                    argName: 'ip_list',
                    argValue: rules.join(','),
                },
            ],
        };
    }
    else {
        return {
            functionName: interface_1.IpFilterEnum.blacklist,
            functionArgs: [
                {
                    argName: 'ip_list',
                    argValue: rules.join(','),
                },
            ],
        };
    }
}
exports.parseIpFilter = parseIpFilter;
function parseUaFilter(params) {
    var type = params.type, rules = params.rules;
    if (type === 'whitelist') {
        return {
            functionName: 'ali_ua',
            functionArgs: [
                {
                    argName: 'ua',
                    argValue: rules.join('|'),
                },
                { argName: 'type', argValue: 'white' },
            ],
        };
    }
    else {
        return {
            functionName: 'ali_ua',
            functionArgs: [
                {
                    argName: 'ua',
                    argValue: rules.join('|'),
                },
                { argName: 'type', argValue: 'black' },
            ],
        };
    }
}
exports.parseUaFilter = parseUaFilter;
function parseCertInfo(params) {
    if (params.certType === 'free') {
        return {
            certType: params.certType,
            serverCertificateStatus: lodash_get_1.default(params, 'switch', 'on'),
        };
    }
    if (params.certType === 'upload') {
        return {
            certType: params.certType,
            serverCertificateStatus: lodash_get_1.default(params, 'switch', 'on'),
            certName: params.certName,
            serverCertificate: params.serverCertificate,
            privateKey: params.privateKey,
        };
    }
    if (params.certType === 'csr') {
        return {
            certType: params.certType,
            serverCertificateStatus: lodash_get_1.default(params, 'switch', 'on'),
            serverCertificate: params.serverCertificate,
        };
    }
    return {
        certType: 'free',
        serverCertificateStatus: lodash_get_1.default(params, 'switch', 'on'),
    };
}
exports.parseCertInfo = parseCertInfo;
function parseOptimization(params) {
    return [
        {
            functionName: 'tesla',
            functionArgs: [
                { argName: 'enable', argValue: lodash_get_1.default(params, 'trim.html', 'off') },
                { argName: 'trim_css', argValue: lodash_get_1.default(params, 'trim.css', 'off') },
                { argName: 'trim_js', argValue: lodash_get_1.default(params, 'trim.javascript', 'off') },
            ],
        },
        {
            functionName: 'gzip',
            functionArgs: [{ argName: 'enable', argValue: lodash_get_1.default(params, 'gzip', 'off') }],
        },
        {
            functionName: 'brotli',
            functionArgs: [
                { argName: 'enable', argValue: lodash_get_1.default(params, 'brotli', 'off') },
                { argName: 'brotli_level', argValue: '1' },
            ],
        },
    ];
}
exports.parseOptimization = parseOptimization;
function parseRedirects(params) {
    var option = params.filter(function (item) { return lodash_get_1.default(item, 'switch', 'on') === 'on'; });
    return option.map(function (item) { return ({
        functionName: 'host_redirect',
        functionArgs: [
            {
                argName: 'regex',
                argValue: item.source,
            },
            {
                argName: 'replacement',
                argValue: item.destination,
            },
            {
                argName: 'flag',
                argValue: 'redirect',
            },
        ],
    }); });
}
exports.parseRedirects = parseRedirects;
// TODO: 专门针对publish.yaml来处理default字段。不需要每次都都手动处理
exports.waitUntil = function (asyncService, stopCondition, _a) {
    var _b = _a.timeout, timeout = _b === void 0 ? 10 * 60 * 1000 : _b, //10分超时时间
    _c = _a.timeInterval, //10分超时时间
    timeInterval = _c === void 0 ? 1000 : _c, timeoutMsg = _a.timeoutMsg, hint = _a.hint;
    return __awaiter(void 0, void 0, void 0, function () {
        var spin, startTime, result;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    spin = hint && core_1.spinner(hint.loading);
                    startTime = new Date().getTime();
                    return [4 /*yield*/, chillout_1.default.waitUntil(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (new Date().getTime() - startTime > timeout) {
                                            logger.debug(timeoutMsg);
                                            spin === null || spin === void 0 ? void 0 : spin.fail(hint.fail);
                                            return [2 /*return*/, chillout_1.default.StopIteration];
                                        }
                                        return [4 /*yield*/, sleep(timeInterval)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, asyncService()];
                                    case 2:
                                        result = _a.sent();
                                        if (stopCondition(result)) {
                                            spin === null || spin === void 0 ? void 0 : spin.succeed(hint.success);
                                            return [2 /*return*/, chillout_1.default.StopIteration];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _d.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBU3FCO0FBQ3JCLDBEQUE2QjtBQUM3QixzREFBZ0M7QUFDaEMsOENBQXdEO0FBQ3hELElBQU0sTUFBTSxHQUFHLElBQUksYUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXhCLFFBQUEsV0FBVyxHQUFHLFVBQUMsTUFBYztJQUN4QyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLE9BQU87UUFDTCxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDOUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNyRCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsU0FBZ0IsS0FBSyxDQUFDLElBQUk7SUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRkQsc0JBRUM7QUFFRCxTQUFnQixZQUFZLENBQUMsTUFBZ0I7SUFDbkMsSUFBQSxJQUFJLEdBQXdCLE1BQU0sS0FBOUIsRUFBRSxVQUFVLEdBQVksTUFBTSxXQUFsQixFQUFFLEtBQUssR0FBSyxNQUFNLE1BQVgsQ0FBWTtJQUMzQyxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUU7UUFDeEIsT0FBTztZQUNMLFlBQVksRUFBRSx1QkFBVyxDQUFDLFNBQVM7WUFDbkMsWUFBWSxFQUFFO2dCQUNaO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQ3BDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSx5QkFBeUI7b0JBQ2xDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDMUI7YUFDRjtTQUNGLENBQUM7S0FDSDtTQUFNO1FBQ0wsT0FBTztZQUNMLFlBQVksRUFBRSx1QkFBVyxDQUFDLFNBQVM7WUFDbkMsWUFBWSxFQUFFO2dCQUNaO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQ3BDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSx3QkFBd0I7b0JBQ2pDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDMUI7YUFDRjtTQUNGLENBQUM7S0FDSDtBQUNILENBQUM7QUEvQkQsb0NBK0JDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQWlCO0lBQ3JDLElBQUEsSUFBSSxHQUFZLE1BQU0sS0FBbEIsRUFBRSxLQUFLLEdBQUssTUFBTSxNQUFYLENBQVk7SUFDL0IsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1FBQ3hCLE9BQU87WUFDTCxZQUFZLEVBQUUsd0JBQVksQ0FBQyxTQUFTO1lBQ3BDLFlBQVksRUFBRTtnQkFDWjtvQkFDRSxPQUFPLEVBQUUsU0FBUztvQkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQztLQUNIO1NBQU07UUFDTCxPQUFPO1lBQ0wsWUFBWSxFQUFFLHdCQUFZLENBQUMsU0FBUztZQUNwQyxZQUFZLEVBQUU7Z0JBQ1o7b0JBQ0UsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDMUI7YUFDRjtTQUNGLENBQUM7S0FDSDtBQUNILENBQUM7QUF2QkQsc0NBdUJDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQWlCO0lBQ3JDLElBQUEsSUFBSSxHQUFZLE1BQU0sS0FBbEIsRUFBRSxLQUFLLEdBQUssTUFBTSxNQUFYLENBQVk7SUFDL0IsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1FBQ3hCLE9BQU87WUFDTCxZQUFZLEVBQUUsUUFBUTtZQUN0QixZQUFZLEVBQUU7Z0JBQ1o7b0JBQ0UsT0FBTyxFQUFFLElBQUk7b0JBQ2IsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUMxQjtnQkFDRCxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTthQUN2QztTQUNGLENBQUM7S0FDSDtTQUFNO1FBQ0wsT0FBTztZQUNMLFlBQVksRUFBRSxRQUFRO1lBQ3RCLFlBQVksRUFBRTtnQkFDWjtvQkFDRSxPQUFPLEVBQUUsSUFBSTtvQkFDYixRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQzFCO2dCQUNELEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO2FBQ3ZDO1NBQ0YsQ0FBQztLQUNIO0FBQ0gsQ0FBQztBQXpCRCxzQ0F5QkM7QUFFRCxTQUFnQixhQUFhLENBQUMsTUFBaUI7SUFDN0MsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM5QixPQUFPO1lBQ0wsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLHVCQUF1QixFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7U0FDckQsQ0FBQztLQUNIO0lBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUNoQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLHVCQUF1QixFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7WUFDcEQsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7WUFDM0MsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO1NBQzlCLENBQUM7S0FDSDtJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7UUFDN0IsT0FBTztZQUNMLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6Qix1QkFBdUIsRUFBRSxvQkFBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDO1lBQ3BELGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7U0FDNUMsQ0FBQztLQUNIO0lBQ0QsT0FBTztRQUNMLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLHVCQUF1QixFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7S0FDckQsQ0FBQztBQUNKLENBQUM7QUE3QkQsc0NBNkJDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsTUFBcUI7SUFDckQsT0FBTztRQUNMO1lBQ0UsWUFBWSxFQUFFLE9BQU87WUFDckIsWUFBWSxFQUFFO2dCQUNaLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNoRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDakUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxvQkFBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUMsRUFBRTthQUN4RTtTQUNGO1FBQ0Q7WUFDRSxZQUFZLEVBQUUsTUFBTTtZQUNwQixZQUFZLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQzVFO1FBQ0Q7WUFDRSxZQUFZLEVBQUUsUUFBUTtZQUN0QixZQUFZLEVBQUU7Z0JBQ1osRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxvQkFBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzdELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO2FBQzNDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQztBQXRCRCw4Q0FzQkM7QUFFRCxTQUFnQixjQUFjLENBQUMsTUFBb0I7SUFDakQsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLG9CQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQWxDLENBQWtDLENBQUMsQ0FBQztJQUMzRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxDQUFDO1FBQzNCLFlBQVksRUFBRSxlQUFlO1FBQzdCLFlBQVksRUFBRTtZQUNaO2dCQUNFLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsYUFBYTtnQkFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQzNCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsUUFBUSxFQUFFLFVBQVU7YUFDckI7U0FDRjtLQUNGLENBQUMsRUFoQjBCLENBZ0IxQixDQUFDLENBQUM7QUFDTixDQUFDO0FBbkJELHdDQW1CQztBQUVELGlEQUFpRDtBQUVwQyxRQUFBLFNBQVMsR0FBRyxVQUN2QixZQUFnQyxFQUNoQyxhQUF1QyxFQUN2QyxFQWNDO1FBYkMsZUFBd0IsRUFBeEIsT0FBTyxtQkFBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksS0FBQSxFQUFFLFNBQVM7SUFDbkMsb0JBQW1CLEVBRE8sU0FBUztJQUNuQyxZQUFZLG1CQUFHLElBQUksS0FBQSxFQUNuQixVQUFVLGdCQUFBLEVBQ1YsSUFBSSxVQUFBOzs7Ozs7b0JBWUEsSUFBSSxHQUFHLElBQUksSUFBSSxjQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFdkMscUJBQU0sa0JBQVEsQ0FBQyxTQUFTLENBQUM7Ozs7d0NBQ3ZCLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxTQUFTLEdBQUcsT0FBTyxFQUFFOzRDQUM5QyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRDQUN6QixJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7NENBQ3RCLHNCQUFPLGtCQUFRLENBQUMsYUFBYSxFQUFDO3lDQUMvQjt3Q0FDRCxxQkFBTSxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUE7O3dDQUF6QixTQUF5QixDQUFDO3dDQUNqQixxQkFBTSxZQUFZLEVBQUUsRUFBQTs7d0NBQTdCLE1BQU0sR0FBRyxTQUFvQixDQUFDO3dDQUM5QixJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTs0Q0FDekIsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFOzRDQUM1QixzQkFBTyxrQkFBUSxDQUFDLGFBQWEsRUFBQzt5Q0FDL0I7Ozs7NkJBQ0YsQ0FBQyxFQUFBOztvQkFaRixTQVlFLENBQUM7b0JBQ0gsc0JBQU8sTUFBTSxFQUFDOzs7O0NBQ2YsQ0FBQyJ9