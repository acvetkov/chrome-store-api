/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import _ from 'lodash';

/**
 * Get query string
 * @param {Object} data
 * @returns {String}
 */
export function serializeParams(data) {
    return _.map(data, (val, key) => {
        return `${key}=${val}`;
    }).join('&');
}

/**
 * @param {Blob} body
 * @returns {Object}
 */
export function toJSON(body) {
    return JSON.parse(body.toString('utf-8'));
}

/**
 * Proxy log
 * @param {Function} log
 * @param {String} [action]
 * @returns {Function}
 */
export function toLog(log, action = '') {
    return data => {
        if (_.isPlainObject(data)) {
            log(action, data);
        } else {
            log(action, data.toString('utf-8'));
        }
        return data;
    };
}