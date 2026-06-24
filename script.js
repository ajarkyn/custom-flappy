const canvas = document.getElementById("gameCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

const scoreValue = document.getElementById("scoreValue");
const bestValue = document.getElementById("bestValue");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");

const bgColorInput = document.getElementById("bgColor");
const bgColorValue = document.getElementById("bgColorValue");
const themeSelect = document.getElementById("themeSelect");
const birdGallery = document.getElementById("birdGallery");
const birdUpload = document.getElementById("birdUpload");
const DEFAULT_CUSTOM_BIRD_SRCS = [
  "assets/bird-reference-cutout.png",
  "assets/assets/bird-reference-cutout.png",
  "assets/bird-reference.png",
  "assets/assets/bird-reference.png"
];

const themes = {
  sunset: {
    accent: "#ff7a18",
    accent2: "#ffd166",
    panel: "#fff9f1",
    panelBorder: "#2e2520",
    text: "#251b17",
    hudBg: "rgba(255, 250, 242, 0.9)",
    pipe: "#4f772d",
    pipeCap: "#90a955"
  },
  forest: {
    accent: "#2a9d8f",
    accent2: "#84a98c",
    panel: "#f3f8f4",
    panelBorder: "#1b4332",
    text: "#0b1d15",
    hudBg: "rgba(237, 247, 240, 0.9)",
    pipe: "#344e41",
    pipeCap: "#588157"
  },
  noir: {
    accent: "#00b894",
    accent2: "#55efc4",
    panel: "#e9f7f3",
    panelBorder: "#0d2b25",
    text: "#021a16",
    hudBg: "rgba(224, 245, 240, 0.92)",
    pipe: "#0f5132",
    pipeCap: "#1ea97c"
  },
  candy: {
    accent: "#ff4d6d",
    accent2: "#ffb3c1",
    panel: "#fff1f5",
    panelBorder: "#5f0f40",
    text: "#2b0b1f",
    hudBg: "rgba(255, 239, 245, 0.92)",
    pipe: "#6d597a",
    pipeCap: "#b56576"
  }
};

const birdSvgs = [
  {
    id: "flappy-pixel-1",
    svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'><rect width='32' height='32' fill='none'/><rect x='8' y='9' width='12' height='12' fill='#3b2d3f'/><rect x='9' y='10' width='10' height='10' fill='#f5d62f'/><rect x='10' y='8' width='4' height='2' fill='#3b2d3f'/><rect x='10' y='9' width='3' height='1' fill='#f5d62f'/><rect x='8' y='13' width='5' height='5' fill='#3b2d3f'/><rect x='9' y='14' width='4' height='3' fill='#fffef1'/><rect x='18' y='10' width='5' height='6' fill='#3b2d3f'/><rect x='19' y='11' width='4' height='5' fill='#ffffff'/><rect x='21' y='12' width='1' height='2' fill='#454545'/><rect x='20' y='14' width='1' height='1' fill='#111111'/><rect x='20' y='15' width='6' height='2' fill='#ff6f5a'/><rect x='20' y='17' width='5' height='2' fill='#ef8e3e'/><rect x='10' y='16' width='6' height='3' fill='#f7efcf'/><rect x='11' y='12' width='4' height='2' fill='#dbb321'/></svg>"
  },
  {
    id: "flappy-pixel-2",
    svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'><rect width='32' height='32' fill='none'/><rect x='8' y='9' width='12' height='12' fill='#3b2d3f'/><rect x='9' y='10' width='10' height='10' fill='#f1d129'/><rect x='10' y='8' width='4' height='2' fill='#3b2d3f'/><rect x='10' y='9' width='3' height='1' fill='#f1d129'/><rect x='8' y='14' width='5' height='5' fill='#3b2d3f'/><rect x='9' y='15' width='4' height='3' fill='#fffef1'/><rect x='18' y='10' width='5' height='6' fill='#3b2d3f'/><rect x='19' y='11' width='4' height='5' fill='#ffffff'/><rect x='21' y='12' width='1' height='2' fill='#454545'/><rect x='20' y='14' width='1' height='1' fill='#111111'/><rect x='20' y='15' width='6' height='2' fill='#ff6c56'/><rect x='20' y='17' width='5' height='2' fill='#ea8838'/><rect x='10' y='16' width='6' height='3' fill='#f6edcc'/><rect x='11' y='12' width='4' height='2' fill='#d7ad1e'/></svg>"
  },
  {
    id: "flappy-pixel-3",
    svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'><rect width='32' height='32' fill='none'/><rect x='8' y='9' width='12' height='12' fill='#3b2d3f'/><rect x='9' y='10' width='10' height='10' fill='#efd028'/><rect x='10' y='8' width='4' height='2' fill='#3b2d3f'/><rect x='10' y='9' width='3' height='1' fill='#efd028'/><rect x='8' y='13' width='5' height='5' fill='#3b2d3f'/><rect x='9' y='13' width='4' height='3' fill='#fffef1'/><rect x='18' y='10' width='5' height='6' fill='#3b2d3f'/><rect x='19' y='11' width='4' height='5' fill='#ffffff'/><rect x='21' y='12' width='1' height='2' fill='#454545'/><rect x='20' y='14' width='1' height='1' fill='#111111'/><rect x='20' y='15' width='6' height='2' fill='#ff6b57'/><rect x='20' y='17' width='5' height='2' fill='#e78533'/><rect x='10' y='16' width='6' height='3' fill='#f4ebc8'/><rect x='11' y='12' width='4' height='2' fill='#d4aa1b'/></svg>"
  },
  {
    id: "flappy-pixel-4",
    svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'><rect width='32' height='32' fill='none'/><rect x='8' y='9' width='12' height='12' fill='#3b2d3f'/><rect x='9' y='10' width='10' height='10' fill='#f6d733'/><rect x='10' y='8' width='4' height='2' fill='#3b2d3f'/><rect x='10' y='9' width='3' height='1' fill='#f6d733'/><rect x='8' y='14' width='5' height='5' fill='#3b2d3f'/><rect x='9' y='14' width='4' height='3' fill='#fffef1'/><rect x='18' y='10' width='5' height='6' fill='#3b2d3f'/><rect x='19' y='11' width='4' height='5' fill='#ffffff'/><rect x='21' y='12' width='1' height='2' fill='#454545'/><rect x='20' y='14' width='1' height='1' fill='#111111'/><rect x='20' y='15' width='6' height='2' fill='#ff705b'/><rect x='20' y='17' width='5' height='2' fill='#ee8b3b'/><rect x='10' y='16' width='6' height='3' fill='#f8f0cf'/><rect x='11' y='12' width='4' height='2' fill='#deba2a'/></svg>"
  }
];

function getStoredBestScore() {
  try {
    return Number(localStorage.getItem("customFlappyBest") || 0);
  } catch (error) {
    return 0;
  }
}

function setStoredBestScore(value) {
  try {
    localStorage.setItem("customFlappyBest", String(value));
  } catch (error) {
    // Ignore storage write errors in restricted contexts.
  }
}

const gameState = {
  running: false,
  gameOver: false,
  score: 0,
  best: getStoredBestScore(),
  gravity: 0.46,
  flapStrength: -8.2,
  pipeGap: 170,
  pipeInterval: 1450,
  pipeSpeed: 2.2,
  lastPipeTime: 0,
  bgColor: bgColorInput ? bgColorInput.value : "#8fd3ff",
  theme: themeSelect ? themeSelect.value : "sunset",
  birdImage: new Image(),
  bird: {
    x: 96,
    y: canvas ? canvas.height / 2 : 320,
    width: 44,
    height: 34,
    velocity: 0,
    rotation: 0
  },
  pipes: []
};

function svgToDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function setTheme(themeKey) {
  const theme = themes[themeKey];
  if (!theme) {
    return;
  }

  gameState.theme = themeKey;
  const root = document.documentElement;
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-2", theme.accent2);
  root.style.setProperty("--panel", theme.panel);
  root.style.setProperty("--panel-border", theme.panelBorder);
  root.style.setProperty("--text", theme.text);
  root.style.setProperty("--hud-bg", theme.hudBg);
}

function buildBirdGallery() {
  birdGallery.innerHTML = "";

  birdSvgs.forEach((entry, idx) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "bird-option";
    option.setAttribute("role", "radio");
    option.setAttribute("aria-checked", idx === 0 ? "true" : "false");
    option.dataset.src = svgToDataUri(entry.svg);

    const img = document.createElement("img");
    img.src = option.dataset.src;
    img.alt = `Bird option ${idx + 1}`;
    option.appendChild(img);

    option.addEventListener("click", () => {
      document.querySelectorAll(".bird-option").forEach((node) => {
        node.setAttribute("aria-checked", "false");
      });
      option.setAttribute("aria-checked", "true");
      setBirdImage(option.dataset.src);
    });

    birdGallery.appendChild(option);
  });

  const firstOption = birdGallery.querySelector(".bird-option");
  const firstSource = firstOption ? firstOption.dataset.src : "";
  if (firstSource) {
    setBirdImage(firstSource);
  }
}

