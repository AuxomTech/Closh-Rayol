const elixirBar = document.getElementById('elixir');
let elixir = 0;

function gainElixir() {
  if (elixir < 10) {
    elixir += 0.1;
    elixirBar.style.width = `${(elixir / 10) * 100}%`;
  }
}

setInterval(gainElixir, 300);

// Gerar cards
const deck = document.getElementById('deck');
const cards = ['Knight', 'Archer', 'Giant', 'Fireball'];
cards.forEach(c => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = c;
  card.addEventListener('click', () => playCard(c));
  deck.appendChild(card);
});

function playCard(name) {
  if (elixir >= 3) {
    elixir -= 3;
    elixirBar.style.width = `${(elixir / 10) * 100}%`;
    spawnTroop(name);
  }
}

function spawnTroop(name) {
  const troop = document.createElement('div');
  troop.classList.add('troop');
  troop.textContent = name[0];
  troop.style.position = 'absolute';
  troop.style.left = '20%';
  troop.style.bottom = '20px';
  troop.style.transition = 'all 3s linear';
  document.getElementById('arena').appendChild(troop);
  setTimeout(() => {
    troop.style.left = '80%';
  }, 50);
}

