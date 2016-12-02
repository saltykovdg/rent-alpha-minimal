import 'semantic-ui-css/semantic.css'
import 'semantic-ui-css/semantic.js'

// vendor dependencies
import angular from 'angular';
import ngTranslate from 'angular-translate';
import ngDynamicLocale from 'angular-dynamic-locale';
import ngCookies from 'angular-cookies';
import ngSanitize from 'angular-sanitize';
import ngMessages from 'angular-messages';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngUiRouter from 'angular-ui-router';
import ngUiMask from 'angular-ui-mask';

// dto-services
import addressService from './dto-services/address.service.js';
import propertyService from './dto-services/property.service.js';

let appServices = angular.module('app.services', []);
addressService(appServices);
propertyService(appServices);

// controllers
import MainController from './views/main.controller.js';
import AddressStreetTypesController from './views/address.street.types.controller.js';

// view files
import headerTemplate from './views/header.html';
import addressStreetTypesTemplate from './views/address.street.types.html';

// application
angular
    .module('main', [
        'app.services',
        ngTranslate,
        ngDynamicLocale,
        ngCookies,
        ngSanitize,
        ngMessages,
        ngAnimate,
        ngAria,
        ngUiRouter,
        ngUiMask
    ])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('layout-template', {
                views: {
                    'body': {
                        controller: ['$scope', '$rootScope', '$timeout', 'properties', MainController]
                    },
                    'header@layout-template': {
                        template: headerTemplate
                    }
                },
                resolve: {
                    properties: (propertyService) => {
                        return propertyService.getProperties();
                    }
                }
            })
            .state('home', {
                url: '/',
                parent: 'layout-template'
            })
            .state('address-street-types', {
                url: '/address/street/types',
                parent: 'layout-template',
                views: {
                    'content@layout-template': {
                        template: addressStreetTypesTemplate,
                        controller: ['$scope', '$timeout', 'addressService', AddressStreetTypesController]
                    }
                }
            })
            .state('address-streets', {
                url: '/address/streets',
                parent: 'layout-template'
            })
            .state('address-buildings', {
                url: '/address/buildings',
                parent: 'layout-template'
            })
            .state('address-apartments', {
                url: '/address/apartments',
                parent: 'layout-template'
            })
    });