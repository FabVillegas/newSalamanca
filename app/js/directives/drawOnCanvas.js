angular.module('Salamanca').directive('drawOnCanvas', function(){
  return {
    restrict: 'A', // detects a class name
    scope: {}, // parent scope
    link: function(scope, element, attrs){
      element.css({
        'background-color': 'grey',
        'background-size': 'cover',
        'background-position': 'center center',
        'width': '100%',
        'height': '500px',
        'cursor': 'pointer',
        'z-index': '1',
      });

      element.append("<div id='canvas'></div>");
      var target = document.getElementById('canvas');
      targetElement = angular.element(target);
      console.log(targetElement);
      targetElement.css({
        'width': '100%',
        'height': '500px',
        'cursor': 'pointer',
        'z-index': '2',
      });
      // variables
      scope.divArray = [];
      scope.currentDrawing = 0;

      scope.osValue = 0;
      scope.bienvenidaValue = 0;
      scope.navegacionValue = 0;
      scope.interesValue = 0;
      scope.publicidadValue = 0;
      scope.autopromocionValue = 0;
      scope.rellenoValue = 0;
      scope.sinUsoValue = 100;

      // jquery object
      //var $container = $('#imgContainer');
      //var $selection = $('<div>').addClass('selection-box');
      //var $pos = $container.position();

      // setup
      //scope.totalArea = $container.width() * $container.height();
      drawing = false;
      scope.initialX = 0;
      scope.initialY = 0;
      scope.top = 0;
      scope.left = 0;
      scope.width = 0;
      scope.height = 0;
      var _top, _left, _width, _height;

      // element methods
      targetElement.bind('mousedown', function(event){
        scope.resetSelection();
        scope.initialX = event.offsetX;
        scope.initialY = event.offsetY;
        console.log(scope.initialX);
        console.log(scope.initialY);

        element.append("<div class='selection-box' style='top:" + scope.initialY + "px; left:" + scope.initialX + "px;'></div>");
        drawing = true;
        /*
        resetSelection();
        scope.initialX = event.offsetX;
        scope.initialY = event.offsetY;
        $selection.appendTo($container);
        $selection.css({
          'top': scope.initialY,
          'left': scope.initialX,
        });
        drawing = true;
        */
      });

      targetElement.bind('mousemove', function(event){
        if(drawing){
          scope.currentX = event.offsetX;
          scope.currentY = event.offsetY;
          _width = Math.abs(scope.currentX - scope.initialX);
          _height = Math.abs(scope.currentY - scope.initialY);
          var target = document.getElementsByClassName('selection-box');
          scope.targetElement = angular.element(target);
          scope.targetElement.css({
            'width': _width + 'px',
            'height': _height + 'px',
          });
          //console.log(element[0].children)
          if(scope.currentX < scope.initialX){
            scope.targetElement.css({
              'left': (scope.initialX - _width) + 'px',
            });
          }
          else{
            scope.targetElement.css({
              'left': scope.initialX + 'px',
            });
          }
          if(scope.currentY < scope.initialY){
            scope.targetElement.css({
              'top': (scope.initialY - _height) + 'px',
            });
          }
          else{
            scope.targetElement.css({
              'top': scope.initialY + 'px',
            });
          }
        }
        else{
          // do nothing
        }
        /*
        if(drawing){
          scope.currentX = event.offsetX;
          scope.currentY = event.offsetY;
          _width = Math.abs(scope.currentX - scope.initialX);
          _height = Math.abs(scope.currentY - scope.initialY);
          scope._width = (scope.currentX - scope.initialX);
          scope._height = (scope.currentY - scope.initialY);

          $selection.css({
            'width': _width,
            'height': _height,
          });
          //resize();
          /*
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
          //resize();
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
          //resize();
        }
        */
      });

      targetElement.bind('mouseup', function(event){
        drawing = false;
      });


      /* scope functions */
      scope.resetSelection = function(){
        if(element[0].children[1] === undefined){
          // do nothing
        }
        else{
          //console.log(element[0].children[1])
          element[0].children[1].remove();
        }
      };



    }/*end*/
  }
});
