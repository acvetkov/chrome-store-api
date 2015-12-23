/**
 * @author https://github.com/acvetkov
 * @overview
 */

import WebstoreApi from './webstore/index';
import TokenManager from './token/index';
import FileStorage from './storage';

export default {
    Webstore: WebstoreApi,
    TokenManager: TokenManager,
    FileStorage: FileStorage
};
