import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Raw } from "typeorm";
import { Article } from "../entities/Article";
import { ObjectId } from "../types";

@InputType()
class CreateArticleInput {
  @Field()
  mainPictureUrl!: string;

  @Field()
  title!: string;

  @Field()
  body!: string;

  @Field(() => ObjectId)
  category: ObjectId;
}

@Resolver(Article)
export class ArticleResolver {
  @Query(() => [Article])
  async articles(
    @Arg("title", { nullable: true }) title?: string,
    @Arg("limit", { nullable: true }) limit?: number,
    @Arg("offset", { nullable: true }) offset?: number
  ): Promise<Article[]> {
    const where = title
      ? { title: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:title)`, { title: `%${title}%` }) }
      : {};

    return Article.find({
      where,
      relations: ["category"],
      order: { createdAt: "DESC" },
      take: limit ?? 10,
      skip: offset ?? 0,
    });
  }

  @Query(() => Article, { nullable: true })
  async article(@Arg("id") id: number): Promise<Article | null> {
    return Article.findOne({ where: { id }, relations: ["category"] });
  }

  @Mutation(() => Article)
  async createArticle(@Arg("data") data: CreateArticleInput): Promise<Article> {
    const article = Article.create(data);
    const savedArticle = await article.save();
    // Reload article with category relation
    const articleWithCategory = await Article.findOne({
      where: { id: savedArticle.id },
      relations: ["category"],
    });
    if (!articleWithCategory) {
      throw new Error("Failed to load created article");
    }
    return articleWithCategory;
  }

  @Mutation(() => Boolean)
  async deleteArticle(@Arg("id") id: number): Promise<boolean> {
    const article = await Article.findOne({ where: { id } });
    if (article) {
      await article.remove();
      return true;
    }
    return false;
  }
}
