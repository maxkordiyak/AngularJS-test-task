(function() {
 var app = angular.module("musicApp", ['ui.bootstrap', 'ngResource']);
 app.config(['$qProvider', function ($qProvider) {
         $qProvider.errorOnUnhandledRejections(false);
     }]);
  app.controller("AlbumController", function($scope, AlbumService, $uibModal, $q, $window) {

    $scope.albums = AlbumService.query();

    $scope.howMany = function() {
      AlbumService.count().$promise.then(function(response) {
        $window.alert("album count is " + response.value);
      });
    };

    $scope.openDialog = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'add_album.html',
        controller: ModalInstanceCtrl
      });

      modalInstance.result = function (newAlbum) {
        $scope.albums.push(newAlbum);
      };

    };

    $scope.editDialog = function(album){
      var modalInstance = $uibModal.open({
        templateUrl: 'edit_album.html',
        controller: editAlbumCtrl,
        resolve: {
        oldAlbum: function () {
          return album;
        }
       }
      });


    }

    $scope.removeAlbum = function(album) {
      AlbumService.remove(album, function(res) {
        $scope.albums = AlbumService.query();
      });

    };
  });

  var ModalInstanceCtrl = function ($scope, $uibModalInstance, AlbumService) {

  $scope.addAlbum = function (formData) {
    AlbumService.send(formData, function(res){
    $scope.albums = AlbumService.query();
    $uibModalInstance.close(res);

    });

  };

  // $scope.addAlbum = function (formData, $location) {
  //   AlbumService.send(formData).$promise.then(function(response) {
  //       $uibModalInstance.close();
  //        $location.path('/');
  //   });
  // };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};

  var editAlbumCtrl = function ($scope, $uibModalInstance, oldAlbum, AlbumService) {
  $scope.formData = oldAlbum;

  $scope.updateAlbum = function(){
   AlbumService.update(oldAlbum, function(res){
    $uibModalInstance.close(res);
  });

  };


  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};





})();