function setBirdImage(src) {
  const nextImage = new Image();
  nextImage.onload = () => {
    gameState.birdImage = nextImage;
  };
  nextImage.src = src;
}

function tryUseDefaultCustomBird() {
  const tryIndex = (idx) => {
    if (idx >= DEFAULT_CUSTOM_BIRD_SRCS.length) {
      return;
    }

    const nextImage = new Image();
    nextImage.onload = () => {
      gameState.birdImage = nextImage;
      document.querySelectorAll(".bird-option").forEach((node) => {
        node.setAttribute("aria-checked", "false");
      });
    };
    nextImage.onerror = () => {
      tryIndex(idx + 1);
    };
    nextImage.src = DEFAULT_CUSTOM_BIRD_SRCS[idx];
  };

  tryIndex(0);
}

function resetGame() {
  gameState.running = false;
  gameState.gameOver = false;
  gameState.score = 0;
  gameState.lastPipeTime = 0;
  gameState.pipes = [];
  gameState.bird.y = canvas.height / 2;
  gameState.bird.velocity = 0;
  gameState.bird.rotation = 0;
  scoreValue.textContent = "0";

  showOverlay("Ready?", "Pick a theme and tap Start Game.");
}

function startGame() {
  if (gameState.running) {
    return;
  }

  if (gameState.gameOver) {
    resetGame();
  }

  gameState.running = true;
  hideOverlay();
}

