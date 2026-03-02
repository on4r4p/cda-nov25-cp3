import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSearchArticlesQuery } from "@/graphql/generated/schema";
import SearchPage from "@/pages/search";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/graphql/generated/schema", () => ({
  useSearchArticlesQuery: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;
const mockedUseSearchArticlesQuery = useSearchArticlesQuery as jest.Mock;

describe("SearchPage", () => {
  it("renders trimmed search results", () => {
    mockedUseRouter.mockReturnValue({
      query: { title: "  GraphQL  " },
      isReady: true,
    });
    mockedUseSearchArticlesQuery.mockReturnValue({
      data: {
        articles: [
          {
            id: 10,
            title: "Building a GraphQL API with Apollo Server",
            body: "GraphQL   gives clients exactly\nwhat they need.",
            mainPictureUrl: "https://example.com/graphql.jpg",
            category: { name: "Node.js" },
          },
        ],
      },
      loading: false,
      error: undefined,
    });

    render(<SearchPage />);

    expect(screen.getByText("GraphQL")).toBeVisible();
    expect(
      screen.getByRole("link", { name: /Building a GraphQL API with Apollo Server/i }),
    ).toBeVisible();
    expect(screen.getByText("GraphQL gives clients exactly what they need.")).toBeVisible();
  });
});
