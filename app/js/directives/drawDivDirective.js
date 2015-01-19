angular.module('Salamanca').directive('divCanvas', function(){
  return {
    restrict: 'C', // detects a class name
    scope: false, // parent scope
    link: function(scope, element, attrs){
      /*
        markup required for directive to function, set width and height
        <div id="imgContainer" class="divCanvas"></div>
      */

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
      var $container = $('#imgContainer');
      var $selection = $('<div>').addClass('selection-box');
      var $pos = $container.position();

      // setup
      scope.totalArea = $container.width() * $container.height();
      drawing = false;
      scope.top = 0;
      scope.left = 0;
      scope.width = 0;
      scope.height = 0;
      var _top, _left, _width, _height;

      // element methods
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
      });

      // scope functions
      scope.deleteFilters = function(){
        $selection.css({
          'top': 0,
          'left': 0,
          'width': 0,
          'height': 0
        });
        scope.divArray = [];
        scope.currentDrawing = 0;
        drawing = false;
        scope.top = 0;
        scope.left = 0;
        scope.width = 0;
        scope.height = 0;
        $container.children().remove();
        scope.osValue = 0;
        scope.bienvenidaValue = 0;
        scope.navegacionValue = 0;
        scope.interesValue = 0;
        scope.publicidadValue = 0;
        scope.autopromocionValue = 0;
        scope.rellenoValue = 0;
        scope.sinUsoValue = 100;
        scope.sumAreas[0] = { x: "OS", y: [0], };
        scope.sumAreas[1] = { x: "Bienvenida", y: [0], };
        scope.sumAreas[2] = { x: "Navegacion", y: [0], };
        scope.sumAreas[3] = { x: "Contenido", y: [0], };
        scope.sumAreas[4] = { x: "Publicidad", y: [0], };
        scope.sumAreas[5] = { x: "Autopromocion", y: [0], };
        scope.sumAreas[6] = { x: "Relleno", y: [0], };
        scope.sumAreas[7] = { x: "SinUso", y: [100], };
      };


      scope.drawDiv = function(){
        scope.divArray[scope.currentDrawing] = {};
        scope.divArray[scope.currentDrawing].top = $selection.css('top');
        scope.divArray[scope.currentDrawing].left = $selection.css('left');
        scope.divArray[scope.currentDrawing].width = $selection.css('width');
        scope.divArray[scope.currentDrawing].height = $selection.css('height');
        resetSelection();
        switch(scope.selectedFilter){
        case 'OS y controles del navegador (Aqua)':
          createDiv('OS');
          calculatePercentages(scope.currentDrawing, 'OS');
          break;
        case 'Bienvenida e identidad del sitio (Amarillo)':
          createDiv('Bienvenida');
          calculatePercentages(scope.currentDrawing, 'Bienvenida');
          break;
        case 'Navegación (Naranja)':
          createDiv('Navegacion');
          calculatePercentages(scope.currentDrawing, 'Navegacion');
          break;
        case 'Contenido de interés (Verde)':
          createDiv('Interes');
          calculatePercentages(scope.currentDrawing, 'Interes');
          break;
        case 'Publicidad y patrocinio (Rojo)':
          createDiv('Publicidad');
          calculatePercentages(scope.currentDrawing, 'Publicidad');
          break;
        case 'Autopromoción (Morado)':
          createDiv('Autopromocion');
          calculatePercentages(scope.currentDrawing, 'Autopromocion');
          break;
        case 'Relleno (Gris)':
          createDiv('Relleno');
          calculatePercentages(scope.currentDrawing, 'Relleno');
          break;
        case 'Sin uso (Crema)':
          createDiv('SinUso');
          calculatePercentages(scope.currentDrawing, 'SinUso');
          break;
        default:
          // do nothing
          break;
        };
        scope.currentDrawing += 1;
      };

      // directive functions
      function createDiv(classname){
        $container.append('<div class="' + scope.currentDrawing + '"></div>');
        $('.' + scope.currentDrawing.toString()).css({
          'position': 'absolute',
          'opacity': 0.4,
          'top': scope.divArray[scope.currentDrawing].top,
          'left': scope.divArray[scope.currentDrawing].left,
          'width': scope.divArray[scope.currentDrawing].width,
          'height': scope.divArray[scope.currentDrawing].height,
        });
        $('.' + scope.currentDrawing.toString()).addClass(classname);
      };

      function resize(){ /* Evita bug, aunque no por completo */
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

      function updateSinUso(value){

        var total = scope.osValue + scope.bienvenidaValue + scope.navegacionValue + scope.interesValue
        + scope.publicidadValue + scope.autopromocionValue + scope.rellenoValue;

        scope.sinUsoValue = (100 - total);
        if(scope.sinUsoValue < 0){
          scope.sinUsoValue = 0;
        }
        scope.sumAreas[7] ={
          x: "SinUso",
          y: [scope.sinUsoValue],
        };
      };

      function calculatePercentages(value, classname){
        var auxWidth = $container.children('.' + value).width();
        var auxLength = $container.children('.' + value).height();
        var area = (auxWidth * auxLength);
        var p = ((area * 100)/scope.totalArea);
        switch(classname){
          case 'OS':
            scope.osValue += p;
            scope.sumAreas[0] ={
              x: classname,
              y: [scope.osValue],
            };
            updateSinUso(scope.osValue);
            break;
          case 'Bienvenida':
            scope.bienvenidaValue += p;
            scope.sumAreas[1] ={
              x: classname,
              y: [scope.bienvenidaValue],
            };
            updateSinUso(scope.bienvenidaValue);
            break;
          case 'Navegacion':
            scope.navegacionValue += p;
            scope.sumAreas[2] ={
              x: classname,
              y: [scope.navegacionValue],
            };
            updateSinUso(scope.navegacionValue);
            break;
          case 'Interes':
            scope.interesValue += p;
            scope.sumAreas[3] ={
              x: classname,
              y: [scope.interesValue],
            };
            updateSinUso(scope.interesValue);
            break;
          case 'Publicidad':
            scope.publicidadValue += p;
            scope.sumAreas[4] ={
              x: classname,
              y: [scope.publicidadValue],
            };
            updateSinUso(scope.publicidadValue);
            break;
          case 'Autopromocion':
            scope.autopromocionValue += p;
            scope.sumAreas[5] ={
              x: classname,
              y: [scope.autopromocionValue],
            };
            updateSinUso(scope.autopromocionValue);
            break;
          case 'Relleno':
            scope.rellenoValue += p;
            scope.sumAreas[6] ={
              x: classname,
              y: [scope.rellenoValue],
            };
            updateSinUso(scope.rellenoValue);
            break;
          case 'SinUso':
            var aux = scope.sinUsoValue + p;
            if(aux <= 100){
              scope.sinUsoValue += p;
              scope.sumAreas[7] ={
                x: classname,
                y: [scope.sinUsoValue],
              };
            }
            break;
          default:
            // do nothing
            break;
        };
      };

    } /* return closer */
  };
});
