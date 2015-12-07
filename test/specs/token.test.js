/**
 * @author acvetkov@yandex-team.ru
 * @overview
 */

import nock from 'nock';

import {getToken, refreshToken} from '../../src/token/get';

const ACCESS_TOKEN = 'testaccesstoken';
const REFRESH_TOKEN = 'testrefreshtoken';

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

    it('should return token data', function () {

        nock('https://accounts.google.com')
            .post('/o/oauth2/token', GET_BODY)
            .reply(200, {
                access_token: ACCESS_TOKEN,
                refresh_token: REFRESH_TOKEN
            });

        return assert.eventually.deepEqual(getToken('code', 'clientId', 'clientSecret'), {
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN
        });
    });

    it('should be rejected', function () {

        nock('https://accounts.google.com')
            .post('/o/oauth2/token', GET_BODY)
            .replyWithError(500);

        return assert.isRejected(getToken('code', 'clientId', 'clientSecret'));
    });
});

describe('refreshToken', function () {

    it('should return token data', function () {
        nock('https://accounts.google.com')
            .post('/o/oauth2/token', REFRESH_BODY)
            .reply(200, {
                access_token: ACCESS_TOKEN,
                refresh_token: REFRESH_TOKEN
            });

        return assert.eventually.deepEqual(refreshToken('refreshToken', 'clientId', 'clientSecret'), {
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN
        });
    });

    it('should be rejected', function () {
        nock('https://accounts.google.com')
            .post('/o/oauth2/token', REFRESH_BODY)
            .replyWithError(500);

        return assert.isRejected(refreshToken('refreshToken', 'clientId', 'clientSecret'));
    });
});
