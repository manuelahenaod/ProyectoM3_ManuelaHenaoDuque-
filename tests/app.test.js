import { describe, it, expect, beforeEach, vi } from "vitest";

// mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ reply: "Hola" })
  })
);

beforeEach(() => {
  vi.resetModules();

  document.body.innerHTML = `<div id="app"></div>`;
  localStorage.clear();
});

describe("app.js", () => {

  it("muestra el título de home", async () => {
    const { router } = await import("../app.js");

    window.history.pushState({}, "", "/home");
    router();

    const title = document.querySelector(".home__title");

    expect(title).toBeTruthy();
    expect(title.textContent).toContain("Vecindad");
  });

  it("permite seleccionar un personaje", async () => {
    const { router } = await import("../app.js");

    window.history.pushState({}, "", "/home");
    router();

    const card = document.querySelector('[data-character="chavo"]');

    card.click();

    expect(card.classList.contains("character-card--selected")).toBe(true);
  });

});
