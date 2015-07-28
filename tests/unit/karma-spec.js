describe('Unit: ExampleController', function () {

  beforeEach(module('exampleApp'));

  var ctrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('ExampleController', {
      $scope: scope
    });
  }));

  it('should get all the required variables', function () {
    expect(scope.paginateOnClient).toBe(false);
    expect(scope.myResults.length).toEqual(0);
    expect(scope.generalRequest.keys).toBe(undefined);
    expect(scope.performRequest).toBeDefined();
  });

  it('should include the pagination params in the request', function () {
    scope.paginationOnClient = true;
    expect(scope.generalRequest.pagination.limit).toBe(100);
    expect(scope.generalRequest.pagination.offset).toBe(0);
  });

});