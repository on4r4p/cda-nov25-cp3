import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { useDeleteArticleMutation, useGetArticleByIdQuery } from "@/graphql/generated/schema";
import ArticleDetailsPage from "@/pages/articles/[id]";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/graphql/generated/schema", () => ({
  useDeleteArticleMutation: jest.fn(),
  useGetArticleByIdQuery: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;
const mockedUseDeleteArticleMutation = useDeleteArticleMutation as jest.Mock;
const mockedUseGetArticleByIdQuery = useGetArticleByIdQuery as jest.Mock;

describe("ArticleDetailsPage", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("deletes the current article after confirmation", async () => {
    const pushMock = jest.fn();
    const deleteArticleMock = jest.fn().mockResolvedValue({
      data: { deleteArticle: true },
    });

    mockedUseRouter.mockReturnValue({
      query: { id: "7" },
      isReady: true,
      push: pushMock,
    });
    mockedUseGetArticleByIdQuery.mockReturnValue({
      data: {
        article: {
          id: 7,
          title: "Testing article details",
          category: { name: "React" },
          updatedAt: "2026-02-10T14:30:00.000Z",
          mainPictureUrl: "https://example.com/article.jpg",
          body: "Article body",
        },
      },
      loading: false,
      error: undefined,
    });
    mockedUseDeleteArticleMutation.mockReturnValue([
      deleteArticleMock,
      { loading: false, error: undefined },
    ]);
    jest.spyOn(window, "confirm").mockReturnValue(true);

    const user = userEvent.setup();

    render(<ArticleDetailsPage />);

    await user.click(screen.getByRole("button", { name: "Delete this article" }));

    await waitFor(() => {
      expect(deleteArticleMock).toHaveBeenCalledWith({
        variables: { id: 7 },
      });
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  it("does not delete the article when the confirmation is cancelled", async () => {
    const deleteArticleMock = jest.fn();

    mockedUseRouter.mockReturnValue({
      query: { id: "7" },
      isReady: true,
      push: jest.fn(),
    });
    mockedUseGetArticleByIdQuery.mockReturnValue({
      data: {
        article: {
          id: 7,
          title: "Testing article details",
          category: { name: "React" },
          updatedAt: "2026-02-10T14:30:00.000Z",
          mainPictureUrl: "https://example.com/article.jpg",
          body: "Article body",
        },
      },
      loading: false,
      error: undefined,
    });
    mockedUseDeleteArticleMutation.mockReturnValue([
      deleteArticleMock,
      { loading: false, error: undefined },
    ]);
    jest.spyOn(window, "confirm").mockReturnValue(false);

    const user = userEvent.setup();

    render(<ArticleDetailsPage />);

    await user.click(screen.getByRole("button", { name: "Delete this article" }));

    expect(deleteArticleMock).not.toHaveBeenCalled();
  });
});
