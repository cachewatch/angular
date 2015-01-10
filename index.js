var cacheWatch = angular.module('cachewatch', ['ng']);

cacheWatch.service('cachewacth', ['$rootScope', function ($rootScope) {
	var me = {};
	var _getTopScope = function() {
		return $rootScope;
		//return angular.element(document).scope();
	};

	me.ready = function() {
		var $scope = _getTopScope();
		$scope.status = 'ready';
		if(!$scope.$$phase) $scope.$apply();
	};
	me.loading = function() {
		var $scope = _getTopScope();
		$scope.status = 'loading';
		if(!$scope.$$phase) $scope.$apply();
	};
	me.$on('$routeChangeStart', function() {
		_getTopScope().loading();
	});

	me.watch =  function (cb) {
		var $scope = _getTopScope();
		$scope.$watch('status', cb);
	};

	return me;
}]);

cacheWatch.directive('body', ['cachewatch',function (cache){
	return {
		rrestrict  : 'E',
		link : function (scope, element) {
			var ele = angular.element(element);
			cache.watch(function(is){
				ele.addAttr('data-ready', is);
			});
		}
	}
}]);