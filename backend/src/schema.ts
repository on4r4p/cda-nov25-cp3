import { buildSchema } from "type-graphql";
import { ArticleResolver } from "./resolvers/ArticleResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";

export async function getSchema() {
  return buildSchema({
    resolvers: [ArticleResolver, CategoryResolver],
  });
}
