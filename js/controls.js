$(function() {
  var addBtn = true; //Whether the Save to PNG button should be inserted
  defaultParams.bgcolor = "#ffffff";
  defaultParams.linecolor = "#000000";

  function addSVG(div) {
    return div.insert("svg", ":first-child")
      .attr("height", 400)
      .attr("width", 400)
      .attr("viewBox", "-500 -500 1000 1000");
  }

  function lpad(num) {
    return ("00"+num).slice(-2);
  }

  function genDate() {
    var date = new Date();
    var string = date.getFullYear()+"";
    string += lpad((date.getMonth() + 1));
    string += lpad(date.getDate());
    return string;
  }

  var finalDiv = d3.select("div#final");
  var finalSVG = addSVG(finalDiv);

  finalDiv.append("button")
      .text("Generate map")
      .on("click", function () {
        doMap(finalSVG, defaultParams);
        if (addBtn) { 
          finalDiv.append("button")
            .text("Save to PNG")
            .on("click", function () {
                var ds = genDate();
                var svg = $("#final").find('svg');
                saveSvgAsPng(svg[0], "map-"+ds + ".png", {backgroundColor: defaultParams.bgcolor, top: -500, left: -500});
            });
          addBtn = false;
        }
      });


  $("legend").on('click', function() {
    var fs = $(this).parents('fieldset');
    if (fs.hasClass('closed')) {
      fs.removeClass('closed');
      $(this).find('span').text('-');
    } else {
      fs.addClass('closed');
      $(this).find('span').text('+');
    }
  });

  $(".controls").find('input').on('change', function() {
    var field = $(this).data('field'); 
    defaultParams[field] = $(this).val();
    if (/color$/.test(field)) {
      $("svg").css('background-color', defaultParams.bgcolor);
      $("path, line").css('stroke', defaultParams.linecolor);
    }
  });
});
