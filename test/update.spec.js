var sheetdbAPI = require('../');
var assert = require('assert');

var mock = require('xhr-mock');

describe('sheetdb', function() {
  describe('update() function', function() {
    var sheetdb = sheetdbAPI({
      address: '58f61be4dda40',
    });

    it('should run with PATCH method', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(200).body('test');
      });

      return sheetdb.update('column', 'test', undefined).then(function(data) {
        assert.equal(data, 'test');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should run with Http Basic Auth', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(200).body(req._headers);
      });

      sheetdbLocal = sheetdbAPI({
        address: '58f61be4dda40',
        auth_login: 'somekey',
        auth_password: 'somesecret',
      });

      return sheetdbLocal.update('column', 'test', undefined, false).then(function(data) {
        assert.equal(data.authorization, "Basic c29tZWtleTpzb21lc2VjcmV0");
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with correct headers', function() {
      mock.setup();
      mock.put('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(200).body(req._headers);
      });

      return sheetdb.update('column', 'test', undefined).then(function(data) {
        assert.equal(data["accept"], "application/vnd.sheetdb.3+json");
        assert.equal(data["content-type"], "application/json");
        assert.equal(data["x-user-agent"], "SheetDB-Node/1");
      }, function(err) {}).then(function(){
        mock.teardown();
      });
    });



    it('should run with column name and value', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(200).body(req);
      });
      return sheetdb.update('column', 'test', undefined).then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40/column/test');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should throw error when no column param', function() {
      mock.setup();

      return sheetdb.update().then(function(data){
        assert.fail('sheetdb do not throw error');
      }, function(err) {
        assert.equal(err, 'no column name');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with array data', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(200).body('{"test":3}');
      });

      return sheetdb.update('column', 'test', {test: 3}).then(function(data){
        assert.equal(data, '{"test":3}');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url different Sheet', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test?sheet=Sheet2', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.update('column', 'test', {}, 'Sheet2').then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40/column/test?sheet=Sheet2');
      }, function(err) {
        assert.fail('sheetdb throw error');
      });
    });

    it('should return error when 404', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(404).body(req._xhr);
      });

      return sheetdb.update('column', 'test', {}, false).then(function(data) {
        assert.equal(data.status, 404);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 429', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(429).body(req._xhr);
      });

      return sheetdb.delete('column', 'test', {}, false).then(function(data) {
        assert.equal(data.status, 429);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 403', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(403).body(req._xhr);
      });

      return sheetdb.delete('column', 'test', {}, false).then(function(data) {
        assert.equal(data.status, 403);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });


    it('should return error when 409', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(409).body(req._xhr);
      });

      return sheetdb.delete('column', 'test', {}, false).then(function(data) {
        assert.fail('sheetdb throw error');
      }, function(err) {

      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 401', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(401).body(req._xhr);
      });

      return sheetdb.delete('column', 'test', {}, false).then(function(data) {
        assert.equal(data.status, 401);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 500', function() {
      mock.setup();
      mock.patch('https://sheetdb.io/api/v1/58f61be4dda40/column/test', function(req, res) {
        return res.status(500).body(req._xhr);
      });

      return sheetdb.delete('column', 'test', {}, false).then(function(data) {
        assert.equal(data.status, 500);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

  });
});
