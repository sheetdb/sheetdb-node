var btoa = require('btoa');
if(typeof window != 'undefined') {
  XMLHttpRequest = require('xhr2');
}

module.exports = function(endpoint, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var sheetParam = (!sheet) ? '' : '?sheet=' + sheet;

    var url = config.address + '/' + endpoint + sheetParam;

    xhr.open('GET', url, true);
    xhr.setRequestHeader("Accept", "application/vnd.sheetdb.3+json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-User-Agent", "SheetDB-Node/"+config.version);

    if (config.auth_login && config.auth_password) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(config.auth_login+":"+config.auth_password));
    }

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };
    xhr.send();
  });
}
