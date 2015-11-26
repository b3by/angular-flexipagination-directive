describe('Unit: ExampleController', function () {

  beforeEach(module('exampleApp'));

  var $compile, $rootScope;

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('ExampleController', {
      $scope: scope
    });
  }));

  it('Replaces the element with the appropriate content', function() {
    var element = $compile("<div angular-flexipagination></div>")($rootScope);
    
    $rootScope.$digest();
    expect(element.html()).toContain('Page Number');
  });

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
