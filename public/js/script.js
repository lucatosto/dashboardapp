var app= angular.module("DashboardApp", []);

app.controller('DashboardController', function($scope) {

  $scope.data = [
      {name:"one", link: "link"},
      {name:"one", link: "link"},
      {name:"one", link: "link"},
      {name:"one", link: "link"},
      {name:"one", link: "link"},
      {name:"one", link: "link"},
      {name:"one", link: "link"}
    ];
});
