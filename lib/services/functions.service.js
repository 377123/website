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
                                        core_1.Logger.debug('WEBSITE', "fc-deploy inputs params: " + JSON.stringify(deployParams, null, 2));
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
exports.generateFcSpec = function (orinalInputs) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, props, hosts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = lodash_clonedeep_1.default(orinalInputs);
                props = inputs.props;
                hosts = props.hosts;
                if (!((hosts === null || hosts === void 0 ? void 0 : hosts.length) > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, Promise.all(hosts.map(function (hostObj) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!hostObj.faas) return [3 /*break*/, 2];
                                    return [4 /*yield*/, deployFcFunction({ inputs: inputs, hostObj: hostObj })];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZnVuY3Rpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBMEI7QUFDMUIsOENBQXdCO0FBQ3hCLDhDQUE4RDtBQUM5RCwwREFBNkI7QUFDN0Isc0VBQXlDO0FBRXpDLElBQU0sZUFBZSxHQUFHLFVBQUMsV0FBbUI7SUFDMUMsT0FBTztRQUNMLElBQUksRUFBRSxXQUFXO1FBQ2pCLFdBQVcsRUFBRSx5QkFBeUI7S0FDdkMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxPQUFlLEVBQUUsWUFBb0I7SUFBRSxjQUFZO1NBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtRQUFaLDZCQUFZOztJQUV6RSxJQUFBLFdBQVcsR0FTVCxJQUFJLFlBVEssRUFDWCxPQUFPLEdBUUwsSUFBSSxRQVJDLEVBQ1AsV0FBVyxHQU9ULElBQUksWUFQSyxFQUNYLE9BQU8sR0FNTCxJQUFJLFFBTkMsRUFDUCxVQUFVLEdBS1IsSUFBSSxXQUxJLEVBQ1YsT0FBTyxHQUlMLElBQUksUUFKQyxFQUNQLHFCQUFxQixHQUduQixJQUFJLHNCQUhlLEVBQ3JCLG1CQUFtQixHQUVqQixJQUFJLG9CQUZhLEVBQ25CLFlBQVksR0FDVixJQUFJLGFBRE0sQ0FDTDtJQUNULE9BQU87UUFDTCxPQUFPLFNBQUE7UUFDUCxJQUFJLEVBQUUsWUFBWTtRQUNsQixXQUFXLGFBQUE7UUFDWCxPQUFPLEVBQUUsT0FBTyxJQUFJLFVBQVU7UUFDOUIsT0FBTyxFQUFFLE9BQU8sSUFBTyxZQUFZLGFBQVU7UUFDN0MsVUFBVSxFQUFFLFVBQVUsSUFBSSxHQUFHO1FBQzdCLE9BQU8sRUFBRSxPQUFPLElBQUksRUFBRTtRQUN0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