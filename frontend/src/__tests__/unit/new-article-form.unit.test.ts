import { validateNewArticleForm } from "@/utils/new-article-form";

describe("validateNewArticleForm", () => {
  it("returns normalized values when the form is valid", () => {
    expect(
      validateNewArticleForm({
        title: "  A title  ",
        mainPictureUrl: "  https://example.com/image.jpg  ",
        body: "  Body content  ",
        categoryId: "4",
      }),
    ).toEqual({
      data: {
        title: "A title",
        mainPictureUrl: "https://example.com/image.jpg",
        body: "Body content",
        categoryId: 4,
      },
      error: null,
    });
  });

  it("rejects missing required fields", () => {
    expect(
      validateNewArticleForm({
        title: " ",
        mainPictureUrl: "https://example.com/image.jpg",
        body: "Body content",
        categoryId: "4",
      }),
    ).toEqual({
      data: null,
      error: "Please fill in title, image URL, and article body.",
    });
  });

  it("rejects an invalid category", () => {
    expect(
      validateNewArticleForm({
        title: "A title",
        mainPictureUrl: "https://example.com/image.jpg",
        body: "Body content",
        categoryId: "",
      }),
    ).toEqual({
      data: null,
      error: "Please choose a category.",
    });
  });
});
