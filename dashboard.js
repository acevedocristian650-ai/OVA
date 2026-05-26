const navLinks = document.querySelectorAll('.nav-link');
const panels = document.querySelectorAll('.panel');
const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');
const evaluationScore = document.getElementById('evaluation-score');

navLinks.forEach((button) => {
  button.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const targetId = button.dataset.target;
    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === targetId);
    });
  });
});

const correctAnswers = {
  q1: 'moreover',
  q2: 'finally',
  q3: 'in fact',
  q4: 'and',
};

const questionFeedback = {
  q1: 'Incorrecto. "Moreover" se usa para añadir información adicional.',
  q2: 'Incorrecto. "Finally" se usa para indicar el cierre o la conclusión de una secuencia.',
  q3: 'Incorrecto. "In fact" es un conector de énfasis que refuerza una idea.',
  q4: 'Incorrecto. "And" conecta dos acciones o ideas en la misma oración.',
};

quizForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(quizForm);
  let score = 0;
  let answered = 0;
  let hasIncorrect = false;

  document.querySelectorAll('.question').forEach((questionEl) => {
    const feedbackEl = questionEl.querySelector('.question-feedback');
    const selectedInput = questionEl.querySelector('input:checked');
    const labels = questionEl.querySelectorAll('.option');

    labels.forEach((label) => {
      label.classList.remove('correct', 'incorrect');
    });
    if (feedbackEl) {
      feedbackEl.textContent = '';
      feedbackEl.className = 'question-feedback';
    }

    if (!selectedInput) return;

    const questionName = selectedInput.name;
    const answer = formData.get(questionName);
    answered += 1;

    const selectedLabel = selectedInput.closest('.option');
    if (answer === correctAnswers[questionName]) {
      score += 25;
      if (selectedLabel) {
        selectedLabel.classList.add('correct');
      }
      if (feedbackEl) {
        feedbackEl.textContent = '¡Correcto! Buena elección.';
        feedbackEl.classList.add('success');
      }
    } else {
      hasIncorrect = true;
      if (selectedLabel) {
        selectedLabel.classList.add('incorrect');
      }
      if (feedbackEl) {
        feedbackEl.textContent = questionFeedback[questionName];
        feedbackEl.classList.add('error');
      }
    }
  });

  if (answered < Object.keys(correctAnswers).length) {
    quizResult.textContent = 'Selecciona una respuesta en todas las preguntas antes de calcular la nota.';
    quizResult.className = 'result-box error';
    if (evaluationScore) {
      evaluationScore.textContent = 'N/A';
      evaluationScore.className = 'evaluation-score warning';
    }
    return;
  }

  const scoreText = `${score} / 100`;
  quizResult.textContent = `Has obtenido ${scoreText} puntos.`;
  quizResult.className = `result-box ${score === 100 ? 'success' : 'error'}`;
  if (evaluationScore) {
    evaluationScore.textContent = scoreText;
    evaluationScore.className = `evaluation-score ${score === 100 ? 'success' : score >= 50 ? 'warning' : 'error'}`;
  }
});
