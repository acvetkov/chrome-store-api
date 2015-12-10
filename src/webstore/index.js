/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import debug from 'debug';

import {checkResponseErrors, toLog} from '../utils/index';
import * as itemsApi from './items';

const log = debug('api');

export default class {

    /**
     * @param {TokenManager} tokenManager
     */
    constructor (tokenManager) {
        this.tokenManager = tokenManager;
    }

    /**
     * Publish item in chrome web store
     * @param {String} itemId
     * @returns {Promise<ChromeStorePublishInfo>}
     */
    publish (itemId) {
        return this.tokenManager.get()
            .then(token => itemsApi.publish(token, itemId))
            .then(checkResponseErrors)
            .then(toLog(log, 'publish'));
    }

    /**
     * Create new item
     * @param {Blob} content
     * @returns {Promise<ChromeStoreItem>}
     */
    insert (content) {
        return this.tokenManager.get()
            .then(token => itemsApi.insert(token, content))
            .then(checkResponseErrors)
            .then(toLog(log, 'insert'));
    }

    /**
     * Update existing item
     * @param {String} itemId
     * @param {Blob} content
     * @returns {Promise<ChromeStoreItem>}
     */
    update (itemId, content) {
        return this.tokenManager.get()
            .then(token => itemsApi.update(token, itemId, content))
            .then(checkResponseErrors)
            .then(toLog(log, 'update'));
    }

    /**
     * Get info about item
     * @param {String} itemId
     * @returns {Promise<ChromeStoreItem>}
     */
    get (itemId) {
        return this.tokenManager.get()
            .then(token => itemsApi.get(token, itemId))
            .then(checkResponseErrors)
            .then(toLog(log, 'get'));
    }
}
