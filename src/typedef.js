/**
 * @author https://github.com/acvetkov
 * @overview
 */

/**
 * @typedef Object ChromeStoreItem
 *
 * @property {String} kind
 * @property {String} id
 * @property {String} publicKey
 * @property {String} uploadState
 * @property {Array<String>} itemError
 */

/**
 * @typedef Object ChromeStorePublishInfo
 *
 * @property {String} kind
 * @property {String} item_id
 * @property {Array<String>} status
 * @property {Array<String>} statusDetail
 */

/**
 * @typedef Object TokenData
 *
 * @property {String} access_token
 * @property {String} refresh_token
 */

/**
 * @typedef {Object} IStorage
 * @property {StoreCreate} create
 * @property {StoreGet} get
 * @property {StoreSet} set
 *
 */

/**
 * @typedef Function StoreCreate
 * @property Function create
 * @returns {Promise}
 */

/**
 * @typedef Function StoreGet
 * @property Function code
 * @param {String} code
 * @param {String} token
 * @param {String} refreshToken
 * @returns {Promise}
 */

/**
 * @typedef Function StoreSet
 * @property Function code
 * @returns {Promise<TokenData>}
 */
