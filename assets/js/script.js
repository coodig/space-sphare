
      let zoomOut = 0;
  let planets = [];
  let rotationOffsets = [];

  function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    textFont('Arial');
    textAlign(CENTER, CENTER);

    planets = [
      { name: "Mercury", dist: 120, size: 8, color: '#bfbfbf' },
      { name: "Venus", dist: 140, size: 14, color: '#e6d1a3' },
      { name: "Earth", dist: 170, size: 15, color: '#2e71d0' },
      { name: "Mars", dist: 200, size: 12, color: '#d14a28' },
      { name: "Jupiter", dist: 250, size: 28, color: '#d9a066' },
      { name: "Saturn", dist: 300, size: 24, color: '#f1da9a' },
      { name: "Uranus", dist: 350, size: 20, color: '#79cde7' },
      { name: "Neptune", dist: 390, size: 19, color: '#4565d4' },
    ];

    for (let i = 0; i < 300; i++) {
      planets.push({
        dist: random(400, 800),
        size: random(2, 5),
        color: [random(100, 255), random(100, 255), 255]
      });
    }

    for (let i = 0; i < planets.length; i++) {
      rotationOffsets[i] = random(0.05, 0.15);
    }
  }

  function draw() {
    background(0);
    ambientLight(150);
    
    translate(0, 0, -zoomOut);
    if (zoomOut < 1000) zoomOut += 1.2 + noise(frameCount * 0.01) * 0.5;

    rotateY(frameCount * 0.0008 + noise(frameCount * 0.005) * 0.02);
    rotateX(frameCount * 0.0004 + noise(frameCount * 0.007) * 0.015);

    push();
    fill(255, 204, 0);
    sphere(30);
    pop();

    for (let i = 0; i < planets.length; i++) {
      let p = planets[i];
      let angle = frameCount * rotationOffsets[i] + i * 47;
      let x = cos(angle) * p.dist;
      let y = sin(angle) * p.dist * 0.8;
      let z = sin(angle * 0.6) * p.dist * 0.7;

      push();
      translate(x, y, z);
      fill(p.color);
      sphere(p.size);

      if (p.name) {
        push();
        translate(0, p.size + 10, 0);
        rotateY(-frameCount * 0.1);
        fill(255);
        textSize(12);
        text(p.name, 0, 0);
        pop();
      }

      pop();
    }

    push();
    noFill();
    stroke(100, 100, 255, 100);
    strokeWeight(1.5);
    rotateY(frameCount * 0.0006 + noise(frameCount * 0.003) * 0.01);
    sphere(900);
    pop();

    push();
    rotateY(-frameCount * 0.001);
    fill(255);
    textAlign(CENTER);
    textSize(24);
    text('space share project: The Cosmic Sphere', 0, height / 2 - 40);
    pop();
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }