/**
 * @author https://github.com/acvetkov
 * @overview
 */

import Promise from 'bluebird';
import sinon from 'sinon';

var Storage = {

    _data: {},

    get data() {
        return this._data;
    },

    set data(value) {
        this._data = value;
    },

    set: function (code, at, rt) {
        this._data[code] = {
            access_token: at,
            refresh_token: rt
        };
        return Promise.resolve(this.data);
    },

    get: function (code) {
        return Promise.resolve(this.data[code]);
    }
};

sinon.spy(Storage, 'set');
sinon.spy(Storage, 'get');

export default Storage;
