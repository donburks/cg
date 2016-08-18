$(function() {
  function addSVG(div) {
      return div.insert("svg", ":first-child")
          .attr("height", 400)
          .attr("width", 400)
          .attr("viewBox", "-500 -500 1000 1000");
  }

  var finalDiv = d3.select("div#final");
  var finalSVG = addSVG(finalDiv);

  finalDiv.append("button")
      .text("Generate high resolution map")
      .on("click", function () {
          doMap(finalSVG, defaultParams);
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
});
