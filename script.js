const módulos = {
  1: {
    título: "Introducción al OVA",
    texto: "En este módulo revisamos qué es un Objeto Virtual de Aprendizaje y cómo estructurar el contenido para el estudiante.",
    actividad: true,
  },
  2: {
    título: "Contenido y ejemplos",
    texto: "Este módulo presenta ejemplos prácticos, recursos multimedia y recomendaciones para organizar tus temas.",
    actividad: false,
  },
  3: {
    título: "Evaluación interactiva",
    texto: "Aquí encontrarás una pequeña evaluación y un sistema de retroalimentación rápida para medir la comprensión.",
    actividad: true,
  },
};

const contenidoTitulo = document.getElementById("contenido-titulo");
const contenidoTexto = document.getElementById("contenido-texto");
const actividadCard = document.getElementById("actividad");
const verificarBotón = document.getElementById("verificar");
const feedback = document.getElementById("feedback");
const respuestaInput = document.getElementById("respuesta");

const botonesMódulo = document.querySelectorAll(".card-button");
botonesMódulo.forEach((botón) => {
  botón.addEventListener("click", () => {
    const móduloId = botón.dataset.module;
    mostrarMódulo(móduloId);
  });
});

function mostrarMódulo(id) {
  const módulo = módulos[id];
  if (!módulo) return;

  contenidoTitulo.textContent = módulo.título;
  contenidoTexto.textContent = módulo.texto;

  if (módulo.actividad) {
    actividadCard.classList.remove("hidden");
    feedback.textContent = "";
    feedback.className = "feedback";
    respuestaInput.value = "";
  } else {
    actividadCard.classList.add("hidden");
  }
}

verificarBotón.addEventListener("click", () => {
  const respuesta = respuestaInput.value.trim().toLowerCase();
  if (!respuesta) {
    feedback.textContent = "Escribe una respuesta antes de verificar.";
    feedback.className = "feedback error";
    return;
  }

  if (respuesta === "madrid") {
    feedback.textContent = "¡Correcto! Madrid es la capital de España.";
    feedback.className = "feedback success";
  } else {
    feedback.textContent = "No es correcto. Revisa el tema y vuelve a intentarlo.";
    feedback.className = "feedback error";
  }
});
