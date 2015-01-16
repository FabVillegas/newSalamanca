angular.module('Salamanca').controller('secondCtrl', secondCtrl);

secondCtrl.$inject = ['$scope', '$state', '$timeout'];

function secondCtrl($scope, $state, $timeout) {

  $scope.newDiv = function(){
    $scope.drawDiv();
  };


  angular.element('#imgContainer').css({
    'background-color': 'grey',
    'background-size': 'cover',
    'background-position': 'center center',
  });

  $scope.fakepath = 'No se ha cargado ningún archivo';

  $scope.submitImage = function(){
    $scope.fakepath = 'Subiendo archivo...';
    angular.element('#submitImageInput').trigger('click');
    $scope.displayImage();
    $scope.fakepath = angular.element('#submitImageInput')[0].value.toString();
  };

  $scope.uploadImage = function(){
    $timeout(function(){
      $scope.fakepath = angular.element('#submitImageInput')[0].value.toString();
    },250);
  };

  $scope.displayImage = function(){
    // convert image to base64
    function el(id){
      return document.getElementById(id);
    }; // Get elem by ID
    function readImage() {
      if ( this.files && this.files[0] ) {
        var FR = new FileReader();
        FR.onload = function(e) {
          $scope.uploadImage();
          angular.element('#imgContainer').css({
            'background-image': 'url(' + e.target.result + ')',
          });
        };
        FR.readAsDataURL( this.files[0] );
      }
    };
    el("submitImageInput").addEventListener("change", readImage, false);
  };
};
