[![Build Status](https://travis-ci.org/acvetkov/chrome-store-api.svg?branch=master)](https://travis-ci.org/acvetkov/chrome-store-api)

## Chrome store api

Chrome webstore [Api](https://developer.chrome.com/webstore/using_webstore_api) for Node.js

### install

```bash
npm install chrome-store-api
```

### usage

```js
var WebstoreApi = require('chrome-store-api').Webstore;
var TokenManager = require('chrome-store-api').TokenManager;

var code = 'app-code';
var clientId = 'your-client-id';
var clientSecret = 'your-client-secret';

var tokenManager = new TokenManager(code, clientId, clientSecret);
var api = new WebstoreApi(tokenManager);
```

#### Storage

You can use storage for save token data between sessions.

```js
var WebstoreApi = require('chrome-store-api').Webstore;
var TokenManager = require('chrome-store-api').TokenManager;
var FileStorage = require('chrome-store-api/storage');

var code = 'app-code';
var clientId = 'your-client-id';
var clientSecret = 'your-client-secret';

var storage = new FileStorage('data.json');

// you can use every storage module, which implements IStorage interface
var tokenManager = new TokenManager(code, clientId, clientSecret, storage);
var api = new WebstoreApi(tokenManager);
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
