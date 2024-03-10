import { type PluralHandler, translate } from "./translate";

describe("Testing translate substitution", () => {
  const messages = {
    "Hello world": "Bonjour monde",
    "Hello {name}": "Bonjour {name}",
    "Current year: {year}": "Année courante: {year}",
  } as const;

  const plural: PluralHandler = (n) => (n === 1 ? "one" : "other");

  it("should translate from messages", () => {
    const t = translate(messages, plural);
    const year = new Date().getFullYear();

    expect(t("Current year: {year}", { year })).toBe(`Année courante: ${year}`);

    expect(t("Hello world")).toBe("Bonjour monde");

    expect(t("Hello {name}", { name: "John" })).toBe("Bonjour John");

    // @ts-expect-error - Will require a second parameter
    expect(t("Current year: {year}")).toBe("Année courante: ?year");

    // @ts-expect-error - Will require a second parameter
    expect(t("Hello {name}", { foo: 1 })).toBe("Bonjour ?name");
  });
});
