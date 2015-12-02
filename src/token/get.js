/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import http from 'q-io/http';
import debug from 'debug';

import config from '../config/index';
import {serializeParams, toJSON, toLog} from '../utils/index';

const log = debug('token');

/**
 * @param {String} code
 * @param {String} clientId
 * @param {String} clientSecret
 */
export function getToken(code, clientId, clientSecret) {
    const body = serializeParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob'
    });

    return http.read({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        url: config.ACCOUNTS_URL,
        body: [body]
    })
    .then(toLog(log, 'getToken'))
    .then(toJSON);
}

/**
 * Refresh token
 * @param {String} rt
 * @param {String} clientId
 * @param {String} clientSecret
 * @returns {Promise<Object>}
 */
export function refreshToken(rt, clientId, clientSecret) {
    const body = serializeParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: rt
    });
    return http.read({
        method: 'POST',
        url: config.ACCOUNTS_URL,
        body: [body]
    })
    .then(toLog(log, 'refreshToken'))
    .then(toJSON);
}
