(function () {
	'use strict';
	angular.module('module.service.pagination', [])

		.service('paginationService', [
			'$resourceService',
			'serviceStorage',
			'$state',
			function ($resourceService, serviceStorage, $state) {

				// service definition
				var service = {};
				service.GetPager = GetPager;
				return service;

				function range(start, end) {
				    var foo = [];
				    for (var i = start; i <= end; i++) {
				        foo.push(i);
				    }
				    return foo;
				}

				// service implementation
				function GetPager(totalItems, currentPage, pageSize) {
					// default page size is 20
					var defaultNumItemsPerPage=20;
					// default to first page
					currentPage = currentPage || 1;
					pageSize = pageSize || defaultNumItemsPerPage;
					// calculate total pages
					var totalPages = Math.ceil(totalItems / pageSize);
					var startPage, endPage;
					if (totalPages <= 10) {
						// less than 10 total pages so show all
						startPage = 1;
						endPage = totalPages;
					} else {
						// more than 10 total pages so calculate start and end pages
						if (currentPage <= 6) {
							startPage = 1;
							endPage = 10;
						} else if (currentPage + 4 >= totalPages) {
							startPage = totalPages - 9;
							endPage = totalPages;
						} else {
							startPage = currentPage - 5;
							endPage = currentPage + 4;
						}
					}
					// calculate start and end item indexes
					var startIndex = (currentPage - 1) * pageSize;
					var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
					// create an array of pages to ng-repeat in the pager control
					var pages = range(startPage, endPage + 1);
					//var pages = [1,2,3];
					// return object with all pager properties required by the view
					return {
						totalItems: totalItems,
						currentPage: currentPage,
						pageSize: pageSize,
						totalPages: totalPages,
						startPage: startPage,
						endPage: endPage,
						startIndex: startIndex,
						endIndex: endIndex,
						pages: pages
					};
				}
			}]);

})();
