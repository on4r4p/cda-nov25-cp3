// @ts-nocheck
import { gql } from "@apollo/client";
import type * as ApolloReactCommon from "@apollo/client/react";
import * as ApolloReactHooks from "@apollo/client/react";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTimeISO: { input: any; output: any };
};

export type Article = {
  __typename?: "Article";
  body: Scalars["String"]["output"];
  category: Category;
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["Float"]["output"];
  mainPictureUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type Category = {
  __typename?: "Category";
  articles?: Maybe<Array<Article>>;
  id: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
};

export type CreateArticleInput = {
  body: Scalars["String"]["input"];
  category: ObjectId;
  mainPictureUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createArticle: Article;
  deleteArticle: Scalars["Boolean"]["output"];
};

export type MutationCreateArticleArgs = {
  data: CreateArticleInput;
};

export type MutationDeleteArticleArgs = {
  id: Scalars["Float"]["input"];
};

export type ObjectId = {
  id: Scalars["Int"]["input"];
};

export type Query = {
  __typename?: "Query";
  article?: Maybe<Article>;
  articles: Array<Article>;
  categories: Array<Category>;
};

export type QueryArticleArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryArticlesArgs = {
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  offset?: InputMaybe<Scalars["Float"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateArticleMutationVariables = Exact<{
  data: CreateArticleInput;
}>;

export type CreateArticleMutation = {
  __typename?: "Mutation";
  createArticle: { __typename?: "Article"; id: number };
};

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars["Float"]["input"];
}>;

export type DeleteArticleMutation = { __typename?: "Mutation"; deleteArticle: boolean };

export type GetArticleByIdQueryVariables = Exact<{
  id: Scalars["Float"]["input"];
}>;

export type GetArticleByIdQuery = {
  __typename?: "Query";
  article?: {
    __typename?: "Article";
    id: number;
    title: string;
    body: string;
    mainPictureUrl: string;
    updatedAt: any;
    category: { __typename?: "Category"; id: number; name: string };
  } | null;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: "Query";
  categories: Array<{ __typename?: "Category"; id: number; name: string }>;
};

export type GetHomeArticlesQueryVariables = Exact<{ [key: string]: never }>;

export type GetHomeArticlesQuery = {
  __typename?: "Query";
  articles: Array<{ __typename?: "Article"; id: number; title: string; mainPictureUrl: string }>;
};

export type SearchArticlesQueryVariables = Exact<{
  title?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type SearchArticlesQuery = {
  __typename?: "Query";
  articles: Array<{
    __typename?: "Article";
    id: number;
    title: string;
    body: string;
    mainPictureUrl: string;
    updatedAt: any;
    category: { __typename?: "Category"; id: number; name: string };
  }>;
};

export const CreateArticleDocument = gql`
    mutation CreateArticle($data: CreateArticleInput!) {
  createArticle(data: $data) {
    id
  }
}
    `;
export type CreateArticleMutationFn = ApolloReactCommon.MutationFunction<
  CreateArticleMutation,
  CreateArticleMutationVariables
>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateArticleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(
    CreateArticleDocument,
    options,
  );
}
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = ApolloReactCommon.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateArticleMutation,
  CreateArticleMutationVariables
>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: Float!) {
  deleteArticle(id: $id)
}
    `;
export type DeleteArticleMutationFn = ApolloReactCommon.MutationFunction<
  DeleteArticleMutation,
  DeleteArticleMutationVariables
>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(
    DeleteArticleDocument,
    options,
  );
}
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = ApolloReactCommon.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteArticleMutation,
  DeleteArticleMutationVariables
>;
export const GetArticleByIdDocument = gql`
    query GetArticleById($id: Float!) {
  article(id: $id) {
    id
    title
    body
    mainPictureUrl
    updatedAt
    category {
      id
      name
    }
  }
}
    `;

/**
 * __useGetArticleByIdQuery__
 *
 * To run a query within a React component, call `useGetArticleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArticleByIdQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetArticleByIdQuery,
    GetArticleByIdQueryVariables
  > &
    ({ variables: GetArticleByIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetArticleByIdQuery, GetArticleByIdQueryVariables>(
    GetArticleByIdDocument,
    options,
  );
}
export function useGetArticleByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetArticleByIdQuery,
    GetArticleByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetArticleByIdQuery, GetArticleByIdQueryVariables>(
    GetArticleByIdDocument,
    options,
  );
}
export function useGetArticleByIdSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<GetArticleByIdQuery, GetArticleByIdQueryVariables>,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<GetArticleByIdQuery, GetArticleByIdQueryVariables>(
    GetArticleByIdDocument,
    options,
  );
}
export type GetArticleByIdQueryHookResult = ReturnType<typeof useGetArticleByIdQuery>;
export type GetArticleByIdLazyQueryHookResult = ReturnType<typeof useGetArticleByIdLazyQuery>;
export type GetArticleByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetArticleByIdSuspenseQuery
>;
export type GetArticleByIdQueryResult = ApolloReactCommon.QueryResult<
  GetArticleByIdQuery,
  GetArticleByIdQueryVariables
