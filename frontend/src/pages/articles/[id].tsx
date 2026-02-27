import Image from "next/image";
import { useRouter } from "next/router";
import { useDeleteArticleMutation, useGetArticleByIdQuery } from "@/graphql/generated/schema";

function formatUpdatedAt(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export default function ArticleDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const shouldSkip = !router.isReady || !Number.isFinite(articleId);
  const [deleteArticle, { loading: deletingArticle, error: deleteArticleError }] = useDeleteArticleMutation();

  const { data, loading, error } = useGetArticleByIdQuery({
    variables: { id: articleId },
    skip: shouldSkip,
  });

  if (!router.isReady || loading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p>Loading article...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p className="text-red-600">Could not load the article.</p>
      </main>
    );
  }

  const article = data?.article;

  async function handleDeleteArticle() {
    if (!article) {
      return;
    }

    const shouldDelete = window.confirm("Are you sure you would like to delete this article ?");

    if (!shouldDelete) {
      return;
    }

    const result = await deleteArticle({
      variables: { id: article.id },
    });

    if (result.data?.deleteArticle) {
      await router.push("/");
    }
  }

  if (!article) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p>Article not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <article className="space-y-6">
        <h1 className="text-3xl font-bold">{article.title}</h1>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-base-content/80">
          <p>
            <span className="font-semibold">Category:</span>{" "}
            {article.category?.name ?? "Uncategorized"}
          </p>
          <p>
            <span className="font-semibold">Last update:</span>{" "}
            {formatUpdatedAt(String(article.updatedAt))}
          </p>
        </div>

        <div className="relative h-64 w-full overflow-hidden rounded-xl border border-base-300 bg-base-200 sm:h-96">
          <Image
            src={article.mainPictureUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-contain"
            priority
          />
        </div>

        <p className="whitespace-pre-line leading-7">{article.body}</p>

        <div>
          <button type="button" className="btn btn-error" onClick={handleDeleteArticle} disabled={deletingArticle}>
            {deletingArticle ? "Deleting article..." : "Delete this article"}
          </button>
          {deleteArticleError && <p className="mt-2 text-red-600">Could not delete this article.</p>}
        </div>
      </article>
    </main>
  );
}
