/**
 * @author https://github.com/acvetkov
 * @overview
 */

import nock from 'nock';

import {getToken, refreshToken} from '../../src/token/get';
import fixtureTokenGet from '../data/token.get.json';
import fixtureTokenRefresh from '../data/token.refresh.json';

const GET_BODY = {
    client_id: 'clientId',
    client_secret: 'clientSecret',
    code: 'code',
    grant_type: 'authorization_code',
    redirect_uri: 'urn:ietf:wg:oauth:2.0:oob'
};

const REFRESH_BODY = {
    client_id: 'clientId',
    client_secret: 'clientSecret',
    grant_type: 'refresh_token',
    refresh_token: 'refreshToken'
};

describe('getToken', function () {

    beforeEach(function () {
        nock.cleanAll();
    });

    after(function () {
        nock.cleanAll();
    });

    it('should return token data', function () {

        nock('https://accounts.google.com')
            .post('/o/oauth2/token', GET_BODY)
            .reply(200, fixtureTokenGet.ok);
        return assert.eventually.deepEqual(getToken('code', 'clientId', 'clientSecret'), {
            status: 200,
            response: fixtureTokenGet.ok
        });
    });

    it('should return error for request error', function () {
        nock('https://accounts.google.com')
            .post('/o/oauth2/token', GET_BODY)
            .reply(400, fixtureTokenGet.error_request);

        return assert.eventually.deepEqual(getToken('code', 'clientId', 'clientSecret'), {
            status: 400,
            response: fixtureTokenGet.error_request
        });
    });

    it('should return error for invalid code', function () {
        nock('https://accounts.google.com')
            .post('/o/oauth2/token', GET_BODY)
            .reply(400, fixtureTokenGet.error_code);

        return assert.eventually.deepEqual(getToken('code', 'clientId', 'clientSecret'), {
            status: 400,
            response: fixtureTokenGet.error_code
        });
    });
});

describe('refreshToken', function () {

    beforeEach(function () {
        nock.cleanAll();
    });

    after(function () {
        nock.cleanAll();
    });

    it('should return refresh token data', function () {
        nock('https://accounts.google.com')
            .post('/o/oauth2/token', REFRESH_BODY)
            .reply(200, fixtureTokenRefresh.ok);

        return assert.eventually.deepEqual(refreshToken('refreshToken', 'clientId', 'clientSecret'), {
            status: 200,
            response: fixtureTokenRefresh.ok
        });
    });

    it('should return refresh token error', function () {
        nock('https://accounts.google.com')
            .post('/o/oauth2/token', REFRESH_BODY)
            .reply(400, fixtureTokenRefresh.error);

        return assert.eventually.deepEqual(refreshToken('refreshToken', 'clientId', 'clientSecret'), {
            status: 400,
            response: fixtureTokenRefresh.error
        });
    });
});
