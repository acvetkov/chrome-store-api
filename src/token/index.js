/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import Promise from 'bluebird';
import debug from 'debug';

import {toLog} from '../utils/index';
import {getToken} from './get';

const log = debug('TokenManager');

export default class TokenManager {

    /**
     * @param {String} code
     * @param {String} clientId
     * @param {String} clientSecret
     */
    constructor (code, clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.code = code;

        toLog(log)({
            clientId: clientId,
            clientSecret: clientSecret,
            code: code
        });

        this.token = null;
        this.refreshToken = null;
    }

    /**
     * Get token
     * @returns {Promise<String>}
     */
    get () {
        if (this.token) {
            log('returns stored token', this.token);
            return Promise.resolve(this.token);
        }
        return this._getToken();
    }

    /**
     * Get token from server
     * @returns {Promise<String>}
     * @private
     */
    _getToken () {
        log('get new token');
        return getToken(this.code, this.clientId, this.clientSecret)
            .then(toLog(log))
            .then(data => {
                this.token = data.access_token;
                this.refreshToken = data.refresh_token;
                return this.token;
            });
    }
}
