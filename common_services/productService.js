(function() {
	angular.module('commonServices').factory('productService', ['$resource', ProductService]);
	
	function ProductService($resource) {
		return $resource('api/Products/:productId');
	}
	
}());