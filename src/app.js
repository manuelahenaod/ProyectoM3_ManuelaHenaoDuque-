const app = document.getElementById("app");

// =====================
// VISTAS
// =====================

function renderHome() {
  app.innerHTML = `
    <section class="home">
      <h1 class="home__title">
        ¡Bienvenido a la vecindad!
      </h1>

      <p>
        Conversa con El Chavo del 8 y descubre sus historias,
        ocurrencias y aventuras.
      </p>

      <button id="go-chat">
        Empezar a chatear
      </button>
    </section>
  `;

  document
    .getElementById("go-chat")
    ?.addEventListener("click", () => {
      navigateTo("/chat");
    });
}

function renderChat() {
  app.innerHTML = `
    <section class="chat">

      <div class="messages" id="messages">
      </div>

      <form class="chat-form">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
        >

        <button type="submit">
          Enviar
        </button>
      </form>

    </section>
  `;
}

function renderAbout() {
  app.innerHTML = `
    <section class="about">

      <h1>Acerca del proyecto</h1>

      <p>
        SPA desarrollada con JavaScript,
        HTML y CSS utilizando Google Gemini AI.
      </p>

      <p>
        Personaje: El Chavo del 8.
      </p>

    </section>
  `;
}

// =====================
// ROUTER
// =====================

function router() {
  const path = window.location.pathname;

  switch (path) {
    case "/":
    case "/home":
      renderHome();
      break;

    case "/chat":
      renderChat();
      break;

    case "/about":
      renderAbout();
      break;

    default:
      app.innerHTML = `
        <h1>404</h1>
        <p>Página no encontrada.</p>
      `;
  }
}

// =====================
// NAVEGACIÓN
// =====================

function navigateTo(path) {
  history.pushState({}, "", path);
  router();
}

// =====================
// EVENTOS NAVBAR
// =====================

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-href]");

  if (!link) return;

  event.preventDefault();

  navigateTo(link.dataset.href);
});

// =====================
// BOTONES ATRÁS/ADELANTE
// =====================

window.addEventListener("popstate", router);

// =====================
// INICIO
// =====================

router();