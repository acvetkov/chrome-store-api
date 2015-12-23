/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import fs from 'q-io/fs';
import path from 'path';
import BB from 'bluebird';
import debug from 'debug';
import * as items from '../webstore/items';

import WebstoreApi from '../webstore/index';
import {toLog} from '../utils/index';

import * as tokenApi from '../token/get';

const clientId = '665558730751-lko6oi13llj1rn31tcr340jfgj35aubf.apps.googleusercontent.com';
const clientSecret = 'aPR82Fdk9JaaG8lYYDfjCh0A';
const code = '4/IYMnCw9fATw9vLoB96Kyce9iChLMzdQygAclSnE4JxA';

const log = debug('app');

/* test update method */

const url = 'https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=665558730751-lko6oi13llj1rn31tcr340jfgj35aubf.apps.googleusercontent.com&redirect_uri=urn:ietf:wg:oauth:2.0:oob';

const extensions = [
    'gilhbeiaolmmgadckeojbjjighoakdij',
    'icmlpabnoonbhllllanlkldifbgecicj',
    'hdfenecdhmohikghkaainloeemamjiml',
    'nlbbgfhhjjkebpfnjaceiahpijliljek',
    'jmpdceamgnfnniaofnbokjcjkpoolmko',
    'dodlanmfanldpnmiemhhemjhidihhajd'
];

/*
fs.read(path.resolve(__dirname, '../../extension.zip'), 'b')
    .then(blob => {
        return BB.each(extensions, extensionId => {
            return upload(extensionId, blob);
        });
    })
    .catch(toLog(log, 'error'));

function upload(extensionId, blob) {
    log(`upload ${extensionId}`);
    return api.update(extensionId, blob)
        .then(toLog(log, 'upload result'))
        .delay(1000);
}
*/

/* const token = 'ya29.PgI8WbkKuvC9wAMO79C2ZKeXYUFF9FkwtRRlKcgnxaUXjXigDvfZ4GCyDUni2X7MHnFv';

items.publish(token, 'gilhbeiaolmmgadckeojbjjighoakdij')
    .then(toLog(log, 'publish result'))
    .catch(toLog(log, 'publish error'));*/

/**
 * {
  "access_token" : "ya29.RQJY8w8cVir0CAv5K5BR6LLVWhbi-U78g39hzZZhxzoAE8LsQ_mDrFIQLE-2eOepppmIjA",
  "token_type" : "Bearer",
  "expires_in" : 3600,
  "refresh_token" : "1/V5mYnkPCkUNeKoGA3gl6tPagG_-b7OFsat_SMxAy8YZIgOrJDtdun6zK6XiATCKT"
}
 */

items.get('ya29.RQJY8w8cVir0CAv5K5BR6LLVWhbi-U78g39hzZZhxzoAE8LsQ_mDrFIQLE-2eOepppmIjA', 'hdfenecdhmohikghkaainloeemamjiml')
    .then(data => console.log(JSON.stringify(data)));

/*tokenApi.getToken(code, clientId, clientSecret)
    .then(data => console.log(data));*/
