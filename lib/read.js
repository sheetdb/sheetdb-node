var btoa = require('btoa');
if(typeof window === 'undefined') {
  XMLHttpRequest = require('xhr2');
}

module.exports = function(params) {
  var config = this.config,
      params = params ? params : {};

  return new Promise(function(resolve, reject) {

      var limit = params.limit,
          offset = params.offset,
          search = params.search,
          sheet = params.sheet,
          xhr = new XMLHttpRequest(),
          limitSign = (search) ? '&' : '?',
          offsetSign = (search || limit) ? '&' : '?',
          limitParam = (!limit) ? '' : limitSign + 'limit=' + limit,
          offsetParam = (!offset) ? '' : offsetSign + 'offset=' + offset,
          sheetParam = (!sheet) ? '' : offsetSign + 'sheet=' + sheet,
          searchParam = (!search) ? '' : '/search',
          searchKeys = (!search) ? [] : Object.keys(search);

      for (var i = 0; i < searchKeys.length; i++) {
        var searchValue = search[searchKeys[i]];

        if(i === 0){
          searchParam += '?' + searchKeys[i] + '=' + searchValue;
        } else {
          searchParam += '&' + searchKeys[i] + '=' + searchValue;
        }
      }

      var url = config.address + searchParam + limitParam + offsetParam + sheetParam;

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
