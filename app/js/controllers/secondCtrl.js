angular.module('Salamanca').controller('secondCtrl', secondCtrl);

secondCtrl.$inject = ['$scope', '$state'];

function secondCtrl($scope, $state){
$scope.filters = [
    {
      name: 'OS y controles del navegador (aqua)',
      filterValue: 0
    },
    {
      name: 'Bienvenida e identidad del sitio (amarillo)',
      filterValue: 1
    },
    {
      name: 'Navegación (naranja)',
      filterValue: 2
    },
    {
      name: 'Contenido de interés (verde)',
      filterValue: 3
    },
    {
      name: 'Publicidad y patrocinio (rojo)',
      filterValue: 4
    },
    {
      name: 'Autopromoción (morado)',
      filterValue: 5
    },
    {
      name: 'Relleno (gris)',
      filterValue: 6
    },
    {
      name: 'Sin uso (crema)',
      filterValue: 7
    }
  ];


};
