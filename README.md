# CacheWatch for angular

API on Angular

```javascript
angular
	.module('MyApp',[ 'cachewatch'])
	.controller([ '$scope', 'cachewatch', function($scope, cache){
		cache.ready();
		// or 
		cache.loading();
	}]);
```

Look the body 
```html
<body ... data-ready="loading|ready">

```