function flap() {
  if (!gameState.running) {
    return;
  }

  gameState.bird.velocity = gameState.flapStrength;
}

function spawnPipe() {
  const margin = 90;
  const randomTop = margin + Math.random() * (canvas.height - gameState.pipeGap - margin * 2);
  gameState.pipes.push({
    x: canvas.width,
    width: 72,
    topHeight: randomTop,
    passed: false
  });
}

function update(delta, elapsed) {
  if (!gameState.running) {
    return;
  }

  if (elapsed - gameState.lastPipeTime > gameState.pipeInterval) {
    spawnPipe();
    gameState.lastPipeTime = elapsed;
  }

  gameState.bird.velocity += gameState.gravity;
  gameState.bird.y += gameState.bird.velocity;
  gameState.bird.rotation = Math.max(-0.6, Math.min(1.1, gameState.bird.velocity * 0.08));

  gameState.pipes.forEach((pipe) => {
    pipe.x -= gameState.pipeSpeed * (delta / 16.67);

    if (!pipe.passed && pipe.x + pipe.width < gameState.bird.x) {
      pipe.passed = true;
      gameState.score += 1;
      scoreValue.textContent = String(gameState.score);
      if (gameState.score > gameState.best) {
        gameState.best = gameState.score;
        setStoredBestScore(gameState.best);
        bestValue.textContent = String(gameState.best);
      }
    }
  });

  gameState.pipes = gameState.pipes.filter((pipe) => pipe.x + pipe.width > -10);

  const birdTop = gameState.bird.y - gameState.bird.height / 2;
  const birdBottom = gameState.bird.y + gameState.bird.height / 2;
  const birdLeft = gameState.bird.x - gameState.bird.width / 2;
  const birdRight = gameState.bird.x + gameState.bird.width / 2;

  if (birdTop <= 0 || birdBottom >= canvas.height) {
    triggerGameOver();
    return;
  }

  const collision = gameState.pipes.some((pipe) => {
    const inPipeX = birdRight > pipe.x && birdLeft < pipe.x + pipe.width;
    if (!inPipeX) {
      return false;
    }

    const hitsTop = birdTop < pipe.topHeight;
    const hitsBottom = birdBottom > pipe.topHeight + gameState.pipeGap;
    return hitsTop || hitsBottom;
  });

  if (collision) {
    triggerGameOver();
  }
}

