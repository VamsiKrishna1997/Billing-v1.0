(function(){
	
	var name="main",
		requires = ["main.routing","main.billing","main.search"];
	
	angular.module(name, requires)	
		.run(['$route',function($route){
			$route.reload();
}]);
	
})();