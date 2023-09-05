import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@ObjectType()
@Schema()
export class Post {
  @Field()
  @Prop()
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
