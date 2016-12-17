(function()  {
	'use strict'
	angular.module('productManagement').controller('ProductDetailCtrl', ['product', 'productFinancialsSvc', ProductDetailCtrl]);
	
	function ProductDetailCtrl(product, productFinancialsSvc) {
		var vm = this;
		
		vm.product = product;
		
		vm.title = "Product Detail: " + vm.product.productName;
		
		if(vm.product.tags) {
			vm.product.tagList = vm.product.tags.toString();
		}
		
		vm.marginPercent = productFinancialsSvc.calculateMarginPercent(vm.product.price, vm.product.cost);
	}
}());