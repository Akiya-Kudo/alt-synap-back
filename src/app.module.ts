import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { BlogContentModule } from './blog_content/blog_content.module';
import { SlideContentModule } from './slide_content/slide_content.module';
import { PostsTagModule } from './posts_tag/posts_tag.module';
import { TagModule } from './tag/tag.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/_graphql/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    PostModule,
    BlogContentModule,
    SlideContentModule,
    PostsTagModule,
    TagModule,
    LikeModule,
    CommentModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
