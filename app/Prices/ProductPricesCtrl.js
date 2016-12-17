(function() {
    angular.module('productManagement').controller('PriceAnalyticsCtrl', ['$scope', '$filter', 'products', 'productFinancialsSvc', PriceAnalyticsCtrl])

    function PriceAnalyticsCtrl($scope, $filter, products, productFinancialSvc) {
        $scope.title = 'Price Analytics';

        var marginPercent = products.map(p => productFinancialSvc.calculateMarginPercent(p.price, p.cost));
        var marginAmount = products.map(p => productFinancialSvc.calculateMarginAmount(p.price, p.cost));

        $scope.dataAmount = [products.map(p => p.price), products.map(p => p.cost), marginAmount];
        $scope.seriesAmount = ['Price', 'Cost', 'Margin Amount'];
        $scope.seriesLabels = products.map(p => p.productName);

        $scope.dataPercent = [marginPercent];
        $scope.seriesPercent = ['Margin Percentage'];
        $scope.seriesLabelsPercent = products.map(p => p.productName);
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
        $scope.options = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1' ,
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }]
            }
        };
    }
}());