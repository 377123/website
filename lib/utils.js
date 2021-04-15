"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCertInfo = exports.parseUaFilter = exports.parseIpFilter = exports.parseReferer = exports.sleep = exports.parseDomain = void 0;
var interface_1 = require("./interface");
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
            serverCertificateStatus: params.switch,
        };
    }
    if (params.certType === 'upload') {
        return {
            certType: params.certType,
            serverCertificateStatus: params.switch,
            certName: params.certName,
            serverCertificate: params.serverCertificate,
            privateKey: params.privateKey,
        };
    }
    if (params.certType === 'csr') {
        return {
            certType: params.certType,
            serverCertificateStatus: params.switch,
            serverCertificate: params.serverCertificate,
        };
    }
    return {
        certType: 'free',
        serverCertificateStatus: 'on',
    };
}
exports.parseCertInfo = parseCertInfo;
// TODO: 专门针对publish.yaml来处理default字段。不需要每次都都手动处理
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQWlHO0FBRXBGLFFBQUEsV0FBVyxHQUFHLFVBQUMsTUFBYztJQUN4QyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLE9BQU87UUFDTCxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDOUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNyRCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsU0FBZ0IsS0FBSyxDQUFDLElBQUk7SUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRkQsc0JBRUM7QUFFRCxTQUFnQixZQUFZLENBQUMsTUFBZ0I7SUFDbkMsSUFBQSxJQUFJLEdBQXdCLE1BQU0sS0FBOUIsRUFBRSxVQUFVLEdBQVksTUFBTSxXQUFsQixFQUFFLEtBQUssR0FBSyxNQUFNLE1BQVgsQ0FBWTtJQUMzQyxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUU7UUFDeEIsT0FBTztZQUNMLFlBQVksRUFBRSx1QkFBVyxDQUFDLFNBQVM7WUFDbkMsWUFBWSxFQUFFO2dCQUNaO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQ3BDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSx5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