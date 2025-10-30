let showState = false;
let showMode = "mouse";
function mousePressed(){
    if(showMode == "mouse"){
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            if(showState){
                noLoop();
                showState = false;
            }else{
                loop();
                showState = true;
            }
        }
    }
}

function keyPressedShow() {
if(showMode == "key"){
  if (key === 'c') {
   if(showState){
        noLoop();
        showState = false;
    }else{
        loop();
        showState = true;
    }
  }
}
}

function showHint(size){
    if((webglVersion === WEBGL || webglVersion === WEBGL2) && !showState){
        document.getElementById("projectContainer").style.pointerEvents = "none";
        document.getElementById("controlHint").innerHTML = "<p><strong>*Press key 'c' to start/pause</strong></p>";
    }else if((webglVersion === WEBGL || webglVersion === WEBGL2)){
        document.getElementById("projectContainer").style.pointerEvents = "auto";
        document.getElementById("controlHint").innerHTML = "<p><strong>*Press key 'c' to start/pause</strong></p>";
    }else if(!showState){
        push();
        textFont(pageFont);
        textAlign(CENTER,CENTER)
        fill(0,0,0,100);
        rect(0,0,width,height);
        fill(255);
        textSize(size);
        text("Press to start/pause the code",width/2,height/2);
        pop();
    }
}