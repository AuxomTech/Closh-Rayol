// ==========================
// Closh Rayol - Script.js
// ==========================

// ====== Elixir System ======
const elixirBar = document.getElementById('elixir');
let elixir = 5;
const maxElixir = 10;
const elixirGainRate = 0.15; // speed of elixir regeneration

function gainElixir() {
  if (elixir < maxElixir) {
    elixir += elixirGainRate;
    if (elixir > maxElixir) elixir = maxElixir;
    updateElixirBar();
  }
}

function updateElixirBar() {
  const percent = (elixir / maxElixir) * 100;
  elixirBar.style.width = `${percent}%`;
}

setInterval(gainElixir, 300);

// ====== Card System ======
const deck = document.getElementById('deck');
const cards = [
  { name: 'Knight', cost: 3, emoji: '🗡️', color: '#4a90e2' },
  { name: 'Archer', cost: 2, emoji: '🏹', color: '#e67e22' },
  { name: 'Giant', cost: 5, emoji: '🪓', color: '#8e44ad' },
  { name: 'Fireball', cost: 4, emoji: '🔥', color: '#e74c3c' },
];

// render cards
cards.forEach(c => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = `${c.emoji}`;
  card.title = `${c.name} (${c.cost})`;
  card.style.borderColor = c.color;
  card.addEventListener('click', () => playCard(c));
  deck.appendChild(card);
});

// ====== Arena & Towers ======
const arena = document.getElementById('arena');
const leftTower = document.getElementById('left-tower');
const rightTower = document.getElementById('right-tower');

// tower health
let towerHealth = { left: 100, right: 100 };

// ====== Troop Logic ======
function playCard(card) {
  if (elixir < card.cost) {
    alert("Not enough elixir!");
    return;
  }
  elixir -= card.cost;
  updateElixirBar();
  spawnTroop(card);
}

function spawnTroop(card) {
  const troop = document.createElement('div');
  troop.classList.add('troop');
  troop.style.position = 'absolute';
  troop.style.bottom = '50px';
  troop.style.left = '20%';
  troop.style.width = '40px';
  troop.style.height = '40px';
  troop.style.background = card.color;
  troop.style.borderRadius = '50%';
  troop.style.display = 'flex';
  troop.style.alignItems = 'center';
  troop.style.justifyContent = 'center';
  troop.style.fontSize = '20px';
  troop.textContent = card.emoji;

  arena.appendChild(troop);

  // move troop across the arena
  let pos = 20;
  const moveInterval = setInterval(() => {
    pos += 1;
    troop.style.left = pos + '%';
    // check collision with right tower
    if (pos >= 75) {
      damageTower('right', card);
      troop.remove();
      clearInterval(moveInterval);
    }
  }, 100);
}

// ====== Tower Damage ======
function damageTower(side, card) {
  let damage = 0;
  if (card.name === 'Knight') damage = 10;
  else if (card.name === 'Archer') damage = 8;
  else if (card.name === 'Giant') damage = 15;
  else if (card.name === 'Fireball') damage = 20;

  towerHealth[side] -= damage;
  if (towerHealth[side] <= 0) {
    towerHealth[side] = 0;
    gameOver(side);
  }
  updateTower(side);
}

function updateTower(side) {
  const tower = side === 'left' ? leftTower : rightTower;
  const healthPercent = towerHealth[side];
  tower.style.filter = `brightness(${0.4 + healthPercent / 150})`;
  tower.title = `${side.toUpperCase()} Tower: ${healthPercent} HP`;
}

function gameOver(sideDestroyed) {
  alert(`${sideDestroyed.toUpperCase()} tower destroyed! You win!`);
  window.location.reload();
}

// ====== Enemy AI ======
function enemyAI() {
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  spawnEnemyTroop(randomCard);
}

function spawnEnemyTroop(card) {
  const troop = document.createElement('div');
  troop.classList.add('troop');
  troop.style.position = 'absolute';
  troop.style.bottom = '50px';
  troop.style.right = '20%';
  troop.style.width = '40px';
  troop.style.height = '40px';
  troop.style.background = card.color;
  troop.style.borderRadius = '50%';
  troop.style.display = 'flex';
  troop.style.alignItems = 'center';
  troop.style.justifyContent = 'center';
  troop.style.fontSize = '20px';
  troop.textContent = card.emoji;

  arena.appendChild(troop);

  let pos = 20;
  const moveInterval = setInterval(() => {
    pos += 1;
    troop.style.right = pos + '%';
    if (pos >= 75) {
      damageTower('left', card);
      troop.remove();
      clearInterval(moveInterval);
    }
  }, 100);
}

// Enemy spawns every 5s
setInterval(enemyAI, 5000);
