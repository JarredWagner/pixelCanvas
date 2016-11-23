(function( $ ) {

  $.fn.pixelCanvas = function(options) {

    var settings = $.extend({
      divisor: 50,
      opacity: 0.25
    }, options);

    //Remove canvas and inline styles in event of resize
    $(this).children('canvas').remove();
    $(this).removeAttr('style');

    //Get this height, pre-canvas
    var thisHeight = $(this).outerHeight();

    //Create unique ID
    var canvasID = 'canvas'+Math.round(Math.random().toFixed(2)*100);
    var canvasHash = '#' + canvasID

    //Bring any children to the top
    $(this).find('*').css('z-index', '777');

    //Insert canvas before children
    $(this).prepend('<canvas id="'+canvasID+'"><canvas>');

    //Set position to relative, so absolutely positioned canvas moves with nav animation
    $(this).css('position', 'relative');
    //Position canvas
    $(canvasHash).css('position', 'absolute').css('top', 0).css('left', 0);
    //Fill width
    $(canvasHash).attr('width', $(window).width());

    //Set pixel size
    var canvasWidth = $(canvasHash).width();
    var canvasHeight = thisHeight;
    var squareSize = canvasHeight/settings.divisor;

    //Find row amount
    var columns = canvasWidth/squareSize;

    //Set canvas height
    $(canvasHash).attr('height', thisHeight);

    //Draw pixels!
    var canvas = document.getElementById(canvasID);
    if (canvas === null) {
      return;
    }
    var ctx = canvas.getContext('2d');

    var i = 0;

    //Draw rows
    while ( i < settings.divisor ) {

      var j = 0;

      //Draw columns
      while ( j < columns ) {

        //Randomize
        var randomOpacity = Math.random().toFixed(2);
        //Cap opacity
        while (randomOpacity > settings.opacity) {
          randomOpacity = Math.random().toFixed(2);
        }
        var randomColor = parseInt(Math.random()*100);

        ctx.fillStyle = "rgba("+ randomColor +","+ randomColor +","+ randomColor +","+ randomOpacity +")";
        ctx.fillRect(squareSize * j, squareSize * i, squareSize, squareSize);

        j++;

      }

      i++;

    }

    return this;

  };

}( jQuery ));
