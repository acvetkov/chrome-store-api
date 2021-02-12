/**
 * @author https://github.com/acvetkov
 * @overview
 */

import FileStorage from '../../src/storage/index';
import fs from '@hypnosphi/q-io/fs';
import path from 'path';

const NEW_FILE = path.resolve(__dirname, '../temp-directory/data.json');
const EXISTING_FILE = path.resolve(__dirname, '../data/fake-storage.json');

describe('file-storage', function () {

    after(function () {
        return fs.exists(NEW_FILE)
            .then(exists => {
                if (exists) {
                    return fs.remove(NEW_FILE);
                }
            })
            .then(() => {
                return fs.removeDirectory(path.dirname(NEW_FILE));
            });
    });

    describe('without file', function () {

        beforeEach(function () {
            this.storage = new FileStorage(NEW_FILE);
        });

        it('should return empty object', function () {
            return assert.eventually.deepEqual(this.storage.get('code'));
        });

        it('should set data', function () {
            return this.storage.set('1', '2', '3')
                .then(data => assert.deepEqual(data, {access_token: '2', refresh_token: '3'}));
        });

        it('should get existing data', function () {
            return this.storage.set('1', '2', '3')
                .then(() => this.storage.set('4', '5', '6'))
                .then(() => this.storage.set('7', '8', '9'))
                .then(() => this.storage.get('1'))
                .then(data => assert.deepEqual(data, {access_token: '2', refresh_token: '3'}))
                .then(() => this.storage.get('4'))
                .then(data => assert.deepEqual(data, {access_token: '5', refresh_token: '6'}))
                .then(() => this.storage.get('7'))
                .then(data => assert.deepEqual(data, {access_token: '8', refresh_token: '9'}));
        });
    });

    describe('with file', function () {

        beforeEach(function () {
            this.storage = new FileStorage(EXISTING_FILE);
        });

        it('should return correct data', function () {
            return this.storage.get('1')
                .then(data => assert.deepEqual(data, {access_token: '11', refresh_token: '12'}))
                .then(() => this.storage.get('2'))
                .then(data => assert.deepEqual(data, {access_token: '21', refresh_token: '22'}))
                .then(() => this.storage.get('3'))
                .then(data => assert.deepEqual(data, {access_token: '31', refresh_token: '32'}))
                .then(() => this.storage.get('4'))
                .then(data => assert.deepEqual(data, {access_token: '41', refresh_token: '42'}))
                .then(() => this.storage.get('5'))
                .then(data => assert.deepEqual(data, {access_token: '51', refresh_token: '52'}));
        });
    });
});
