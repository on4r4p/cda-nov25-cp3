import { formatUpdatedAt } from "@/utils/article-format";

describe("formatUpdatedAt", () => {
  it("formats a valid date consistently", () => {
    const date = "2026-02-10T14:30:00.000Z";

    expect(formatUpdatedAt(date)).toBe(
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(date)),
    );
  });

  it("returns the raw value for an invalid date", () => {
    expect(formatUpdatedAt("not-a-date")).toBe("not-a-date");
  });
});
