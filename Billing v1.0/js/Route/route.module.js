(function(){
	
	var name="main.routing",
	requires = ["ngRoute"];
	
	angular.module(name,requires)
		.config(function($routeProvider){
			$routeProvider
				.when("/billing",{
					templateUrl: "html/billing.html",
					controller: "Billing"
					
				})
				.when("/search",{
					templateUrl: "html/search.html",
					controller:"Search"
				})
				
				.otherwise({
					redirectTo: "/billing"
				})
			
		})
})();