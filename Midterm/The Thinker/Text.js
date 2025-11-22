let mode = "text";
class Text {
  constructor({ x, y, rgb, letter } = {}) {
    this.size = 10;
    this.originalX = x;
    this.originalY = y;
    this.position = createVector(x, y);
    this.rgb = createVector(rgb[0], rgb[1], rgb[2]);
    this.targetRgb = undefined;
    this.letter = letter;
    this.appear = true;

  }
  get x() {
    return this.position.x;
  }
  get y() {
    return this.position.y;
  }


  show() {
    if(mode == "text"){
    push();
    textSize(this.size);
    translate(this.x, this.y);
    
      fill(this.rgb.x, this.rgb.y, this.rgb.z,180);
      text((frameCount+this.letter)%2, 0, 0);

    pop();
  }

  if(mode == "square"){
    push();
    textSize(this.size);
    translate(this.x, this.y, this.z);
    if (this.rgb.x != undefined) {
      noStroke();
      fill(this.rgb.x, this.rgb.y, this.rgb.z, this.opacity);
      sphere(this.size-3);
    }

    pop();
  }
  }

  setTargetColor(r, g, b) {
    this.targetRgb = createVector(r, g, b);
  }

  changeColor(v,r,g,b){
    let target = createVector(r,g,b);
        if (!p5.Vector.equals(target, this.rgb)) {
          let direction = p5.Vector.sub(target, this.rgb);
          direction.setMag(target.dist(this.rgb));
          direction.limit(v);
          this.rgb.add(direction);
        }
  }

  setPicText(img) {
    // Map this glyph's centered coords into the resized image space
    const pixelX = round(this.x / 2 + img.width / 2);
    const pixelY = round(this.y / 2 + img.height / 2);
    const pixelNum = calculatePixel(pixelX, pixelY, img.width);
    if (img.pixels[pixelNum] != undefined) {
      // Pull color from the image buffer (not global pixels) and apply immediately
      const r = img.pixels[pixelNum];
      const g = img.pixels[pixelNum + 1];
      const b = img.pixels[pixelNum + 2];
      this.setTargetColor(r, g, b);
      this.rgb = createVector(r, g, b);
      this.appear = true;
    }
    
  }
}
