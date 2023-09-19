import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async getPosts() {
    // MONGO START
    // return this.postModel.find({});
    // MONGO END

    const posts = await this.postRepository.find();
    // console.log({ posts });
    return posts;
  }

  async createPost(date: Date): Promise<PostEntity> {
    console.log({ date });
    // MONGO START
    // const newDate = new this.postModel({ date });
    // await newDate.save();
    // return newDate;
    // MONGO END

    const newPost = this.postRepository.create({
      date,
    });
    await this.postRepository.save(newPost);
    return newPost;
  }
}
