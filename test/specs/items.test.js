/**
 * @author https://github.com/acvetkov
 * @overview
 */

import nock from 'nock';

import * as items from '../../src/webstore/items';

import fixtureGet from '../data/get.json';
import fixtureInsert from '../data/insert.json';
import fixtureUpdate from '../data/update.json';
import fixturePublish from '../data/publish.json';
import fixture401 from '../data/401.json';
import fixture403 from '../data/403.json';

const TOKEN = 'access_token';
const ITEM_ID = 'item_id';

describe('items', function () {

    describe('get', function () {

        afterEach(function () {
            nock.cleanAll();
        });

        it('should resolve with http status and response', function () {
            nock('https://www.googleapis.com')
                .get(`/chromewebstore/v1.1/items/${ITEM_ID}?projection=draft`)
                .reply(200, fixtureGet.ok);

            return assert.eventually.deepEqual(items.get(TOKEN, ITEM_ID), {
                status: 200,
                response: fixtureGet.ok
            });
        });

        it('should resolve with auth 401 error', function () {
            nock('https://www.googleapis.com')
                .get(`/chromewebstore/v1.1/items/${ITEM_ID}?projection=draft`)
                .reply(401, fixture401);

            return assert.eventually.deepEqual(items.get(TOKEN, ITEM_ID), {
                status: 401,
                response: fixture401
            });
        });

        it('should resolve with auth 403 error', function () {
            nock('https://www.googleapis.com')
                .get(`/chromewebstore/v1.1/items/${ITEM_ID}?projection=draft`)
                .reply(403, fixture403);

            return assert.eventually.deepEqual(items.get(TOKEN, ITEM_ID), {
                status: 403,
                response: fixture403
            });
        });
    });

    describe('insert', function () {

        beforeEach(function () {
            nock.cleanAll();
        });

        after(function () {
            nock.cleanAll();
        });

        it('should resolve with chrome store item', function () {
            nock('https://www.googleapis.com')
                .post(`/upload/chromewebstore/v1.1/items/`)
                .reply(200, fixtureInsert.ok);

            return assert.eventually.deepEqual(items.insert(TOKEN, ''), {
                status: 200,
                response: fixtureInsert.ok
            });
        });

        it('should reject with insert error', function () {
            nock('https://www.googleapis.com')
                .post(`/upload/chromewebstore/v1.1/items/`)
                .reply(200, fixtureInsert.error);

            return assert.eventually.deepEqual(items.insert(TOKEN, ''), {
                status: 200,
                response: fixtureInsert.error
            });
        });

        it('should resolve with auth 403 error', function () {
            nock('https://www.googleapis.com')
                .post(`/upload/chromewebstore/v1.1/items/`)
                .reply(403, fixture403);

            return assert.eventually.deepEqual(items.insert(TOKEN, ''), {
                status: 403,
                response: fixture403
            });
        });

        it('should resolve with auth 401 error', function () {
            nock('https://www.googleapis.com')
                .post(`/upload/chromewebstore/v1.1/items/`)
                .reply(401, fixture401);

            return assert.eventually.deepEqual(items.insert(TOKEN, ''), {
                status: 401,
                response: fixture401
            });
        });
    });

    describe('update', function () {

        beforeEach(function () {
            nock.cleanAll();
        });

        after(function () {
            nock.cleanAll();
        });

        it('should resolve with chrome store item', function () {
            nock('https://www.googleapis.com')
                .put(`/upload/chromewebstore/v1.1/items/${ITEM_ID}`)
                .reply(200, fixtureUpdate.ok);

            return assert.eventually.deepEqual(items.update(TOKEN, ITEM_ID, ''), {
                status: 200,
                response: fixtureUpdate.ok
            });
        });

        it('should reject with update error', function () {
            nock('https://www.googleapis.com')
                .put(`/upload/chromewebstore/v1.1/items/${ITEM_ID}`)
                .reply(200, fixtureUpdate.error);

            return assert.eventually.deepEqual(items.update(TOKEN, ITEM_ID, ''), {
                status: 200,
                response: fixtureUpdate.error
            });
        });

        it('should resolve with auth 403 error', function () {
            nock('https://www.googleapis.com')
                .put(`/upload/chromewebstore/v1.1/items/${ITEM_ID}`)
                .reply(403, fixture403);

            return assert.eventually.deepEqual(items.update(TOKEN, ITEM_ID, ''), {
                status: 403,
                response: fixture403
            });
        });

        it('should resolve with auth 401 error', function () {
            nock('https://www.googleapis.com')
                .put(`/upload/chromewebstore/v1.1/items/${ITEM_ID}`)
                .reply(401, fixture401);

            return assert.eventually.deepEqual(items.update(TOKEN, ITEM_ID, ''), {
                status: 401,
                response: fixture401
            });
        });
    });

    describe('publish', function () {

        beforeEach(function () {
            nock.cleanAll();
        });

        after(function () {
            nock.cleanAll();
        });

        it('should resolve with chrome store item', function () {
            nock('https://www.googleapis.com')
                .post(`/chromewebstore/v1.1/items/${ITEM_ID}/publish`)
                .reply(200, fixturePublish.ok);

            return assert.eventually.deepEqual(items.publish(TOKEN, ITEM_ID), {
                status: 200,
                response: fixturePublish.ok
            });
        });

        it('should resolve with publish error', function () {
            nock('https://www.googleapis.com')
                .post(`/chromewebstore/v1.1/items/${ITEM_ID}/publish`)
                .reply(200, fixturePublish.error);

            return assert.eventually.deepEqual(items.publish(TOKEN, ITEM_ID), {
                status: 200,
                response: fixturePublish.error
            });
        });

        it('should resolve with auth 403 error', function () {
            nock('https://www.googleapis.com')
                .post(`/chromewebstore/v1.1/items/${ITEM_ID}/publish`)
                .reply(403, fixture403);

            return assert.eventually.deepEqual(items.publish(TOKEN, ITEM_ID), {
                status: 403,
                response: fixture403
            });
        });

        it('should resolve with auth 401 error', function () {
            nock('https://www.googleapis.com')
                .post(`/chromewebstore/v1.1/items/${ITEM_ID}/publish`)
                .reply(401, fixture401);

            return assert.eventually.deepEqual(items.publish(TOKEN, ITEM_ID), {
                status: 401,
                response: fixture401
            });
        });
    });
});
