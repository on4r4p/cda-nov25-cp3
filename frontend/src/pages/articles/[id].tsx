import Image from "next/image";
import { useRouter } from "next/router";
import { useGetArticleByIdQuery } from "@/graphql/generated/schema";

function formatUpdatedAt(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export default function ArticleDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const shouldSkip = !router.isReady || !Number.isFinite(articleId);

  const { data, loading, error } = useGetArticleByIdQuery({
    variables: { id: articleId },
    skip: shouldSkip,
  });

  if (!router.isReady || loading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p>Chargement de l&apos;article...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p className="text-red-600">Impossible de charger l&apos;article.</p>
      </main>
    );
  }

  const article = data?.article;

  if (!article) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p>Article introuvable.</p>
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
            {article.category?.name ?? "Non classé"}
          </p>
          <p>
            <span className="font-semibold">Last update:</span>{" "}
            {formatUpdatedAt(String(article.updatedAt))}
          </p>
        </div>

        <div className="relative h-64 w-full overflow-hidden rounded-xl border border-base-300 sm:h-96">
          <Image
            src={article.mainPictureUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>

        <p className="whitespace-pre-line leading-7">{article.body}</p>
      </article>
    </main>
  );
}
