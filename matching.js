// Matching Activity - Emparejar conectores con definiciones
const matchingData = [
  { connector: 'moreover', definition: 'Además; además de eso' },
  { connector: 'and', definition: 'Y; también' },
  { connector: 'then', definition: 'Luego; después' },
  { connector: 'finally', definition: 'Finalmente; al final' },
  { connector: 'indeed', definition: 'De verdad; en efecto' },
  { connector: 'in fact', definition: 'De hecho; en realidad' },
];

let selectedLeft = null;
let selectedRight = null;
let matches = {};

function initMatching() {
  const matchingLeft = document.querySelector('.matching-left');
  const matchingRight = document.querySelector('.matching-right');

  // Crear copias y desordenarlas
  const leftData = [...matchingData].sort(() => Math.random() - 0.5);
  const rightData = [...matchingData].map(d => d.definition).sort(() => Math.random() - 0.5);

  // Agregar elementos del lado izquierdo (conectores)
  leftData.forEach((data, index) => {
    const item = document.createElement('div');
    item.className = 'matching-item';
    item.textContent = data.connector;
    item.dataset.index = index;
    item.dataset.type = 'left';
    item.addEventListener('click', () => selectMatchingItem(item, 'left', data.connector));
    matchingLeft.appendChild(item);
  });

  // Agregar elementos del lado derecho (definiciones)
  rightData.forEach((def, index) => {
    const item = document.createElement('div');
    item.className = 'matching-item';
    item.textContent = def;
    item.dataset.index = index;
    item.dataset.type = 'right';
    item.addEventListener('click', () => selectMatchingItem(item, 'right', def));
    matchingRight.appendChild(item);
  });
}

function selectMatchingItem(element, side, value) {
  if (element.classList.contains('correct') || element.classList.contains('incorrect')) {
    return;
  }

  if (side === 'left') {
    if (selectedLeft) {
      selectedLeft.classList.remove('selected');
    }
    selectedLeft = element;
    selectedLeft.classList.add('selected');
  } else {
    if (selectedRight) {
      selectedRight.classList.remove('selected');
    }
    selectedRight = element;
    selectedRight.classList.add('selected');

    if (selectedLeft && selectedRight) {
      checkMatch(selectedLeft, selectedRight);
      selectedLeft = null;
      selectedRight = null;
    }
  }
}

function checkMatch(leftEl, rightEl) {
  const connector = leftEl.textContent;
  const definition = rightEl.textContent;

  const isCorrect = matchingData.some(
    (d) => d.connector === connector && d.definition === definition
  );

  if (isCorrect) {
    leftEl.classList.add('correct');
    rightEl.classList.add('correct');
    matches[connector] = true;
  } else {
    leftEl.classList.add('incorrect');
    rightEl.classList.add('incorrect');
    setTimeout(() => {
      leftEl.classList.remove('incorrect', 'selected');
      rightEl.classList.remove('incorrect', 'selected');
    }, 1000);
  }
}

document.getElementById('check-matching').addEventListener('click', () => {
  const allItems = document.querySelectorAll('.matching-item');
  const correctCount = Array.from(allItems).filter((item) =>
    item.classList.contains('correct')
  ).length / 2;

  const feedback = document.getElementById('matching-feedback');
  feedback.style.display = 'block';

  const percentage = (correctCount / matchingData.length) * 100;
  if (percentage === 100) {
    feedback.textContent = `✓ ¡Excelente! Has emparejado todos correctamente.`;
    feedback.className = 'result-box success';
  } else {
    feedback.textContent = `${correctCount}/${matchingData.length} pares correctos. Intenta de nuevo.`;
    feedback.className = 'result-box error';
  }
});

// Inicializar cuando se cargue el documento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMatching);
} else {
  initMatching();
}
