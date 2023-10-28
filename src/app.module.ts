import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { SourceContentModule } from './source_content/source_content.module';
import { TagModule } from './tag/tag.module';
import { PostsTagModule } from './posts_tag/posts_tag.module';
import { LikeModule } from './like/like.module';
import { ArticleContentModule } from './article_content/article_content.module';
import { AuthModule } from './auth/auth.module';
import { LinkModule } from './link/link.module';
import { CollectionModule } from './collection/collection.module';
import { LinkCollectionModule } from './link_collection/link_collection.module';
import { FollowModule } from './follow/follow.module';
import { FolderModule } from './folder/folder.module';
import { FolderPostModule } from './folder_post/folder_post.module';
import { UserTagModule } from './user_tag/user_tag.module';
import { RedisModule } from './_redis/redis.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/_graphql/schema.gql'),
      autoSchemaFile: true,
      sortSchema: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    UserModule,
    PostModule,
    ArticleContentModule,
    SourceContentModule,
    TagModule,
    PostsTagModule,
    LikeModule,
    AuthModule,
    LinkModule,
    CollectionModule,
    LinkCollectionModule,
    FollowModule,
    FolderModule,
    FolderPostModule,
    UserTagModule,
    RedisModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
