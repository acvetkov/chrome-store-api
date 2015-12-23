/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import nock from 'nock';

import TokenManager from '../../src/token/index';
import FakeStorage from '../lib/fake-storage';

import fixtureTokenGet from '../data/token.get.json';
import fixtureTokenRefresh from '../data/token.refresh.json';

const CODE = 'code';
const CLIENT_ID = 'client_id';
const CLIENT_SECRET = 'client_secret';

const DATA = {
    code: {
        access_token: '1',
        refresh_token: '2'
    }
};

const GET_BODY = {
    client_id: 'client_id',
    client_secret: 'client_secret',
    code: 'code',
    grant_type: 'authorization_code',
    redirect_uri: 'urn:ietf:wg:oauth:2.0:oob'
};

const REFRESH_BODY = {
    client_id: 'client_id',
    client_secret: 'client_secret',
    grant_type: 'refresh_token',
    refresh_token: '1/IPM_hwoL8eVDCuNaVh6PZvObENFrMlZsvUZj8JK7Lc0'
};

describe('TokenManager', function () {

    beforeEach(function () {
        nock.cleanAll();
    });

    describe('get', function () {

        describe('without storage', function () {

            beforeEach(function () {
                this.manager = new TokenManager(CODE, CLIENT_ID, CLIENT_SECRET);
            });

            it('should get token from server', function () {
                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(200, fixtureTokenGet.ok);
                return this.manager.get()
                    .then(token => assert.equal(token, 'ya29.RQLq6tgOfG1UQ_gDe0IZNJ3fJiufaPcumcXn8L_qQf5XwOZJl8Zk0VgSan_GcbMFm0Wz'));
            });

            it('should be rejected with http status', function () {
                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(400, fixtureTokenGet.error_code);

                return this.manager.get()
                    .catch(data => assert.deepEqual(data, {
                        status: 400,
                        response: fixtureTokenGet.error_code
                    }));
            });

            it('should get token from cache', function () {
                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(200, fixtureTokenGet.ok)
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(200, {
                        access_token: '3',
                        refresh_token: '4'
                    });
                return this.manager.get()
                    .then(token => assert.equal(token, 'ya29.RQLq6tgOfG1UQ_gDe0IZNJ3fJiufaPcumcXn8L_qQf5XwOZJl8Zk0VgSan_GcbMFm0Wz'))
                    .then(() => this.manager.get())
                    .then(secondToken => assert.equal(secondToken, 'ya29.RQLq6tgOfG1UQ_gDe0IZNJ3fJiufaPcumcXn8L_qQf5XwOZJl8Zk0VgSan_GcbMFm0Wz'));
            });
        });

        describe('with storage', function () {

            beforeEach(function () {
                FakeStorage.data = {};
                this.manager = new TokenManager(CODE, CLIENT_ID, CLIENT_SECRET, FakeStorage);
            });

            it('should get token from server', function () {
                FakeStorage.data = {};
                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(200, fixtureTokenGet.ok);
                return this.manager.get()
                    .then(token => assert.equal(token, 'ya29.RQLq6tgOfG1UQ_gDe0IZNJ3fJiufaPcumcXn8L_qQf5XwOZJl8Zk0VgSan_GcbMFm0Wz'));
            });

            it('should be rejected with http status', function () {
                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(400, fixtureTokenGet.error_code);

                return this.manager.get()
                    .catch(data => assert.deepEqual(data, {
                        status: 400,
                        response: fixtureTokenGet.error_code
                    }));
            });

            it('should get token from storage', function () {
                FakeStorage.data = DATA;
                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(200, fixtureTokenGet.ok);

                return this.manager.get()
                    .then(token => assert.equal(token, '1'))
                    .then(() => this.manager.get())
                    .then(secondToken => assert.equal(secondToken, '1'));
            });
        });
    });

    describe('refresh', function () {

        describe('without storage', function () {

            beforeEach(function () {
                this.manager = new TokenManager(CODE, CLIENT_ID, CLIENT_SECRET);
            });

            it('should refresh token', function () {

                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(200, fixtureTokenGet.ok)
                    .post('/o/oauth2/token', REFRESH_BODY)
                    .reply(200, fixtureTokenRefresh.ok);

                return this.manager.get()
                    .then(token => assert.equal(token, 'ya29.RQLq6tgOfG1UQ_gDe0IZNJ3fJiufaPcumcXn8L_qQf5XwOZJl8Zk0VgSan_GcbMFm0Wz'))
                    .then(() => this.manager.refresh())
                    .then(token => assert.equal(token, 'ya29.RQJO9PFBWBO4UmxULIUN06k4DaDl6p0oO8h_80z33RqaQh6_ogcR_HA8plDks8YTekwT', 'should return refreshed token'))
                    .then(() => this.manager.get())
                    .then(token => assert.equal(token, 'ya29.RQJO9PFBWBO4UmxULIUN06k4DaDl6p0oO8h_80z33RqaQh6_ogcR_HA8plDks8YTekwT', 'should return cached token'));
            });

            it('should reject with status 400', function () {

                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(200, fixtureTokenGet.ok)
                    .post('/o/oauth2/token', REFRESH_BODY)
                    .reply(400, fixtureTokenRefresh.error);

                return this.manager.get()
                    .then(token => assert.equal(token, 'ya29.RQLq6tgOfG1UQ_gDe0IZNJ3fJiufaPcumcXn8L_qQf5XwOZJl8Zk0VgSan_GcbMFm0Wz'))
                    .then(() => this.manager.refresh())
                    .catch(data => assert.deepEqual(data, {
                        status: 400,
                        response: fixtureTokenRefresh.error
                    }));
            });
        });

        describe('with storage', function () {

            beforeEach(function () {
                FakeStorage.data = {};
                this.manager = new TokenManager(CODE, CLIENT_ID, CLIENT_SECRET, FakeStorage);
            });

            it('should refresh token', function () {
                nock('https://accounts.google.com')
                    .post('/o/oauth2/token', GET_BODY)
                    .reply(200, fixtureTokenGet.ok)
                    .post('/o/oauth2/token', REFRESH_BODY)
                    .reply(200, fixtureTokenRefresh.ok);

                return this.manager.get()
                    .then(token => assert.equal(token, 'ya29.RQLq6tgOfG1UQ_gDe0IZNJ3fJiufaPcumcXn8L_qQf5XwOZJl8Zk0VgSan_GcbMFm0Wz'))
                    .then(() => this.manager.refresh())
                    .then(token => assert.equal(token, 'ya29.RQJO9PFBWBO4UmxULIUN06k4DaDl6p0oO8h_80z33RqaQh6_ogcR_HA8plDks8YTekwT', 'should return refreshed token'))
                    .then(() => this.manager.get())
                    .then(token => assert.equal(token, 'ya29.RQJO9PFBWBO4UmxULIUN06k4DaDl6p0oO8h_80z33RqaQh6_ogcR_HA8plDks8YTekwT', 'should return cached token'))
                    .then(() => {
                        return assert.eventually.deepEqual(FakeStorage.get(CODE), {
                            access_token: 'ya29.RQJO9PFBWBO4UmxULIUN06k4DaDl6p0oO8h_80z33RqaQh6_ogcR_HA8plDks8YTekwT',
                            refresh_token: '1/IPM_hwoL8eVDCuNaVh6PZvObENFrMlZsvUZj8JK7Lc0'
                        }, 'should save to storage refreshed data');
                    });
            });

        });
    });
});
