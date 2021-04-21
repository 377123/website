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
var generateService = function (serviceName) {
    return {
        name: serviceName,
        description: 'Serverless Devs service',
    };
};
var generateFunction = function (codeUri, functionName) {
    var reset = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        reset[_i - 2] = arguments[_i];
    }
    var description = reset.description, runtime = reset.runtime, initializer = reset.initializer, handler = reset.handler, memorySize = reset.memorySize, timeout = reset.timeout, initializationTimeout = reset.initializationTimeout, instanceConcurrency = reset.instanceConcurrency, instanceType = reset.instanceType;
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
exports.generateFcSpec = function (inputs) { return __awaiter(void 0, void 0, void 0, function () {
    var accountID, props, _a, service, codeUri, functions, functionDir, functionPaths;
    return __generator(this, function (_b) {
        accountID = lodash_get_1.default(inputs, 'Credentials.AccountID');
        props = lodash_get_1.default(inputs, 'props', {});
        _a = lodash_get_1.default(inputs, 'props.faas', {}), service = _a.service, codeUri = _a.codeUri, functions = _a.functions;
        if (!functions) {
            functionDir = path_1.default.join(process.cwd(), codeUri);
            if (!fs_extra_1.default.ensureDir(functionDir)) {
                throw new Error(functionDir + " is not exist");
            }
            functionPaths = fs_extra_1.default.readdirSync(functionDir);
            if (functionPaths && functionPaths.length) {
                return [2 /*return*/, Promise.all(functionPaths
                        .filter(function (functionName) { return functionName.indexOf('.js') > -1; })
                        .map(function (name) { return __awaiter(void 0, void 0, void 0, function () {
                        var region, fcDeployFuncion, fcDeploy, result, curRegion, funcName, httpUrl;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    region = props.region;
                                    fcDeployFuncion = {
                                        region: region,
                                        service: generateService(service),
                                        function: generateFunction(codeUri, name.replace('.js', '')),
                                        triggers: generateHttpTriggers(),
                                    };
                                    return [4 /*yield*/, core_1.loadComponent('devsapp/fc-deploy')];
                                case 1:
                                    fcDeploy = _a.sent();
                                    delete inputs.props;
                                    return [4 /*yield*/, fcDeploy.deploy(__assign({ props: fcDeployFuncion }, inputs))];
                                case 2:
                                    result = _a.sent();
                                    curRegion = result.region, funcName = result.function;
                                    httpUrl = accountID + "." + curRegion + ".fc.aliyuncs.com/<version>/proxy/" + service.name + "/" + funcName.name + "/";
                                    return [2 /*return*/, { name: name, httpUrl: httpUrl }];
                            }
                        });
                    }); }))];
            }
        }
        return [2 /*return*/];
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZnVuY3Rpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBMEI7QUFDMUIsOENBQXdCO0FBQ3hCLDhDQUFzRDtBQUN0RCwwREFBNkI7QUFFN0IsSUFBTSxlQUFlLEdBQUcsVUFBQyxXQUFtQjtJQUMxQyxPQUFPO1FBQ0wsSUFBSSxFQUFFLFdBQVc7UUFDakIsV0FBVyxFQUFFLHlCQUF5QjtLQUN2QyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLE9BQWUsRUFBRSxZQUFvQjtJQUFFLGVBQWE7U0FBYixVQUFhLEVBQWIscUJBQWEsRUFBYixJQUFhO1FBQWIsOEJBQWE7O0lBRTFFLElBQUEsV0FBVyxHQVNULEtBQUssWUFUSSxFQUNYLE9BQU8sR0FRTCxLQUFLLFFBUkEsRUFDUCxXQUFXLEdBT1QsS0FBSyxZQVBJLEVBQ1gsT0FBTyxHQU1MLEtBQUssUUFOQSxFQUNQLFVBQVUsR0FLUixLQUFLLFdBTEcsRUFDVixPQUFPLEdBSUwsS0FBSyxRQUpBLEVBQ1AscUJBQXFCLEdBR25CLEtBQUssc0JBSGMsRUFDckIsbUJBQW1CLEdBRWpCLEtBQUssb0JBRlksRUFDbkIsWUFBWSxHQUNWLEtBQUssYUFESyxDQUNKO0lBQ1YsT0FBTztRQUNMLE9BQU8sU0FBQTtRQUNQLElBQUksRUFBRSxZQUFZO1FBQ2xCLFdBQVcsYUFBQTtRQUNYLE9BQU8sRUFBRSxPQUFPLElBQUksVUFBVTtRQUM5QixPQUFPLEVBQUUsT0FBTyxJQUFPLFlBQVksYUFBVTtRQUM3QyxVQUFVLEVBQUUsVUFBVSxJQUFJLEdBQUc7UUFDN0IsT0FBTyxFQUFFLE9BQU8sSUFBSSxFQUFFO1FBQ3RCLHFCQUFxQixFQUFF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