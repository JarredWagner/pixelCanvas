(function( $ ) {

  $.fn.pixelCanvas = function(options) {

    //Settings

      var settings = $.extend({
        priority: 'vertical',
        pixelSize: 50,
        minOpacity: 0,
        maxOpacity: 0.25
      }, options);

    //DOM

      //Clean slate for resize or orientationchange
      $(this).children('canvas').remove().removeAttr('style');

      //Get this size, pre-canvas
      var thisWidth = $(this).outerWidth();
      var thisHeight = $(this).outerHeight();

      //Set relative position for animation support, bring any children to the top
      $(this).css('position', 'relative').find('*').css('z-index', '777');

      //Create unique ID
      var canvasID = 'canvas'+Math.round(Math.random().toFixed(2)*100);
      var canvasHash = '#' + canvasID

      //Insert Canvas
      $(this).prepend('<canvas id="'+canvasID+'"><canvas>');
      //Set size, position
      $(canvasHash)
        .attr('width', thisWidth)
        .attr('height', thisHeight)
        .css('position', 'absolute')
        .css('top', 0)
        .css('left', 0)
      ;

    //Drawing function

      function drawPixels(iLoopParameter, jLoopParameter, x, y) {

        var canvas = document.getElementById(canvasID);
        if (canvas === null) {
          return;
        }
        var ctx = canvas.getContext('2d');

        var i = 0;
        while ( i < iLoopParameter ) {

          var j = 0;
          while ( j < jLoopParameter ) {

            //Randomize Opacity
            var randomOpacity = Math.random().toFixed(2);
            //Constrain Opacity
            while (randomOpacity < settings.minOpacity || randomOpacity > settings.maxOpacity) {
              randomOpacity = Math.random().toFixed(2);
            }
            //Randomize Color
            var randomColor = parseInt(Math.random()*100);

            ctx.fillStyle = "rgba("+ randomColor +","+ randomColor +","+ randomColor +","+ randomOpacity +")";
            
            if ( settings.priority === 'vertical' ) {
							var x = j;
							var y = i;
			      } else if ( settings.priority === 'horizontal' ) {
							var x = i;
							var y = j;		
			      }
			      
            ctx.fillRect(iLoopParameter * x, iLoopParameter * y, iLoopParameter, iLoopParameter);

            j++;

          }

          i++;

        }

      }

    //Prep pixels and draw

      if ( settings.priority === 'vertical' ) {

        //VERTICAL PRIORITY

          var rows = thisHeight/settings.pixelSize;
          var columns = thisWidth/rows;
          drawPixels(rows, columns);

      } else if ( settings.priority === 'horizontal' ) {

        //HORIZONTAL PRIORITY

          var columns = thisWidth/settings.pixelSize;
          var rows = thisHeight/columns;
          drawPixels(columns, rows);

      }

    return this;

  };

}( jQuery ));
