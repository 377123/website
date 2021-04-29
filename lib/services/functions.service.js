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
exports.generateFcSpec = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var core_1 = require("@serverless-devs/core");
var lodash_get_1 = __importDefault(require("lodash.get"));
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var dnsclient_service_1 = __importDefault(require("./dnsclient.service"));
var utils_1 = require("../utils");
var logger = new core_1.Logger('WEBSITE');
var generateService = function (serviceName) {
    return {
        name: serviceName,
        description: 'Serverless Devs service',
    };
};
var generateFunction = function (codeUri, functionName) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    var description = rest.description, runtime = rest.runtime, initializer = rest.initializer, handler = rest.handler, memorySize = rest.memorySize, timeout = rest.timeout, initializationTimeout = rest.initializationTimeout, instanceConcurrency = rest.instanceConcurrency, instanceType = rest.instanceType;
    return {
        codeUri: codeUri,
        name: functionName,
        description: description,
        runtime: runtime || 'nodejs12',
        handler: handler || functionName + ".handler",
        memorySize: memorySize || 128,
        timeout: timeout || 60,
        initializationTimeout: initializationTimeout || 60,
        initializer: initializer,
        instanceConcurrency: instanceConcurrency || 1,
        instanceType: instanceType || 'e1',
    };
};
var generateHttpTriggers = function (config) {
    return [
        {
            name: 'httpTrigger',
            type: 'http',
            config: Object.assign({
                authType: 'anonymous',
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
            }, config || {}),
        },
    ];
};
var generteCustomDomains = function (_a) {
    var functionName = _a.functionName, domain = _a.domain, protocol = _a.protocol;
    // const prefix = protocol === 'http' ? 'http://' : 'https://';
    return [
        {
            domainName: domain,
            protocol: 'HTTP',
            routeConfigs: [
                {
                    path: "/api/" + functionName,
                },
            ],
        },
    ];
};
var deployFcFunction = function (_a) {
    var inputs = _a.inputs, hostObj = _a.hostObj;
    return __awaiter(void 0, void 0, void 0, function () {
        var props, accountID, _b, service, codeUri, functions, functionDir, functionPaths;
        return __generator(this, function (_c) {
            props = inputs.props;
            accountID = lodash_get_1.default(inputs, 'Credentials.AccountID');
            _b = hostObj.faas, service = _b.service, codeUri = _b.codeUri, functions = _b.functions;
            if (!functions) {
                functionDir = path_1.default.join(process.cwd(), codeUri);
                if (!fs_extra_1.default.ensureDir(functionDir)) {
                    throw new Error(functionDir + " is not exist");
                }
                functionPaths = fs_extra_1.default.readdirSync(functionDir);
                if ((functionPaths === null || functionPaths === void 0 ? void 0 : functionPaths.length) > 0) {
                    return [2 /*return*/, Promise.all(functionPaths
                            .filter(function (functionName) { return functionName.endsWith('.js'); })
                            .map(function (name) { return __awaiter(void 0, void 0, void 0, function () {
                            var region, fcDeployFuncion, fcDeploy, deployParams, result, curRegion, funcName, httpUrl;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        region = props.region;
                                        fcDeployFuncion = {
                                            region: region,
                                            service: generateService(service),
                                            function: generateFunction(codeUri, name.replace('.js', '')),
                                            triggers: generateHttpTriggers(),
                                            customDomains: generteCustomDomains({
                                                domain: hostObj.domain,
                                                protocol: lodash_get_1.default(hostObj, 'https.protocol', 'https'),
                                                functionName: name.replace('.js', ''),
                                            }),
                                        };
                                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-deploy')];
                                    case 1:
                                        fcDeploy = _a.sent();
                                        deployParams = __assign(__assign({}, inputs), { props: fcDeployFuncion });
                                        logger.debug("fc-deploy inputs params: " + JSON.stringify(deployParams, null, 2));
                                        return [4 /*yield*/, fcDeploy.deploy(deployParams)];
                                    case 2:
                                        result = _a.sent();
                                        curRegion = result.region, funcName = result.function;
                                        httpUrl = accountID + "." + curRegion + ".fc.aliyuncs.com/<version>/proxy/" + service + "/" + funcName.name + "/";
                                        return [2 /*return*/, { name: name, httpUrl: httpUrl }];
                                }
                            });
                        }); }))];
                }
            }
            return [2 /*return*/];
        });
    });
};
var addDomainRecord = function (_a) {
    var credentials = _a.credentials, domain = _a.domain;
    return __awaiter(void 0, void 0, void 0, function () {
        var dnsClient, _b, topDomain, rrDomainName;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    dnsClient = dnsclient_service_1.default.createClient(credentials);
                    _b = utils_1.parseDomain(domain), topDomain = _b.topDomain, rrDomainName = _b.rrDomainName;
                    return [4 /*yield*/, dnsclient_service_1.default.addDomainRecord(dnsClient, {
                            domainName: topDomain,
                            RR: rrDomainName,
                            type: 'CNAME',
                            value: credentials.accountID + ".cn-hangzhou.fc.aliyuncs.com",
                        })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.generateFcSpec = function (orinalInputs) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, props, hosts, credentials;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = lodash_clonedeep_1.default(orinalInputs);
                props = inputs.props;
                hosts = props.hosts;
                credentials = {
                    accountID: lodash_get_1.default(inputs, 'Credentials.AccountID'),
                    accessKeyId: lodash_get_1.default(inputs, 'Credentials.AccessKeyID'),
                    accessKeySecret: lodash_get_1.default(inputs, 'Credentials.AccessKeySecret'),
                };
                if (!((hosts === null || hosts === void 0 ? void 0 : hosts.length) > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, Promise.all(hosts.map(function (hostObj) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!hostObj.faas) return [3 /*break*/, 3];
                                    return [4 /*yield*/, addDomainRecord({ credentials: credentials, domain: hostObj.domain })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, deployFcFunction({ inputs: inputs, hostObj: hostObj })];
                                case 2: return [2 /*return*/, _a.sent()];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZnVuY3Rpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBMEI7QUFDMUIsOENBQXdCO0FBQ3hCLDhDQUE4RDtBQUM5RCwwREFBNkI7QUFDN0Isc0VBQXlDO0FBQ3pDLDBFQUE2QztBQUM3QyxrQ0FBdUM7QUFDdkMsSUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFckMsSUFBTSxlQUFlLEdBQUcsVUFBQyxXQUFtQjtJQUMxQyxPQUFPO1FBQ0wsSUFBSSxFQUFFLFdBQVc7UUFDakIsV0FBVyxFQUFFLHlCQUF5QjtLQUN2QyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLE9BQWUsRUFBRSxZQUFvQjtJQUFFLGNBQVk7U0FBWixVQUFZLEVBQVoscUJBQVksRUFBWixJQUFZO1FBQVosNkJBQVk7O0lBRXpFLElBQUEsV0FBVyxHQVNULElBQUksWUFUSyxFQUNYLE9BQU8sR0FRTCxJQUFJLFFBUkMsRUFDUCxXQUFXLEdBT1QsSUFBSSxZQVBLLEVBQ1gsT0FBTyxHQU1MLElBQUksUUFOQyxFQUNQLFVBQVUsR0FLUixJQUFJLFdBTEksRUFDVixPQUFPLEdBSUwsSUFBSSxRQUpDLEVBQ1AscUJBQXFCLEdBR25CLElBQUksc0JBSGUsRUFDckIsbUJBQW1CLEdBRWpCLElBQUksb0JBRmEsRUFDbkIsWUFBWSxHQUNWLElBQUksYUFETSxDQUNMO0lBQ1QsT0FBTztRQUNMLE9BQU8sU0FBQTtRQUNQLElBQUksRUFBRSxZQUFZO1FBQ2xCLFdBQVcsYUFBQTtRQUNYLE9BQU8sRUFBRSxPQUFPLElBQUksVUFBVTtRQUM5QixPQUFPLEVBQUUsT0FBTyxJQUFP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