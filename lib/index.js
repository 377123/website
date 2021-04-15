"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var lodash_get_1 = __importDefault(require("lodash.get"));
var domain_service_1 = __importDefault(require("./services/domain.service"));
var env_servece_1 = __importDefault(require("./services/env.servece"));
var oss_services_1 = __importDefault(require("./services/oss.services"));
var contants_1 = require("./contants");
var WebsiteComponent = /** @class */ (function () {
    function WebsiteComponent() {
    }
    /**
     * 部署
     * @param inputs
     */
    WebsiteComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, ossConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        credentials = lodash_get_1.default(inputs, 'credentials') || {};
                        core_1.reportComponent('website', {
                            uid: credentials.AccountID,
                            command: 'deploy',
                        });
                        this.logger.debug("[" + lodash_get_1.default(inputs, 'project.projectName') + "] inputs params: " + JSON.stringify(inputs, null, 2));
                        ossConfig = {
                            accessKeyId: credentials.AccessKeyID,
                            accessKeySecret: credentials.AccessKeySecret,
                            bucket: lodash_get_1.default(inputs, 'props.bucket'),
                            region: lodash_get_1.default(inputs, 'props.region'),
                            src: lodash_get_1.default(inputs, 'props.src', contants_1.DEFAULT_SRC),
                            cors: lodash_get_1.default(inputs, 'props.cors'),
                        };
                        return [4 /*yield*/, env_servece_1.default(inputs)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, oss_services_1.default(ossConfig)];
                    case 2:
                        _a.sent();
                        core_1.spinner('OSS静态资源部署成功').succeed();
                        // 挂载域名
                        return [4 /*yield*/, domain_service_1.default(inputs)];
                    case 3:
                        // 挂载域名
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebsiteComponent.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 删除所有用到的资源以及配置等
                console.log(inputs);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.HLogger('WEBSITE'),
        __metadata("design:type", Object)
    ], WebsiteComponent.prototype, "logger", void 0);
    return WebsiteComponent;
}());
exports.default = WebsiteComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBbUY7QUFDbkYsMERBQTZCO0FBQzdCLDZFQUErQztBQUMvQyx1RUFBeUM7QUFDekMseUVBQTBEO0FBQzFELHVDQUF5QztBQUV6QztJQUFBO0lBa0NBLENBQUM7SUFoQ0M7OztPQUdHO0lBQ0csaUNBQU0sR0FBWixVQUFhLE1BQVc7Ozs7Ozt3QkFDaEIsV0FBVyxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDckQsc0JBQWUsQ0FBQyxTQUFTLEVBQUU7NEJBQ3pCLEdBQUcsRUFBRSxXQUFXLENBQUMsU0FBUzs0QkFDMUIsT0FBTyxFQUFFLFFBQVE7eUJBQ2xCLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZixNQUFJLG9CQUFHLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLHlCQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFHLENBQzVGLENBQUM7d0JBQ0ksU0FBUyxHQUFlOzRCQUM1QixXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVc7NEJBQ3BDLGVBQWUsRUFBRSxXQUFXLENBQUMsZUFBZTs0QkFDNUMsTUFBTSxFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQzs0QkFDbkMsTUFBTSxFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQzs0QkFDbkMsR0FBRyxFQUFFLG9CQUFHLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxzQkFBVyxDQUFDOzRCQUMxQyxJQUFJLEVBQUUsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO3lCQUNoQyxDQUFDO3dCQUNGLHFCQUFNLHFCQUFHLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUFqQixTQUFpQixDQUFDO3dCQUNsQixxQkFBTSxzQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFBOzt3QkFBcEIsU0FBb0IsQ0FBQzt3QkFDckIsY0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNqQyxPQUFPO3dCQUNQLHFCQUFNLHdCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQURwQixPQUFPO3dCQUNQLFNBQW9CLENBQUM7Ozs7O0tBQ3RCO0lBRUssaUNBQU0sR0FBWixVQUFhLE1BQVc7OztnQkFDdEIsaUJBQWlCO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O0tBQ3JCO0lBaENtQjtRQUFuQixjQUFPLENBQUMsU0FBUyxDQUFDOztvREFBaUI7SUFpQ3RDLHVCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7a0JBbENvQixnQkFBZ0IifQ==