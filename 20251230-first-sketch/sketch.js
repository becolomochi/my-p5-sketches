let particles = [];
const NUM_PARTICLES = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 粒子を初期化
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }
  colorMode(HSB, 360, 100, 100, 1);
  background(0);
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 30);
    this.color = random(360);
    this.speed = random(0.02, 0.06);
  }
  
  update() {
    // マウスに向かってふわふわ移動
    let targetX = mouseX;
    let targetY = mouseY;
    
    this.x += (targetX - this.x) * this.speed;
    this.y += (targetY - this.y) * this.speed;
    
    // 色相を少しずつ変化
    this.color = (this.color + 0.3) % 360;
  }
  
  draw() {
    noStroke();
    fill(this.color, 80, 95, 0.5);
    circle(this.x, this.y, this.size);
  }
}

function draw() {
  background(0, 0.1); // 軌跡を残す
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
}

// ウィンドウサイズが変更されたときの対応
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 
