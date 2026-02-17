import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Category } from "./Category";

@ObjectType()
@Entity()
export class Article extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  mainPictureUrl!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column("text")
  body!: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.articles, { nullable: true })
  category?: Category;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
