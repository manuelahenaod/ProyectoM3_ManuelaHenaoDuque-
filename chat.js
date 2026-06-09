let messages = {};
let isTyping = false;

export function setupChat(selectedCharacter) {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    addMessage(selectedCharacter, "user", text);
    input.value = "";

    isTyping = true;
    renderMessages(selectedCharacter);

    setTimeout(() => {
      isTyping = false;
      addMessage(selectedCharacter, "bot", getFakeResponse(selectedCharacter));
    }, 1200);
  });

  renderMessages(selectedCharacter);
}

function renderMessages(selectedCharacter) {
  const container = document.getElementById("messages");
  if (!container) return;

  const chat = messages[selectedCharacter] || [];

  let html = chat.map(msg => `
    <div class="message message--${msg.sender}">
      ${msg.text}
    </div>
  `).join("");

  if (isTyping) {
    html += `
      <div class="message message--bot typing">
        ${getCharacterName(selectedCharacter)} está escribiendo...
      </div>
    `;
  }

  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

function addMessage(character, sender, text) {
  if (!messages[character]) {
    messages[character] = [];
  }

  messages[character].push({ sender, text });
  renderMessages(character);
}

function getFakeResponse(character) {
  switch (character) {
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

function getCharacterName(character) {
  switch (character) {
    case "chavo": return "El Chavo";
    case "chilindrina": return "La Chilindrina";
    case "quico": return "Quico";
    default: return "Bot";
  }
}