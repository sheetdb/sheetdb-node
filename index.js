// sheetdb = require(sheetdb-node);
// (ES6+) import sheetdb from 'sheetdb-node';
//
// sheetdb.create(newRow, sheet);
// sheetdb.read(limit, offset, search, sheet);
// sheetdb.update(columnName, value, newRow, updateWhole, sheet);
// sheetdb.delete(columnName, value, sheet);

var readFunc = require('./lib/read.js');
var createFunc = require('./lib/create.js');
var updateFunc = require('./lib/update.js');
var deleteFunc = require('./lib/delete.js');
var endpointFunc = require('./lib/endpoint.js');
var validAddress = require('./lib/validAddress.js');
var isURL = require('./lib/isURL.js');


var sheetdbNode = function(config) {
  var configParam = config || {};

  configParam.version = configParam.version || '1';
  configParam.auth_login = configParam.auth_login || '';
  configParam.auth_password = configParam.auth_password || '';

  if(!configParam.address) {
    throw Error('address param needed');
  }

  if(!validAddress(configParam.address)) {
    throw Error('wrong address param.');
  }

  if(!isURL(configParam.address)) {
    configParam.address = 'https://sheetdb.io/api/v' +
      configParam.version + '/' +
      configParam.address;
  }

  var address = configParam.address;

  return {
    config: configParam,
    create: createFunc,
    read: readFunc,
    update: updateFunc,
    delete: deleteFunc,
    endpoint: endpointFunc,
  }
}

module.exports = sheetdbNode;
