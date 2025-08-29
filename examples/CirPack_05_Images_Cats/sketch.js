// let rL, rH, n, k, rMax;
let myFoam;
let r0Min,r0Max,count,attempts,rMax;    //global because mouseClicked(), draw() is also using these
let img1, img2, img3;

function preload()
{

  img1 = loadImage("cat1_.png");
  img2 = loadImage("cat2_.png");
  img3 = loadImage("cat3_.png");
}


function setup()
{
  createCanvas(800,500);

  //for density control
  //balance small radii range with large numbers and vice versa
  r0Min = 25;
  r0Max = 35;
  rMax = 200;

  count = 700;
  attempts = 5000;
  imageMode(CENTER);
  myFoam = getCirPack(r0Min,r0Max,count,attempts,rMax);

  // print(myFoam.length);

}

function draw()
{
  background(250);

  for(let i = 0;i<myFoam.length;i++)
  {
    noFill();
    stroke('orange');
    // myFoam[i].display();

    let xd = myFoam[i].x;
    let yd = myFoam[i].y;
    let rd = myFoam[i].bubRadius;

    // print(xd, yd, rd);
    let k = random();
    let newImg;
    if(k<0.33)
    {
      newImg = img1.get();
    }
    else if(k<0.67)
    {
      newImg = img2.get();
    }
    else
    {
      newImg = img3.get();
    }
    // let new_img = img.get();
    newImg.resize(rd,0);
    image(newImg,xd,yd);

    // let rd = myFoam[i].bubRadius*0.7;
    // fill('green');
    // if(myFoam[i].bubRadius>=rMax)
    // {
    //   fill('red');
    // }
    // ellipse(xd,yd,rd,rd);

  }

  // noLoop();

  // dispParameters();
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

