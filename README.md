Noodlerave
==========
Instant ultra cool looking sparkline graphs.

![header](http://i.imgur.com/w5N6GMG.png?1?8155)

Noodlerave is a concise jQuery plugin that helps you make soft looking sparkline graphs that look like noodles. The rave part is because you can also add gradients. It's also retina ready and responsive (just don't resize your browser)

There's not much more to it, really.

Usage
--

Import jQuery, Import jquery.noodlerave.js and create a div to hold your graph. Noodlerave will try to get the CSS height and width (letting you do stuff like full screen graphs), but you can send them as parameters using `data-width` and `data-height`.
After making your element just initialize Noodlerave and you are good to go.

    <div class="shirataki"></div>
    $(function(){
      $('.shirataki').noodlerave({
        values: [1,23,65,12,64,23]
      });
    });
    
    /*or*/
    
    <div class="udon" data-values="1,23,65,12,64,23"></div>
    $(function(){
      $('.udon').noodlerave();
    });
    
    /*or*/
    
    <div class="bakmi" data-height="80" data-values="1,23,65,12,64,23"></div>
    $(function(){
      $('.bakmi').noodlerave({
        width:  90,
        weight: 12
      });
    });
  
  
Configuration
--
You can set any parameter via a data- attribute on your div or programatically sending it as a named argument to noodlerave()


###values
(string/array) Comma separated list or array of values for the graph


###weight
(number) Weight of the line and endcaps. Default is 6


###fill
A fill color as a string or a gradient, defined as a object of positions and colors (You can use hex, names or even rgba).

      var nd = $('.noodle').noodlerave({
        fill: {
          0   : "#ff3c1f",
          .5  : "#ffc000",
          .75 : "#aeff00",
          1   : "#00ff78"
        }
      });

###cap
(true/false) Shows or hides the endcaps


###width
(number) Width of the container in pixels. Default is guessed from CSS


###height
(number) Height of the container in pixels. Default is guessed from CSS




Advanced configuration
--
You probably don't need to change this stuff, but things will look fun if you do.

###capProportion
(number) Mandates how wide the line should be in relation to the endcaps. Default is 0.9

###resolution
(number) Multiplier for the pixel canvas size. A higher number will look better on retina/HDPI devices, but raising it lowers the performance. Default is 2
