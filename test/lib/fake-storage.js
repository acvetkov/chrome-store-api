/**
 * @author acvetkov@yandex-team.ru
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

    set: function (value) {
        this.data = value;
        return Promise.resolve(this.data);
    },

    get: function () {
        return Promise.resolve(this.data);
    }
};

sinon.spy(Storage, 'set');
sinon.spy(Storage, 'get');

export default Storage;
