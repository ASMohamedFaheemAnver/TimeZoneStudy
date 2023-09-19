import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @Field((_) => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field()
  @Column()
  date: Date;
}
