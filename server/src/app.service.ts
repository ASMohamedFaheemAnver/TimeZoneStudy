import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(date: Date): Promise<Post> {
    console.log({ date });
    const newDate = new this.postModel({ date });
    await newDate.save();
    return newDate;
  }
}
