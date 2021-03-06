import File from '../File';
import Cache from '../../util/Cache';
import getFields from '../../util/fields';
import { X_REP_HINTS } from '../../constants';

let file;
let cache;

describe('api/File', () => {
    beforeEach(() => {
        file = new File({});
        cache = new Cache();
    });

    describe('getCacheKey()', () => {
        test('should return correct key', () => {
            expect(file.getCacheKey('foo')).toBe('file_foo');
        });
    });

    describe('getTypedFileId()', () => {
        test('should return correct typed id', () => {
            expect(file.getTypedFileId('foo')).toBe('file_foo');
        });
    });

    describe('getUrl()', () => {
        test('should return correct file api url without id', () => {
            expect(file.getUrl()).toBe('https://api.box.com/2.0/files');
        });
        test('should return correct file api url with id', () => {
            expect(file.getUrl('foo')).toBe('https://api.box.com/2.0/files/foo');
        });
    });

    describe('getDownloadUrl()', () => {
        test('should make xhr to get download url and call success callback', () => {
            const success = jest.fn();
            const get = jest.fn().mockReturnValueOnce(Promise.resolve({ download_url: 'bar' }));
            file.xhr = { get };
            return file.getDownloadUrl('foo', success).then(() => {
                expect(success).toHaveBeenCalledWith('bar');
                expect(get).toHaveBeenCalledWith({
                    url: 'https://api.box.com/2.0/files/foo',
                    params: { fields: 'download_url' }
                });
            });
        });

        test('should make xhr to get download url and call error callback', () => {
            const error = new Error('error');
            const successCb = jest.fn();
            const errorCb = jest.fn();
            const get = jest.fn().mockReturnValueOnce(Promise.reject(error));
            file.xhr = { get };
            return file.getDownloadUrl('foo', successCb, errorCb).then(() => {
                expect(successCb).not.toHaveBeenCalled();
                expect(errorCb).toHaveBeenCalledWith(error);
                expect(get).toHaveBeenCalledWith({
                    url: 'https://api.box.com/2.0/files/foo',
                    params: { fields: 'download_url' }
                });
            });
        });
    });

    describe('file()', () => {
        test('should not do anything if destroyed', () => {
            file.isDestroyed = jest.fn().mockReturnValueOnce(true);
            file.getCache = jest.fn();
            file.getCacheKey = jest.fn();
            file.xhr = null;
            const success = jest.fn();
            const error = jest.fn();
            return file.file('id', success, error).catch(() => {
                expect(file.getCache).not.toHaveBeenCalled();
                expect(file.getCacheKey).not.toHaveBeenCalled();
                expect(success).not.toHaveBeenCalled();
                expect(error).not.toHaveBeenCalled();
            });
        });

        test('should return cached file', () => {
            cache.set('key', 'file');
            file.xhr = null;
            file.options = { cache };
            file.getCache = jest.fn().mockReturnValueOnce(cache);
            file.getCacheKey = jest.fn().mockReturnValueOnce('key');
            const success = jest.fn();
            return file.file('id', success).then(() => {
                expect(file.getCacheKey).toHaveBeenCalledWith('id');
                expect(success).toHaveBeenCalledWith('file');
            });
        });

        test('should make xhr to get file and call success callback', () => {
            file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve('new file'))
            };

            const success = jest.fn();

            return file.file('id', success).then(() => {
                expect(success).toHaveBeenCalledWith('new file');
                expect(file.xhr.get).toHaveBeenCalledWith({
                    id: 'file_id',
                    url: 'https://api.box.com/2.0/files/id',
                    params: {
                        fields: getFields(true)
                    },
                    headers: {
                        'X-Rep-Hints': X_REP_HINTS
                    }
                });
            });
        });

        test('should call error callback when xhr fails', () => {
            const error = new Error('error');
            file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.reject(error))
            };

            const successCb = jest.fn();
            const errorCb = jest.fn();

            return file.file('id', successCb, errorCb, false, true).then(() => {
                expect(successCb).not.toHaveBeenCalled();
                expect(errorCb).toHaveBeenCalledWith(error);
                expect(file.xhr.get).toHaveBeenCalledWith({
                    id: 'file_id',
                    url: 'https://api.box.com/2.0/files/id',
                    params: {
                        fields: getFields(true, true)
                    },
                    headers: {
                        'X-Rep-Hints': X_REP_HINTS
                    }
                });
            });
        });

        test('should make xhr to get file when forced to clear cache', () => {
            cache.set('key', 'file');
            file.xhr = null;
            file.options = { cache };
            file.getCache = jest.fn().mockReturnValueOnce(cache);
            file.getCacheKey = jest.fn().mockReturnValueOnce('key');
            file.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve('new file'))
            };

            const success = jest.fn();

            return file.file('id', success, 'error', true).then(() => {
                expect(file.getCacheKey).toHaveBeenCalledWith('id');
                expect(success).toHaveBeenCalledWith('new file');
                expect(file.xhr.get).toHaveBeenCalledWith({
                    id: 'file_id',
                    url: 'https://api.box.com/2.0/files/id',
                    params: {
                        fields: getFields(true)
                    },
                    headers: {
                        'X-Rep-Hints': X_REP_HINTS
                    }
                });
            });
        });
    });
});
