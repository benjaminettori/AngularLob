(function () {
	'use strict';
	angular.module('productManagement').controller('ProductsCtrl', ['productService', ProductsController]);
		
	function ProductsController(productService) {
		var vm = this;
		
		productService.query(function(data) {
			vm.products = data;
		});
		
		 vm.showImage = false;

        vm.toggleImage = function() {
            vm.showImage = !vm.showImage;
        }
		
	}
})();