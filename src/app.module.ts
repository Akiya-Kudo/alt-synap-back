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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
