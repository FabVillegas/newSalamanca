angular.module('Salamanca').directive("imageHolder", function(){
  return {
    restrict: 'C', // detects a class name
    scope: true, // child and parent scope
    link: function(scope, element, attrs){

      scope.divArray = [];
      scope.currentDrawing = 0;

      var $container = $('#imgContainer');
      var $selection = $('<div>').addClass('selection-box');
      var $pos = $container.position();

      drawing = false;

      scope.top = 0;
      scope.left = 0;
      scope.width = 0;
      scope.height = 0;
      var _top, _left, _width, _height;


      element.bind('mousedown', function(event){
        resetSelection();
        scope.initialX = event.offsetX;
        scope.initialY = event.offsetY;
        $selection.appendTo($container);
        $selection.css({
          'top': scope.initialY,
          'left': scope.initialX,
        });
        drawing = true;
      });

      element.bind('mousemove', function(event){
        if(drawing){
          scope.currentX = event.offsetX;
          scope.currentY = event.offsetY;
          _width = Math.abs(scope.currentX - scope.initialX);
          _height = Math.abs(scope.currentY - scope.initialY);
          $selection.css({
            'width': _width,
            'height': _height,
          });
          resize();
          if(scope.currentX < scope.initialX){
            $selection.css({
              'left': scope.initialX - _width,
            });
          }
          else{
            $selection.css({
              'left': scope.initialX,
            });
          }
          resize();
          if(scope.currentY < scope.initialY){
            $selection.css({
              'top': scope.initialY - _height,
            });
          }
          else{
            $selection.css({
              'top': scope.initialY,
            });
          }
          resize();
        }
      });

      element.bind('mouseup', function(event){
        drawing = false;
        drawDiv();
      });

      function resize(){ /* Evita bug */
        $selection.css({
          'width': _width - 1,
          'height': _height - 1,
        });
      };

      function resetSelection(){
        $selection.css({
          'top': 0,
          'left': 0,
          'width': 0,
          'height': 0,
        });
      };

      function drawDiv(){
        scope.divArray[scope.currentDrawing] = {};
        scope.divArray[scope.currentDrawing].top = $selection.css('top');
        scope.divArray[scope.currentDrawing].left = $selection.css('left');
        scope.divArray[scope.currentDrawing].width = $selection.css('width');
        scope.divArray[scope.currentDrawing].height = $selection.css('height');
        switch(scope.selectedFilter){
          case 'OS y controles del navegador (Aqua)':
            $container.append('<div class="' + scope.currentDrawing + '"></div>');
            $('.' + scope.currentDrawing.toString()).css({
              'position': 'absolute',
              'opacity': 0.4,
              'top': scope.divArray[scope.currentDrawing].top,
              'left': scope.divArray[scope.currentDrawing].left,
              'width': scope.divArray[scope.currentDrawing].width,
              'height': scope.divArray[scope.currentDrawing].height,
            });
            $('.' + scope.currentDrawing.toString()).addClass('OS');
            break;
          case 1:
            $('div').children('.1').css({
              'position': 'absolute',
              'top': scope.divArray[scope.currentDrawing].top + 'px',
              'left': scope.divArray[scope.currentDrawing].left + 'px',
              'width': scope.divArray[scope.currentDrawing].width + 'px',
              'height': scope.divArray[scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'yellow',
              'z-index': scope.currentDrawing
            });
            break;
          case 2:
            $('div').children('.2').css({
              'position': 'absolute',
              'top': scope.divArray[scope.currentDrawing].top + 'px',
              'left': scope.divArray[scope.currentDrawing].left + 'px',
              'width': scope.divArray[scope.currentDrawing].width + 'px',
              'height': scope.divArray[scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'orange',
              'z-index': scope.currentDrawing
            });
            break;
          case 3:
            $('div').children('.3').css({
              'position': 'absolute',
              'top': scope.divArray[scope.currentDrawing].top + 'px',
              'left': scope.divArray[scope.currentDrawing].left + 'px',
              'width': scope.divArray[scope.currentDrawing].width + 'px',
              'height': scope.divArray[scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'green',
              'z-index': scope.currentDrawing
            });
            break;
          case 4:
            $('div').children('.4').css({
              'position': 'absolute',
              'top': scope.divArray[scope.currentDrawing].top + 'px',
              'left': scope.divArray[scope.currentDrawing].left + 'px',
              'width': scope.divArray[scope.currentDrawing].width + 'px',
              'height': scope.divArray[scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'red',
              'z-index': scope.currentDrawing
            });
            break;
          case 5:
            $('div').children('.5').css({
              'position': 'absolute',
              'top': scope.divArray[scope.currentDrawing].top + 'px',
              'left': scope.divArray[scope.currentDrawing].left + 'px',
              'width': scope.divArray[scope.currentDrawing].width + 'px',
              'height': scope.divArray[scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'purple',
              'z-index': scope.currentDrawing
            });
            break;
          case 6:
            $('div').children('.6').css({
              'position': 'absolute',
              'top': scope.divArray[scope.currentDrawing].top + 'px',
              'left': scope.divArray[scope.currentDrawing].left + 'px',
              'width': scope.divArray[scope.currentDrawing].width + 'px',
              'height': scope.divArray[scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'gray',
              'z-index': scope.currentDrawing
            });
            break;
          case 7:
            $('div').children('.7').css({
              'position': 'absolute',
              'top': scope.divArray[scope.currentDrawing].top + 'px',
              'left': scope.divArray[scope.currentDrawing].left + 'px',
              'width': scope.divArray[scope.currentDrawing].width + 'px',
              'height': scope.divArray[scope.currentDrawing].height + 'px',
              'color': 'black',
              'background-color': 'wheat',
              'z-index': scope.currentDrawing
            });
            break;
            default:
              alert('Seleccionar un tipo de filtro');
              break;
        }
        scope.currentDrawing += 1;
      };
    }
  };
});
