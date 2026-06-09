export function getFakeResponse(character) {
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


export function formatTimestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}