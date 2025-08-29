// let rL, rH, n, k, rMax;
let myFoam;
let r0Min,r0Max,count,attempts,rMax;    //global because mouseClicked(), draw() is also using these

function setup()
{
  createCanvas(800,500);

  //for density control
  //balance small radii range with large numbers and vice versa
  r0Min = 5;
  r0Max = 25;
  rMax = 100;

  count = 700;
  attempts = 5000;

  myFoam = getCirPack(r0Min,r0Max,count,attempts,rMax);

  colorMode(HSB);
  angleMode(DEGREES);
  // print(myFoam.length);

}

function draw()
{
  background(250);

  for(let i = 0;i<myFoam.length;i++)
  {
    noFill();
    stroke(0);
    // myFoam[i].display();

    let xd = myFoam[i].x;
    let yd = myFoam[i].y;
    let rd = myFoam[i].bubRadius/2

    let h = random(360);
    fill(h,10,100);
    stroke(h,100,100);
    polygon(xd,yd,rd,3);

    // let rd = myFoam[i].bubRadius*0.7;
    // fill('green');
    // if(myFoam[i].bubRadius>=rMax)
    // {
    //   fill('red');
    // }
    // ellipse(xd,yd,rd,rd);

  }

  // dispParameters();
  noLoop();

}

// helper function to display paramters when testing and comparing
// adhoc position and size values
function dispParameters()        
{
  
  noStroke();
  fill(255,220);
  // rect(width*0.4-10,height-30, width*0.55+10,30,10);
  rect(width*0.5-10,height-60, width*0.5,50,10);
  
  textSize(18);
  fill(0);
  let str = "rInitMin " + r0Min + " rInitMax " + r0Max + " rMax " + rMax + " count " + myFoam.length + " max count " + count + " attempts " + attempts;
  print(str);
  text(str, width*0.5, height-50, width*0.5, 50);
}

function mouseClicked()
{
  background(250);
  myFoam.splice(0,myFoam.length);
  print("spliced", myFoam.length);
  myFoam = getCirPack(r0Min,r0Max,count,attempts,rMax);
  draw();
}

function polygon(x, y, r, n) {
  push();
  translate(x, y);
  rotate(map(x/y,0,width/height,0,360));

  beginShape();
  for (let i = 0; i < n; i++) {
    let x = r * cos(360 / n * i);
    let y = r * sin(360 / n * i);
    vertex(x, y);
    // ellipse(x, y, 5, 5);
  }
  endShape(CLOSE);
  pop();

}

function keyTyped()
{ 
  // print("Keypressed");
  if(key === 's')
  {
  saveCanvas("CirPack Tests " + frameCount +".jpg");
  print("file saved");

  }
  return false;
}
