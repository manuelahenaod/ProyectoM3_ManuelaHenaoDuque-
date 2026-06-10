import { describe, it, expect } from "vitest";
import { isValidMessage, formatTimestamp } from "../utils.js";

describe("utils", () => {

  it("valida mensajes correctos", () => {
    expect(isValidMessage("hola")).toBe(true);
  });

  it("rechaza mensajes vacíos", () => {
    expect(isValidMessage("")).toBe(false);
  });

  it("genera timestamp", () => {
    const result = formatTimestamp();
    expect(typeof result).toBe("string");
  });

});