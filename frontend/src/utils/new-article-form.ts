export type NewArticleFormValues = {
  title: string;
  mainPictureUrl: string;
  body: string;
  categoryId: string;
};

export type ValidatedNewArticleFormValues = {
  title: string;
  mainPictureUrl: string;
  body: string;
  categoryId: number;
};

export function validateNewArticleForm(values: NewArticleFormValues): {
  data: ValidatedNewArticleFormValues | null;
  error: string | null;
} {
  const title = values.title.trim();
  const mainPictureUrl = values.mainPictureUrl.trim();
  const body = values.body.trim();
  const normalizedCategoryId = values.categoryId.trim();
  const categoryId = Number(values.categoryId);

  if (!title || !mainPictureUrl || !body) {
    return {
      data: null,
      error: "Please fill in title, image URL, and article body.",
    };
  }

  if (!normalizedCategoryId || !Number.isInteger(categoryId) || categoryId <= 0) {
    return {
      data: null,
      error: "Please choose a category.",
    };
  }

  return {
    data: {
      title,
      mainPictureUrl,
      body,
      categoryId,
    },
    error: null,
  };
}
