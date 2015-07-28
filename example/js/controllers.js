'use strict';

angular.module('exampleApp.controllers', [ ]).controller('ExampleController', ['$scope', '$timeout', 'ExampleService',

  function($scope, $timeout, ExampleService) {

    $scope.myResults = [ ];
    $scope.paginateOnClient = false;

    $scope.generalRequest = { };

    if(!$scope.paginateOnClient) {
      $scope.generalRequest.pagination = {
        limit: 100,
        offset: 0
      };
    }

    $scope.performRequest = function(request) {
      var promise = ExampleService.returnResults(request);
      return promise;
    };

  }

]);
