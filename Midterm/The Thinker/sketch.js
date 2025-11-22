let THINKER_IDENTITY;
let background1;

function preload() {
  THINKER_IDENTITY = loadJSON('Thinker Identity.json');
    background1 = loadImage('Assets/background.avif');
}

let input;
let submitButton;
let grid;
let gridRows = 120;
let gridCols = 120;
let canvas;
function setup() {

  const canvasW = 2600;
  const canvasH = 1000;

  canvas = createCanvas(canvasW, canvasH);
  canvas.style("postion","fixed");


  // Link JSON identity to your Thinker engine
  Thinker.THINKER_IDENTITY = THINKER_IDENTITY;
  console.log(Thinker.THINKER_IDENTITY);

  input = createInput("input");
  submitButton = createButton("submit");
  submitButton.mousePressed(userInput);

  input.style("font-size","5rem");
  submitButton.style("font-size","5rem");
  input.parent(document.getElementById("controls"));
  submitButton.parent(document.getElementById("controls"));

  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

  // Initialize pixel grid
  grid = new Grid(gridRows, gridCols);

 
}

function userInput(){
  Thinker.think(input.value());
}

function drawStats(){
    push();
    stroke("white");
    noFill();
    rect(250,250,50,350);
    pop();
    push();
    fill("red");
    noStroke();
    rect(250,250,50,map(Thinker.pressureLevel,0,1,0,-350));
    pop();
    console.log(Thinker.pressureLevel);
}
let newImage = true;
let count = 0;
function draw() {
    //  push();
    // translate(width/2, height/2);
    // image(background1,0,0,windowWidth,windowHeight);
    // pop();
    
    background(0);

  // If Thinker has images, animate them
  if (Thinker.images[0]) {
     console.log(Thinker.images);
    // Select frame
    if(newImage){
     

        let imageShowing = Thinker.images[ count % Thinker.images.length];
        grid.setPic(imageShowing);
        newImage = false;
     
    }else{
        if (frameCount % 3 == 0){
            count++;
            newImage = true;
        }
    }
    push();
    
    translate(width/2, height/2);
    
    grid.forEach((i, j) => {
        if (grid.grids[i][j].rgb.x != 0) grid.grids[i][j].show();
    });
    pop();
    

 
  }else{
    console.log("transition");
  }
  drawStats();
}




