var label1 = ["Design Options", "Designers", "Days Duration", "Revisions", "Work process", "Email & Phone Support"];
var label2 = ["Design options","Number of stationery items","Designers","Days Duration","Revisions","Work process","Email & Phone Support"];
var app = angular.module('designscook', ['ngCookies','angularUtils.directives.dirPagination', 'ui.router', 'templates'])
.config(function($stateProvider, $urlRouterProvider){
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/step1");
  //
  // Now set up the states
  $stateProvider
    .state('step1', {
      url: "/step1",
      templateUrl: "step1.html"
    })
    .state('step2', {
      url: "/step2",
      template: "<h2>Wad up</h2>"
    });
})
.controller('appController', ['$scope', '$http', '$location', '$cookies',function($scope, $http, $location, $cookies){
	$http.jsonp('http://api.ipify.org?format=jsonp&callback=JSON_CALLBACK', { cache: true }).then(function(response) { 
		var ip = response.data.ip;
		$http.get('https://freegeoip.net/json/'+ip, { cache: true }).then(function(r){
			var shortcode = r.data.country_code;
			$scope.currency = shortcode == 'NG' ? '₦' : '$';

			$scope.logoPricing = {
				price1: shortcode == 'NG' ? convertNGN("75") : "75",
				price2: shortcode == 'NG' ? convertNGN("150") : "150",
				price3: shortcode == 'NG' ? convertNGN("300"): "300",
				price4: shortcode == 'NG' ? convertNGN("1000"): "1000",
				labels: label1
			}
			$scope.stationeryPricing = {
				price1: shortcode == 'NG' ? convertNGN("25") : "25",
				price2: shortcode == 'NG' ? convertNGN("50") : "50",
				price3: shortcode == 'NG' ? convertNGN("75") : "75",
				price4: shortcode == 'NG' ? convertNGN("200") : "200",
				labels: label2
			}
			$scope.bannerPricing = {
				price1: shortcode == 'NG' ? convertNGN("25") : "25",
				price2: shortcode == 'NG' ? convertNGN("50") : "50",
				price3: shortcode == 'NG' ? convertNGN("100") : "100",
				price4: shortcode == 'NG' ? convertNGN("250") : "250",
				labels: label1
			}
			$scope.brochurePricing = {
				price1: shortcode == 'NG' ? convertNGN("150") : "150",
				price2: shortcode == 'NG' ? convertNGN("300") : "300",
				price3: shortcode == 'NG' ? convertNGN("500") : "500",
				price4: shortcode == 'NG' ? convertNGN("600") : "600",
				labels: label1
			}
			$scope.websitePricing = {
				price1: shortcode == 'NG' ? convertNGN("500") : "500",
				price2: shortcode == 'NG' ? convertNGN("800") : "800",
				price3: shortcode == 'NG' ? convertNGN("1050") : "1050",
				price4: shortcode == 'NG' ? convertNGN("1500") : "1500",
				labels: label1
			}
			$scope.corporatePricing = {
				price1: shortcode == 'NG' ? convertNGN("200") : "200",
				price2: shortcode == 'NG' ? convertNGN("400") : "400",
				price3: shortcode == 'NG' ? convertNGN("1250") : "1250",
				price4: shortcode == 'NG' ? convertNGN("3000") : "3000",
				labels: label2
			}
		});
	});
  $scope.state = 'all';
  $scope.showAll = function(){
  	$scope.state = 'all';
  }
  $scope.showDraft = function(){
  	$scope.state = 'draft';
  }
  $scope.showOpen = function(){
  	$scope.state = 'open';
  }
  $scope.showClosed = function(){
  	$scope.state = 'closed';
  }
  $scope.all = function(){
  	$scope.state = 'all';
  }
  $scope.projects = [];
  $scope.developer = 'Joseph Rex';
}]);
/* Converting to Nigerian Naira (NGN) */
var aDollarInNaira = 200;
function convertNGN(str){
  return numberWithCommas(parseInt(str.replace(",","")) * aDollarInNaira);
}
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}