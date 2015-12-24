/**
 * @author https://github.com/acvetkov
 * @overview
 */

import nock from 'nock';

import TokenManager from '../../src/token/index';
import WebstoreApi from '../../src/webstore/index';

import fixtureTokenGet from '../data/token.get.json';
import fixtureGet from '../data/get.json';
import fixtureInsert from '../data/insert.json';
import fixtureUpdate from '../data/update.json';
import fixturePublish from '../data/publish.json';
import fixture401 from '../data/401.json';

const CODE = 'code';
const CLIENT_ID = 'client_id';
const CLIENT_SECRET = 'client_secret';

const ITEM_ID = 'hdfenecdhmohikghkaainloeemamjiml';

const GET_BODY = {
    client_id: 'client_id',
    client_secret: 'client_secret',
    code: 'code',
    grant_type: 'authorization_code',
    redirect_uri: 'urn:ietf:wg:oauth:2.0:oob'
};

describe('webstore', function () {

    describe('get', function () {

        beforeEach(function () {
            this.tokenManager = new TokenManager(CODE, CLIENT_ID, CLIENT_SECRET);
            this.api = new WebstoreApi(this.tokenManager);
        });

        afterEach(function () {
            nock.cleanAll();
        });

        it('should resolve with item info', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .get(`/chromewebstore/v1.1/items/${ITEM_ID}?projection=draft`)
                .reply(200, fixtureGet.ok);

            return assert.eventually.deepEqual(this.api.get(ITEM_ID), fixtureGet.ok);
        });

        it('should reject with 401', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(401, fixture401);

            nock('https://www.googleapis.com')
                .get(`/chromewebstore/v1.1/items/${ITEM_ID}?projection=draft`)
                .reply(200, fixtureGet.ok);

            return this.api.get(ITEM_ID)
                    .catch(data => assert.equal(data.status, 401));
        });

        it('should reject with 401 for get request', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .get(`/chromewebstore/v1.1/items/${ITEM_ID}?projection=draft`)
                .reply(401, fixture401);

            return this.api.get(ITEM_ID)
                .catch(data => assert.equal(data.status, 401));
        });
    });

    describe('insert', function () {

        beforeEach(function () {
            this.tokenManager = new TokenManager(CODE, CLIENT_ID, CLIENT_SECRET);
            this.api = new WebstoreApi(this.tokenManager);
        });

        afterEach(function () {
            nock.cleanAll();
        });

        it('should resolve with item info', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .post(`/upload/chromewebstore/v1.1/items/`)
                .reply(200, fixtureInsert.ok);

            return assert.eventually.deepEqual(this.api.insert(''), fixtureInsert.ok);
        });

        it('should reject on itemError', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .post(`/upload/chromewebstore/v1.1/items/`)
                .reply(200, fixtureInsert.error);

            return assert.isRejected(this.api.insert(''));
        });

        it('should reject with 401', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(401, fixture401);

            nock('https://www.googleapis.com')
                .post(`/upload/chromewebstore/v1.1/items/`)
                .reply(200, fixtureInsert.ok);

            return this.api.insert('')
                .catch(data => assert.equal(data.status, 401));
        });

        it('should reject with 401 for insert request', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .post(`/upload/chromewebstore/v1.1/items/`)
                .reply(401, fixture401);

            return this.api.insert('')
                .catch(data => assert.equal(data.status, 401));
        });
    });

    describe('update', function () {

        beforeEach(function () {
            this.tokenManager = new TokenManager(CODE, CLIENT_ID, CLIENT_SECRET);
            this.api = new WebstoreApi(this.tokenManager);
        });

        afterEach(function () {
            nock.cleanAll();
        });

        it('should resolve with item info', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .put(`/upload/chromewebstore/v1.1/items/${ITEM_ID}`)
                .reply(200, fixtureUpdate.ok);

            return assert.eventually.deepEqual(this.api.update(ITEM_ID, ''), fixtureUpdate.ok);
        });

        it('should reject on itemError', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .put(`/upload/chromewebstore/v1.1/items/${ITEM_ID}`)
                .reply(200, fixtureUpdate.error);

            return assert.isRejected(this.api.update(ITEM_ID, ''));
        });

        it('should reject with 401', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(401, fixture401);

            nock('https://www.googleapis.com')
                .put(`/upload/chromewebstore/v1.1/items/${ITEM_ID}`)
                .reply(200, fixtureUpdate.ok);

            return this.api.update(ITEM_ID, '')
                .catch(data => assert.equal(data.status, 401));
        });

        it('should reject with 401 for update request', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .put(`/upload/chromewebstore/v1.1/items/${ITEM_ID}`)
                .reply(200, fixture401);

            return this.api.update(ITEM_ID, '')
                .catch(data => assert.equal(data.status, 401));
        });
    });

    describe('publish', function () {

        beforeEach(function () {
            this.tokenManager = new TokenManager(CODE, CLIENT_ID, CLIENT_SECRET);
            this.api = new WebstoreApi(this.tokenManager);
        });

        afterEach(function () {
            nock.cleanAll();
        });

        it('should resolve with item info', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .post(`/chromewebstore/v1.1/items/${ITEM_ID}/publish`)
                .reply(200, fixturePublish.ok);

            return assert.eventually.deepEqual(this.api.publish(ITEM_ID), fixturePublish.ok);
        });

        it('should reject with 401', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(401, fixture401);

            nock('https://www.googleapis.com')
                .post(`/chromewebstore/v1.1/items/${ITEM_ID}/publish`)
                .reply(200, fixturePublish.ok);

            return this.api.publish(ITEM_ID)
                .catch(data => assert.equal(data.status, 401));
        });

        it('should reject with 401 for publish request', function () {
            nock('https://accounts.google.com')
                .post('/o/oauth2/token', GET_BODY)
                .reply(200, fixtureTokenGet.ok);

            nock('https://www.googleapis.com')
                .post(`/chromewebstore/v1.1/items/${ITEM_ID}/publish`)
                .reply(200, fixture401);

            return this.api.publish(ITEM_ID)
                .catch(data => assert.equal(data.status, 401));
        });
    });
});
