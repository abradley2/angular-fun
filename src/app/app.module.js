angular
	.module('app', [ 'ngRoute' ])
	.run(function ($templateCache) {
		$('script[type="text/html"][data-template]').each(function () {
			$templateCache.put(
				this.getAttribute('id'),
				this.innerHTML
			)
		})
	})
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.template.html'
				, controller: 'HomeCtrl'
			})
	})
