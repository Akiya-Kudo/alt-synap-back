import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { Tag } from './tag.model';

@Resolver()
export class TagResolver {
    constructor(private tagService: TagService) {}

    @Query(() => [Tag], { name: "search_tag" })
    async searchPostTag(
        @Args('searchString') searchString: string
    ) {
        try {
            //引数の整形 : ( 引数のString => lowerケース変換 => 空白で分類配列化 => exclude wordを除外 )
            const excludes = ["a", "and", "the", "are", "is"]
            const words = searchString.toLowerCase().replace(/　/g, ' ').split(' ').filter( word => word && !excludes.includes(word) )

            // tags search from tag_name
            let res_tags = []
            if (words.length > 0) {
                res_tags = await this.tagService.searchTags(words)
            }

            return res_tags
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to search tags", HttpStatus.BAD_REQUEST)
            
        }
    }

    @Query(() => Tag, { name: "tag" })
    async getTag(
        @Args('tid',  { type: () => Int }) tid: number
    ) {
        try {
            return await this.tagService.findTag(tid)
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to get tag info", HttpStatus.BAD_REQUEST)
            
        }
    }

    @Query(() => [Tag],  { name: "hot_tags" })
    async getTagRanking() {
        try {
            return await this.tagService.getTagRankingList()
        } catch (error) { 
            throw new HttpException("Faild to get hot tags", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => [Tag], { name: "adjust_tag_ranking" })
    async addjustTagRanking(
        @Args('key') key: string
    ) {
        try {
            if (key !== "aiueo") throw new ForbiddenException("this key is not correct")
            return await this.tagService.addjustTagRanking()
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to addjust tag_ranking", HttpStatus.BAD_REQUEST)
        }
    }
}
