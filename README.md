# p5-circle-packing

A p5.js circle packing generator.

## Use via `<script>` (no npm)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.3/p5.min.js"></script>
<script src="https://jesmehta.github.io/p5-circle-packing/CirclePack.js"></script>
<script>
  const foam = CirclePacking.getCirclePacking(20, 25, 75, 1000, 50);
</script>
````

A circle packing function that returns a canvas full of tangentially touching circles.  

## Input parameters :    

````
function getCirPack(minInitRadius, maxInitRadius, circleCount, maxAttempts, maxFinalRadius)
````

The function takes the following parameters :  

**Initial diameter : minInitRadius, maxInitRadius**  
These two parameters define a range for the starting ~radius~ diameter, actually. The actual diameter for each circle is a random value between these two values.

**Number of circles : circleCount**  
Specifies the max number of individual circles to be generated. This limit may not be reached, and you can specify a significantly high number to make sure a maximum possible number of circles is generated.

**How hard to try finding spaces : maxAttempts**  
Specifies the number of attempts to try to find a viable location for each new circle before giving up. A high enough number ensures best possible packing, while low numbers give you a spaced out result.

**Final diameter : maxRadius**  
The size of the circle at which it is flagged to stop growing any more. If the value is large, it removes an upper limit to the circle's growth, but the actual limit may never be reached.

## Outputs
Catch the output in a variable to use it further  
````
let foam = CirclePacking.getCirclePacking(20, 25, 75, 1000, 50);
````

The variable `foam` now contains a list of circle objects, each with the following properties  

**Location : x, y**  
**Size : bubRadius**  

Access these and use them further by cycling through the list using a for loop.

## Examples

