import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { Post, PostSchema } from './schemas/post.schema';
import { Post as PostEntity } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type, host, port, username, password, database } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type,
      host,
      port,
      username,
      password,
      database,
      entities: [PostEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PostEntity]),
    MongooseModule.forRoot('mongodb://localhost/timezone'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV !== 'prod',
    }),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [],
  providers: [AppResolver, AppService],
})
export class AppModule {}
