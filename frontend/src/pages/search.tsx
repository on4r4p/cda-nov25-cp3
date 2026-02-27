import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchArticlesQuery } from "@/graphql/generated/schema";

function getSearchTerm(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return (value[0] ?? "").trim();
  }

  return "";
}

function getSnippet(body: string, maxLength = 180): string {
  const compactBody = body.replace(/\s+/g, " ").trim();

  if (compactBody.length <= maxLength) {
    return compactBody;
  }

  return `${compactBody.slice(0, maxLength).trim()}...`;
}

export default function SearchPage() {
  const router = useRouter();
  const searchTerm = getSearchTerm(router.query.title);
  const skip = !router.isReady || searchTerm.length === 0;

  const { data, loading, error } = useSearchArticlesQuery({
    variables: { title: searchTerm || undefined },
    skip,
  });

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">Search results</h1>

      {searchTerm ? (
        <p className="mt-2 text-base-content">
          Results for: <span className="font-semibold">{searchTerm}</span>
        </p>
      ) : (
        <p className="mt-2 text-base-content">Type a search term in the header search box.</p>
      )}

      {loading && (
        <p className="mt-6" aria-live="polite">
          Searching articles...
        </p>
      )}

      {error && (
        <p className="mt-6 text-red-700" role="alert">
          Could not load search results.
        </p>
      )}

      {!skip && !loading && !error && data?.articles.length === 0 && (
        <p className="mt-6" aria-live="polite">
          No articles found.
        </p>
      )}

      {!skip && !loading && !error && (data?.articles.length ?? 0) > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-6" aria-label="Search results list">
          {data?.articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/articles/${article.id}`}
                className="grid grid-cols-1 gap-4 rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:shadow-md sm:grid-cols-[200px_1fr]"
              >
                <div className="relative h-36 w-full overflow-hidden rounded-lg">
                  <Image
                    src={article.mainPictureUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <p className="mt-1 text-sm text-base-content">
                    Category: {article.category?.name ?? "Uncategorized"}
                  </p>
                  <p className="mt-3 text-base-content">{getSnippet(article.body)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
