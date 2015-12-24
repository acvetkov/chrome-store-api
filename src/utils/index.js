/**
 * @author https://github.com/acvetkov
 * @overview
 */

import _ from 'lodash';

/**
 * Get query string
 * @param {Object} data
 * @returns {String}
 */
export function serializeParams(data) {
    return _.map(data, (val, key) => `${key}=${val}`).join('&');
}

/**
 * @param {Blob} body
 * @returns {Object}
 */
export function toJSON(body) {
    return parseJSON(body.toString('utf-8'));
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

/**
 * @param {*} data
 * @param {*} [defaultValue]
 * @returns {*}
 */
export function parseJSON(data, defaultValue) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return defaultValue || data;
    }
}

/**
 * Verbose io error
 * @param {Object} response
 * @returns {Promise<Object>}
 */
export function formatResponse(response) {
    const result = {
        status: response.status
    };
    if (response.body) {
        return response.body.read()
            .then(data => _.merge(result, {
                response: parseJSON(data.toString('utf-8'))
            }));
    }
    return Promise.resolve(result);
}

/**
 * Check api errors
 * @param {Object} data
 * @returns {*}
 */
export function checkResponseErrors(data) {
    if (data.status > 299 || data.status < 200) {
        return Promise.reject(data);
    }

    if (_.size(_.get(data, 'response.itemError')) > 0) {
        return Promise.reject(data);
    }

    return data.response;
}
