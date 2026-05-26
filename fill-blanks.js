// Fill in the Blanks Activity - Completar oraciones con conectores
const sentenceData = [
  {
    before: 'She studied hard',
    blank: '__________',
    after: 'she passed the exam.',
    correct: 'and',
    hint: 'Addition',
  },
  {
    before: 'First, read the instructions.',
    blank: '__________',
    after: 'start the exercise.',
    correct: 'then',
    hint: 'Sequence',
  },
  {
    before: 'This is difficult;',
    blank: '__________',
    after: 'it is very important.',
    correct: 'however',
    hint: 'Contrast',
  },
  {
    before: 'He works hard, studies constantly,',
    blank: '__________',
    after: 'he never complains.',
    correct: 'moreover',
    hint: 'Addition',
  },
  {
    before: 'We waited for hours.',
    blank: '__________',
    after: 'we finally left.',
    correct: 'finally',
    hint: 'Sequence',
  },
];

function initFillBlanks() {
  const container = document.getElementById('fill-blanks-activity');

  sentenceData.forEach((sentence, index) => {
    const sentenceDiv = document.createElement('div');
    sentenceDiv.className = 'sentence-blank';

    const beforeSpan = document.createElement('span');
    beforeSpan.className = 'sentence-word';
    beforeSpan.textContent = sentence.before;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'sentence-input';
    input.placeholder = sentence.hint;
    input.dataset.index = index;
    input.dataset.correct = sentence.correct;

    const afterSpan = document.createElement('span');
    afterSpan.className = 'sentence-word';
    afterSpan.textContent = sentence.after;

    sentenceDiv.appendChild(beforeSpan);
    sentenceDiv.appendChild(input);
    sentenceDiv.appendChild(afterSpan);

    container.appendChild(sentenceDiv);
  });
}

document.getElementById('check-blanks').addEventListener('click', () => {
  const inputs = document.querySelectorAll('.sentence-input');
  let correctCount = 0;

  inputs.forEach((input) => {
    const answer = input.value.trim().toLowerCase();
    const correct = input.dataset.correct.toLowerCase();

    if (answer === correct) {
      input.classList.remove('incorrect');
      input.classList.add('correct');
      correctCount++;
    } else {
      input.classList.remove('correct');
      input.classList.add('incorrect');
    }
  });

  const feedback = document.getElementById('blanks-feedback');
  feedback.style.display = 'block';

  const percentage = (correctCount / sentenceData.length) * 100;
  if (percentage === 100) {
    feedback.textContent = `✓ ¡Perfecto! Completaste todas las oraciones correctamente.`;
    feedback.className = 'result-box success';
  } else {
    feedback.textContent = `${correctCount}/${sentenceData.length} oraciones completadas correctamente.`;
    feedback.className = 'result-box error';
  }
});

// Inicializar cuando se cargue el documento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFillBlanks);
} else {
  initFillBlanks();
}
