AutoMarkings Plugin for Flot
=================
This is a plugin for drawing markers for minimum/maximum range and average values of series with [flot](http://www.flotcharts.org/).
Based on [AutoMarkings Plugin by kcdr](https://github.com/kcdr/flot-autoMarkings/raw/master/jquery.flot.autoMarkings.js)

## Example ##
See "example" directory

## Installation ##
[Download](https://github.com/i-lie/flot-autoMarkings/raw/master/jquery.flot.autoMarkings.js) and include the javaScript-file on your page:
```html
<script type="text/javascript" src="[...]/jquery.flot.min.js"></script>
<script type="text/javascript" src="[...]/jquery.flot.autoMarkings.js"></script>
```

## Options ##
Options can be set inside the 'series' option of the plot. Flot will then copy these to each series.
```javascript
var options = {
  series: {
    autoMarkings: {
      enabled: true,
        showMinMax: true,
        showAvg: true
    }
  }
};

$.plot(placeholder, data, options);
```

Options can also be set for each series individually to e.g. enable autoMarkings on one series and disable on another.

### enabled ###
Enable or disable autoMarkings.  
Value: [boolean]
Default: false
### color ###
Color to use for drawing the marking of the series. If not given the plugin will use the color calculated by flot for each series.  
Value: [string] e.g. "rgb(237,194,64)"
### avgcolor ###
Color to use for drawing the average line of the series. If not given the plugin will use the color calculated by flot for each series.  
Value: [string] e.g. "rgb(237,194,64)"
### showMinMax ###
Draw a marking between the minimum and maximum of the series data.  
Value: [boolean]
Default: false
### minMaxAlpha ###
Alpha value of minMax markings color.  
Value: [double]  
Default: 0.2
### showAvg ###
Draw a marking line for the average of the series data.  
Value: [boolean]
Default: false
### avgAlpha ###
Alpha value of avg markings color.  
Value: [double]
Default: 1.0
### min ###
The minimum value of the series data. If not given the plugin will automatically calculate this value.  
Value: [double]
### max ###
The maximum value of the series data. If not given the plugin will automatically calculate this value.  
Value: [double]
### avg ###
The average value of the series data. If not given the plugin will automatically calculate this value.  
Value: [double]
### avgLabel ###
Display the label of avg markings.
Value: [object]
It contains the following options
### show ###
Display the label of avg markings
Value: [boolean]
Default: true
### maxDecimals ###
How many decimal values will be displayed?
Value: [int]
Default: 2
### lineWidth ###
The lineWidth for the average value lines and other markers.  
Value: [int]  
Default: 2
