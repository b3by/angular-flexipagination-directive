'use strict';

angular.module('exampleApp.services', [ ]).factory('ExampleService', ['$q', '$timeout', function($q, $timeout) {

  return {

    returnResults: function(request) {

      /**
      * If the pagination is performed on the client side, no pagination
      * object should be included in the response (the client just needs the
      * results, nothing else). For server side paginagion instead, the
      * response should also include a pagination object with the count of the
      * results.
      **/

    var deferred = $q.defer();
    var totalResults = 213;

    var start;
    var limit;

    if(request.pagination) {
      start = request.pagination.offset;
      limit = (request.pagination.limit + start) < totalResults ? request.pagination.limit + start : totalResults;
    } else {
      start = 0;
      limit = totalResults;
    }

    var response = {
      results: [],
      pagination: {
        count: totalResults
      }
    };

    for(var index = start; index < limit; index++) {
      response.results.push({
        id: index + 1,
        value: Math.random(10)
      });
    }

    var toSend;
    if(request.pagination) {
      toSend = response;
    } else {
      toSend = response.results;
    }

    $timeout(function() {
      deferred.resolve(toSend);
    }, 500);

    return deferred.promise;
  }

};

}]);
