const app = document.getElementById("app");

let selectedCharacter = null;

let messages = [];


// =====================
// VISTAS
// =====================

function renderHome() {
  app.innerHTML = `
    <section class="home">

      <div class="home__container">

        <h1 class="home__title">
          Elige con quién hablar
        </h1>

        <div class="home__characters">

          <article
            class="character-card"
            data-character="chavo"
          >
          <img src="./images/chavo.png" alt="El Chavo" class="character-card__image" />
            <h2>El Chavo</h2>
            <p>Inocente, distraído y muy divertido.</p>
          </article>

          <article
            class="character-card"
            data-character="chilindrina"
          >
          <img src="./images/chilindrina.png" alt="La Chilindrina" class="character-card__image" />
            <h2>La Chilindrina</h2>
            <p>Traviesa e inteligente.</p>
          </article>

          <article
            class="character-card"
            data-character="quico"
          >
          <img src="./images/quico.png" alt="Quico" class="character-card__image" />
            <h2>Quico</h2>
            <p>Consentido y presumido.</p>
          </article>

        </div>

        <button
          id="go-chat"
          class="home__button"
          disabled
        >
          Comenzar conversación
        </button>

      </div>

    </section>
  `;

  setupCharacterSelection();
}

function setupCharacterSelection() {
  const cards = document.querySelectorAll(".character-card");
  const button = document.getElementById("go-chat");

  cards.forEach(card => {

    card.addEventListener("click", () => {

      cards.forEach(c =>
        c.classList.remove("character-card--selected")
      );

      card.classList.add("character-card--selected");

      selectedCharacter =
        card.dataset.character;

      button.disabled = false;
    });
  });

  button.addEventListener("click", () => {
    navigateTo("/chat");
  });
}


function renderChat() {

  let name = "";

  switch (selectedCharacter) {
    case "chavo":
      name = "El Chavo";
      break;

    case "chilindrina":
      name = "La Chilindrina";
      break;

    case "quico":
      name = "Quico";
      break;
  }

function setupChat() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);

    input.value = "";



    // Simulación de respuesta
    setTimeout(() => {
      addMessage("bot", getFakeResponse());
    }, 500);
  });

  renderMessages();
}

app.innerHTML = `
  <section class="chat">

    <header class="chat__header">
      <h2>${name}</h2>
    </header>

    <div id="messages" class="chat__messages"></div>

    <form id="chat-form" class="chat__input-area">
      <input
        id="chat-input"
        type="text"
        placeholder="Escribe un mensaje..."
        required
      >
      <button type="submit">Enviar</button>
    </form>

  </section>
`;

  setupChat();
}

function renderMessages() {
  const container = document.getElementById("messages");

  if (!container) return;

  container.innerHTML = messages.map(msg => `
    <div class="message message--${msg.sender}">
      ${msg.text}
    </div>
  `).join("");

  container.scrollTop = container.scrollHeight;}

function addMessage(sender, text) {
  messages.push({ sender, text });
  renderMessages();
}

function getFakeResponse() {
  switch (selectedCharacter) {
    case "chavo":
      return "Fue sin querer queriendo...";
    case "chilindrina":
      return "¡Fíjate, fíjate!";
    case "quico":
      return "¡Cállate, cállate!";
    default:
      return "Hola!";
  }
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

  let path = window.location.pathname;

  if (path === "/index.html") {
    path = "/";
  }
  


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

// MENÚ HAMBURGUESA

const hamburgerBtn =
  document.getElementById("hamburger-btn");

const navLinks =
  document.querySelector(".navbar__links");

hamburgerBtn?.addEventListener("click", () => {
  navLinks.classList.toggle(
    "navbar__links--active"
  );
});
// =====================
// INICIO
// =====================

router();

