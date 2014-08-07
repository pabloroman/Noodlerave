NoodleRave
==========
Instant ultra cool sparkline graphs.

![header](http://i.imgur.com/w5N6GMG.png?1?8155)

NoodleRave is a concise jQuery plugin that helps you make soft looking sparkline graphs that look like noodles. The rave part is because you can also add gradients. It's also retina ready and responsive (just don't resize your browser)

There's not much more to it, really.

Usage
--

Import jQuery, Import jquery.noodlerave.js and create a div to hold your graph. You must give the div dimensions using css or otherwise it won't show up. Then just initialize noodlerave and you are good to go.

    <div class="noodle" data-values="1,23,65,12,64,23"></div>
    
    $(function(){
      $('.noodle').noodlerave();
    })
    
    /*or*/
    
    <div class="noodle"></div>
    
    $(function(){
      $('.noodle').noodlerave({
        values: [1,23,65,12,64,23]
      });
    })
  
  
Configuration
--
You can set any parameter via a data- attribute on your div or programatically sending it as a named argument to noodlerave()


###values
Comma separated list or array of values for the graph


###weight
Weight of the line and endcaps


###fill
A fill color as a string or a gradient, defined as a key->value of points and colors.

      var nd = $('.noodle').noodlerave({
        fill: {
          0   : "#ff3c1f",
          .5  : "#ffc000",
          .75 : "#aeff00",
          1   : "#00ff78"
        }
      });

###cap
(true/false) Shows or hides the end caps


###capProportion
(number) mandates how wide the line should be in relation to the caps. Default is 0.85
