// @ts-nocheck
import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client/react";
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

export type GetHomeArticlesQueryVariables = Exact<{ [key: string]: never }>;

export type GetHomeArticlesQuery = {
  __typename?: "Query";
  articles: Array<{ __typename?: "Article"; id: number; title: string; mainPictureUrl: string }>;
};

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
