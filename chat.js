let isTyping = false;

const savedMessages =
  localStorage.getItem("chat-history");

const messages =
  savedMessages
    ? JSON.parse(savedMessages)
    : {};

export function setupChat(selectedCharacter) {

  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const clearButton = document.getElementById("clear-chat");

  clearButton?.addEventListener("click", () => {
    console.log("Borrando:", selectedCharacter);
  clearChatHistory(selectedCharacter);
  renderMessages(selectedCharacter);
});

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
};
  

function renderMessages(selectedCharacter) {
  const container = document.getElementById("messages");
  console.log("Container:", container);
  console.log("Personaje:", selectedCharacter);
  console.log("Historial:", messages[selectedCharacter]);
  if (!container) return;

  const chat = messages[selectedCharacter] || [];

  let html = chat.map(msg => `
    <div class="message message--${msg.sender}">
      <p>${msg.text}</p>
      <small>${msg.timestamp}</small>
    </div>
  `).join("");

  if (isTyping) {
    html += `
      <div class="message message--bot typing">
        <span></span>
        <span></span>
        <span></span>
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
  messages[character].push({
    sender,
    text,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  });
  localStorage.setItem(
    "chat-history",
    JSON.stringify(messages)
  );

  renderMessages(character);
}

export function clearChatHistory(character) {
  messages[character] = [];
  localStorage.setItem(
    "chat-history",
    JSON.stringify(messages)
  );
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
