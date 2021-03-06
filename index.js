var cacheWatch = angular.module('cachewatch', ['ng']);

cacheWatch.service('cachewatch', ['$rootScope', function ($rootScope) {
	var _getTopScope = function() {
		return $rootScope;
		//return angular.element(document).scope();
	};

	$rootScope.ready = function() {
		var $scope = _getTopScope();
		$scope.status = 'ready';
		if(!$scope.$$phase) $scope.$apply();
	};

	$rootScope.loading = function() {
		var $scope = _getTopScope();
		$scope.status = 'loading';
		if(!$scope.$$phase) $scope.$apply();
	};

	$rootScope.$on('$routeChangeStart', function() {
		_getTopScope().loading();
	});

	return {
		ready : $rootScope.ready,
		loading : $rootScope.loading
	};
}]);

cacheWatch.directive('body', [function (){
	return {
		restrict : 'E',
		link : function (scope, element) {
			var ele = angular.element(element);
			scope.$watch('status', function(status){
				ele.attr('data-ready', status);
			});
		}
	}
}]);
