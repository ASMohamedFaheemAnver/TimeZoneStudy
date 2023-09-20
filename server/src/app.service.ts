import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment-timezone';

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
    // const posts = await this.postModel.find({});
    // console.log({ posts });
    // return posts;
    // MONGO END

    const posts = await this.postRepository.find();
    // console.log({ posts });
    return posts;
  }

  async createPost(date: Date, tz: string): Promise<PostEntity> {
    // SERVER SHOULD BE IN UTC TO MAKE IT WORK
    console.log({ date, tz });
    // MONGO START
    // const newDate = new this.postModel({ date });
    // await newDate.save();
    // return newDate;
    // MONGO END

    // FORMATTING TO REMOVE THE TZ STRING WHICH CAUSING UNWANTED ISSUES
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm');
    const convertedDate = moment.tz(formattedDate, tz);
    const utcTime = convertedDate.clone().utc();
    const newPost = this.postRepository.create({
      date: utcTime.toDate(),
    });
    console.log({
      convertedDate: convertedDate.toString(),
      utcTime: utcTime.toString(),
    });
    await this.postRepository.save(newPost);
    return newPost;
  }
}
