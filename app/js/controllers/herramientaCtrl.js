angular.module('Salamanca').controller('herramientaCtrl', herramientaCtrl);

herramientaCtrl.$inject = ['$scope', '$state', '$timeout', 'imageToStringFactory', 'ngDialog'];

function herramientaCtrl($scope, $state, $timeout, imageToStringFactory, ngDialog) {

  $scope.fakepath = 'No se ha cargado ningún archivo';

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

  $scope.submitImage = function(){
    //$scope.fakepath = 'Subiendo archivo...';
    angular.element('#submitImageInput').trigger('click');
    imageToStringFactory.convert('submitImageInput');
  };

  $scope.uploadImage = function(){
    //imageToStringFactory.checkFile();
    var fileType = angular.element('#submitImageInput')[0].files[0].type;
      if(fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/gif' || fileType == 'image/bmp'){
        $timeout(function(){
          $scope.fakepath = angular.element('#submitImageInput')[0].value.toString();
        },250);
      }
      else{
        $scope.fakepath = 'No se ha cargado ningún archivo correcto';
        ngDialog.open({
          template: 'fileAlert',
          closeByDocument: true,
          closeByEscape: true
        });
      }
  };
};
