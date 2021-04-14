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
var ali_oss_1 = __importDefault(require("ali-oss"));
var core_1 = require("@serverless-devs/core");
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var contants_1 = require("./contants");
var walk_sync_1 = __importDefault(require("walk-sync"));
exports.default = (function (ossConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var bucket, region, accessKeyId, accessKeySecret, staticPath, pages, cors, referer, ossClient, location;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucket = ossConfig.bucket, region = ossConfig.region, accessKeyId = ossConfig.accessKeyId, accessKeySecret = ossConfig.accessKeySecret, staticPath = ossConfig.staticPath, pages = ossConfig.pages, cors = ossConfig.cors, referer = ossConfig.referer;
                ossClient = new ali_oss_1.default({
                    bucket: bucket,
                    region: "oss-" + region,
                    accessKeyId: accessKeyId,
                    accessKeySecret: accessKeySecret,
                });
                // bucket, 不存在此bucket,则创建: 并且加上权限
                return [4 /*yield*/, getOrCreateBucket(ossClient, bucket)];
            case 1:
                // bucket, 不存在此bucket,则创建: 并且加上权限
                _a.sent();
                return [4 /*yield*/, ossClient.getBucketLocation(bucket)];
            case 2:
                location = _a.sent();
                ossClient = new ali_oss_1.default({
                    bucket: bucket,
                    region: location.location,
                    accessKeyId: accessKeyId,
                    accessKeySecret: accessKeySecret,
                });
                // 文件上传
                return [4 /*yield*/, put(ossClient, staticPath)];
            case 3:
                // 文件上传
                _a.sent();
                // 配置静态托管
                return [4 /*yield*/, ossClient.putBucketWebsite(bucket, pages)];
            case 4:
                // 配置静态托管
                _a.sent();
                if (!cors) return [3 /*break*/, 6];
                return [4 /*yield*/, ossClient.putBucketCORS(bucket, [cors])];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: 
            // HTTP Referer 白名单配置，用于防止他人盗用 OSS 数据
            return [4 /*yield*/, ossClient.putBucketReferer(bucket, referer.allowEmpty, referer.referers)];
            case 7:
                // HTTP Referer 白名单配置，用于防止他人盗用 OSS 数据
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function put(ossClient, staticPath) {
    return __awaiter(this, void 0, void 0, function () {
        var paths, _i, paths_1, p, fillPath, stat, spin, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paths = walk_sync_1.default(staticPath);
                    _i = 0, paths_1 = paths;
                    _a.label = 1;
                case 1:
                    if (!(_i < paths_1.length)) return [3 /*break*/, 6];
                    p = paths_1[_i];
                    fillPath = path_1.default.resolve(staticPath, p);
                    stat = fs_extra_1.default.statSync(fillPath);
                    if (!stat.isFile()) return [3 /*break*/, 5];
                    spin = core_1.spinner("\u4E0A\u4F20 " + p);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, ossClient.put(p, fillPath)];
                case 3:
                    _a.sent();
                    spin.succeed();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    spin.fail();
                    throw new Error(error_1.message);
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getOrCreateBucket(ossClient, bucket) {
    return __awaiter(this, void 0, void 0, function () {
        var acl, error_2, vm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 11]);
                    return [4 /*yield*/, ossClient.getBucketInfo(bucket)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ossClient.getBucketACL(bucket)];
                case 2:
                    acl = (_a.sent()).acl;
                    if (!(acl !== 'public-read')) return [3 /*break*/, 4];
                    return [4 /*yield*/, ossClient.putBucketACL(bucket, 'public-read')];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 11];
                case 5:
                    error_2 = _a.sent();
                    if (!(error_2.code == 'NoSuchBucket')) return [3 /*break*/, 9];
                    vm = core_1.spinner("Create " + bucket + " bucket");
                    return [4 /*yield*/, ossClient.putBucket(bucket)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, ossClient.putBucketACL(bucket, 'public-read')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, ossClient.putBucketCORS(bucket, contants_1.PUT_BUCKET_CORS)];
                case 8:
                    _a.sent();
                    vm.succeed();
                    return [3 /*break*/, 10];
                case 9: throw new Error(error_2.message);
                case 10: return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXBsb3kuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdDO0FBQ2hDLDhDQUFnRDtBQUNoRCw4Q0FBd0I7QUFDeEIsc0RBQTBCO0FBQzFCLHVDQUE2QztBQUM3Qyx3REFBaUM7QUEyQmpDLG1CQUFlLFVBQU8sU0FBcUI7Ozs7O2dCQUd2QyxNQUFNLEdBUUosU0FBUyxPQVJMLEVBQ04sTUFBTSxHQU9KLFNBQVMsT0FQTCxFQUNOLFdBQVcsR0FNVCxTQUFTLFlBTkEsRUFDWCxlQUFlLEdBS2IsU0FBUyxnQkFMSSxFQUNmLFVBQVUsR0FJUixTQUFTLFdBSkQsRUFDVixLQUFLLEdBR0gsU0FBUyxNQUhOLEVBQ0wsSUFBSSxHQUVGLFNBQVMsS0FGUCxFQUNKLE9BQU8sR0FDTCxTQUFTLFFBREosQ0FDSztnQkFFVixTQUFTLEdBQUcsSUFBSSxpQkFBUyxDQUFDO29CQUM1QixNQUFNLFFBQUE7b0JBQ04sTUFBTSxFQUFFLFNBQU8sTUFBUTtvQkFDdkIsV0FBVyxhQUFBO29CQUNYLGVBQWUsaUJBQUE7aUJBQ2hCLENBQUMsQ0FBQztnQkFFSCxpQ0FBaUM7Z0JBQ2pDLHFCQUFNLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBQTs7Z0JBRDFDLGlDQUFpQztnQkFDakMsU0FBMEMsQ0FBQztnQkFFMUIscUJBQU0sU0FBUyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFBOztnQkFBcEQsUUFBUSxHQUFHLFNBQXlDO2dCQUMxRCxTQUFTLEdBQUcsSUFBSSxpQkFBUyxDQUFDO29CQUN4QixNQUFNLFFBQUE7b0JBQ04sTUFBTSxFQUFFLFFBQVEsQ0FBQyxRQUFRO29CQUN6QixXQUFXLGFBQUE7b0JBQ1gsZUFBZSxpQkFBQTtpQkFDaEIsQ0FBQyxDQUFDO2dC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