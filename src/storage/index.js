/**
 * @author https://github.com/acvetkov
 * @overview
 */

import fs from 'q-io/fs';
import path from 'path';
import mkdirp from 'mkdirp';
import Promise from 'bluebird';

import {parseJSON} from '../utils/index';

const makeDirectory = Promise.promisify(mkdirp);

/**
 * @implements {IStorage}
 */
export default class FileStorage {

    /**
     * @param {String} filePath
     */
    constructor (filePath) {
        this.file = filePath;
        this.data = {};
        this.inited = false;
    }

    /**
     * Set new auth data
     * @param {String} code
     * @param {String} token
     * @param {String} refreshToken
     * @returns {Promise<TokenData>}
     */
    set (code, token, refreshToken) {
        this.data[code] = {
            access_token: token,
            refresh_token: refreshToken
        };
        return this.dump()
            .then(() => this.data[code]);
    }

    /**
     * Get auth data for code
     * @param {String} code
     * @returns {Promise<TokenData>}
     */
    get (code) {
        if (!this.inited) {
            return this._fromFile(code);
        }
        return Promise.resolve(this.data[code]);
    }

    /**
     * Save data to disk
     * @returns {Promise<TokenData>}
     */
    dump () {
        return fs.exists(this.file)
            .then(exists => {
                if (!exists) {
                    return makeDirectory(path.dirname(this.file));
                }
                return Promise.resolve();
            })
            .then(() => fs.write(this.file, JSON.stringify(this.data)));
    }

    /**
     * Get data from file
     * @param {String} code
     * @returns {*}
     * @private
     */
    _fromFile (code) {
        return fs.exists(this.file).then(exists => {
            if (exists) {
                return fs.read(this.file);
            }
            return Promise.resolve({});
        }).then(data => {
            this.inited = true;
            this.data = parseJSON(data, {});
            return this.data[code];
        });
    }
}
