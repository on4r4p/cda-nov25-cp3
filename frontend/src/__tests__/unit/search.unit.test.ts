import { getSearchTerm, getSnippet } from "@/utils/search";

describe("search utils", () => {
  it("normalizes a string search term", () => {
    expect(getSearchTerm("  GraphQL  ")).toBe("GraphQL");
  });

  it("normalizes the first array value", () => {
    expect(getSearchTerm(["  React  ", "Node"])).toBe("React");
  });

  it("returns an empty string when no term is provided", () => {
    expect(getSearchTerm(undefined)).toBe("");
  });

  it("collapses whitespace before building a snippet", () => {
    expect(getSnippet("GraphQL   lets\n\nclients request exactly what they need.")).toBe(
      "GraphQL lets clients request exactly what they need.",
    );
  });

  it("truncates long snippets", () => {
    expect(getSnippet("a".repeat(25), 10)).toBe("aaaaaaaaaa...");
  });
});
