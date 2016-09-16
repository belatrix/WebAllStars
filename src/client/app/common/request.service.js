angular
    .module('app.common')
    .factory('requestService', requestService);

requestService.$inject = [
    '$http',
    '$q'
];

function requestService(
    $http,
    $q
) {
    var service = {
        get: get,
        post: post,
        put: put,
        del: del
    };
    return service;

    /**
     * Makes GET request
     *
     * @param {string} url
     * @param {object} options
     * @param {object} data
     * @returns {Promise}
     */
    function get(url, options, data) {
        return make('get', url, options, data);
    }

    /**
     * Makes POST request
     *
     * @param {string} url
     * @param {object} options
     * @param {object} data
     * @returns {Promise}
     */
    function post(url, options, data) {
        return make('post', url, options, data);
    }

    /**
     * Makes PUT request
     *
     * @param {string} url
     * @param {object} options
     * @param {object} data
     * @returns {Promise}
     */
    function put(url, options, data) {
        return make('put', url, options, data);
    }

    /**
     * Makes DELETE request
     *
     * @param {string} url
     * @param {object} options
     * @param {object} data
     * @returns {Promise}
     */
    function del(url, options, data) {
        return make('delete', url, options, data);
    }

    /**
     * Makes request
     *
     * @param {string} requestType
     * @param {string} url
     * @param {object} options
     * @param {object} data
     * @returns {Promise}
     */
    function make(requestType, url, options, data) {
        var deferred = $q.defer(),
            request;

        request = $http[requestType](url, data).then(
            function (response) {
                handleSuccess(deferred, response, options);
            },
            function (response) {
                handleFail(deferred, response, options);
            }
        );

        return deferred.promise;
    }

    /**
     * Handle request success.
     * @param {Deferred} deferred
     * @param {object} response
     * @param {object} options
     */
    function handleSuccess(deferred, response, options) {
        deferred.resolve(response.data);
    }

    /**
     * Handles request fail.
     * @param {Deferred} deferred
     * @param {object} response
     * @param {object} options
     */
    function handleFail(deferred, response, options) {
        deferred.reject(response.data);
    }

}
