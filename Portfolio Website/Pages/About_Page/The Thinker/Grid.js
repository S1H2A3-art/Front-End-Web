const XSPACING = 8;
const YSPACING = 8;
const GRIDWIDTH = 70 * 1.2;
const GRIDHEIGHT = 70 * 1.2;

class Grid {
  constructor(rowNum, columnNum) {
    this.rowNum = parseInt(rowNum);
    this.columnNum = parseInt(columnNum);
    this.grids = new Array(this.rowNum);
    

    for (let i = 0; i < this.rowNum; i++) {
      this.grids[i] = new Array(this.columnNum);
      for (let j = 0; j < this.columnNum; j++) {
        this.grids[i][j] = new Text({
          x: XSPACING * (j - this.columnNum / 2),
          y: YSPACING * (i - this.rowNum / 2),
          rgb: [0, 0, 0],
          letter: random([0,1]),
        });
      }
    }
  }

  forEach(func) {
    for (let i = 0; i < this.rowNum; i++) {
      for (let j = 0; j < this.columnNum; j++) {
        func(i, j);
      }
    }
  }
  reverseForEach(func) {
    for (let i = this.rowNum - 1; i >= 0; i--) {
      for (let j = this.columnNum - 1; j >= 0; j--) {
        func(i, j);
      }
    }
  }

  at(i, j) {
    if (i < 0) {
      i = this.grids.length - 1;
    }
    if (i >= this.grids.length) {
      i = 0;
    }
    if (j < 0) {
      j = this.grids[0].length - 1;
    }
    if (j >= this.grids[0].length) {
      j = 0;
    }
    return this.grids[i][j];
  }
  top(i, j) {
    return this.at(i - 1, j);
  }
  bottom(i, j) {
    return this.at(i + 1, j);
  }
  left(i, j) {
    return this.at(i, j - 1);
  }
  right(i, j) {
    return this.at(i, j + 1);
  }
  cross(i, j) {
    return [
      this.top(i, j),
      this.right(i, j),
      this.bottom(i, j),
      this.left(i, j),
    ];
  }
  ex(i, j) {
    return [
      this.at(i - 1, j - 1),
      this.at(i - 1, j + 1),
      this.at(i + 1, j + 1),
      this.at(i + 1, j - 1),
    ];
  }
  ring(i, j) {
    let cross = this.cross(i, j);
    let ex = this.ex(i, j);
    return [...cross, ...ex];
  }

  setPic(img) {
    if(img.width !== width){
    //img.resize(XSPACING * this.columnNum, YSPACING * this.rowNum);
    img.pixelDensity(1);
    img.loadPixels();
    }
    this.forEach((i, j) => {
      this.grids[i][j].setPicText(img);
    });
  }
}

function calculatePixel(x, y, w) {
  return (y - 1) * w * 4 + x * 4 - 4;
}