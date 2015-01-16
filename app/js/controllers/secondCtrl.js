angular.module('Salamanca').controller('secondCtrl', secondCtrl);

secondCtrl.$inject = ['$scope', '$state', '$timeout'];

function secondCtrl($scope, $state, $timeout) {
  $scope.sumAreas = [];
  $scope.sumAreas[0] = { x: "OS", y: [0], };
  $scope.sumAreas[1] = { x: "Bienvenida", y: [0], };
  $scope.sumAreas[2] = { x: "Navegacion", y: [0], };
  $scope.sumAreas[3] = { x: "Contenido", y: [0], };
  $scope.sumAreas[4] = { x: "Publicidad", y: [0], };
  $scope.sumAreas[5] = { x: "Autopromocion", y: [0], };
  $scope.sumAreas[6] = { x: "Relleno", y: [0], };
  $scope.sumAreas[7] = { x: "SinUso", y: [100], };

  $scope.chartType = 'pie';

  $scope.config = {
    title: 'Porcentajes',
    tooltips: true,
    labels: false,
    mouseover: function() {},
    mouseout: function() {},
    click: function() {},
    legend: {
      display: true,
      position: 'right' //could be 'left, right'
    },
    innerRadius: 0  , // applicable on pieCharts, can be a percentage like '50%'
    lineLegend: 'lineEnd', // can be also 'traditional'
    colors: ["aqua","yellow","orange","green","red","purple","grey","wheat"],
  };

  $scope.data = {
    series: ["OS", "Bienvenida", "Navegacion", "Contenido", "Publicidad", "Autopromocion", "Relleno", "SinUso"],
    data: $scope.sumAreas,
  };


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
