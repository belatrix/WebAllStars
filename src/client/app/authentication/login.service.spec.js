/* jshint -W117, -W030 */
describe('loginService', function () {
    'use strict';

    var $httpBackend,
        loginService,
        resourceServiceConfig;

    beforeEach(function () {
        module('app.authentication');

        inject(function ($injector) {
            loginService = $injector.get('loginService');
            $httpBackend = $injector.get('$httpBackend');
            resourceServiceConfig = $injector.get('resourceServiceConfig');
        });
    });

    it('test: sign in the application', function () {
        var result = {},
            userData = {
                username: 'user',
                password: 'password'
            };

        $httpBackend
            .when(
                'POST',
                resourceServiceConfig.remoteURL + resourceServiceConfig.endpoints.auth
            )
            .respond(200, {
                'is_password_reset_required': true,
                'user_id': 9,
                'token': 'e53bd327cdad136cab3454423b10f9d98c30f6c1',
                'is_base_profile_complete': true,
                'reset_password_code': null
            });

        loginService.signIn(userData)
            .then(function (response) {
                console.log(response);
                result = response;
            });

        $httpBackend.flush();

        expect(result).to.be.truthy;
        expect(result.is_password_reset_required).to.be.defined;
        expect(result.user_id).to.be.defined;
        expect(result.token).to.be.defined;
        expect(result.is_base_profile_complete).to.be.defined;
        expect(result.reset_password_code).to.equal(null);
    });

});
