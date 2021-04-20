"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOptimization = exports.parseCertInfo = exports.parseUaFilter = exports.parseIpFilter = exports.parseReferer = exports.sleep = exports.parseDomain = void 0;
var interface_1 = require("./interface");
var lodash_get_1 = __importDefault(require("lodash.get"));
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
// TODO: 专门针对publish.yaml来处理default字段。不需要每次都都手动处理
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUNBUXFCO0FBQ3JCLDBEQUE2QjtBQUVoQixRQUFBLFdBQVcsR0FBRyxVQUFDLE1BQWM7SUFDeEMsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixPQUFPO1FBQ0wsU0FBUyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzlDLFlBQVksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDckQsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLFNBQWdCLEtBQUssQ0FBQyxJQUFJO0lBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUZELHNCQUVDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLE1BQWdCO0lBQ25DLElBQUEsSUFBSSxHQUF3QixNQUFNLEtBQTlCLEVBQUUsVUFBVSxHQUFZLE1BQU0sV0FBbEIsRUFBRSxLQUFLLEdBQUssTUFBTSxNQUFYLENBQVk7SUFDM0MsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1FBQ3hCLE9BQU87WUFDTCxZQUFZLEVBQUUsdUJBQVcsQ0FBQyxTQUFTO1lBQ25DLFlBQVksRUFBRTtnQkFDWjtvQkFDRSxPQUFPLEVBQUUsYUFBYTtvQkFDdEIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO2lCQUNwQztnQkFDRDtv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