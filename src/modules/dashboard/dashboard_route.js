const dashboardRoute = function ($stateProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    views: {
      'main@': {
        templateUrl: 'src/modules/dashboard/template.html',
        controller: 'dashboardController as vm'
      }
    }
  })
}

export default dashboardRoute