function triggerGameOver() {
  gameState.running = false;
  gameState.gameOver = true;
  showOverlay("Game Over", `Score: ${gameState.score}. Press Start Game to try again.`);
}

function drawBackground() {
  ctx.fillStyle = gameState.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
  for (let i = 0; i < 5; i += 1) {
    const x = 20 + i * 90;
    const y = 70 + (i % 2) * 55;
    ctx.beginPath();
    ctx.ellipse(x, y, 30, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPipes() {
  const theme = themes[gameState.theme];

  gameState.pipes.forEach((pipe) => {
    ctx.fillStyle = theme.pipe;
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.topHeight + gameState.pipeGap, pipe.width, canvas.height - pipe.topHeight - gameState.pipeGap);

    ctx.fillStyle = theme.pipeCap;
    ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipe.width + 10, 20);
    ctx.fillRect(pipe.x - 5, pipe.topHeight + gameState.pipeGap, pipe.width + 10, 20);
  });
}

function drawBird() {
  const { bird } = gameState;

  ctx.save();
  ctx.translate(bird.x, bird.y);
  ctx.rotate(bird.rotation);
  ctx.imageSmoothingEnabled = false;

  if (gameState.birdImage.complete && gameState.birdImage.naturalWidth > 0) {
    const drawX = Math.round(-bird.width / 2);
    const drawY = Math.round(-bird.height / 2);
    ctx.drawImage(gameState.birdImage, drawX, drawY, bird.width, bird.height);
  } else {
    ctx.fillStyle = "#ffd166";
    ctx.beginPath();
    ctx.arc(0, 0, bird.width / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawGround() {
  ctx.fillStyle = "rgba(54, 42, 34, 0.2)";
  ctx.fillRect(0, canvas.height - 36, canvas.width, 36);

  ctx.strokeStyle = "rgba(30, 24, 18, 0.32)";
  ctx.lineWidth = 2;
  for (let i = 0; i < canvas.width; i += 24) {
    ctx.beginPath();
    ctx.moveTo(i, canvas.height - 36);
    ctx.lineTo(i + 12, canvas.height);
    ctx.stroke();
  }
}

function draw() {
  drawBackground();
  drawPipes();
  drawBird();
  drawGround();
}

function showOverlay(title, text) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  overlay.classList.add("hidden");
}

let previousTs = performance.now();
let totalElapsed = 0;

function gameLoop(ts) {
  const delta = ts - previousTs;
  previousTs = ts;
  totalElapsed += delta;

  update(delta, totalElapsed);
  draw();

  requestAnimationFrame(gameLoop);
}

function initGame() {
  if (!canvas || !ctx || !scoreValue || !bestValue || !startBtn || !resetBtn || !overlay || !overlayTitle || !overlayText || !bgColorInput || !bgColorValue || !themeSelect || !birdGallery || !birdUpload) {
    document.body.innerHTML = "<main style='font-family: sans-serif; padding: 24px; color: #222;'><h1>Unable to load game UI</h1><p>Some required page elements were not found. Please reload the page.</p></main>";
    return;
  }

  canvas.addEventListener("pointerdown", () => {
    if (!gameState.running && !gameState.gameOver) {
      startGame();
    }
    flap();
  });

  bgColorInput.addEventListener("input", (event) => {
    gameState.bgColor = event.target.value;
    bgColorValue.textContent = event.target.value;
  });

  themeSelect.addEventListener("change", (event) => {
    setTheme(event.target.value);
  });

  birdUpload.addEventListener("change", (event) => {
    const fileList = event.target.files;
    const file = fileList && fileList[0] ? fileList[0] : null;
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target ? loadEvent.target.result : null;
      if (typeof result !== "string") {
        return;
      }

      document.querySelectorAll(".bird-option").forEach((node) => {
        node.setAttribute("aria-checked", "false");
      });

      setBirdImage(result);
    };
    reader.readAsDataURL(file);
  });

  startBtn.addEventListener("click", () => {
    startGame();
  });

  resetBtn.addEventListener("click", () => {
    resetGame();
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();

      if (!gameState.running && !gameState.gameOver) {
        startGame();
      }

      flap();
    }
  });

  bestValue.textContent = String(gameState.best);
  setTheme(gameState.theme);
  buildBirdGallery();
  tryUseDefaultCustomBird();
  resetGame();
  requestAnimationFrame(gameLoop);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGame);
} else {
  initGame();
}
