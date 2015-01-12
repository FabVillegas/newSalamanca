var imgSize = 409920;
var imgUsed = 0;
var porc = 0;
var names = [];
var pieData = [];
var sum = [];
sum[0] = 0;
sum[1] = 0;
sum[2] = 0;
sum[3] = 0;
sum[4] = 0;
sum[5] = 0;
sum[6] = 0;
sum[7] = 0;
$(document).ready(function () {
    var $container = $('#container');
    var $selection = $('<div>').addClass('selection-box');
    var $image = $('#image');
    var $pos = $container.position();
    var _edit = false;

    $("#edit").on("change", function () {
        _edit = !_edit;
    });

    $container.on("click", ".final", function () {
        if (_edit) {
            $(this).remove();
            update();
        }
    }).on('mousedown', function (e) {
        if (_edit === true) return;
        var click_y = e.pageY - $pos.top, click_x = e.pageX - $pos.left;

        $selection.css({
            'top': click_y,
            'left': click_x,
            'width': 0,
            'height': 0
        });
        $selection.appendTo($container);

        $container.on('mousemove', function (e) {
            var move_x = e.pageX - $pos.left,
                move_y = e.pageY - $pos.top,
                width = Math.abs(move_x - click_x),
                height = Math.abs(move_y - click_y);

            $selection.css({
                'width': width,
                'height': height
            });
            if (move_x < click_x) { //mouse moving left instead of right
                $selection.css({
                    'left': click_x - width
                });
            }
            if (move_y < click_y) { //mouse moving up instead of down
                $selection.css({
                    'top': click_y - height
                });
            }
        }).on('mouseup', function (e) {
            $container.off('mousemove');
        });
    });
    Number.prototype.round = function (p) {
        p = p || 10;
        return parseFloat(this.toFixed(p));
    };
    $("#add").on('click', function (e) {
        var $text = $("#title").val().replace(/^s+|s+$/, '');
        if ($text.length && $($selection, $container).length) {
            clonerect($selection, $text);
            $selection.remove();
            update();
        }
    });

    $('#imgInp').change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var imgg = new Image()
                imgg.src = e.target.result;
                imgg.onload = function () {
                    $image.attr('src', this.src);
                    $image.attr('height',480);
                    $image.attr('width',854);
                };
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function clonerect($obj, $val) {
    $("<div>")
      .addClass("final")
      .attr("title", $val)
      .css({
          top: $obj.position().top,
          left: $obj.position().left,
          width: $obj.width(),
          height: $obj.height()
      })
      .appendTo("#container");
}

function update() {
    var o = [];
    var tamActual;
    o[0] = "Áreas seleccionadas";

    //Se busca el tipo seleccionado
    var res;
    $('.radiocontrol input:checked').each(
         function (i, e) {
             res = $(e).attr('clave');
             console.log(res);
         });

    imgUsed = imgSize;
    var divv;
    $(".final").each(function (index, el) {
        tamActual = parseInt($(el).width() * $(el).height(), 10);
        //o[index + 2] = "";

        divv = $(el)
        imgUsed = imgUsed - tamActual;
    });
    switch(res)
    {
        case "OS":
            {
                sum[0] = sum[0] + tamActual;
                divv.addClass("os");
                divv.attr("title","OS y controles del navegador");
                break;
            }
        case "ID":
            {
                sum[1] = sum[1] + tamActual;
                divv.addClass("idd");
                divv.attr("title","Bienvenida e identidad del sitio");
                break;
            }
        case "NAV":
            {
                sum[2] = sum[2] + tamActual;
                divv.addClass("nav");
                divv.attr('title',"Navegacion");
                break;
            }
        case "CON":
            {
                sum[3] = sum[3] + tamActual;
                divv.addClass("con");
                divv.attr('title',"Contenido de interes");
                break;
            }
        case "PAT":
            {
                sum[4] = sum[4] + tamActual;
                divv.addClass("pat");
                divv.attr('title',"Publicidad y patrocinio");
                break;
            }
        case "AUT":
            {
                sum[5] = sum[5] + tamActual;
                divv.addClass("aut");
                divv.attr('title',"Autopromocion");
                break;
            }
        case "FIL":
            {
                sum[6] = sum[6] + tamActual;
                divv.addClass("fil");
                divv.attr('title',"Relleno");
                break;
            }
        case "":
            {
                imgUsed = imgUsed + tamActual;
            }
    }
    porc = 100 / imgSize;
    pieData = [
				{
				    value: (sum[0] * porc).round(2),
				    color: "aqua"
				},
				{
				    value: (sum[1] * porc).round(2),
				    color: "yellow"
				},
				{
				    value: (sum[2] * porc).round(2),
				    color: "orange"
				},
				{
				    value: (sum[3] * porc).round(2),
				    color: "green"
				},
				{
				    value: (sum[4] * porc).round(2),
				    color: "red"
				},
				{
				    value: (sum[5] * porc).round(2),
				    color: "purple"
				},
				{
				    value: (sum[6] * porc).round(2),
				    color: "gray"
				},
				{
				    value: (sum[7] * porc).round(2),
				    color: "wheat"
				}

    ];

    var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);


    sum[7] = imgUsed;
    o[o.length + 1] = "'OS y controles del navegador (Aqua):" + parseFloat(sum[0] * porc).toFixed(2) + "%";
    o[o.length + 1] = "'Bienvenida e identidad del sitio (Amarillo):" + parseFloat(sum[1] * porc).toFixed(2) + "%";
    o[o.length + 1] = "'Navegacion (Naranja):" + parseFloat(sum[2] * porc).toFixed(2) + "%";
    o[o.length + 1] = "'Contenido de interés (Verde):" + parseFloat(sum[3] * porc).toFixed(2) + "%";
    o[o.length + 1] = "'Publicidad y patrocinio (Rojo):" + parseFloat(sum[4] * porc).toFixed(2) + "%";
    o[o.length + 1] = "'Autopromoción (Morado):" + parseFloat(sum[5] * porc).toFixed(2) + "%";
    o[o.length + 1] = "'Relleno (Gris):" + parseFloat(sum[6] * porc).toFixed(2) + "%";
    o[o.length + 1] = "'Sin uso (Crema):" + parseFloat(sum[7] * porc).toFixed(2) + "%";
    $("#output").val(o.join("\n"));
}
