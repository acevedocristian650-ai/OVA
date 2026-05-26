// Correctas respuestas para el drag-and-drop
const correctConnectors = {
  addition: ['and', 'also', 'too','moreover'],
  sequence: ['then', 'first', 'next', 'finally'],
  emphasis: ['definitely', 'above all', 'indeed', 'in fact'],
};

// Elementos del DOM
const draggables = document.querySelectorAll('.draggable');
const dragSourceWords = document.querySelector('.draggable-words');
const dropZones = document.querySelectorAll('.drop-zone');
const dropAreas = document.querySelectorAll('.drop-area');
const checkButton = document.getElementById('check-drag');
const dragFeedback = document.getElementById('drag-feedback');
let draggedElement = null;

function addDraggableListeners(word) {
  word.addEventListener('dragstart', () => {
    draggedElement = word;
    word.classList.add('dragging');
  });

  word.addEventListener('dragend', () => {
    word.classList.remove('dragging');
    draggedElement = null;
  });
}

function createSourceWord(wordText) {
  const word = document.createElement('span');
  word.className = 'draggable';
  word.draggable = true;
  word.textContent = wordText;
  addDraggableListeners(word);
  return word;
}

function restoreWordToSource(wordText) {
  const alreadyExists = Array.from(dragSourceWords.querySelectorAll('.draggable')).some((item) => item.textContent.trim() === wordText);
  if (!alreadyExists) {
    dragSourceWords.appendChild(createSourceWord(wordText));
  }
}

// Agregar event listeners a palabras arrastrables
draggables.forEach((word) => {
  addDraggableListeners(word);
});

// Agregar event listeners a zonas de drop
dropAreas.forEach((area) => {
  area.addEventListener('dragover', (e) => {
    e.preventDefault();
    area.parentElement.parentElement.classList.add('dragover');
  });

  area.addEventListener('dragleave', () => {
    area.parentElement.parentElement.classList.remove('dragover');
  });

  area.addEventListener('drop', (e) => {
    e.preventDefault();
    area.parentElement.parentElement.classList.remove('dragover');

    if (draggedElement && draggedElement.classList.contains('draggable')) {
      const clonedWord = document.createElement('span');
      clonedWord.textContent = draggedElement.textContent;
      clonedWord.className = 'dropped-word';
      clonedWord.draggable = true;

      // Permitir mover las palabras de vuelta
      clonedWord.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.target.style.opacity = '0.5';
        draggedElement = e.target;
      });

      clonedWord.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1';
      });

      // Permitir eliminar palabras de zonas con click y restaurar al origen
      clonedWord.addEventListener('click', (e) => {
        const text = e.target.textContent.trim();
        e.target.remove();
        restoreWordToSource(text);
      });

      area.appendChild(clonedWord);
      draggedElement.remove();
    } else if (draggedElement && draggedElement.classList.contains('dropped-word')) {
      area.appendChild(draggedElement);
    }
  });
});

// Permitir que palabras en zonas de drop se arrastren de vuelta
document.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('dropped-word')) {
    draggedElement = e.target;
    e.target.style.opacity = '0.5';
  }
});

document.addEventListener('dragend', (e) => {
  if (e.target.classList.contains('dropped-word')) {
    e.target.style.opacity = '1';
    draggedElement = null;
  }
});

// Verificar respuestas
checkButton.addEventListener('click', () => {
  let totalCorrect = 0;
  let totalWords = 0;

  // Limpiar clases previas
  const allDropped = document.querySelectorAll('.dropped-word');
  allDropped.forEach((word) => {
    word.classList.remove('correct', 'incorrect');
  });

  dropZones.forEach((zone) => {
    const category = zone.dataset.category;
    const droppedWords = zone.querySelector('.drop-area').querySelectorAll('.dropped-word');

    droppedWords.forEach((word) => {
      totalWords++;
      const wordText = word.textContent.trim();

      if (correctConnectors[category].includes(wordText)) {
        word.classList.add('correct');
        totalCorrect++;
      } else {
        word.classList.add('incorrect');
      }
    });
  });

  // Mostrar retroalimentación
  dragFeedback.style.display = 'block';
  if (totalWords === 0) {
    dragFeedback.textContent = '⚠️ Por favor, arrastra palabras a las categorías.';
    dragFeedback.className = 'result-box';
  } else {
    const percentage = Math.round((totalCorrect / totalWords) * 100);
    dragFeedback.textContent = `✓ Resultado: ${totalCorrect} de ${totalWords} correctas (${percentage}%)`;

    if (percentage === 100) {
      dragFeedback.className = 'result-box success';
    } else {
      dragFeedback.className = 'result-box error';
    }
  }
});

// Permitir limpiar arrastrando de vuelta a zona de origen
const dragSource = document.getElementById('drag-source');
dragSource.addEventListener('dragover', (e) => {
  e.preventDefault();
  dragSource.style.opacity = '0.7';
});

dragSource.addEventListener('dragleave', () => {
  dragSource.style.opacity = '1';
});

dragSource.addEventListener('drop', (e) => {
  e.preventDefault();
  dragSource.style.opacity = '1';

  if (draggedElement && draggedElement.classList.contains('dropped-word')) {
    const wordText = draggedElement.textContent.trim();
    draggedElement.remove();
    restoreWordToSource(wordText);
  }
});
