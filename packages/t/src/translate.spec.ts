import { translate } from "./translate";

describe("Testing translate substitution", () => {
  const messages = {
    "Hello world": "Bonjour monde",
    "Hello {name}": "Bonjour {name}",
    "Current year: {year}": "Année courante: {year}",

    // plural message
    "{items} items": {
      one: "1 item",
      other: "{items} items",
    },
  } as const;

  it("should translate from messages", () => {
    const t = translate(messages);
    const year = new Date().getFullYear();

    expect(t("Current year: {year}", { year })).toBe(`Année courante: ${year}`);

    expect(t("Hello world")).toBe("Bonjour monde");

    expect(t("Hello {name}", { name: "John" })).toBe("Bonjour John");

    // @ts-expect-error - Will require a second parameter
    expect(t("Current year: {year}")).toBe("Année courante: ?year");

    // @ts-expect-error - Will require a second parameter
    expect(t("Hello {name}", { foo: 1 })).toBe("Bonjour ?name");
  });

  it("should translate plural message", () => {
    const t = translate(messages);

    expect(t("{items} items", { items: 1, plurality: "one" })).toBe("1 item");

    expect(t("{items} items", { items: 10, plurality: "other" })).toBe(
      "10 items"
    );

    // defaults to "other"
    expect(t("{items} items", { items: 99 })).toBe("99 items");
  });
});
