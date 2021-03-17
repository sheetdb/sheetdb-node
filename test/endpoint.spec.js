var sheetdbAPI = require('../');
var assert = require('assert');

var mock = require('xhr-mock');

describe('sheetdb', function() {
  describe('endpoint() function', function() {
    var sheetdb = sheetdbAPI({
      address: '58f61be4dda40',
    });

    it('should run with GET method', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/keys', function(req, res) {
        return res.status(200).body('test');
      });

      return sheetdb.endpoint('keys').then(function(data) {
        assert.equal(data, 'test');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should run with Http Basic Auth', function() {
      mock.setup();
      mock.get('https://sheetdb.io/api/v1/58f61be4dda40/keys', function(req, res) {
        return res.status(200).body(req._headers);
      });

      sheetdbLocal = sheetdbAPI({
        address: '58f61be4dda40',
        auth_login: 'somekey',
        auth_password: 'somesecret',
      });

      return sheetdbLocal.endpoint('keys').then(function(data) {
        assert.equal(data.authorization, "Basic c29tZWtleTpzb21lc2VjcmV0");
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

  });
});
