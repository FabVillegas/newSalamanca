angular.module('Salamanca').controller('herramientaCtrl', herramientaCtrl);

herramientaCtrl.$inject = ['$scope', '$state', '$timeout', 'imageToStringFactory', 'ngDialog'];

function herramientaCtrl($scope, $state, $timeout, imageToStringFactory, ngDialog) {

  $scope.fakepath = 'No se ha cargado ningún archivo';

  $scope.sumAreas = [];

  $scope.sumAreas[0] = { x: "OS", y: [0], };
  $scope.sumAreas[1] = { x: "Bienvenida", y: [0], };
  $scope.sumAreas[2] = { x: "Navegacion", y: [0], };
  $scope.sumAreas[3] = { x: "Interes", y: [0], };
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
    series: ["OS", "Bienvenida", "Navegacion", "Interes", "Publicidad", "Autopromocion", "Relleno", "SinUso"],
    data: $scope.sumAreas,
  };

  $scope.firstDiv = true;
  $scope.newDiv = function(){
    $scope.drawDiv();
    if($scope.firstDiv === true){
      ngDialog.open({
        template: 'percentagesNotifcation',
        closeByEscape: true,
        closeByDocument: true,
      });
      $scope.firstDiv = false;
    }
    else{
      // show no notification
    }
  };



  function el(id){
    return document.getElementById(id);
  };

  function readImage() {
    if ( this.files && this.files[0] ) {
      var FR = new FileReader();
       FR.onload = function(e) {
        $scope.fileContent = e.target.result;
        $scope.fileType = angular.element(document.getElementById('submitImageInput'))[0].files[0].type;
        $scope.filePath = angular.element(document.getElementById('submitImageInput'))[0].value.toString();;
        $scope.uploadImage();
      };
      FR.readAsDataURL( this.files[0] );
    }
  };

  el("submitImageInput").addEventListener("change", readImage, false);


  $scope.submitImage = function(){
    var target = document.getElementById('submitImageInput');
    angular.element(target)[0].click();
  };

  $scope.uploadImage = function(){
    if($scope.fileType === 'image/jpeg' || $scope.fileType === 'image/png' || $scope.fileType === 'image/gif' || $scope.fileType === 'image/bmp'){
      $timeout(function(){
        $scope.fakepath = $scope.filePath;
      },250);
      $scope.changeBackground();
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
