let THINKER_IDENTITY;
let background1;

function preload() {
  THINKER_IDENTITY = loadJSON('The Thinker/Thinker Identity.json');
}

let input;
let submitButton;
let grid;
let gridRows = 120;
let gridCols = 120;

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("thinkerCanvas");
  canvas.position(0, 0);
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("left", "0");
  canvas.style("width", "100vw");
  canvas.style("height", "100vh");

  

  canvas.parent(document.getElementsByTagName("body")[0]);


  // Link JSON identity to your Thinker engine
  Thinker.THINKER_IDENTITY = THINKER_IDENTITY;

  

  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

  // Initialize pixel grid
  grid = new Grid(gridRows, gridCols);
  userInput("Hello");
 
}

function userInput(message){
  Thinker.think(message);
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
    //console.log(Thinker.pressureLevel);
}
let newImage = true;
let count = 0;
function draw() {
   
  background(0);

  // If Thinker has images, animate them
  if (Thinker.images[0] && thinkerActive) {
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
    //console.log("transition");
  }
  drawStats();
}



