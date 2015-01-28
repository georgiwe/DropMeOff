'use strict';

angular.module('tripRouletteApp', ['ui.router', 'ngResource', 'ui.bootstrap'])

.config(['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider',
  function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    })

    .state('trips', {
      url: '/trips',
      templateUrl: 'app/trips/trips.html',
      controller: 'TripsCtrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'app/register/register.html',
      controller: 'RegisterCtrl'
    });

    //  $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
}])

.constant('API_URL', 'http://localhost:7777/api');