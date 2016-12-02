export default appServices => {
    appServices.factory('addressService', ($http, $rootScope) => {
        var successCallback = (response) => {
            return response.data;
        };
        var errorCallback = (response) => {
            console.log("ERROR: address.service");
            console.log(response);
        };
        return {
            saveStreetType: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/street/type/save';
                return $http.post(url).then(successCallback, errorCallback);
            },
            deleteStreetType: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/street/type/' + id + '/delete';
                return $http.post(url).then(successCallback, errorCallback);
            },
            getStreetTypeById: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/street/type/' + id;
                return $http.post(url).then(successCallback, errorCallback);
            },
            getStreetTypePageable: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/street/types';
                return $http.post(url).then(successCallback, errorCallback);
            },
            saveStreet: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/street/save';
                return $http.post(url).then(successCallback, errorCallback);
            },
            deleteStreet: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/street/' + id + '/delete';
                return $http.post(url).then(successCallback, errorCallback);
            },
            getStreetById: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/street/' + id;
                return $http.post(url).then(successCallback, errorCallback);
            },
            getStreetPageable: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/streets';
                return $http.post(url).then(successCallback, errorCallback);
            },
            saveDistrict: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/district/save';
                return $http.post(url).then(successCallback, errorCallback);
            },
            deleteDistrict: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/district/' + id + '/delete';
                return $http.post(url).then(successCallback, errorCallback);
            },
            getDistrictById: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/district/' + id;
                return $http.post(url).then(successCallback, errorCallback);
            },
            getDistrictPageable: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/districts';
                return $http.post(url).then(successCallback, errorCallback);
            },
            saveBuildingTypeLivability: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/type/livability/save';
                return $http.post(url).then(successCallback, errorCallback);
            },
            deleteBuildingTypeLivability: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/type/livability/' + id + '/delete';
                return $http.post(url).then(successCallback, errorCallback);
            },
            getBuildingTypeLivabilityById: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/type/livability/' + id;
                return $http.post(url).then(successCallback, errorCallback);
            },
            getBuildingTypeLivabilityPageable: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/type/livability';
                return $http.post(url).then(successCallback, errorCallback);
            },
            saveBuildingMaterial: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/material/save';
                return $http.post(url).then(successCallback, errorCallback);
            },
            deleteBuildingMaterial: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/material/' + id + '/delete';
                return $http.post(url).then(successCallback, errorCallback);
            },
            getBuildingMaterialById: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/material/' + id;
                return $http.post(url).then(successCallback, errorCallback);
            },
            getBuildingMaterialPageable: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/materials';
                return $http.post(url).then(successCallback, errorCallback);
            },
            saveBuilding: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/save';
                return $http.post(url).then(successCallback, errorCallback);
            },
            deleteBuilding: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/' + id + '/delete';
                return $http.post(url).then(successCallback, errorCallback);
            },
            getBuildingById: (id) => {
                let url = $rootScope.properties.rentApiServerUrl + '/building/' + id;
                return $http.post(url).then(successCallback, errorCallback);
            },
            getBuildingPageable: () => {
                let url = $rootScope.properties.rentApiServerUrl + '/buildings';
                return $http.post(url).then(successCallback, errorCallback);
            }
        }
    });
}
