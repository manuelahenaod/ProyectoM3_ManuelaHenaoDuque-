const app = document.getElementById("app");
import { setupChat } from "./chat.js";

let selectedCharacter = null;

let messages =  {};

let isTyping = false;

// =====================
// VISTAS
// =====================

function getCharacter() {
  return localStorage.getItem("character");
}

function renderHome() {
  document.querySelector(".footer")?.classList.remove("footer--hidden");
  app.innerHTML = `
    <section class="home">

      <div class="home__container">

        <h1 class="home__title">
          Bienvenido a la
          <span>Vecindad del Chavo!</span>
        </h1>

        <div class="home__card">
          <p class="home__description">
          Un chat interactivo donde puedes conversar con los personajes más queridos de la serie. Cada uno con su propia personalidad, estilo de conversación y forma única de responder.
          Explora, conversa y diviértete como si estuvieras dentro del universo del Chavo del 8.
          <strong>¡Elige tu personaje favorito y comienza a chatear! </strong>
          </p>
        </div>

        <div class="home__characters">

          <article
            class="character-card"
            data-character="chavo"
          >
          <img src="./images/chavoperfil.png" alt="El Chavo" class="character-card__image" />
            <h2>El Chavo</h2>
            <p>Inocente, distraído y muy divertido.</p>
          </article>

          <article
            class="character-card"
            data-character="chilindrina"
          >
          <img src="./images/chilindrinaperfil.png" alt="La Chilindrina" class="character-card__image" />
            <h2>La Chilindrina</h2>
            <p>Traviesa e inteligente.</p>
          </article>

          <article
            class="character-card"
            data-character="quico"
          >
          <img src="./images/quicoperfil.png" alt="Quico" class="character-card__image" />
            <h2>Quico</h2>
            <p>Consentido y presumido.</p>
          </article>

        </div>

        <button
          id="go-chat"
          class="home__button"
          disabled
        >
          Conversar
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

      const character = card.dataset.character;
      selectedCharacter = character;
      localStorage.setItem("character", character);

      button.disabled = false;
      button.classList.add("home__button--visible");
      card.appendChild(button);
        } 
    );
  });


  button.addEventListener("click", () => {
    navigateTo("/chat");
  });
}


function renderChat() {
  document.querySelector(".footer")?.classList.add("footer--hidden");
  const storedCharacter = getCharacter();

  if (!selectedCharacter && !storedCharacter) {
    selectedCharacter = "chavo";
  } else {
    selectedCharacter = selectedCharacter || storedCharacter;
  }

  const isDefault = !storedCharacter;

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
    default:
      name = "El Chavo";
  }

  app.innerHTML = `
    <section class="chat">

      <header class="chat__header">
        <h2 class="chat__title">${name}</h2>
      </header>

      <div id="messages" class="chat__messages"></div>

      <form id="chat-form" class="chat__input-area">
        <input
          id="messageInput"
          name="message"
          type="text"
          autocomplete="off"
          enterkeyhint="send"
          placeholder="Escribe un mensaje..."
        >
        <button type="submit">➤</button>
        <button type="button" id="clear-chat">🗑</button>
      </form>

    </section>
  `;

  setupChat(selectedCharacter, { isDefault });
}



function renderAbout() {
 document.querySelector(".footer")?.classList.remove("footer--hidden");
 app.innerHTML = `
  <section class="about">

    <div class="about__card">

      <h1 class="about__title">
        Chat con personajes usando IA
      </h1>

      <p class="about__intro">
        Una prueba de concepto desarrollada en <strong>ComicSansCon</strong> 
        para explorar experiencias conversacionales con personajes ficticios.
      </p>

      <p>
        Esta SPA permite interactuar con personajes inspirados en 
        <strong>El Chavo del 8</strong>, cada uno con su propia personalidad, 
        simulando conversaciones naturales mediante inteligencia artificial.
      </p>

      <div class="about__tags">
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>SPA Routing</span>
        <span>AI</span>
      </div>

    </div>

  </section>
`;
}

function renderNotFound() {
  app.innerHTML = `
    <section class="notfound">

      <h1>404</h1>
      <p>Página no encontrada</p>

      <button onclick="location.href='/home'">
        Volver al inicio
      </button>

    </section>
  `;
}

// =====================
// ROUTER
// =====================

export function router() {
  let path = window.location.pathname;

  if (path === "/index.html") {
    path = "/";
  }

  const routes = {
    "/": renderHome,
    "/home": renderHome,
    "/chat": renderChat,
    "/about": renderAbout
  };

  const render = routes[path];

  if (render) {
    render();
  } else {
    renderNotFound();
  }
}

// =====================
// NAVEGACIÓN
// =====================

function navigateTo(path) {
  navLinks?.classList.remove("navbar__links--active");
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
export function initApp() {
  router();
}

