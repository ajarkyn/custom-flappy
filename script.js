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
const BACKGROUND_PIXEL_SIZE = 6;
const PIPE_PIXEL_SIZE = 6;
const DEFAULT_BIRD_VERSION = "1";
const OCEAN_BIRD_SRCS = [
  "assets/octopus.png",
  "assets/assets/octopus.png",
  "assets/assets/assets/octopus.png"
];
const DEFAULT_CUSTOM_BIRD_SRCS = [
  `assets/bird.png?v=${DEFAULT_BIRD_VERSION}`,
  "assets/default-bird.png",
  "assets/custom-bird.png",
  "assets/bird.png",
  "assets/assets/assets/default-bird.png",
  "assets/assets/assets/custom-bird.png",
  "assets/assets/assets/bird.png",
  "assets/default-bird.jpg",
  "assets/custom-bird.jpg",
  "assets/bird.jpg",
  "assets/assets/assets/default-bird.jpg",
  "assets/assets/assets/custom-bird.jpg",
  "assets/assets/assets/bird.jpg",
  "assets/assets/default-bird.png",
  "assets/assets/custom-bird.png",
  "assets/assets/bird.png",
  "assets/bird-reference-cutout.png",
  "assets/assets/bird-reference-cutout.png",
  "assets/bird-reference.png",
  "assets/assets/bird-reference.png"
];
const PASTEL_BIRD_VARIANTS = [
  { id: "pastel-cream", hex: "#FAEDCB" },
  { id: "pastel-sage", hex: "#C9E4DE" },
  { id: "pastel-blue", hex: "#C6DEF1" },
  { id: "pastel-lavender", hex: "#DBCDF0" },
  { id: "pastel-rose", hex: "#F2C6DE" },
  { id: "pastel-peach", hex: "#F7D9C4" }
];

