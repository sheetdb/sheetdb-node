## Installation

```
npm install sheetdb-node --save
```

## Usage

### Generating a Client

You need to create a new sheetdb function, and populate it with your SheetDB API URL. You can find this URL on [SheetDB Dashboard](https://sheetdb.io/login).

```js
var sheetdb = require('sheetdb-node');

// create a config file
var config = {
  address: '58f61be4dda40',
};

// Create new client
var client = sheetdb(config);

```
for ES6
```js
import sheetdb from 'sheetdb-node';

// create a config file
var config = {
  address: '58f61be4dda40',
};

// Create new client
var client = sheetdb(config);
```

If you have HTTP Basic Authentication turned on for your API, you should pass `auth_login` and `auth_password` here, like:
```js
// create a config file
var config = {
  address: '58f61be4dda40',
  auth_login: 'BASIC_AUTH_login',
  auth_password: 'BASIC_AUTH_password',
};

// Create new client
var client = sheetdb(config);
```

### CRUD

SheetDB gives you the ability to use full CRUD on your Google Spreadsheet. Remember to populate the first row of every sheet with column names. You can look at [example spreadsheet](https://docs.google.com/spreadsheets/d/1mrsgBk4IAdSs8Ask5H1z3bWYDlPTKplDIU_FzyktrGk/edit).

### Create
[Link to docs](https://docs.sheetdb.io/#post-create-row)

To add data to Google Spreadsheets, send an object or an array of objects.
```js
// Adds single row
client.create({ name: "William", age: 25 }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

/// Adds bunch of rows
rows = [
  { name: "William", age: 25 },
  { name: "Jayden", age: 25 }
]
client.create(rows).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

```

By default, all writes are performed on the first sheet (worksheet). Pass name of a sheet as a 2nd param to add data to other worksheet.
```js
// Adds single row to worksheet named "Sheet3"
client.create({ player: "William", score: 75 }, "Sheet2").then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

```

On success returns a number of created rows.

### Read
[Link to docs](https://docs.sheetdb.io/#get-all-data)

Read the whole sheet
```js
client.read({ limit, offset, search, sheet }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

You can pass attributes with options
  - `limit` - limit number of results
  - `offset` - start from N first record
  - `search` - object with search params [(more below)](#search)
  - `sheet` - get data from named worksheet

```js
// Get first two rows from worksheet named "Sheet2"
client.read({ limit: 2, sheet: "Sheet2" }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

// Get 3rd and 4th record from worksheet named "Sheet2"
client.read({ limit: 2, offset: 2, sheet: 'Sheet2' }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

#### search
[Link to docs](https://docs.sheetdb.io/#get-search-in-document)

To get rows that match search criteria, pass an object with search params

```js
// Get all rows where column 'id' is 'foo' and column 'value' is 'bar'
client.read({ search: { id: "foo", value: "bar" } }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

// Get all rows where column 'First name' is 'Smith' and column 'Score' is '42'
client.read({ search: { 'first name': 'Smith', 'Score': 42 } }).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});


// Get first two rows where column 'player' is 'Smith',
// column 'score' is '41' from sheet named "Sheet2"
client.read({
  limit: 2,
  search: { 'player': 'Smith', 'score': 41 },
  sheet: 'Sheet2'
}).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});

```

On success returns an array of objects.

### Update
[Link to docs](https://docs.sheetdb.io/#patch-put-update)

To update row(s), pass column name and its value which is used to find row(s).

``` js
client.update(columnName, value, newRow, sheet).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

```js
// Update all columns where 'name' is 'Smith' to have 'score' = 99 and 'comment' = 'Griffin'
client.update(
  'name', // column name
  'Smith', // value to search for
  { 'score': 99, 'comment': 'Griffin' } // object with updates
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

To perform `#update` on different than the first sheet, pass sheet name as a 4th argument.
```js
// Update all columns where 'name' is 'Smith' to have 'score' = 99 and 'comment' = 'Griffin'
// In sheet named 'Sheet2'
client.update(
  'name', // column name
  'Smith', // value to search for
  { 'score': 99, 'comment': 'Griffin' }, // object with updates
  'Sheet2'
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

On success returns a number of updated rows.

### Delete
[Link to docs](https://docs.sheetdb.io/#delete)

To delete row(s), pass column name and its value which is used to find row(s).

```js
// Delete all rows where 'name' equals 'Smith'
client.delete(
  'id', // column name
  '1' // value to search for
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

You can pass sheet name as a 3rd argument. All operations are performed on the first sheet, by default.
```js
// Delete all rows where 'foo' equals 'bar' in sheet 'Sheet3'
client.delete(
  player, // column name
  'Smith', // value to search for
  'Sheet2'
).then(function(data) {
  console.log(data);
}, function(err){
  console.log(err);
});
```

## Development

Run all tests:
```
npm test
```

Run a nyan version test:
```
npm run nyan-test
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/sheetdb/sheetdb-node. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Pull Requests

- **Add tests!** Your patch won't be accepted if it doesn't have tests.

- **Create topic branches**. Please, always create a branch with meaningful name. Don't ask us to pull from your master branch.

- **One pull request per feature**. If you want to do more than one thing, please send multiple pull requests.

- **Send coherent history**. Make sure each individual commit in your pull
  request is meaningful. If you had to make multiple intermediate commits while
  developing, please squash them before sending them to us.

### Docs

[SheetDB documentation sits on GitHub](https://github.com/sheetdb/docs). We would love your contributions! We want to make these docs accessible and easy to understand for everyone. Please send us Pull Requests or open issues on GitHub.
