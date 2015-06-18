angular.module('Salamanca').directive('drawOnCanvas', ['$window', function($window){
  return {
    restrict: 'A', // detects a class name
    scope: false, // parent scope
    link: function(scope, element, attrs){
      scope.documentElement = angular.element(document);
      scope.documentElement.bind("keydown keypress", function (event) {
        if(event.which === 27) {
          scope.deleteLast();
          event.preventDefault();
        }
      });


      console.log('offset left: ' + element[0].offsetLeft);
      console.log($window.innerWidth);
      console.log($window.innerWidth - element[0].offsetWidth);
      //console.log(element[0].offsetLeft + 30 + 122 + 66);
      



      element.css({ /* directive div */
        'background-color': 'lightgrey',
        'width': '100%',
        'cursor': 'pointer',
        'z-index': '0',
        'position':'relative',
      });
      element.addClass('setHeight')
      element.append("<div id='canvas'></div>");
      scope.targetElement = angular.element(document.getElementById('canvas'));
      scope.targetElement.css({ /* drawing div */
        'width': '100%',
        'height': element[0].offsetHeight + 'px',
        'cursor': 'pointer',
        'z-index': '3',
        'position':'relative',
      });

      // variables
      scope.percentages = [];
      scope.divArray = [];
      scope.currentDrawing = 0;

      scope.percentages['OS'] = { id: 0, value: 0, };
      scope.percentages['Bienvenida'] = { id: 1, value: 0, };
      scope.percentages['Navegacion'] = { id: 2, value: 0, };
      scope.percentages['Interes'] = { id: 3, value: 0, };
      scope.percentages['Publicidad'] = { id: 4, value: 0, };
      scope.percentages['Autopromocion'] = { id: 5, value: 0, };
      scope.percentages['Relleno'] = { id: 6, value: 0, };
      scope.percentages['SinUso'] = { id: 7, value: 100, };

      scope.osValue = 0;
      scope.bienvenidaValue = 0;
      scope.navegacionValue = 0;
      scope.interesValue = 0;
      scope.publicidadValue = 0;
      scope.autopromocionValue = 0;
      scope.rellenoValue = 0;
      scope.sinUsoValue = 100;

      scope.drawing = false;
      scope.initialX = 0;
      scope.initialY = 0;

      // element methods
      console.log(element);
      scope.targetElement.bind('mousedown', function(event){
        scope.resetSelection();
        scope.initialX = event.offsetX;
        scope.initialY = event.offsetY;
        console.log(event.offsetX);
        var x = event.clientX - event.clientX + 1;
        console.log(x);
        console.log(event.clientX);
        console.log('');
        element.append("<div class='selection-box' style='top:" + scope.initialY + "px; left:" + scope.initialX + "px;'></div>");
        scope.selectionBox = angular.element(document.getElementsByClassName('selection-box'));
        scope.drawing = true;
      });

      scope.targetElement.bind('mousemove', function(event){
        //console.log(event.offsetX + event.offsetY);
        //console.log(event.clientX - element[0].offsetLeft);
        if(scope.drawing === true){
          /*
          console.log(event.clientX);
          console.log(event.offsetX);
          console.log(event.clientX - element[0].offsetLeft)
          console.log('');
          */
          scope.currentX = event.offsetX;
          _width = Math.abs(scope.currentX - scope.initialX);
          scope.currentY = event.offsetY;
          _height = Math.abs(scope.currentY - scope.initialY);
          scope.selectionBox.css({
            'width': _width + 'px',
            'height': _height + 'px',
          });
          if(scope.currentX < scope.initialX){
            scope.selectionBox.css({
              'left': (scope.initialX - _width) + 'px',
            });
          }
          else{
            scope.selectionBox.css({
              'left': scope.initialX + 'px',
            });
          }
          if(scope.currentY < scope.initialY){
            scope.selectionBox.css({
              'top': (scope.initialY - _height) + 'px',
            });
          }
          else{
            scope.selectionBox.css({
              'top': scope.initialY + 'px',
            });
          }
        }
        else{
          // do nothing
        }
      });

      scope.targetElement.bind('mouseup', function(event){
        scope.drawing = false;
      });

      element.bind('mouseup', function(event){
        scope.drawing = false;
      });

      /* scope functions */
      scope.changeBackground = function(){
        scope.targetElement.css({
          'background-image': 'url(' + scope.fileContent + ')',
          'background-size': 'cover',
          'background-position': 'center center',
        });
      };

      scope.resetSelection = function(){
        if(element[0].children[1] === undefined){
          // do nothing
        }
        else{
          element[0].children[1].remove();
        }
      };

      scope.drawDiv = function(){
        scope.divArray[scope.currentDrawing] = {
          top : scope.selectionBox[0].offsetTop,
          left : scope.selectionBox[0].offsetLeft,
          width : scope.selectionBox[0].offsetWidth,
          height : scope.selectionBox[0].offsetHeight,
        };
        scope.resetSelection();
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

      /* directive functions */
      function createDiv(classname){
        scope.targetElement.append('<div id="' + scope.currentDrawing + '"></div>');
        var target = document.getElementById(scope.currentDrawing.toString());
        angular.element(target).css({
          'position': 'absolute',
          'opacity': 0.4,
          'top': scope.divArray[scope.currentDrawing].top + 'px',
          'left': scope.divArray[scope.currentDrawing].left + 'px',
          'width': scope.divArray[scope.currentDrawing].width + 'px',
          'height': scope.divArray[scope.currentDrawing].height + 'px',
          'z-index': '0',
        });
        angular.element(target).addClass(classname);
      };

      function updateSinUso(value){
        var total = scope.percentages['OS'].value +  scope.percentages['Bienvenida'].value +
        scope.percentages['Navegacion'].value + scope.percentages['Interes'].value +
        scope.percentages['Publicidad'].value + scope.percentages['Autopromocion'].value +
        scope.percentages['Relleno'].value;
        scope.percentages['SinUso'].value = (100 - total);
        if(scope.sinUsoValue < 0){
          scope.percentages['SinUso'].value = 0;
        }
        scope.sumAreas[7] = {
          x: "SinUso",
          y: [scope.percentages['SinUso'].value.toFixed(2)],
        };
      };

      function calculatePercentages(value, classname){
        var target = document.getElementById(scope.currentDrawing.toString());
        var auxWidth = angular.element(target)[0].offsetWidth;
        var auxLength = angular.element(target)[0].offsetHeight;
        var totalArea = scope.targetElement[0].offsetWidth * scope.targetElement[0].offsetHeight;
        var area = (auxWidth * auxLength);
        var p = ((area * 100)/totalArea);
        if(scope.percentages[classname] !== undefined){
          scope.percentages[classname].value += p;
        }
        else{
          scope.percentages[classname].value = p;
        }
        var id = scope.percentages[classname].id;
        scope.sumAreas[id] = { x:classname, y:[scope.percentages[classname].value.toFixed(2)] };
        updateSinUso(scope.percentages[classname].value);
      };

      scope.deleteLast = function(){
        var target = scope.targetElement[0].children[scope.targetElement[0].children.length-1];
        auxWidth = angular.element(target)[0].offsetWidth;
        auxHeight = angular.element(target)[0].offsetHeight;
        var childArea = (auxWidth * auxHeight);
        var totalArea = scope.targetElement[0].offsetWidth * scope.targetElement[0].offsetHeight;
        var childPercentage = ((childArea * 100)/totalArea);
        var classname = angular.element(target)[0].className;
        var id = scope.percentages[classname].id;
        var actualValue = scope.percentages[classname].value.toFixed(2);
        var lastChildValue = childPercentage.toFixed(2);
        var result = actualValue - lastChildValue;
        if(result < 0){
          scope.percentages[classname].value = 0;
        }
        else if(result > 100){
          scope.percentages[classname].value = 100;
        }
        else{
          scope.percentages[classname].value = result;
        }
        scope.sumAreas[id].y = [result];
        var sinUsoValue = scope.percentages['SinUso'].value;
        sinUsoValue = sinUsoValue + +lastChildValue;
        scope.percentages['SinUso'].value = sinUsoValue;
        scope.sumAreas[7].y = [+sinUsoValue];
        scope.targetElement[0].children[scope.targetElement[0].children.length-1].remove();
        scope.$apply();
      };

      scope.deleteAll = function(){
        scope.sumAreas[0] = { x: "OS", y: [0], };
        scope.sumAreas[1] = { x: "Bienvenida", y: [0], };
        scope.sumAreas[2] = { x: "Navegacion", y: [0], };
        scope.sumAreas[3] = { x: "Interes", y: [0], };
        scope.sumAreas[4] = { x: "Publicidad", y: [0], };
        scope.sumAreas[5] = { x: "Autopromocion", y: [0], };
        scope.sumAreas[6] = { x: "Relleno", y: [0], };
        scope.sumAreas[7] = { x: "SinUso", y: [100], };
        scope.percentages['OS'] = { id: 0, value: 0, };
        scope.percentages['Bienvenida'] = { id: 1, value: 0, };
        scope.percentages['Navegacion'] = { id: 2, value: 0, };
        scope.percentages['Interes'] = { id: 3, value: 0, };
        scope.percentages['Publicidad'] = { id: 4, value: 0, };
        scope.percentages['Autopromocion'] = { id: 5, value: 0, };
        scope.percentages['Relleno'] = { id: 6, value: 0, };
        scope.percentages['SinUso'] = { id: 7, value: 100, };
        var totalChilds = element[0].children[0].children.length;
        for(var i = totalChilds - 1; i >= 0; i--){
          angular.element(element[0].children[0].children[i]).remove();
        }
      };

    }/*end*/
  }
}]);
