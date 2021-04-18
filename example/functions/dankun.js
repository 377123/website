const getRawBody = require('raw-body');
const getFormBody = require('body/form');
const body = require('body');


/*
To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
please implement the initializer function as below：
exports.initializer = (context, callback) => {
  console.log('initializing');
  callback(null, '');
};
*/

exports.handler = (req, resp, context) => {
  console.log('hello world');

  const params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method: req.method,
    requestURI: req.url,
    clientIP: req.clientIP,
  };

  getRawBody(req, (err, body) => {
    for (const key in req.queries) {
      const value = req.queries[key];
      resp.setHeader(key, value);
    }
    params.body = body.toString();
    resp.send(JSON.stringify(params, null, '    '));
  });

  /*
    getFormBody(req, function(err, formBody) {
        for (var key in req.queries) {
          var value = req.queries[key];
          resp.setHeader(key, value);
        }
        params.body = formBody;
        console.log(formBody);
        resp.send(JSON.stringify(params));
    });
    */
};
