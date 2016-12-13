describe("Login controller tests", function() {
  beforeEach(module('app'));
    var loginController, scope, loginService;
    beforeEach(inject(function ($rootScope, $controller, _loginService_) {
      scope = $rootScope.$new();
      loginService = _loginService_;
      loginController = $controller('controller.login', {
        $scope: scope
      });
  }));
    
  it("should sign in successfully", function() {
    spyOn(loginService, 'signIn');
    scope.getSignIn();       
    expect(loginService.signIn).toHaveBeenCalled();
  });        
});