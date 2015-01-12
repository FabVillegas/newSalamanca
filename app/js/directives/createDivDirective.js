angular.module('Salamanca').directive("imageHolder", function(){

  return {
    restrict: 'C', // detects a class name
    scope: true, // child and parent $scope
    link: function($scope, element){

      $scope.divArray = [];
      $scope.currentDrawing = 0;

      var $container = $('#imgContainer');
      var $selection = $('<div>').addClass('selection-box');
      var $pos = $container.position();

      drawing = false;

      $scope.top = 0;
      $scope.left = 0;
      $scope.width = 0;
      $scope.height = 0;

      element.bind('mousedown', function(event){

        $scope.initialY = event.offsetY;
        $scope.initialX = event.offsetX;
        $selection.css({
            'top': $scope.initialY,
            'left': $scope.initialX,
            'width': 0,
            'height': 0
        });
        $selection.appendTo($container);
        drawing = true;
      });


      element.bind('mousemove', function(event){
        if(drawing){
          reset();
          $scope._width = Math.abs(event.offsetX - $scope.initialX);
          $scope._height = Math.abs(event.offsetY - $scope.initialY);
          $selection.css({
            'width': $scope._width,
            'height': $scope._height,
          });
          /*
          if(event.offsetX < $scope.initialX){
            $selection.css({
                'left': $scope.initialX - $scope._width
            });
          }
          if(event.offsetY < $scope.initialY){
            $selection.css({
                'top': $scope.initialY - $scope._height
            });
          }
          */

        }
        else{
          //nothing
        }
      });

      element.bind('mouseup', function(){
        drawing = false;
      });

      function reset(){
        $selection.css({
          'width': $scope._width
        });
      };

      function drawSelectionBox (){

      };


      function createDiv(){
        $('.area').remove();

        element.append('<div class="' + $scope.currentDrawing + '"></div>');

        switch($scope.currentDrawing){
          case 0:
            $('div').children('.0').css({
              'position': 'absolute',
              'top': $scope.divArray[$scope.currentDrawing].top + 'px',
              'left': $scope.divArray[$scope.currentDrawing].left + 'px',
              'width': $scope.divArray[$scope.currentDrawing].width + 'px',
              'height': $scope.divArray[$scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'aqua',
              'z-index': $scope.currentDrawing
            });
            break;
          case 1:
            $('div').children('.1').css({
              'position': 'absolute',
              'top': $scope.divArray[$scope.currentDrawing].top + 'px',
              'left': $scope.divArray[$scope.currentDrawing].left + 'px',
              'width': $scope.divArray[$scope.currentDrawing].width + 'px',
              'height': $scope.divArray[$scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'yellow',
              'z-index': $scope.currentDrawing
            });
            break;
          case 2:
            $('div').children('.2').css({
              'position': 'absolute',
              'top': $scope.divArray[$scope.currentDrawing].top + 'px',
              'left': $scope.divArray[$scope.currentDrawing].left + 'px',
              'width': $scope.divArray[$scope.currentDrawing].width + 'px',
              'height': $scope.divArray[$scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'orange',
              'z-index': $scope.currentDrawing
            });
            break;
          case 3:
            $('div').children('.3').css({
              'position': 'absolute',
              'top': $scope.divArray[$scope.currentDrawing].top + 'px',
              'left': $scope.divArray[$scope.currentDrawing].left + 'px',
              'width': $scope.divArray[$scope.currentDrawing].width + 'px',
              'height': $scope.divArray[$scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'green',
              'z-index': $scope.currentDrawing
            });
            break;
          case 4:
            $('div').children('.4').css({
              'position': 'absolute',
              'top': $scope.divArray[$scope.currentDrawing].top + 'px',
              'left': $scope.divArray[$scope.currentDrawing].left + 'px',
              'width': $scope.divArray[$scope.currentDrawing].width + 'px',
              'height': $scope.divArray[$scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'red',
              'z-index': $scope.currentDrawing
            });
            break;
          case 5:
            $('div').children('.5').css({
              'position': 'absolute',
              'top': $scope.divArray[$scope.currentDrawing].top + 'px',
              'left': $scope.divArray[$scope.currentDrawing].left + 'px',
              'width': $scope.divArray[$scope.currentDrawing].width + 'px',
              'height': $scope.divArray[$scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'purple',
              'z-index': $scope.currentDrawing
            });
            break;
          case 6:
            $('div').children('.6').css({
              'position': 'absolute',
              'top': $scope.divArray[$scope.currentDrawing].top + 'px',
              'left': $scope.divArray[$scope.currentDrawing].left + 'px',
              'width': $scope.divArray[$scope.currentDrawing].width + 'px',
              'height': $scope.divArray[$scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'gray',
              'z-index': $scope.currentDrawing
            });
            break;
          case 7:
            $('div').children('.7').css({
              'position': 'absolute',
              'top': $scope.divArray[$scope.currentDrawing].top + 'px',
              'left': $scope.divArray[$scope.currentDrawing].left + 'px',
              'width': $scope.divArray[$scope.currentDrawing].width + 'px',
              'height': $scope.divArray[$scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'wheat',
              'z-index': $scope.currentDrawing
            });
            break;
        }
        //$scope.currentDrawing += 1;
      }
    }
  };
});
