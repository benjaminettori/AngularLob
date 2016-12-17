(function(){
	'use strict';
	angular.module('productManagement').controller('ProductEditCtrl', ['product', 'uibDateParser', '$state', 'productFinancialsSvc', ProductEditCtrl]);
	
	function ProductEditCtrl(product, uibDateParser, $state, productFinancialsSvc) {
		var vm = this;
		vm.product = product;
		
		if(vm.product && vm.product.productId) {
			vm.title = 'Edit: ' + vm.product.productName;
		}
		else {
			vm.title = 'New Product';
		}
		
		vm.opened = false;
		vm.openCalendar = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			vm.opened = !vm.opened;
		}
		
		vm.submit = function() {
			// The $resource adds a $save button to data returned by it. This method can be used to update the data
			vm.product.$save(function (data) {
				// toastr service to give visual feedback to user after saving.
				toastr.success("Save successful");
			});
		}
		
		vm.cancel = function() {
			// set the state for ui router
			$state.go('productList');
		}
		
		vm.addTags = function (tags) {
			if(tags) {
				var tagArray = tags.split(',');
				vm.product.tags = vm.product.tags ? vm.product.tags.concat(tagArray) : tagArray;	
				vm.newTags = "";
			}
			else {
				alert('Please enter some additional tags');
			}
			
		}
		
		vm.removeTag = function(indx) {
			vm.product.tags.splice(indx, 1);
		}
		
		// Price section
		vm.priceOption = 'percent';
		
		vm.calculatePrice = function () {
            var price = 0;

            if (vm.priceOption == 'amount') {
                price = productFinancialsSvc.calculatePriceFromAmount(
                    vm.product.cost, vm.markupAmount);
            }

            if (vm.priceOption == 'percent') {
                price = productFinancialsSvc.calculatePriceFromPercent(
                    vm.product.cost, vm.markupPercent);
            }
            vm.product.price = price;
        };
		
		// since html binding is on {{vm.marginPercent()}}, make variable a function
		// this forces code to re-evaluate margin percent when price or cost change
		// this is a detail of {{}} binding, because the variables that would trigger the binding evaluatation are the 
		// variables passed to the function.
		
		vm.marginPercent = function () {
			return productFinancialsSvc.calculateMarginPercent(vm.product.price, vm.product.cost);
		}
	}
}());