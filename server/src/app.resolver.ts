import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Message } from './common/message';
import { Post } from './schemas/post.schema';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // Queries
  @Query((_) => Message)
  root(): Message {
    return { message: 'server is up and running' };
  }

  @Query((_) => [Post])
  getPosts() {
    return this.appService.getPosts();
  }

  // Mutations
  @Mutation((_) => Post)
  createPost(@Args('date') date: Date) {
    return this.appService.createPost(date);
  }
}
