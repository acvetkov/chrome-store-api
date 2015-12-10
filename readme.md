## Chrome store api

Chrome webstore [Api](https://developer.chrome.com/webstore/using_webstore_api) for Node.js

### install

```bash
npm install chrome-store-api
```

### usage

```js

var WebstoreApi = require('chrome-store-api');

var code = 'app-code';
var clientId = 'your-client-id';
var clientSecret = 'your-client-secret';

var api = new WebstoreApi(code, clientId, clientSecret);
```

#### get item info

```js
api.get('extensiond-id')
   .then(function (data) {
      console.log(data);
   })
   .catch(function (err) {
      console.log(err);
   });
```

#### insert new item

```js
var fs = require('q-io/fs');

fs.read('path/to/extension.zip', 'b')
   .then(function (blob) {
      return api.insert(blob);
   })
   .then(function (data) {
       console.log(data); // new item info
   })
   .catch(function (err) {
      console.log(err);
   });
```

#### update existing item

```js
var fs = require('q-io/fs');

fs.read('path/to/extension.zip', 'b')
   .then(function (blob) {
      return api.update('extension-id', blob);
   })
   .then(function (data) {
       console.log(data); // item info
   })
   .catch(function (err) {
      console.log(err);
   });
```

#### publish item

```js
api.publish('extension-id')
   .then(function (data) {
      console.log(data);
   })
   .catch(function (err) {
      console.log(err);
   });
```
