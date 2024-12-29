let particles = [];
const NUM_PARTICLES = 300;
let centerX, centerY;
let lastMouseX, lastMouseY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  lastMouseX = centerX;
  lastMouseY = centerY;
  
  // 画面全体にパーティクルを配置
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }
  colorMode(HSB, 360, 100, 100, 1);
  background(0);
}

class Particle {
  constructor() {
    this.reset();
    // 画面全体にランダムに配置
    this.x = random(-width * 0.2, width * 1.2);
    this.y = random(-height * 0.2, height * 1.2);
  }
  
  reset() {
    this.baseSize = random(5, 120);
    this.size = this.baseSize;
    this.sizeSpeed = random(0.005, 0.02);
    this.sizeOffset = random(1000);
    this.sizeAmplitude = random(0.4, 0.7);
    
    // 大きいパーティクルはよりゆっくり動くように
    this.speed = map(this.baseSize, 5, 120, 0.04, 0.008);
    
    this.color = random(180, 300);
    this.saturation = random(60, 90);
    this.life = 1;
    this.fadeSpeed = random(0.001, 0.003);
    
    // より大きな初期のランダム動き
    this.wanderX = random(-2, 2);
    this.wanderY = random(-2, 2);
    this.wanderSpeed = random(0.3, 1.5);
    
    // 各パーティクルの独自の動きを強化
    this.individualOffset = random(1000);
    this.moveRange = random(30, 200);
  }
  
  update() {
    if (mouseX !== 0 || mouseY !== 0) {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }
    
    let targetX = lastMouseX;
    let targetY = lastMouseY;
    
    // より複雑なランダム動き
    this.wanderX += (noise(frameCount * 0.01 + this.individualOffset) - 0.5) * this.wanderSpeed;
    this.wanderY += (noise(frameCount * 0.01 + this.individualOffset + 1000) - 0.5) * this.wanderSpeed;
    
    // 大きいパーティクルはより広く動くように
    let wanderRange = map(this.baseSize, 5, 120, 30, 150);
    let finalTargetX = targetX + this.wanderX * wanderRange;
    let finalTargetY = targetY + this.wanderY * wanderRange;
    
    // 独自の動きを追加
    finalTargetX += sin(frameCount * 0.02 + this.individualOffset) * this.moveRange;
    finalTargetY += cos(frameCount * 0.02 + this.individualOffset) * this.moveRange;
    
    this.x += (finalTargetX - this.x) * this.speed;
    this.y += (finalTargetY - this.y) * this.speed;
    
    this.size = this.baseSize + 
                sin(frameCount * this.sizeSpeed + this.sizeOffset) * 
                (this.baseSize * this.sizeAmplitude);
    
    this.wanderX = constrain(this.wanderX, -2, 2);
    this.wanderY = constrain(this.wanderY, -2, 2);
    
    this.life -= this.fadeSpeed;
    
    if (this.life < 0) {
      this.reset();
      // 画面外からのリスポーン位置をより広く
      let side = floor(random(4));
      switch(side) {
        case 0:
          this.x = random(-width * 0.2, width * 1.2);
          this.y = -this.size - random(height * 0.2);
          break;
        case 1:
          this.x = width + this.size + random(width * 0.2);
          this.y = random(-height * 0.2, height * 1.2);
          break;
        case 2:
          this.x = random(-width * 0.2, width * 1.2);
          this.y = height + this.size + random(height * 0.2);
          break;
        case 3:
          this.x = -this.size - random(width * 0.2);
          this.y = random(-height * 0.2, height * 1.2);
          break;
      }
      this.life = 1;
    }
  }
  
  draw() {
    noStroke();
    let alpha = map(this.baseSize, 5, 120, 0.7, 0.2);
    fill(this.color, this.saturation, 95, this.life * alpha);
    circle(this.x, this.y, this.size);
  }
}

function draw() {
  background(0, 0.2);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
} 
