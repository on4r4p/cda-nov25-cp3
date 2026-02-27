import { useRouter } from "next/router";
import { type FormEvent, useEffect, useState } from "react";
import { useCreateArticleMutation, useGetCategoriesQuery } from "@/graphql/generated/schema";

export default function NewArticlePage() {
  const router = useRouter();
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const [createArticle, { loading: creatingArticle, error: createArticleError }] =
    useCreateArticleMutation();

  const [title, setTitle] = useState("");
  const [mainPictureUrl, setMainPictureUrl] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!categoryId && categoriesData?.categories.length) {
      setCategoryId(String(categoriesData.categories[0].id));
    }
  }, [categoriesData, categoryId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const trimmedTitle = title.trim();
    const trimmedMainPictureUrl = mainPictureUrl.trim();
    const trimmedBody = body.trim();
    const parsedCategoryId = Number(categoryId);

    if (!trimmedTitle || !trimmedMainPictureUrl || !trimmedBody) {
      setFormError("Please fill in title, image URL, and article body.");
      return;
    }

    if (!Number.isFinite(parsedCategoryId)) {
      setFormError("Please choose a category.");
      return;
    }

    const result = await createArticle({
      variables: {
        data: {
          title: trimmedTitle,
          mainPictureUrl: trimmedMainPictureUrl,
          body: trimmedBody,
          category: { id: parsedCategoryId },
        },
      },
    });

    const createdArticleId = result.data?.createArticle.id;

    if (createdArticleId) {
      await router.push(`/articles/${createdArticleId}`);
      return;
    }

    setFormError("Article was not created. Please try again.");
  }

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Write an article</h1>
      <p className="mt-2 text-base-content">All fields are required.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <fieldset className="fieldset" aria-describedby="title-help">
          <legend className="fieldset-legend">Title</legend>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Write your article title"
            className="input input-bordered w-full"
            required
          />
          <p id="title-help" className="text-sm text-base-content">
            Enter a clear and descriptive article title.
          </p>
        </fieldset>

        <fieldset className="fieldset" aria-describedby="image-help">
          <legend className="fieldset-legend">Main image URL</legend>
          <input
            id="main-image-url"
            type="url"
            value={mainPictureUrl}
            onChange={(event) => setMainPictureUrl(event.target.value)}
            placeholder="https://example.com/image.jpg"
            className="input input-bordered w-full"
            required
          />
          <p id="image-help" className="text-sm text-base-content">
            Provide a valid HTTPS image URL.
          </p>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Category</legend>
          <select
            id="category"
            className="select select-bordered w-full"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            disabled={categoriesLoading || !categoriesData?.categories.length}
            required
          >
            {categoriesData?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Article body</legend>
          <textarea
            id="article-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write your article content..."
            className="textarea textarea-bordered min-h-56 w-full"
            required
          />
        </fieldset>

        {categoriesError && (
          <p className="text-red-700" role="alert">
            Could not load categories.
          </p>
        )}
        {formError && (
          <p className="text-red-700" role="alert">
            {formError}
          </p>
        )}
        {createArticleError && (
          <p className="text-red-700" role="alert">
            Could not create the article.
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={creatingArticle || categoriesLoading}
        >
          {creatingArticle ? "Creating article..." : "Create article"}
        </button>
      </form>
    </main>
  );
}
