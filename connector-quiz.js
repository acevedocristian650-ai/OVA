const quizQuestions = [
  {
    sentence: 'I finished my homework, _______, I went out to play.',
    options: ['then', 'in fact', 'moreover'],
    answer: 'then',
    explanation: 'then se usa para indicar la siguiente acción en una secuencia de eventos.',
  },
  {
    sentence: 'She buy an icecream; _______, give it to her mom.',
    options: ['and', 'therefore', 'meanwhile'],
    answer: 'and',
    explanation: 'and se usa para conectar ideas similares o adicionar información.',
  },
  {
    sentence: 'We _______, enjoy the concert last night.',
    options: ['definitely', 'however', 'for example'],
    answer: 'definitely',
    explanation: 'definitely se usa para enfatizar que lo que sigue es cierto o especialmente importante.',
  },
  {
    sentence: 'After waiting for hours we; _______, got on the bus.',
    options: ['finally', 'additionally', 'instead'],
    answer: 'finally',
    explanation: 'finally se usa para indicar que algo ha sucedido después de un tiempo o después de una espera.',
  },
  {
    sentence: 'She is an excellent teacher;_______, she is a great mentor.',
    options: ['moreover', 'On the other hand', 'Finally'],
    answer: 'moreover',
    explanation: 'moreover se utiliza para añadir información adicional que apoya un punto.',
  },
];

function initConnectorQuiz() {
  const container = document.getElementById('connector-quiz');
  container.innerHTML = '';

  quizQuestions.forEach((question, index) => {
    const card = document.createElement('div');
    card.className = 'quiz-card-item';

    const prompt = document.createElement('p');
    prompt.className = 'quiz-question';
    prompt.textContent = `${index + 1}. ${question.sentence}`;

    const options = document.createElement('div');
    options.className = 'quiz-options';

    question.options.forEach((option) => {
      const label = document.createElement('label');
      label.className = 'quiz-option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question-${index}`;
      input.value = option;

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      options.appendChild(label);
    });

    const explanation = document.createElement('p');
    explanation.className = 'quiz-explanation';
    explanation.style.display = 'none';

    card.appendChild(prompt);
    card.appendChild(options);
    card.appendChild(explanation);
    container.appendChild(card);
  });
}

function checkConnectorQuiz() {
  const feedback = document.getElementById('quiz-activity-feedback');
  const selectedAnswers = quizQuestions.map((question, index) => {
    const answer = document.querySelector(`input[name="question-${index}"]:checked`);
    return answer ? answer.value : null;
  });

  if (selectedAnswers.some((answer) => answer === null)) {
    feedback.textContent = 'Necesitas seleccionar una opción en todas las preguntas.';
    feedback.className = 'result-box error';
    feedback.style.display = 'block';
    return;
  }

  let correctCount = 0;

  quizQuestions.forEach((question, index) => {
    const card = document.querySelectorAll('.quiz-card-item')[index];
    const explanation = card.querySelector('.quiz-explanation');
    const inputs = card.querySelectorAll('input[type="radio"]');
    const selected = selectedAnswers[index];

    inputs.forEach((input) => {
      const label = input.closest('label');
      label.classList.remove('correct', 'incorrect');
      if (input.value === question.answer) {
        label.classList.add('correct');
      }
      if (input.checked && input.value !== question.answer) {
        label.classList.add('incorrect');
      }
    });

    if (selected === question.answer) {
      correctCount++;
      explanation.textContent = `Correcto. ${question.explanation}`;
      explanation.className = 'quiz-explanation success';
    } else {
      explanation.textContent = `Incorrecto. La respuesta correcta es "${question.answer}". ${question.explanation}`;
      explanation.className = 'quiz-explanation error';
    }
    explanation.style.display = 'block';
  });

  if (correctCount === quizQuestions.length) {
    feedback.textContent = `✓ ¡Excelente! Has respondido correctamente ${correctCount}/${quizQuestions.length}.`;
    feedback.className = 'result-box success';
  } else {
    feedback.textContent = `Obtuviste ${correctCount}/${quizQuestions.length}. Revisa las explicaciones y vuelve a intentarlo.`;
    feedback.className = 'result-box error';
  }
  feedback.style.display = 'block';
}

document.getElementById('check-quiz').addEventListener('click', checkConnectorQuiz);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConnectorQuiz);
} else {
  initConnectorQuiz();
}
