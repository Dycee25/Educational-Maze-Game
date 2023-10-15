let images = [
  {
    src: "./assets/small.gif",
    size: 260,
    collisionLT: 24,
    collisionRB: 225,
    startY: 110,
    startX: 25,
    win: {
      x: 45,
      y: 225,
    },
  },
  {
    src: "./assets/normal.gif",
    size: 348,
    collisionLT: 24,
    collisionRB: 310,
    startY: 114,
    startX: 25,
    win: {
      x: 310,
      y: 204,
    },
  },
  {
    src: "./assets/medium.gif",
    size: 436,
    collisionLT: 24,
    collisionRB: 402,
    startY: 25,
    startX: 332,
    win: {
      x: 402,
      y: 180,
    },
  },
  {
    src: "./assets/large.gif",
    size: 503,
    collisionLT: 24,
    collisionRB: 470,
    startY: 465,
    startX: 112,
    win: {
      x: 132,
      y: 470,
    },
  },
  {
    src: "./assets/huge.gif",
    size: 260,
    collisionLT: 24,
    collisionRB: 225,
    startY: 110,
    startX: 25,
    win: {
      x: 45,
      y: 225,
    },
  },
];

let score = [];

let canvas;
let ctx;
let dx = 5;
let dy = 5;
let x = images[0].startX;
let y = images[0].startY;
let WIDTH = 2600;
let HEIGHT = 2600;
let img = new Image();
let collision = 0;
let level = 1;
let playing = true;
let clock = 0;

function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(img, 0, 0);
}

function reset() {
  totalSeconds = -1;
  score = [];

  canvas;
  ctx;
  dx = 5;
  dy = 5;
  x = images[0].startX;
  y = images[0].startY;
  WIDTH = 2600;
  HEIGHT = 2600;
  img = new Image();
  collision = 0;
  level = 1;

  clock = 0;

  document.getElementById("canvasRow").classList.remove("hide");
  document.getElementById("totalDisplay").innerHTML = "";
  const timerDiv = document.getElementById("timerDivHide");
  timerDiv.classList.remove("hide");
}

function init() {
  reset();
  startTimer();
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  img.src = images[0].src;
  ctx.canvas.width = images[0].size;
  ctx.canvas.height = images[0].size;
  return setInterval(draw, 10);
}

function nextLevel(index) {
  x = images[index].startX;
  y = images[index].startY;
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  img.src = images[index].src;
  ctx.canvas.width = images[index].size;
  ctx.canvas.height = images[index].size;
  const time = totalSeconds;
  score.push(time);
  let totalDisplay = document.getElementById("totalDisplay");
  totalDisplay.innerHTML += `<span id="levelTitle">Level ${index}<span> - <span id="timeTook">Time taken = ${time}<br />`;
  totalSeconds = -1;
  return setInterval(draw, 10);
}

function doKeyDown(evt) {
  switch (evt.keyCode) {
    case 87 /* Up arrow was pressed */:
      if (y - dy > 0) {
        y -= dy;
        clear();
        checkcollision();
        if (collision == 1) {
          y += dy;
          collision = 0;
        }
      }

      break;
    case 83 /* Down arrow was pressed */:
      if (y + dy < HEIGHT) {
        y += dy;
        clear();
        checkcollision();
        if (collision == 1) {
          y -= dy;
          collision = 0;
        }
      }

      break;
    case 65 /* Left arrow was pressed */:
      if (x - dx > 0) {
        x -= dx;
        clear();
        checkcollision();
        if (collision == 1) {
          x += dx;
          collision = 0;
        }
      }
      break;
    case 68 /* Right arrow was pressed */:
      if (x + dx < WIDTH) {
        x += dx;
        clear();
        checkcollision();
        if (collision == 1) {
          x -= dx;
          collision = 0;
        }
      }
      break;
  }
}

function checkcollision() {
  let imgd = ctx.getImageData(x, y, 15, 15);
  let pix = imgd.data;
  for (let i = 0; (n = pix.length), i < n; i += 4) {
    if (pix[i] == 0) {
      collision = 1;
    }
  }

  let index = level - 1;
  console.log(index);
  console.log(x, y, images[index].win.x, images[index].win.y);

  if (x < images[index].collisionLT) {
    collision = 1;
  } else if (y < images[index].collisionLT) {
    collision = 1;
  } else if (x > images[index].collisionRB) {
    collision = 1;
  } else if (y > images[index].collisionRB) {
    collision = 1;
  } else if (x == images[index].win.x && y == images[index].win.y) {
    if (index + 1 >= images.length) {
      document.getElementById("canvasRow").classList.add("hide");
      document.getElementById("timerDivHide").classList.add("hide");
      let totalDisplay = document.getElementById("totalDisplay");
      score.push(totalSeconds);
      let total = 0;
      score.forEach((element) => {
        total += element;
      });
      totalDisplay.innerHTML += `<span id="levelTitle">Final Level<span> - <span id="timeTook">Time taken = ${totalSeconds}`;
      totalDisplay.innerHTML += `<br><span style="color: #009196">Total Time Taken to complete all the maze is </span><span style="color: red">${total}</span>`;
      totalDisplay.innerHTML += `<br>Can you do better? <button type="button" class="btn btn-primary" onclick="init()">Restart the game</button>`;
    } else {
      level++;
      document.getElementById("level").innerHTML = level;
      nextLevel(index + 1);
    }
  }
}

function draw() {
  if (playing === true) {
    clear();
    ctx.strokeStyle = "#09f";
    ctx.fillStyle = "rgba(225, 0, 0, 0.5)";
    rect(x, y, 15, 15);
  }
}

function startTheGame() {
  let name = prompt("Please enter your name");
  document.getElementById("name").innerHTML = name;
  document.getElementById("gameInfo").classList.add("hide");
  document.getElementById("btnStart").classList.add("hide");
  init();
  document.getElementById("canvasRow").classList.remove("hide");
  window.addEventListener("keydown", doKeyDown, true);

  let state = {
    player: { x: 4, y: 3 },
    score: 10,
  };

  let SAVE_KEY = "save";

  function save(state) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function load() {
    return JSON.parse(localStorage.getItem(SAVE_KEY));
  }
}
