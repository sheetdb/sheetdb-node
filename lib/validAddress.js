module.exports = function(address) {
  var pattern = new RegExp("^https:\/\/sheetdb.io");
  var res = pattern.test(address);

  return res || address.indexOf('http') === -1 ;
}
