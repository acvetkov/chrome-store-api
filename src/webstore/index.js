/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import TokenManager from '../token/index';
import * as api from './items';

export default class {

    /**
     * @param {String} code
     * @param {String} clientId
     * @param {String} clientSecret
     */
    constructor (code, clientId, clientSecret) {
        this.tokenManager = new TokenManager(code, clientId, clientSecret);
    }

    /**
     * Publish item in chrome web store
     * @param {String} itemId
     * @returns {Promise<ChromeStorePublishInfo>}
     */
    publish (itemId) {
        return this.tokenManager.get()
            .then(token => {
                return api.publish(token, itemId);
            });
    }

    /**
     * Create new item
     * @param {Blob} content
     * @returns {ChromeStoreItem<ChromeStorePublishInfo>}
     */
    insert (content) {
        return this.tokenManager.get()
            .then(token => {
                return api.insert(token, content);
            });
    }

    /**
     * Update existing item
     * @param {String} itemId
     * @param {Blob} content
     * @returns {ChromeStoreItem<ChromeStorePublishInfo>}
     */
    update (itemId, content) {
        return this.tokenManager.get()
            .then(token => {
                return api.update(token, itemId, content);
            });
    }

    /**
     * Get info about item
     * @param {String} itemId
     * @returns {ChromeStoreItem<ChromeStorePublishInfo>}
     */
    get (itemId) {
        return this.tokenManager.get()
            .then(token => {
                return api.get(token, itemId);
            });
    }
}