const themes = {
  ocean: {
    accent: "#0077b6",
    accent2: "#90e0ef",
    panel: "#f0fbff",
    panelBorder: "#023047",
    text: "#102a43",
    hudBg: "rgba(239, 250, 255, 0.92)",
    pipe: "#2a6f97",
    pipeCap: "#61a5c2",
    pipeImage: "assets/coral.png",
    skyTop: "#9dd9f3",
    skyBottom: "#3a86b7",
    cloudTint: "rgba(236, 248, 255, 0.2)",
    bgImage: "assets/ocean.png"
  },
  sunset: {
    accent: "#ff7a18",
    accent2: "#ffd166",
    panel: "#fff9f1",
    panelBorder: "#2e2520",
    text: "#251b17",
    hudBg: "rgba(255, 250, 242, 0.9)",
    pipe: "#4f772d",
    pipeCap: "#90a955",
    skyTop: "#ffd3a5",
    skyBottom: "#ff9a8b",
    cloudTint: "rgba(255, 255, 255, 0.26)"
  },
  candyRush: {
    accent: "#ff4d6d",
    accent2: "#ffb3c1",
    panel: "#fff1f5",
    panelBorder: "#5f0f40",
    text: "#2b0b1f",
    hudBg: "rgba(255, 239, 245, 0.92)",
    pipe: "#6d597a",
    pipeCap: "#b56576",
    skyTop: "#ffd6e8",
    skyBottom: "#ffc1dc",
    cloudTint: "rgba(255, 250, 253, 0.28)"
  },
  desert: {
    accent: "#e07a3f",
    accent2: "#f2cc8f",
    panel: "#fff8ef",
    panelBorder: "#7f5539",
    text: "#4b2e1f",
    hudBg: "rgba(255, 247, 236, 0.92)",
    pipe: "#b08968",
    pipeCap: "#ddb892",
    skyTop: "#ffe8b6",
    skyBottom: "#f4a261",
    cloudTint: "rgba(255, 244, 221, 0.18)"
  },
  cottonCandy: {
    accent: "#ff77b7",
    accent2: "#9fd3ff",
    panel: "#fff7fc",
    panelBorder: "#70305c",
    text: "#3c2140",
    hudBg: "rgba(255, 246, 252, 0.92)",
    pipe: "#8f6ccf",
    pipeCap: "#caa8f5",
    skyTop: "#ffe2f6",
    skyBottom: "#cfe8ff",
    cloudTint: "rgba(255, 255, 255, 0.34)"
  },
  starryNight: {
    accent: "#577590",
    accent2: "#90be6d",
    panel: "#eef2ff",
    panelBorder: "#1f2a44",
    text: "#111827",
    hudBg: "rgba(232, 239, 255, 0.9)",
    pipe: "#3d5a80",
    pipeCap: "#98c1d9",
    skyTop: "#0b1d4d",
    skyBottom: "#1a2f6d",
    cloudTint: "rgba(198, 212, 255, 0.12)"
  },
  floral: {
    accent: "#3a86ff",
    accent2: "#ffd60a",
    panel: "#f8fbff",
    panelBorder: "#1d3557",
    text: "#10213a",
    hudBg: "rgba(244, 249, 255, 0.92)",
    pipe: "#4a6fa5",
    pipeCap: "#87bfff",
    skyTop: "#ddecff",
    skyBottom: "#fef6bf",
    cloudTint: "rgba(255, 255, 255, 0.26)"
  },
  earthy: {
    accent: "#606c38",
    accent2: "#dda15e",
    panel: "#f6f2e8",
    panelBorder: "#4a3f35",
    text: "#2f2a24",
    hudBg: "rgba(245, 239, 226, 0.92)",
    pipe: "#6b705c",
    pipeCap: "#a5a58d",
    skyTop: "#d7e7c8",
    skyBottom: "#b7c9a8",
    cloudTint: "rgba(248, 246, 237, 0.18)"
  },
  galaxy: {
    accent: "#9d4edd",
    accent2: "#80ffdb",
    panel: "#f4efff",
    panelBorder: "#2b1b4d",
    text: "#1b1235",
    hudBg: "rgba(241, 233, 255, 0.92)",
    pipe: "#5a189a",
    pipeCap: "#7b2cbf",
    skyTop: "#120028",
    skyBottom: "#3c096c",
    cloudTint: "rgba(201, 171, 255, 0.1)"
  },
  robots: {
    accent: "#6c757d",
    accent2: "#adb5bd",
    panel: "#f2f5f7",
    panelBorder: "#2f3e46",
    text: "#1f2933",
    hudBg: "rgba(236, 241, 245, 0.92)",
    pipe: "#495057",
    pipeCap: "#6c757d",
    skyTop: "#d7dde3",
    skyBottom: "#9aa5b1",
    cloudTint: "rgba(250, 252, 255, 0.18)"
  },
  dinos: {
    accent: "#2d6a4f",
    accent2: "#95d5b2",
    panel: "#eef8f0",
    panelBorder: "#1b4332",
    text: "#123524",
    hudBg: "rgba(235, 247, 238, 0.92)",
    pipe: "#40916c",
    pipeCap: "#74c69d",
    skyTop: "#c7f0d8",
    skyBottom: "#80cfa9",
    cloudTint: "rgba(242, 255, 248, 0.2)"
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
  bubbleTimer: 0,
  bubbleTrail: [],
  bgColor: bgColorInput ? bgColorInput.value : "#8fd3ff",
  theme: themeSelect ? themeSelect.value : "sunset",
  birdImage: new Image(),
  bird: {
    x: 96,
    y: canvas ? canvas.height / 2 : 320,
    baseWidth: 44,
    baseHeight: 34,
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

  gameState.bgColor = theme.skyTop;
  if (bgColorInput) {
    bgColorInput.value = theme.skyTop;
  }
  if (bgColorValue) {
    bgColorValue.textContent = theme.skyTop;
  }

  const isOceanTheme = themeKey === "ocean";
  gameState.bird.width = isOceanTheme ? Math.round(gameState.bird.baseWidth * 1.22) : gameState.bird.baseWidth;
  gameState.bird.height = isOceanTheme ? Math.round(gameState.bird.baseHeight * 1.22) : gameState.bird.baseHeight;

  if (themeKey === "ocean") {
    applyOceanThemeBird();
  }
}

function applyOceanThemeBird() {
  loadFirstAvailableImage(OCEAN_BIRD_SRCS)
    .then((oceanBird) => {
      if (!oceanBird || gameState.theme !== "ocean") {
        return;
      }

      document.querySelectorAll(".bird-option").forEach((node) => {
        node.setAttribute("aria-checked", "false");
      });
      setBirdImage(oceanBird.src);
    })
    .catch(() => {
      // Keep current bird if no ocean bird asset can be loaded.
    });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

async function loadFirstAvailableImage(sources) {
  for (let idx = 0; idx < sources.length; idx += 1) {
    try {
      const image = await loadImage(sources[idx]);
      return { src: sources[idx], image };
    } catch (error) {
      // Try the next candidate path.
    }
  }

  return null;
}

function createTintedVariant(image, targetHexColor) {
  const canvasEl = document.createElement("canvas");
  const width = image.naturalWidth || image.width || 32;
  const height = image.naturalHeight || image.height || 32;
  canvasEl.width = width;
  canvasEl.height = height;

  const context = canvasEl.getContext("2d");
  if (!context) {
    return null;
  }

  context.drawImage(image, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;

  const hexToRgb = (hex) => {
    const normalized = hex.replace("#", "");
    const full = normalized.length === 3
      ? normalized.split("").map((char) => `${char}${char}`).join("")
      : normalized;
    const value = Number.parseInt(full, 16);
    return [
      (value >> 16) & 255,
      (value >> 8) & 255,
      value & 255
    ];
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const rgbToHsl = (r, g, b) => {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;

    let hue = 0;
    const lightness = (max + min) / 2;
    const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    if (delta !== 0) {
      if (max === rn) {
        hue = ((gn - bn) / delta) % 6;
      } else if (max === gn) {
        hue = (bn - rn) / delta + 2;
      } else {
        hue = (rn - gn) / delta + 4;
      }
    }

    hue = (hue * 60 + 360) % 360;

    return [hue, saturation, lightness];
  };

  const hslToRgb = (h, s, l) => {
    if (s < 0.0001) {
      const gray = Math.round(l * 255);
      return [gray, gray, gray];
    }

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r1 = 0;
    let g1 = 0;
    let b1 = 0;

    if (h < 60) {
      r1 = c;
      g1 = x;
    } else if (h < 120) {
      r1 = x;
      g1 = c;
    } else if (h < 180) {
      g1 = c;
      b1 = x;
    } else if (h < 240) {
      g1 = x;
      b1 = c;
    } else if (h < 300) {
      r1 = x;
      b1 = c;
    } else {
      r1 = c;
      b1 = x;
    }

    return [
      Math.round((r1 + m) * 255),
      Math.round((g1 + m) * 255),
      Math.round((b1 + m) * 255)
    ];
  };

  const [targetR, targetG, targetB] = hexToRgb(targetHexColor);
  const [targetHue] = rgbToHsl(targetR, targetG, targetB);

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha === 0) {
      continue;
    }

    let [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);

    const isOutlinePixel = l < 0.18 || (s < 0.16 && l < 0.3);
    if (isOutlinePixel) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      continue;
    }

    h = targetHue;
    s = 0.4;
    l = clamp(l * 0.52 + 0.4, 0.6, 0.88);

    const [nr, ng, nb] = hslToRgb(h, s, l);
    data[i] = nr;
    data[i + 1] = ng;
    data[i + 2] = nb;
  }

  context.putImageData(imageData, 0, 0);

  return canvasEl.toDataURL("image/png");
}

async function getBirdGallerySources() {
  const customBird = await loadFirstAvailableImage(DEFAULT_CUSTOM_BIRD_SRCS);
  const gallerySources = [];

  if (customBird) {
    gallerySources.push({
      id: "custom-bird-original",
      src: customBird.src
    });

    PASTEL_BIRD_VARIANTS.forEach((variant) => {
      const tintedSrc = createTintedVariant(customBird.image, variant.hex);
      if (!tintedSrc) {
        return;
      }

      gallerySources.push({
        id: variant.id,
        src: tintedSrc
      });
    });
  }

  return gallerySources;
}

function buildBirdGallery(gallerySources) {
  birdGallery.innerHTML = "";

  gallerySources.forEach((entry, idx) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "bird-option";
    option.setAttribute("role", "radio");
    option.setAttribute("aria-checked", idx === 0 ? "true" : "false");
    option.dataset.src = entry.src;

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
  const obstacleWidth = gameState.theme === "ocean" ? 102 : 72;
  gameState.pipes.push({
    x: canvas.width,
    width: obstacleWidth,
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

  if (gameState.theme === "ocean") {
    gameState.bubbleTimer += delta;
    while (gameState.bubbleTimer >= 36) {
      gameState.bubbleTimer -= 36;
      gameState.bubbleTrail.push({
        x: gameState.bird.x - gameState.bird.width / 2 - 5,
        y: gameState.bird.y + (Math.random() * 16 - 8),
        size: 6 + Math.floor(Math.random() * 4),
        life: 460,
        vx: -(0.9 + Math.random() * 0.8),
        vy: -(0.45 + Math.random() * 0.5)
      });
    }
  } else {
    gameState.bubbleTrail.length = 0;
    gameState.bubbleTimer = 0;
  }

  gameState.bubbleTrail.forEach((bubble) => {
    bubble.x += bubble.vx * (delta / 16.67);
    bubble.y += bubble.vy * (delta / 16.67);
    bubble.life -= delta;
  });
  gameState.bubbleTrail = gameState.bubbleTrail.filter((bubble) => bubble.life > 0);

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

const themeBackgroundCache = {};
const backgroundPixelCanvas = document.createElement("canvas");
const backgroundPixelCtx = backgroundPixelCanvas.getContext("2d");

function getThemeBackgroundImage(src) {
  if (!src) {
    return null;
  }

  if (themeBackgroundCache[src]) {
    return themeBackgroundCache[src];
  }

  const image = new Image();
  image.src = src;
  themeBackgroundCache[src] = image;
  return image;
}

function drawCoverImage(image, width, height) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = drawHeight * imageRatio;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = drawWidth / imageRatio;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function pixelateRenderedBackground() {
  if (!backgroundPixelCtx) {
    return;
  }

  const downscaledWidth = Math.max(1, Math.floor(canvas.width / BACKGROUND_PIXEL_SIZE));
  const downscaledHeight = Math.max(1, Math.floor(canvas.height / BACKGROUND_PIXEL_SIZE));

  if (backgroundPixelCanvas.width !== downscaledWidth || backgroundPixelCanvas.height !== downscaledHeight) {
    backgroundPixelCanvas.width = downscaledWidth;
    backgroundPixelCanvas.height = downscaledHeight;
  }

  backgroundPixelCtx.clearRect(0, 0, downscaledWidth, downscaledHeight);
  backgroundPixelCtx.imageSmoothingEnabled = false;
  backgroundPixelCtx.drawImage(canvas, 0, 0, downscaledWidth, downscaledHeight);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(backgroundPixelCanvas, 0, 0, downscaledWidth, downscaledHeight, 0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawBackground() {
  const activeTheme = themes[gameState.theme];
  const skyTop = gameState.bgColor || (activeTheme ? activeTheme.skyTop : "#8fd3ff");
  const skyBottom = activeTheme ? activeTheme.skyBottom : "#6fc3ff";
  const cloudTint = activeTheme ? activeTheme.cloudTint : "rgba(255, 255, 255, 0.22)";
  const bgImageSrc = activeTheme ? activeTheme.bgImage : "";

  let drewThemeImage = false;
  if (bgImageSrc) {
    const bgImage = getThemeBackgroundImage(bgImageSrc);
    if (bgImage && bgImage.complete && bgImage.naturalWidth > 0) {
      drawCoverImage(bgImage, canvas.width, canvas.height);
      drewThemeImage = true;
    }
  }

  if (!drewThemeImage) {
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, skyTop);
    skyGradient.addColorStop(1, skyBottom);
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawThemeDetails(gameState.theme);

  ctx.fillStyle = cloudTint;
  const cloudCount = gameState.theme === "starryNight" || gameState.theme === "galaxy"
    ? 3
    : gameState.theme === "ocean"
      ? 0
      : 5;
  for (let i = 0; i < cloudCount; i += 1) {
    const x = 20 + i * 90;
    const y = 70 + (i % 2) * 55;
    ctx.beginPath();
    ctx.ellipse(x, y, 30, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pixelate the full background layer (all themes and default canvas background).
  pixelateRenderedBackground();
}

function drawThemeDetails(themeKey) {
  if (themeKey === "sunset") {
    ctx.fillStyle = "rgba(255, 235, 180, 0.55)";
    ctx.beginPath();
    ctx.arc(canvas.width - 80, 110, 48, 0, Math.PI * 2);
    ctx.fill();
  } else if (themeKey === "candyRush") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
    for (let i = -2; i < 8; i += 1) {
      ctx.fillRect(i * 90, 0, 26, canvas.height);
    }
  } else if (themeKey === "desert") {
    ctx.fillStyle = "rgba(223, 171, 112, 0.45)";
    ctx.beginPath();
    ctx.ellipse(130, 470, 170, 42, 0, 0, Math.PI * 2);
    ctx.ellipse(360, 510, 210, 55, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (themeKey === "cottonCandy") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.arc(90 + i * 120, 150 + (i % 2) * 35, 34, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (themeKey === "starryNight") {
    ctx.fillStyle = "rgba(255, 245, 180, 0.85)";
    for (let i = 0; i < 22; i += 1) {
      ctx.fillRect((i * 47) % canvas.width, 40 + ((i * 29) % 220), 2, 2);
    }
    ctx.fillStyle = "rgba(255, 243, 204, 0.75)";
    ctx.beginPath();
    ctx.arc(canvas.width - 75, 92, 26, 0, Math.PI * 2);
    ctx.fill();
  } else if (themeKey === "floral") {
    for (let i = 0; i < 5; i += 1) {
      const x = 60 + i * 105;
      const y = 520 + (i % 2) * 20;
      ctx.fillStyle = "rgba(59, 130, 246, 0.35)";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255, 214, 10, 0.82)";
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (themeKey === "earthy") {
    ctx.fillStyle = "rgba(122, 94, 66, 0.28)";
    ctx.beginPath();
    ctx.ellipse(120, 520, 180, 60, 0, 0, Math.PI * 2);
    ctx.ellipse(390, 545, 220, 70, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (themeKey === "galaxy") {
    ctx.fillStyle = "rgba(199, 125, 255, 0.22)";
    ctx.beginPath();
    ctx.ellipse(120, 140, 90, 34, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    for (let i = 0; i < 26; i += 1) {
      ctx.fillRect((i * 37) % canvas.width, 25 + ((i * 31) % 260), 2, 2);
    }

    // UFOs for the galaxy theme.
    ctx.fillStyle = "rgba(163, 233, 255, 0.9)";
    ctx.beginPath();
    ctx.ellipse(130, 210, 28, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(130, 202, 10, Math.PI, 0, false);
    ctx.fill();

    ctx.fillStyle = "rgba(199, 246, 255, 0.88)";
    ctx.beginPath();
    ctx.ellipse(390, 170, 24, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(390, 162, 8, Math.PI, 0, false);
    ctx.fill();
  } else if (themeKey === "robots") {
    ctx.strokeStyle = "rgba(66, 84, 99, 0.32)";
    ctx.lineWidth = 2;
    for (let i = 0; i < canvas.width; i += 52) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 48) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }
  } else if (themeKey === "dinos") {
    ctx.fillStyle = "rgba(60, 122, 80, 0.35)";
    ctx.beginPath();
    ctx.moveTo(20, 520);
    ctx.lineTo(120, 380);
    ctx.lineTo(220, 520);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(220, 520);
    ctx.lineTo(340, 360);
    ctx.lineTo(460, 520);
    ctx.closePath();
    ctx.fill();
  }
}

function drawPipes() {
  const theme = themes[gameState.theme];
  const snap = (value) => Math.round(value / PIPE_PIXEL_SIZE) * PIPE_PIXEL_SIZE;
  const pipeTexture = theme && theme.pipeImage ? getThemeBackgroundImage(theme.pipeImage) : null;
  const textureReady = Boolean(pipeTexture && pipeTexture.complete && pipeTexture.naturalWidth > 0);
  const isOceanMode = gameState.theme === "ocean";

  const fillPipeSegment = (x, y, width, height, fallbackColor) => {
    if (textureReady) {
      ctx.drawImage(pipeTexture, x, y, width, height);
      return;
    }

    ctx.fillStyle = fallbackColor;
    ctx.fillRect(x, y, width, height);
  };

  gameState.pipes.forEach((pipe) => {
    const pipeX = snap(pipe.x);
    const pipeWidth = Math.max(PIPE_PIXEL_SIZE, snap(pipe.width));
    const topHeight = Math.max(0, snap(pipe.topHeight));
    const bottomY = snap(pipe.topHeight + gameState.pipeGap);
    const bottomHeight = Math.max(0, canvas.height - bottomY);

    if (isOceanMode) {
      // In ocean mode, replace pipe visuals with coral-image obstacles only.
      fillPipeSegment(pipeX, 0, pipeWidth, topHeight, "#2a6f97");
      fillPipeSegment(pipeX, bottomY, pipeWidth, bottomHeight, "#2a6f97");
      return;
    }

    const capHeight = PIPE_PIXEL_SIZE * 3;
    const topCapY = topHeight - capHeight;
    const capX = pipeX - PIPE_PIXEL_SIZE;
    const capWidth = pipeWidth + PIPE_PIXEL_SIZE * 2;

    fillPipeSegment(pipeX, 0, pipeWidth, topHeight, theme.pipe);
    fillPipeSegment(pipeX, bottomY, pipeWidth, bottomHeight, theme.pipe);
    fillPipeSegment(capX, topCapY, capWidth, capHeight, theme.pipeCap);
    fillPipeSegment(capX, bottomY, capWidth, capHeight, theme.pipeCap);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(pipeX + 1, 1, Math.max(0, pipeWidth - 2), Math.max(0, topHeight - 2));
    ctx.strokeRect(pipeX + 1, bottomY + 1, Math.max(0, pipeWidth - 2), Math.max(0, bottomHeight - 2));
    ctx.strokeRect(capX + 1, topCapY + 1, Math.max(0, capWidth - 2), Math.max(0, capHeight - 2));
    ctx.strokeRect(capX + 1, bottomY + 1, Math.max(0, capWidth - 2), Math.max(0, capHeight - 2));
  });
}

function drawBird() {
  const { bird } = gameState;

  if (gameState.theme === "ocean") {
    gameState.bubbleTrail.forEach((bubble) => {
      const alpha = Math.max(0, Math.min(1, bubble.life / 460));
      ctx.fillStyle = `rgba(214, 241, 255, ${0.25 + alpha * 0.5})`;
      ctx.fillRect(Math.round(bubble.x), Math.round(bubble.y), bubble.size, bubble.size);

      ctx.fillStyle = `rgba(249, 254, 255, ${0.18 + alpha * 0.35})`;
      ctx.fillRect(Math.round(bubble.x + 2), Math.round(bubble.y + 2), 2, 2);
    });
  }

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

async function initGame() {
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
  const gallerySources = await getBirdGallerySources();
  buildBirdGallery(gallerySources);
  resetGame();
  requestAnimationFrame(gameLoop);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGame);
} else {
  initGame();
}
