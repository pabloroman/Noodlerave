$.fn.noodlerave = function(_options) {
	
	var options = JSON.parse(JSON.stringify(_options));
	/*options needs to be cloned so the original _options remains pure*/

	var $this   = this,
	    options = defaults(options);
	    
	var width   = options.width*options.resolution,
	    height  = options.height*options.resolution;




	function defaults(options) {
		
		if(!options) {
			options = {};
		}
		
		if(options.values === undefined) {
			options.values = $this.data('values').split(',');
		}
		if(options.weight === undefined) {
			options.weight = $this.data('weight')?$this.data('weight'):6;
		}
		if(options.fill === undefined) {
			options.fill = $this.data('fill')?$this.data('fill'):'blue';
		}
		if(options.cap === undefined) {
			options.cap = $this.data('cap')?$this.data('cap'):true;
		}
		
		if(options.capProportion === undefined) {
			options.capProportion = $this.data('capProportion')?$this.data('capProportion'):.9;
		}
		if(options.resolution === undefined) {
			options.resolution = $this.data('resolution')?$this.data('resolution'):2;
		}
		
		if(options.width === undefined) {
			options.width = $this.data('width')?$this.data('width'):$this.width();
		}
		if(options.height === undefined) {
			options.height = $this.data('height')?$this.data('height'):$this.height();
		}
				
		return options;
		
	}
	
	
	
	
	function fill(ctx) {
		
		if(typeof options.fill === 'string') {
			return options.fill;
		} else {
			var grad= ctx.createLinearGradient(0, height, 0, 0);
			for(var i in options.fill) {
				grad.addColorStop(i,options.fill[i]);
			}			
			return grad;				
		}
		
	}




	function curve(points,ctx){
		
		/*
			http://stackoverflow.com/a/7058606
		*/
		ctx.lineWidth = (options.weight-2)*options.capProportion;
		ctx.strokeStyle = fill(ctx);
		ctx.beginPath();
		for (i = 1; i < points.length - 2; i ++) {
			var xc = (points[i].x + points[i + 1].x) / 2;
			var yc = (points[i].y + points[i + 1].y) / 2;			
			ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
		}
		ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y)
		ctx.stroke();
		
	}
	
	
	function cap(points,ctx) {
		
		ctx.beginPath();
		ctx.arc(points[1].x, points[1].y, options.weight-2, 0, 2 * Math.PI, false);
		ctx.fillStyle = fill(ctx);
		ctx.fill();
		ctx.arc(points[points.length-1].x, points[points.length-1].y, options.weight-2, 0, 2 * Math.PI, false);
		ctx.fillStyle = fill(ctx);
		ctx.fill();
		
	}


	function process(values) {
		
		var points = [];
		var max = Math.max.apply( Math, values );
		var min = Math.min.apply( Math, values );

		/*creates a very rough estimate of whether the chart starts pointing up or down*/
		values.unshift(
			(values[1]-values[0] > 0)?min:max
		);
		
		var count = values.length;
		
		var unit = (width-(options.weight*options.resolution))/(values.length-2);
		var i = options.weight+unit*-1;
		
		values.map(function(value){
			points.push({
				x: i,
				y: height-(options.weight + (parseInt(value)-min)*((height-options.weight)-options.weight)/(max-min))
			});
			i += unit;
		});
		
		return points;
		
	}




	function create2DCanvasElement($in){
		
		var $canvas = $('<canvas style="width:100%;height:100%;" width="'+width+'" height="'+height+'">');
		var canvas  = $canvas[0];
		$in.append($canvas);
		
		return canvas.getContext("2d");
		
	}
	
	    

	
	/*gogogo*/
	if($this.length > 1) {
		
		var rtn = [];
		$this.each(function(){
		console.log(_options);
			rtn.push($(this).noodlerave(_options));
		})
		return rtn;
		
	} else {

		if(!$this.data('__noodleraved')) {
			$this.append('<div class="__noodlerave-base" style="position:relative"></div>');
			var points  = process(options.values);
			var ctx     = create2DCanvasElement($this.find('.__noodlerave-base'));
			
			curve(points,ctx);
			if(options.cap === true){
				cap(points,ctx);	
			}
		}
		$this.data('__noodleraved',true)
		
		return({
			$element: $this,
			points: points,
			ctx: ctx,
			options: options
		});
		
	}

}