>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export function useGetCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export function useGetCategoriesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export const GetHomeArticlesDocument = gql`
    query GetHomeArticles {
  articles(limit: 5) {
    id
    title
    mainPictureUrl
  }
}
    `;

/**
 * __useGetHomeArticlesQuery__
 *
 * To run a query within a React component, call `useGetHomeArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomeArticlesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetHomeArticlesQuery,
    GetHomeArticlesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetHomeArticlesQuery, GetHomeArticlesQueryVariables>(
    GetHomeArticlesDocument,
    options,
  );
}
export function useGetHomeArticlesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetHomeArticlesQuery,
    GetHomeArticlesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetHomeArticlesQuery, GetHomeArticlesQueryVariables>(
    GetHomeArticlesDocument,
    options,
  );
}
export function useGetHomeArticlesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetHomeArticlesQuery,
        GetHomeArticlesQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<GetHomeArticlesQuery, GetHomeArticlesQueryVariables>(
    GetHomeArticlesDocument,
    options,
  );
}
export type GetHomeArticlesQueryHookResult = ReturnType<typeof useGetHomeArticlesQuery>;
export type GetHomeArticlesLazyQueryHookResult = ReturnType<typeof useGetHomeArticlesLazyQuery>;
export type GetHomeArticlesSuspenseQueryHookResult = ReturnType<
  typeof useGetHomeArticlesSuspenseQuery
>;
export type GetHomeArticlesQueryResult = ApolloReactCommon.QueryResult<
  GetHomeArticlesQuery,
  GetHomeArticlesQueryVariables
>;
export const SearchArticlesDocument = gql`
    query SearchArticles($title: String) {
  articles(title: $title, limit: 50) {
    id
    title
    body
    mainPictureUrl
    updatedAt
    category {
      id
      name
    }
  }
}
    `;

/**
 * __useSearchArticlesQuery__
 *
 * To run a query within a React component, call `useSearchArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchArticlesQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useSearchArticlesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SearchArticlesQuery,
    SearchArticlesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<SearchArticlesQuery, SearchArticlesQueryVariables>(
    SearchArticlesDocument,
    options,
  );
}
export function useSearchArticlesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SearchArticlesQuery,
    SearchArticlesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<SearchArticlesQuery, SearchArticlesQueryVariables>(
    SearchArticlesDocument,
    options,
  );
}
export function useSearchArticlesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<SearchArticlesQuery, SearchArticlesQueryVariables>,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<SearchArticlesQuery, SearchArticlesQueryVariables>(
    SearchArticlesDocument,
    options,
  );
}
export type SearchArticlesQueryHookResult = ReturnType<typeof useSearchArticlesQuery>;
export type SearchArticlesLazyQueryHookResult = ReturnType<typeof useSearchArticlesLazyQuery>;
export type SearchArticlesSuspenseQueryHookResult = ReturnType<
  typeof useSearchArticlesSuspenseQuery
>;
export type SearchArticlesQueryResult = ApolloReactCommon.QueryResult<
  SearchArticlesQuery,
  SearchArticlesQueryVariables
>;
