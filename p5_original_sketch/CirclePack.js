//CP v1.5 - CirPack as returned object, and a lot of housekeeping - comments, varaiable names, etc

// let r0_Min, r0_Max;
// let foam = [];
// let giveUp = 0;

function getCirPack(minInitRadius, maxInitRadius, circleCount, maxAttempts, maxFinalRadius)
{
  let foam = [];                        //primary object to contain list of circles
  // minInitRadius = r0_min;
  // maxInitRadius = r0_max;
  // let n = n_;
  let noOfAttempts = 0;

  //first point
  if(foam.length==0)
  {
    let x = random(width);
    let y = random(height);
    let r = random(minInitRadius,maxInitRadius);
    let bub = new Bubble(x,y,r);
    foam.push(bub);
  }

  //generates points
  //checking against required number of circle and maximum attempts to find vacant positions
  while(foam.length<circleCount && noOfAttempts<maxAttempts)
  {
    let x = random(width);
    let y = random(height);
    let r = random(minInitRadius,maxInitRadius);
    let posValid = checkPos(x,y,r, foam);
    if(posValid)
    {
      bub = new Bubble(x,y,r);
      foam.push(bub);
      // print("pushed");
      // fill(128);
      // ellipse(x,y,2,2);
      // growBub();
      print("attempts ", noOfAttempts);
      noOfAttempts = 0;
    }
    noOfAttempts++;

  }
  print("giveup after ", noOfAttempts);

  //grows bubbles, check growth state to prevent wasted cycles when nothing is growing
  let allGrown = false;
  while(allGrown==false)
  {
    growBub(foam);
    let growing = 0;
    for(let i = 0;i<foam.length;i++)
    {
      if(foam[i].grow_flag==true)
      {
        growing++;
      }
    }
    if(growing==0)
    {
      allGrown = true;
    }
  }

  return foam;
}

//class for circle/bubble objects
class Bubble
{
  constructor(x,y,r)
  {
    this.x = x;
    this.y = y;
    // this.x = random(width);
    // this.y = random(height);
    //
    // this.bubRadius_init = random(r0_Min,r0_Max);
    // this.bubRadius = this.bubRadius_init;

    this.bubRadius_init = r;
    this.bubRadius = this.bubRadius_init;
    this.grow_flag = true;
  }

  display()
  {
    push();
    translate(this.x, this.y);
    ellipse(0,0,this.bubRadius,this.bubRadius);
    pop();
  }

  grow()
  {
    this.bubRadius++;
  }
}

//helper function - checks distance from other points and validates position of selected point
function checkPos(x,y,r, foam)
{
  let k = 0;
  for(let i = 0;i<foam.length;i++)
  {
    let x1 = foam[i].x;
    let y1 = foam[i].y;
    let r1 = foam[i].bubRadius;
    // let rMed = (r0_Max+r0_Min)/2;

    // if(compareDist(x,y,x1,y1,r1,r0_Max))      //uniform field of similar sized large
       if(compareDist(x,y,x1,y1,r1,r))      //spaced out field of size variation
    // if(compareDist(x,y,x1,y1,r1,0))           //spaced out field of high variation
    // if(compareDist(x,y,x1,y1,r1,rMed))        //uniform field of similar sized

    // let d = dist(x,y,x1,y1);
    // if(d<r0_Max)                     //working version
    // if(d<r1)
    {
      k++;
    }
  }
  if (k>0)
  {
    return false;
  } else
  {
    return true;
  }
}

//helper function to increase circle/bubble diameter when conditions are met
function growBub(foam, maxFinalRadius)
{
  
  // print("calling growBub");

  for(let i = 0;i<foam.length;i++)
  {
    if(foam[i].bubRadius>=maxFinalRadius)
    {
      foam[i].grow_flag = false;
    }

    if(foam[i].grow_flag)
    {
      let x1 = foam[i].x;
      let y1 = foam[i].y;
      let r1 = foam[i].bubRadius/2;       // radius from diameter

      let allow = true;
      // print("checking ", i);
      //growth is to be done only once but after checking against all circles

      for(let j = 0; j < foam.length; j++)
      {
        if(j!=i)
        {
          let x2 = foam[j].x;
          let y2 = foam[j].y;
          let r2 = foam[j].bubRadius/2;  // radius from diameter

          // slower because uses dist()
          // let d = dist(x1,y1,x2,y2);
          // let delR = r1+r2;

          //faster because uses squares, relative difference not absolute
          // let d = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
          // let delR = (r1+r2)*(r1+r2);

          // if(d<delR)
          if(compareDist(x1,y1,x2,y2,r1,r2))       //replaced with helper function
          {
            allow = false;
            foam[i].grow_flag = false;
          }
        }
      }
      if(allow)
      {
        foam[i].grow();
      }
    }
  }
}

// helper function that compares centre to centre distances to sum of radii,
// but uses squares not dist() function for better speed, 
// since only comparision is needed, not absolute values

function compareDist(x1,y1,x2,y2,r1,r2)
{
  let d = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
  let delR = (r1+r2)*(r1+r2);

  return(d<delR)
}
