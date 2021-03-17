var sheetdbAPI = require('../');
var assert = require('assert');

var mock = require('xhr-mock');

describe('sheetdb', function() {
  describe('create()', function() {
    var sheetdb = sheetdbAPI({
      address: '58f61be4dda40',
    });

    it('should run with POST method', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(201).body('test');
      });

      return sheetdb.create({}).then(function(data) {
        assert.equal(data, 'test');
      }, function(err) {
        console.log(err)
        assert.fail('sheetdb throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should run with Http Basic Auth', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(201).body(req._headers);
      });

      sheetdbLocal = sheetdbAPI({
        address: '58f61be4dda40',
        auth_login: 'somekey',
        auth_password: 'somesecret',
      });

      return sheetdbLocal.create({}).then(function(data) {
        assert.equal(data.authorization, "Basic c29tZWtleTpzb21lc2VjcmV0");
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with correct headers', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(201).body(req._headers);
      });

      return sheetdb.create({}).then(function(data) {
        assert.equal(data["accept"], "application/vnd.sheetdb.3+json");
        assert.equal(data["content-type"], "application/json");
        assert.equal(data["x-user-agent"], "SheetDB-Node/1");
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with object data', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(201).body('{"some":5}');
      });

      return sheetdb.create({some: 5}).then(function(data){
        assert.equal(data, '{"some":5}');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with array data', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(201).body('{"rows":[{},{"test":3}]}');
      });

      return sheetdb.create([{}, {test: 3}]).then(function(data){
        assert.equal(data, '{"rows":[{},{"test":3}]}');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return correct url', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40', function(req, res) {
        return res.status(201).body(req);
      });

      return sheetdb.create({}).then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url different Sheet', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40?sheet=Sheet2', function(req, res) {
        return res.status(201).body(req);
      });

      return sheetdb.create({}, 'Sheet2').then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/58f61be4dda40?sheet=Sheet2');
      }, function(err) {
        assert.fail('sheetdb throw error');
      });
    });

    it('should return error when 404', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(404).body(req);
      });

      return sheetdb.create({}).then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 429', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(429).body(req);
      });

      return sheetdb.create({}).then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 403', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(403).body(req);
      });

      return sheetdb.create({}).then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 401', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(401).body(req);
      });

      return sheetdb.create({}).then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 500', function() {
      mock.setup();
      mock.post('https://sheetdb.io/api/v1/58f61be4dda40/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(500).body(req);
      });

      return sheetdb.create({}).then(function(data) {
        assert.fail('sheetdb does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

  });
});
