export default ($scope, $rootScope, $timeout, properties) => {
    var vm = $scope;
    $rootScope.properties = properties;

    $timeout(() => {
        //init header
        $('[name=header] .dropdown').dropdown();
    }, 0, false);
}
