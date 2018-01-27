angular.module('BlocksApp').controller('TokenController', function($stateParams, $rootScope, $scope, $http, $location) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });
    var activeTab = $location.url().split('#');
    if (activeTab.length > 1)
      $scope.activeTab = activeTab[1];

    $rootScope.$state.current.data["pageSubTitle"] = $stateParams.hash; //replace with token name
    $scope.addrHash = isAddress($stateParams.hash) ? $stateParams.hash : undefined;
    var address = $scope.addrHash;
    $scope.token = {"balance": 0};

    //fetch dao stuff
    $http({
      method: 'POST',
      url: '/tokenrelay',
      data: {"action": "info", "address": address}
    }).success(function(data) {
      console.log(data)
      $scope.token = data;
      $scope.token.address = address;
      $scope.addr = {"bytecode": data.bytecode};
      if (data.name)
        $rootScope.$state.current.data["pageTitle"] = data.name;
    });

    $scope.form = {};
    $scope.errors = {};
    $scope.showTokens = false;
    $scope.getBalance = function(a) {
        var addr = a.toLowerCase();

        $scope.form.addrInput="";
        $scope.errors = {};

        $scope.form.tokens.$setPristine();
        $scope.form.tokens.$setUntouched();
        if (isAddress(addr)) {
          $http({
            method: 'POST',
            url: '/tokenrelay',
            data: {"action": "balanceOf", "user": addr, "address": address}
          }).success(function(data) {
            console.log(data)
            $scope.showTokens = true;
            $scope.userTokens = data.tokens;
          });
        } else 
            $scope.errors.address = "Invalid Address";

    }

})
.directive('contractSource', function($http) {
  return {
    restrict: 'E',
    templateUrl: '/views/contract-source.html',
    scope: false,
    link: function(scope, elem, attrs){
        //fetch contract stuff
        $http({
          method: 'POST',
          url: '/compile',
          data: {"addr": scope.addrHash, "action": "find"}
        }).success(function(data) {
          scope.contract = data;
        });
      }
  }
})
