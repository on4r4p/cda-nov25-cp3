import Image from "next/image";
import { useGetHomeArticlesQuery } from "@/graphql/generated/schema";

export default function Home() {
  const { data, loading, error } = useGetHomeArticlesQuery();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">Last news</h1>

      {loading && <p className="mt-4">Loading news</p>}

      {error && <p className="mt-4 text-red-600">Can't load news.</p>}

      {!loading && !error && (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data?.articles.map((article) => (
            <li
              key={article.id}
              className="overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={article.mainPictureUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h2 className="p-4 text-lg font-semibold">{article.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
