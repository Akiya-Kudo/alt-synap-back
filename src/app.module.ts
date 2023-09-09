import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { LinkService } from './link/link.service';
import { LinkModule } from './link/link.module';
import { CollectionService } from './collection/collection.service';
import { CollectionResolver } from './collection/collection.resolver';
import { CollectionModule } from './collection/collection.module';
import { LinkCollectionModule } from './link_collection/link_collection.module';
import { FollowService } from './follow/follow.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
