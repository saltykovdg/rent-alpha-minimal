export default appServices => {
    appServices.factory('propertyService', ($http) => {
        var successCallback = (response) => {
            return response.data;
        };
        var errorCallback = (response) => {
            console.log("ERROR: property.service");
            console.log(response);
        };
        return {
            getProperties: () => {
                return $http.post('/properties').then(successCallback, errorCallback);
            }
        }
    });
}
