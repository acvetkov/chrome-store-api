/**
 * @author https://github.com/acvetkov
 * @overview
 */

import http from '@hypnosphi/q-io/http';
import debug from 'debug';

import config from '../config/index';
import {toLog, formatResponse} from '../utils/index';

const log = debug('webstore:items');

/**
 * Gets your own Chrome Web Store item. Provide projection="DRAFT" as a URL parameter (case sensitive).
 * @see https://developer.chrome.com/webstore/webstore_api/items/get
 * @param {String} token
 * @param {String} itemId
 * @returns {Promise<ChromeStoreItem>}
 */
export function get(token, itemId) {
    return http.request({
        url: config.API_GET_URL.replace('{itemId}', itemId),
        method: 'GET',
        headers: getHeaders(token)
    })
    .then(formatResponse)
    .then(toLog(log, 'get'));
}

/**
 * Inserts a new item.
 * @see https://developer.chrome.com/webstore/webstore_api/items/insert
 * @param {String} token
 * @param {Blob} fileContent
 * @returns {Promise<ChromeStoreItem>}
 */
export function insert(token, fileContent) {
    return http.request({
        url: config.API_UPLOAD_URL,
        method: 'POST',
        headers: getHeaders(token),
        body: [fileContent]
    })
    .then(formatResponse)
    .then(toLog(log, 'insert'));
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
    return http.request({
        url: `${config.API_UPLOAD_URL}${itemId}`,
        method: 'PUT',
        headers: getHeaders(token),
        body: [fileContent]
    })
    .then(formatResponse)
    .then(toLog(log, 'update'));
}

/**
 * Publishes an item. Provide defined publishTarget in URL (case sensitive):
 * publishTarget = "trustedTesters" or publishTarget = "default".
 * @param {String} token
 * @param {String} itemId
 * @param {String} target
 * @returns {Promise<ChromeStorePublishInfo>}
 */
export function publish(token, itemId, target) {
    return http.request({
        method: 'POST',
        url: config.API_PUBLISH_URL.replace('{itemId}', itemId)
            + (target === 'trusted' ? '?publishTarget=trustedTesters' : ''),
        headers: getHeaders(token)
    })
    .then(formatResponse)
    .then(toLog(log, 'publish'));
}

/**
 * Get headers
 * @param {String} token
 * @returns {Object}
 */
function getHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
        'x-goog-api-version': 2,
    };
}
