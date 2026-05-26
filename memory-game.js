// Memory Game - Juego de Memoria de Conectores
const memoryPairs = [
  { text: 'and', type: 'connector', category: 'Addition' },
  { text: 'Addition', type: 'category', category: 'Addition' },
  { text: 'moreover', type: 'connector', category: 'Addition' },
  { text: 'Addition', type: 'category', category: 'Addition' },
  { text: 'then', type: 'connector', category: 'Sequence' },
  { text: 'Sequence', type: 'category', category: 'Sequence' },
  { text: 'finally', type: 'connector', category: 'Sequence' },
  { text: 'Sequence', type: 'category', category: 'Sequence' },
  { text: 'indeed', type: 'connector', category: 'Emphasis' },
  { text: 'Emphasis', type: 'category', category: 'Emphasis' },
  { text: 'in fact', type: 'connector', category: 'Emphasis' },
  { text: 'Emphasis', type: 'category', category: 'Emphasis' },
];

let cards = [];
let flipped = [];
let matched = 0;
let isProcessing = false;
let attempts = 0;

const connectorPairs = {
  and: 'Addition',
  moreover: 'Addition',
  then: 'Sequence',
  finally: 'Sequence',
  indeed: 'Emphasis',
  'in fact': 'Emphasis',
};

function initMemoryGame() {
  const grid = document.getElementById('memory-game');
  grid.innerHTML = '';

  // Copiar y mezclar pares
  const shuffled = [...memoryPairs].sort(() => Math.random() - 0.5);
  cards = shuffled.map((card, index) => ({
    ...card,
    id: index,
    flipped: false,
    matched: false,
  }));

  flipped = [];
  matched = 0;
  attempts = 0;
  isProcessing = false;
  document.getElementById('memory-feedback').style.display = 'none';

  cards.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card hidden';
    cardEl.dataset.id = card.id;
    cardEl.textContent = '?';
    cardEl.title = 'Haz clic para revelar';

    cardEl.addEventListener('click', () => flipCard(cardEl, card));
    grid.appendChild(cardEl);
  });
}

function flipCard(element, card) {
  if (
    isProcessing ||
    element.classList.contains('matched') ||
    element.classList.contains('flipped') ||
    flipped.find((c) => c.id === card.id)
  ) {
    return;
  }

  element.classList.remove('hidden');
  element.textContent = card.text;
  element.classList.add('flipped');

  flipped.push(card);

  if (flipped.length === 2) {
    isProcessing = true;
    attempts++;
    setTimeout(checkMemoryMatch, 800);
  }
}

function checkMemoryMatch() {
  const [card1, card2] = flipped;

  // Verificar si es una pareja válida: un conector y su categoría coinciden
  const isMatch =
    card1.category === card2.category &&
    ((card1.type === 'connector' && card2.type === 'category') ||
      (card1.type === 'category' && card2.type === 'connector'));

  if (isMatch) {
    const elements = document.querySelectorAll(
      `[data-id="${card1.id}"], [data-id="${card2.id}"]`
    );
    elements.forEach((el) => {
      el.classList.remove('flipped', 'hidden');
      el.classList.add('matched');
    });

    cards[card1.id].matched = true;
    cards[card2.id].matched = true;
    matched += 2;

    flipped = [];
    isProcessing = false;

    if (matched === cards.length) {
      setTimeout(showMemoryCompletion, 2000);
    }
  } else {
    // Si no coinciden, voltear de regreso
    const elements = document.querySelectorAll(
      `[data-id="${card1.id}"], [data-id="${card2.id}"]`
    );
    elements.forEach((el) => {
      el.classList.remove('flipped');
      el.classList.add('hidden');
      el.textContent = '?';
    });

    flipped = [];
    isProcessing = false;
  }
}

function showMemoryCompletion() {
  const feedback = document.getElementById('memory-feedback');
  feedback.style.display = 'block';
  const message = `✓ ¡Excelente! Completaste el juego en ${attempts} intentos.`;
  feedback.textContent = message;
  feedback.className = 'result-box success';
}

document.getElementById('reset-memory').addEventListener('click', () => {
  initMemoryGame();
});

// Inicializar cuando se cargue el documento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMemoryGame);
} else {
  initMemoryGame();
}
