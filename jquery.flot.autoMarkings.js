/** AutoMarkings Plugin for flot
 * https://github.com/kcdr/flot-autoMarkings/edit/master/README.md
 * 
 * Copyright (c) 2015 kcdr
 * 
 * Licensed under the MIT license.
 * 
 * Version v0.2.2
 * 
 */

(function ($) {
    
	/** Options
	 * enabled
     * color
     * avgcolor
     * showMinMax
     * minMaxAlpha
     * showAvg
     * avgAlpha
     * avgLabel
     *     show
     *     maxDecimals
     * min
     * max
     * avg
     */
    var options = {
		series: { 
			autoMarkings: {
				enabled: false, 
				minMaxAlpha: 0.2, 
				lineWidth: 2, 
				avgAlpha: 1.0,
				avgLabel: {
					show: true,
					maxDecimals: 2
				}
			}
		}
    };
    
    function init(plot) {
        function autoMarkingsFunction(plot, offset) {
        	
        	plot.getOptions().grid.markings = new Array();
        	
        	$(plot.getData()).each(function(index) {
        		
        		if (this.autoMarkings && (this.autoMarkings.enabled === true)) {
        			
                    if (plot.getOptions().grid.markings == null) {
                    	plot.getOptions().grid.markings = new Array();
                    }
        		
                    if ((this.autoMarkings.showMinMax === true) || (this.autoMarkings.showAvg === true)) {
	                    if ((this.autoMarkings.min == null) || (this.autoMarkings.max == null) || (this.autoMarkings.avg == null)) {
							var min=Number.MAX_VALUE;
							var max=0;
							var sum = 0;
							var count = 0;
							
							$(this.data).each(function() {
								if( this[1] < min) min=this[1];
								if( this[1] > max) max=this[1];
								count++;
								sum += this[1];
							});
							
							if (this.autoMarkings.min == null) {
								this.autoMarkings.min = min;
							}
							
							if (this.autoMarkings.max == null) {
								this.autoMarkings.max = max;
							}
							
							if (this.autoMarkings.avg == null) {
								this.autoMarkings.avg = sum/count;
							}
						}
	                    
						if (this.autoMarkings.lineWidth) {
							plot.getOptions().grid.markingsLineWidth = parseInt(this.autoMarkings.lineWidth);
						}
                    }
                    
                    var seriesColor = this.autoMarkings.color || this.color;
                    var avgseriesColor = this.autoMarkings.avgcolor || this.color;

                    var axis = "y" + (this.yaxis.n > 1 ? this.yaxis.n : "") + "axis";
                    
	        		if ((this.autoMarkings.showMinMax === true) && (this.autoMarkings.min != Number.MAX_VALUE) && (this.autoMarkings.max != 0)) {
	        			var marking = { color: seriesColor.replace('rgb(','rgba(').replace(')',','+this.autoMarkings.minMaxAlpha+')') };
	        			marking[axis] = { from: this.autoMarkings.min, to: this.autoMarkings.max };
	        			plot.getOptions().grid.markings.push(marking);
	        		}
	        		
	        		if ((this.autoMarkings.showAvg === true) && !isNaN(this.autoMarkings.avg)) {
        				marking_color = $.color.parse(avgseriesColor);
        				marking_color.a = this.autoMarkings.avgAlpha;
	        			
	        			var marking = { color: marking_color };
	        			marking[axis] = { from: this.autoMarkings.avg, to: this.autoMarkings.avg };
	        			plot.getOptions().grid.markings.push(marking);
	        			
	        			if (!this.autoMarkings.avgcolor) {
	        				this.autoMarkings.avgcolor = marking_color;
	        			}
	        		}
        		}
        	});
        }
        
        // draw marking labels
        function autoMarkingsDrawFunction(plot, context) {
        	var options = plot.getOptions();
        	var option_auto_marking = options.series.autoMarkings;
        	
        	if (!option_auto_marking || !option_auto_marking.enabled || !option_auto_marking.showAvg || !option_auto_marking.avgLabel.show) {
        		return;
        	}
        	
			var placeholder = plot.getPlaceholder();

			$(plot.getData()).each(function(index) {
	
				// make sure that it hasn't been added to placeholder
				var avg_label_class = "automarkings-avg-label avg-label-series-" + index;
				if (placeholder.find("." + avg_label_class.replace(" ", ".")).length == 0) {
					
					// calculate the label position
		        	var o = plot.pointOffset({x: this.data.length - 1, y: Math.floor(this.autoMarkings.avg)});

		        	var label_pos = {
		        		left: o.left + 4,
		        		top: o.top
		        	};
		        	
		        	// set the label text
		        	var label_text = this.autoMarkings.avg;
		        	if (parseInt(option_auto_marking.avgLabel.maxDecimals) != Number.NaN) {
		        		label_text = label_text.toFixed(option_auto_marking.avgLabel.maxDecimals);
		        	}
		        	
		        	// set label color
		        	var label_color = this.autoMarkings.avgcolor;
		        	label_color.a = 1.0;
	
		        	// create the label
		        	var avg_label = $("<div>" + label_text + "</div>")
		        		.addClass(avg_label_class)
			        	.css({
			        		position: "absolute",
			        		left: label_pos.left,
			        		top: label_pos.top,
			        		color: label_color.toString(),
			        		dataAvgLabelColor: label_color.toString()
			        	})
		        		.appendTo(placeholder);
				}
			});
        }
        
        function onResize() {
        	var placeholder = plot.getPlaceholder();
        	
        	// remove the labels so it can be redrawn
        	placeholder.find(".automarkings-avg-label").remove();
        }
        
        function bindEvents(plot, eventHolder) {
        	plot.getPlaceholder().resize(onResize);
        }
        
        function shutdown(plot, eventHolder) {
        	plot.getPlaceholder().unbind("resize", "onResize");
        }

        plot.hooks.processOffset.push(autoMarkingsFunction);
        plot.hooks.draw.push(autoMarkingsDrawFunction);
        plot.hooks.bindEvents.push(bindEvents);
        plot.hooks.shutdown.push(shutdown);
    }


    $.plot.plugins.push({
        init: init,
        options: options,
        name: "autoMarkings",
        version: "0.2.3"
    });
})(jQuery);
