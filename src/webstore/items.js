/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import http from 'q-io/http';
import debug from 'debug';
import _ from 'lodash';

import config from '../config/index';
import {toJSON, toLog, verboseIOError} from '../utils/index';

const log = debug('webstore:items');

/**
 * Gets your own Chrome Web Store item. Provide projection="DRAFT" as a URL parameter (case sensitive).
 * @see https://developer.chrome.com/webstore/webstore_api/items/get
 * @param {String} token
 * @param {String} itemId
 * @returns {Promise<ChromeStoreItem>}
 */
export function get(token, itemId) {
    return http.read({
        url: config.API_GET_URL.replace('{itemId}', itemId),
        method: 'GET',
        headers: getHeaders(token)
    })
    .then(toLog(log, 'get'))
    .then(toJSON)
    .catch(verboseIOError(log));
}

/**
 * Inserts a new item.
 * @see https://developer.chrome.com/webstore/webstore_api/items/insert
 * @param {String} token
 * @param {Blob} fileContent
 * @returns {Promise<ChromeStoreItem>}
 */
export function insert(token, fileContent) {
    return http.read({
        url: config.API_UPLOAD_URL,
        method: 'POST',
        headers: getHeaders(token),
        body: [fileContent]
    })
    .then(toLog(log, 'insert'))
    .then(toJSON)
    .catch(verboseIOError(log));
}

/**
 * Updates an existing item.
 * @see https://developer.chrome.com/webstore/webstore_api/items/update
 * @param {String} token
 * @param {String} itemId
 * @param {Blob} fileContent
 * @returns {Promise<ChromeStoreItem>}
 */
export function update(token, itemId, fileContent) {
    return http.read({
        url: `${config.API_UPLOAD_URL}${itemId}`,
        method: 'PUT',
        headers: getHeaders(token),
        body: [fileContent]
    })
    .then(toLog(log, 'update'))
    .then(toJSON)
    .catch(verboseIOError(log));
}

/**
 * Publishes an item. Provide defined publishTarget in URL (case sensitive):
 * publishTarget = "trustedTesters" or publishTarget = "default".
 * @param {String} token
 * @param {String} itemId
 * @returns {Promise<ChromeStorePublishInfo>}
 */
export function publish(token, itemId) {
    return http.read({
        method: 'POST',
        url: config.API_PUBLISH_URL.replace('{itemId}', itemId),
        headers: getHeaders(token)
    })
    .then(toLog(log, 'publish'))
    .then(toJSON)
    .catch(verboseIOError(log));
}

/**
 * Get headers
 * @param {String} token
 * @returns {Object}
 */
function getHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
        'x-goog-api-version': 2
    };
}
