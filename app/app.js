(function () {
	'use strict';
	var app = angular.module('productManagement', ['commonServices', 'ui.mask','productResourceMock', 'ui.router', 'ui.bootstrap', 'ngMessages', 'chart.js']);
	

	app.config(function ($provide) {
		$provide.decorator('$exceptionHandler', ['$delegate', function($delegate) {
			return function(exception, cause) {
				// allows user to catch global unhandled exceptions, and modify the exception message
				// won't catch syntax errors or async operation issues.
				exception.message = 'Please contact the Help Desk \n Message: ' + exception.message;
				// log exception to console
				$delegate(exception, cause);
				alert(exception.message);
			}
		}])
	});
	// can use $state.go(<nameofState>) to force the app into a state programmatically
	
	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		// Define routing.
		// Define default route. Giving it the default url will activate the route whose url matches with the value specified.
		// Here we user $urlRouterProvider because $stateProvider does not handle invalid routes.
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
		.state('home', {
			url:'/',
			templateUrl: 'app/welcomeView.html'
		})
		.state('productList', {
			url: '/products',
			templateUrl: 'app/Products/productListTemplate.html',
			controller: 'ProductsCtrl as vm'
		})
		.state('productEdit', {
			// if the state is abstract, it can't be transitioned to
			// It was child states below like productEdit.info
			abstract: true,
			url: '/products/edit/:productId',
			templateUrl: 'app/Products/productEditView.html',
			controller: 'ProductEditCtrl as vm',
			resolve: {
				// can add as many keys as needed to resolve all of the data needed prior to activating the state.
				productResource: 'productService',
				product: function(productResource, $stateParams) {
					var productId = $stateParams.productId;
					// return promise object, because it will be resolved (as a product object) before the productDetail state is activated. 
					// the controller will take in a parameter called product, which is the actual product object once the promise is resolved.
					return productResource.get({productId: productId}).$promise;
				}
			}
		})
		.state('productEdit.info', {
			url:'/info',
			templateUrl: 'app/Products/productInfo.html'
		})
		.state('productEdit.price', {
			url: '/price',
			templateUrl: 'app/Products/productPrice.html'
		})
		.state('productEdit.tags', {
			url: '/tages',
			templateUrl: 'app/Products/productTags.html'
		})
		.state('productAnalysis', {
			url:'/products/analytics',
			templateUrl: 'app/Prices/ProductPriceView.html',
			controller: 'PriceAnalyticsCtrl',
			resolve: {
				productResource: 'productService',
				products: function(productResource) {
					return productResource.query(function(response) {
						// no code needed for success
					}, function (response) {
						// error handling for async operation
						// failure here will prevent state transition
						if(response.status === 404) {
							alert('Error accessing resource: ' + response.config.method + ' ' + response.config.url);
						} else {
							alert(response.statusText);
						}
					}).$promise; // promise is passed to state controller. It is then resolved when the controller executes, and can lead to failure state if async call is unsuccessful
				}
			}
		})
		.state('productDetail', {
			url: '/products/detail/:productId',
			templateUrl: 'app/Products/productDetailView.html',
			controller: 'ProductDetailCtrl as vm',
			resolve: {
				// can add as many keys as needed to resolve all of the data needed prior to activating the state.
				productResource: 'productService',
				product: function(productResource, $stateParams) {
					var productId = $stateParams.productId;
					// return promise object, because it will be resolved (as a product object) before the productDetail state is activated. 
					// the controller will take in a parameter called product, which is the actual product object once the promise is resolved.
					return productResource.get({productId: productId}).$promise;
				}
			}
		})
	}]);
}());