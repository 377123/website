"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceHttpsEnum = exports.parseCertInfo = exports.parseReferer = exports.sleep = exports.parseDomain = void 0;
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
    var refererType = params.refererType, allowEmpty = params.allowEmpty, referers = params.referers;
    if (refererType === 'whitelist') {
        return {
            functionName: 'referer_white_list_set',
            functionArgs: [
                {
                    argName: 'allow_empty',
                    argValue: allowEmpty ? 'on' : 'off',
                },
                {
                    argName: 'refer_domain_allow_list',
                    argValue: referers.join(','),
                },
            ],
        };
    }
    else {
        return {
            functionName: 'referer_black_list_set',
            functionArgs: [
                {
                    argName: 'allow_empty',
                    argValue: allowEmpty ? 'on' : 'off',
                },
                {
                    argName: 'refer_domain_deny_list',
                    argValue: referers.join(','),
                },
            ],
        };
    }
}
exports.parseReferer = parseReferer;
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
var ForceHttpsEnum;
(function (ForceHttpsEnum) {
    ForceHttpsEnum["off"] = "http_force";
    ForceHttpsEnum["on"] = "https_force";
})(ForceHttpsEnum = exports.ForceHttpsEnum || (exports.ForceHttpsEnum = {}));
// TODO: 专门针对publish.yaml来处理default字段。不需要每次都都手动处理
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxXQUFXLEdBQUcsVUFBQyxNQUFjO0lBQ3hDLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsT0FBTztRQUNMLFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUM5QyxZQUFZLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ3JELENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixTQUFnQixLQUFLLENBQUMsSUFBSTtJQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFGRCxzQkFFQztBQUVELFNBQWdCLFlBQVksQ0FBQyxNQUFnQjtJQUNuQyxJQUFBLFdBQVcsR0FBMkIsTUFBTSxZQUFqQyxFQUFFLFVBQVUsR0FBZSxNQUFNLFdBQXJCLEVBQUUsUUFBUSxHQUFLLE1BQU0sU0FBWCxDQUFZO0lBQ3JELElBQUksV0FBVyxLQUFLLFdBQVcsRUFBRTtRQUMvQixPQUFPO1lBQ0wsWUFBWSxFQUFFLHdCQUF3QjtZQUN0QyxZQUFZLEVBQUU7Z0JBQ1o7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztpQkFDcEM7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLHlCQUF5QjtvQkFDbEMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUM3QjthQUNGO1NBQ0YsQ0FBQztLQUNIO1NBQU07UUFDTCxPQUFPO1lBQ0wsWUFBWSxFQUFFLHdCQUF3QjtZQUN0QyxZQUFZLEVBQUU7Z0JBQ1o7b0JBQ0UsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztpQkFDcEM7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLHdCQUF3QjtvQkFDakMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUM3QjthQUNGO1NBQ0YsQ0FBQztLQUNIO0FBQ0gsQ0FBQztBQS9CRCxvQ0ErQkM7QUFFRCxTQUFnQixhQUFhLENBQUMsTUFBaUI7SUFDN0MsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM5QixPQUFPO1lBQ0wsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ3ZDLENBQUM7S0FDSDtJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6Qix1QkFBdUIsRUFBRSxNQUFNLENBQUMsTUFBTTtZQUN0QyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtZQUMzQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7U0FDOUIsQ0FBQztLQUNIO0lBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtRQUM3QixPQUFPO1lBQ0wsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3RDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7U0FDNUMsQ0FBQztLQUNIO0lBQ0QsT0FBTztRQUNMLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLHVCQUF1QixFQUFFLElBQUk7S0FDOUIsQ0FBQztBQUNKLENBQUM7QUE3QkQsc0NBNkJDO0FBRUQsSUFBWSxjQUdYO0FBSEQsV0FBWSxjQUFjO0lBQ3hCLG9DQUFrQixDQUFBO0lBQ2xCLG9DQUFrQixDQUFBO0FBQ3BCLENBQUMsRUFIVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUd6QjtBQUVELGlEQUFpRCJ9