var sheetdbAPI = require('../');
var assert = require('assert');

var mock = require('xhr-mock');

describe('sheetdb', function() {
  describe('read() function', function() {
    var sheetdb = sheetdbAPI({
      address: '58f61be4dda40',
    });

    it('should run with GET method', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(200).body('test');
      });

      return sheetdb.read({}).then(function(data) {
        assert.equal(data, 'test');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should run with Http Basic Auth', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(200).body(req._headers);
      });

      sheetdbLocal = sheetdbAPI({
        address: '58f61be4dda40',
        auth_login: 'somekey',
        auth_password: 'somesecret',
      });

      return sheetdbLocal.read().then(function(data) {
        assert.equal(data.authorization, "Basic c29tZWtleTpzb21lc2VjcmV0");
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with correct headers', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(200).body(req._headers);
      });

      return sheetdb.read().then(function(data) {
        assert.equal(data["accept"], "application/vnd.sheetdb.3+json");
        assert.equal(data["content-type"], "application/json");
        assert.equal(data["x-user-agent"], "SheetDB-Node/1");
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url without limit and offset', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(200).body(req);
      });
      return sheetdb.read().then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url with limit', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40?limit=5', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.read({ limit: 5 }).then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40?limit=5');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url with offset', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40?offset=10', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.read({ offset: 10 }).then(function(data) {
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40?offset=10');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url with offset and limit', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40?limit=5&offset=10', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.read({ limit: 5, offset: 10 }).then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40?limit=5&offset=10');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to search', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/search?name=test&foo=bar', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.read({ search: {name: 'test', foo: 'bar'} }).then(function(data) {
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40/search?name=test&foo=bar');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to search with limit', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/search?name=test&foo=bar&limit=5', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.read({ limit: 5, search: {name: 'test', foo: 'bar'} }).then(function(data) {
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40/search?name=test&foo=bar&limit=5');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to use different sheet', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40?sheet=Sheet2', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.read({ sheet: 'Sheet2' }).then(function(data) {
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40?sheet=Sheet2');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to use different sheet when limit set', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40?limit=6&sheet=Sheet2', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.read({ limit: 6, sheet: 'Sheet2' }).then(function(data) {
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40?limit=6&sheet=Sheet2');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to use all attributes together', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/search?id=1&limit=1&offset=1&sheet=Sheet2', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.read({ search: {id: 1}, limit: 1, offset: 1, sheet: 'Sheet2' }).then(function(data) {
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40/search?id=1&limit=1&offset=1&sheet=Sheet2');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 404', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(404).body(req);
      });

      return sheetdb.read().then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 429', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(429).body(req);
      });

      return sheetdb.read().then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 403', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(403).body(req);
      });

      return sheetdb.read().then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 401', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(401).body(req);
      });

      return sheetdb.read().then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 500', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(500).body(req);
      });

      return sheetdb.read().then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });
  });
});
