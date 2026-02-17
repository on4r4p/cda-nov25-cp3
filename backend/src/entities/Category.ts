import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Article } from "./Article";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => [Article], { nullable: true })
  @OneToMany(() => Article, (article) => article.category)
  articles?: Article[];
}
