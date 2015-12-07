/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import Promise from 'bluebird';
import debug from 'debug';

import {toLog} from '../utils/index';
import {getToken, refreshToken} from './get';

const log = debug('TokenManager');

export default class TokenManager {

    /**
     * @param {String} code
     * @param {String} clientId
     * @param {String} clientSecret
     * @param {IStorage} [tokenStorage]
     */
    constructor (code, clientId, clientSecret, tokenStorage) {
        /**
         * @type {null|TokenData}
         */
        this.data = null;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.code = code;
        this.storage = tokenStorage;
        toLog(log)({clientId, clientSecret, code, tokenStorage});
    }

    /**
     * Get token
     * @returns {Promise<String>}
     */
    get () {
        if (this.data) {
            log('returns stored token', this.data.access_token);
            return Promise.resolve(this.data.access_token);
        }
        return this._getToken();
    }

    /**
     * Refresh token
     * @returns {Promise<String>}
     */
    refresh () {
        log('refresh token');
        if (this.data.refresh_token) {
            return refreshToken(this.data.refresh_token, this.clientId, this.clientSecret)
                .then(toLog(log, 'refresh'))
                .then(data => {
                    this.data = data;
                    return this.data.access_token;
                });
        }
    }

    /**
     * Get token from storage or server
     * @returns {Promise<String>}
     * @private
     */
    _getToken () {
        return this._getFromStorage()
            .then(token => {
                if (!token) {
                    return this._getNewToken();
                }
                return token;
            });
    }

    /**
     * get token from storage
     * @returns {Promise<TokenData>}
     * @private
     */
    _getFromStorage () {
        if (this.storage) {
            log('get from storage');
            return this.storage.get(this.code)
                .then(data => {
                    if (data) {
                        this.data = data;
                        return data.access_token;
                    }
                });
        }
        return Promise.resolve();
    }

    /**
     * Get new token from accounts.google.com
     * @returns {Promise.<String>}
     * @private
     */
    _getNewToken () {
        log('get new token');
        return getToken(this.code, this.clientId, this.clientSecret)
            .then(toLog(log))
            .then(data => this.data = data)
            .then(data => this._saveToStorage(data))
            .then(() => this.data.access_token);
    }

    /**
     * Save token data to storage
     * @param {TokenData} data
     * @returns {Promise}
     * @private
     */
    _saveToStorage (data) {
        if (this.storage) {
            log('save to storage');
            return this.storage.set(this.code, data.access_token, data.refresh_token);
        }
        return Promise.resolve();
    }
}
