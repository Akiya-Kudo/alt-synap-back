import { Resolver } from '@nestjs/graphql';
import { ArticleContentService } from './article_content.service';

@Resolver()
export class ArticleContentResolver {
    constructor(private articleContentService: ArticleContentService) {}

    
}
