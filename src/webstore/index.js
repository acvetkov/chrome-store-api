/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import TokenManager from '../token/index';
import * as itemsApi from './items';

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
            .then(token => itemsApi.publish(token, itemId));
    }

    /**
     * Create new item
     * @param {Blob} content
     * @returns {ChromeStoreItem<ChromeStorePublishInfo>}
     */
    insert (content) {
        return this.tokenManager.get()
            .then(token => itemsApi.insert(token, content));
    }

    /**
     * Update existing item
     * @param {String} itemId
     * @param {Blob} content
     * @returns {ChromeStoreItem<ChromeStorePublishInfo>}
     */
    update (itemId, content) {
        return this.tokenManager.get()
            .then(token => itemsApi.update(token, itemId, content));
    }

    /**
     * Get info about item
     * @param {String} itemId
     * @returns {ChromeStoreItem<ChromeStorePublishInfo>}
     */
    get (itemId) {
        return this.tokenManager.get()
            .then(token => itemsApi.get(token, itemId));
    }
}
