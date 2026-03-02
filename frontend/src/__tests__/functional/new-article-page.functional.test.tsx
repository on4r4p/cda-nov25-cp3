import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { useCreateArticleMutation, useGetCategoriesQuery } from "@/graphql/generated/schema";
import NewArticlePage from "@/pages/articles/new";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/graphql/generated/schema", () => ({
  useCreateArticleMutation: jest.fn(),
  useGetCategoriesQuery: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;
const mockedUseCreateArticleMutation = useCreateArticleMutation as jest.Mock;
const mockedUseGetCategoriesQuery = useGetCategoriesQuery as jest.Mock;

describe("NewArticlePage", () => {
  it("shows a validation error when required fields are missing", async () => {
    const createArticleMock = jest.fn();

    mockedUseRouter.mockReturnValue({
      push: jest.fn(),
    });
    mockedUseGetCategoriesQuery.mockReturnValue({
      data: { categories: [{ id: 1, name: "React" }] },
      loading: false,
      error: undefined,
    });
    mockedUseCreateArticleMutation.mockReturnValue([
      createArticleMock,
      { loading: false, error: undefined },
    ]);

    const user = userEvent.setup();

    render(<NewArticlePage />);

    await user.type(screen.getByLabelText("Title"), "   ");
    await user.type(screen.getByLabelText("Main image URL"), "https://example.com/image.jpg");
    await user.type(screen.getByLabelText("Article body"), "   ");
    await user.click(screen.getByRole("button", { name: "Create article" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please fill in title, image URL, and article body.",
    );
    expect(createArticleMock).not.toHaveBeenCalled();
  });

  it("creates an article and redirects to the detail page", async () => {
    const pushMock = jest.fn();
    const createArticleMock = jest.fn().mockResolvedValue({
      data: { createArticle: { id: 42 } },
    });

    mockedUseRouter.mockReturnValue({
      push: pushMock,
    });
    mockedUseGetCategoriesQuery.mockReturnValue({
      data: {
        categories: [
          { id: 1, name: "React" },
          { id: 2, name: "TypeScript" },
        ],
      },
      loading: false,
      error: undefined,
    });
    mockedUseCreateArticleMutation.mockReturnValue([
      createArticleMock,
      { loading: false, error: undefined },
    ]);

    const user = userEvent.setup();

    render(<NewArticlePage />);

    await user.type(screen.getByLabelText("Title"), "  Test article  ");
    await user.type(screen.getByLabelText("Main image URL"), "  https://example.com/article.jpg  ");
    await user.selectOptions(screen.getByLabelText("Category"), "2");
    await user.type(screen.getByLabelText("Article body"), "  Some body text.  ");
    await user.click(screen.getByRole("button", { name: "Create article" }));

    await waitFor(() => {
      expect(createArticleMock).toHaveBeenCalledWith({
        variables: {
          data: {
            title: "Test article",
            mainPictureUrl: "https://example.com/article.jpg",
            body: "Some body text.",
            category: { id: 2 },
          },
        },
      });
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/articles/42");
    });
  });
});
