var sheetdbAPI = require('../');
var assert = require('assert');
var mock = require('xhr-mock');
describe('sheetdb', function() {
  describe('contructor', function() {
    it('should throw error when param has no address', function() {
      assert.throws(function() {
        sheetdbAPI();
      }, Error);
    });

    it('should not throw error when param has valid address', function() {
      mock.get('https://sheetdb.io', function(req, res) {
        return res.status(200).body('<h1>SheetDB</h1>');
      });

      assert.doesNotThrow(function() {
        sheetdbAPI({
          address: 'https://sheetdb.io',
        });
      }, Error);
    });

    it('should throw error when wrong address', function() {
      mock.get('http://differentAddr', function(req, res) {
        return res.status(200).body('<h1>SheetDB</h1>');
      });

      assert.throws(function() {
        sheetdbAPI({
          address: 'https://differentAddr',
        });
      }, Error);
    });

    it('should valid correct address when only id is available', function() {
      mock.get('https://sheetdb.io', function(req, res) {
        return res.status(200).body('<h1>SheetDB</h1>');
      });

        var sheetdb = sheetdbAPI({
          address: 'sddfsjh34f3dsa',
        });

        assert.equal(sheetdb.config.address, 'https://sheetdb.io/api/v1/sddfsjh34f3dsa');
    });

    it('should valid correct address when only id is available and different API version', function() {
      mock.get('https://sheetdb.io', function(req, res) {
        return res.status(200).body('<h1>SheetDB</h1>');
      });

        var sheetdb = sheetdbAPI({
          address: 'sddfsjh34f3dsa',
          version: '2.1',
        });

        assert.equal(sheetdb.config.address, 'https://sheetdb.io/api/v2.1/sddfsjh34f3dsa');
    });

    it('should use only secure connections (https://)', function() {
      assert.doesNotThrow(function() {
        sheetdbAPI({
          address: 'https://sheetdb.io',
        });
      }, Error);
    });

    it('should throw error when not secure connections (https://)', function() {
      assert.throws(function() {
        sheetdbAPI({
          address: 'http://sheetdb.io',
        });
      }, Error);
    });

    //
    // it('should use correct User-Agent header when different version of API', function() {
    //   assert.doesNotThrow(function() {
    //     sheetdbAPI({
    //       address: 'https://sheetdb.io',
    //       version: '1.2',
    //     });
    //   }, Error);
    // });
    //
    // it('should use Basic Authentication when auth_login and auth_password available', function() {
    //   assert.doesNotThrow(function() {
    //     sheetdbAPI({
    //       address: 'https://sheetdb.io',
    //       auth_login: '3434',
    //       auth_password: '63532',
    //     });
    //   }, Error);
    // });

  });
});
