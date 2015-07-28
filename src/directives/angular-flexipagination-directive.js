angular.module('angularFlexiPagination.directives', [])

  .directive('angularFlexiPagination', ['ExampleService',
    function (ExampleService) {

      return {
        restrict: 'A',
        templateUrl: '../src/directives/angular-flexipagination-directive.html',
        scope: {
          filterBy: '@',
          originalRequest: '=',
          onPageChange: '&',
          displayableResults: '=',
          clientPagination: '='
        },
        controller: ['$scope', '$q', function ($scope, $q) {

          $scope.resultRanges = [5, 10, 20, 50, 100];
          $scope.pageSize = 10;
          $scope.maxNavButtons = 6;

          $scope.typedPage = 1;
          $scope.currentPage = 1;
          $scope.totalPages = 1;
          $scope.bufferSize = 0;
          $scope.totalResults = 0;
          $scope.requestOnFlight = true;
          $scope.bufferResults = [];

          $scope.request = angular.copy($scope.originalRequest);

          if ($scope.filterBy) {
            $scope.request.filterBy = [$scope.filterBy];
          }

          $scope.onPageChange({request: $scope.request})
            .then(function (response) {
              if (!$scope.clientPagination) {
                if (response.pagination.count) {
                  $scope.bufferSize = response.results.length;
                  $scope.bufferResults = response;
                  $scope.totalResults = response.pagination.count;
                }
              } else {
                $scope.bufferSize = response.length;
                $scope.bufferResults = response;
                $scope.totalResults = response.length;
              }
              $scope.updatePaginatorToData();
            })
            .catch(function (error) {
              return $q.reject(error);
            })
            .finally(function () {
              $scope.requestOnFlight = false;
            });

          /**
           * This method is used to check if a next page is available in the list.
           *
           * @author Antonio Bevilacqua [b3by.in.th3.sky@gmail.com]
           * @returns {boolean} A boolean value true if another page is available
           *
           */
          $scope.isNextAvailable = function () {
            return !$scope.requestOnFlight &&
              $scope.currentPage * $scope.pageSize < $scope.totalResults;
          };

          /**
           * This method is used to check if a previous page is available in the
           * list.
           *
           * @author Antonio Bevilacqua [b3by.in.th3.sky@gmail.com]
           * @returns {boolean} A boolean value true if a previous page is available
           *
           */
          $scope.isPreviousAvailable = function () {
            return !$scope.requestOnFlight && $scope.currentPage > 1;
          };

          /**
           * This method is used in order to navigate to a specific page.
           * It has to handle forward and backward navigation (a lot of stuff).
           *
           * @author Antonio Bevilacqua [b3by.in.th3.sky@gmail.com]
           * @param pageNumber the page number I want to jump to
           *
           */
          $scope.goToPage = function (pageNumber) {
            pageNumber = +pageNumber;

            if ($scope.totalPages &&
              (pageNumber > $scope.totalPages) || pageNumber <= 0) {
              $scope.updateNavButtons();
              return;
            }

            var promise;
            var currentRequestOffset = $scope.request.pagination ? $scope.request.pagination.offset : 0;
            var newRequestOffset = $scope.clientPagination ? 0 : Math.floor(((pageNumber - 1) * $scope.pageSize) / $scope.bufferSize) * $scope.bufferSize;

            newRequestOffset = newRequestOffset || 0;

            if (currentRequestOffset !== newRequestOffset) {
              $scope.requestOnFlight = true;
              $scope.request.pagination.offset = newRequestOffset;
              promise = $scope.onPageChange({request: $scope.request});
              promise
                .then(function (newResults) {
                  $scope.bufferResults = newResults;
                })
                .catch(function (error) {
                  $scope.request.pagination.offset = currentRequestOffset;
                  return $q.reject(error);
                })
                .finally(function () {
                  $scope.requestOnFlight = false;
                });
            }

            $q.when(promise, function () {
              // calculate new displayable slice from the buffer, then update page
              var newLowerBound = ((pageNumber - 1) * $scope.pageSize) - newRequestOffset;
              var newUpperBound = newLowerBound + $scope.pageSize;

              $scope.displayableResults = $scope.clientPagination ?
                $scope.bufferResults.slice(newLowerBound, newUpperBound) :
                $scope.bufferResults.results.slice(newLowerBound, newUpperBound);
              $scope.currentPage = pageNumber;
              $scope.updateNavButtons();
            });

            return promise;
          };

          /**
           * This method performs a search for a new batch of results
           * (it increments the offset for the search)
           *
           * @author Antonio Bevilacqua [b3by.in.th3.sky@gmail.com]
           *
           */
          $scope.goToNextPage = function () {
            $scope.goToPage($scope.currentPage + 1);
          };

          /**
           * This method performs a search for an old batch of results
           * (it decrements the offset for the search)
           *
           * @author Antonio Bevilacqua [b3by.in.th3.sky@gmail.com]
           *
           */
          $scope.goToPreviousPage = function () {
            $scope.goToPage($scope.currentPage - 1);
          };

          /**
           * This function is used to re-calculate the total number of pages every
           * time the page size changes. When this happens, the user should be sent
           * to a new page, if the previous one does not exist anymore.
           *
           * @author Antonio Bevilacqua [b3by.in.th3.sky@gmail.com]
           *
           */
          $scope.updatePaginatorToData = function () {
            $scope.totalPages = Math.ceil($scope.totalResults / $scope.pageSize);
            if ($scope.currentPage > $scope.totalPages) {
              $scope.currentPage = $scope.totalPages > 0 ? $scope.totalPages : 1;
            }
            $scope.goToPage($scope.currentPage);
          };

          /**
           * This function is used to update the displayable buttons. It checks for
           * the available pages and shows the buttons accordingly.
           *
           * @author Antonio Bevilacqua [b3by.in.th3.sky@gmail.com]
           *
           */
          $scope.updateNavButtons = function () {
            $scope.navButtons = [];
            $scope.typedPage = $scope.currentPage;

            var totalChunks = Math.ceil($scope.totalPages / $scope.maxNavButtons);
            var currentChunk = Math.ceil($scope.currentPage / $scope.maxNavButtons);

            if (currentChunk > 1) {
              $scope.navButtons.push({
                label: '...',
                linkedPage: (currentChunk - 1) * ($scope.maxNavButtons)
              });
            }

            var startIndex = ((currentChunk - 1) * $scope.maxNavButtons) + 1;
            var endIndex = Math.min(startIndex + $scope.maxNavButtons, $scope.totalPages + 1);
            for (var index = startIndex; index < endIndex; index++) {
              $scope.navButtons.push({
                label: index,
                linkedPage: index
              });
            }

            if (currentChunk < totalChunks) {
              $scope.navButtons.push({
                label: '...',
                linkedPage: (currentChunk * $scope.maxNavButtons) + 1
              });
            }

          };

        }]
      };

    }]);
