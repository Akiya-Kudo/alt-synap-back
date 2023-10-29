import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { upsertArticlePostInput, upsertArticlePostOutput, upsertLinkPostInput, upsertLinkPostOutput } from '../custom_models/mutation.model';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard, TokenSecretGuard } from '../auth/token.guard';
import { AuthService } from '../auth/auth.service';
import { TagService } from '../tag/tag.service';
import { PostWithTagsAndUser } from '../custom_models/query.model';
import { Post } from './post.model';
import { log } from 'console';
import e from 'express';

@Resolver()
export class PostResolver {
    constructor(
        private postService: PostService,
        private authServise: AuthService) {}

    @Query(() => Post, { name: "post" })
    @UseGuards(TokenSecretGuard)
    async getPost(
        @Args('uuid_pid') uuid_pid: string,
        @Context() context
    ) {
        try {
            const uid_token: string = context.req.idTokenUser?.user_id 
            return await this.postService.findPost(uuid_pid, uid_token)
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to get Post", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => Post, { name: "delete_post"})
    @UseGuards(TokenGuard)
    async deletePost(
        @Args('uuid_pid') uuid_pid: string,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.postService.deletePost(uuid_pid, uid_token)
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to delete Link Post", HttpStatus.BAD_REQUEST)
        }
    }


    @Mutation(() => upsertArticlePostOutput, { name: "upsert_article_post"})
    @UseGuards(TokenGuard)
    async upsertArticlePost(
        @Args('postData') postData: upsertArticlePostInput,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.postService.upsertArticlePost(postData, uid_token)
        } catch (error) {
            console.log(error)
            throw new HttpException("Faild to Upsert Article Post", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => upsertLinkPostOutput, { name: "upsert_link_post"})
    @UseGuards(TokenGuard)
    async upsertLinkPost(
        @Args('postData') postData: upsertLinkPostInput,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.postService.upsertLinkPost(postData, uid_token)
        } catch (error) {
            console.log(error)
            throw new HttpException("Faild to Upsert Link Post", HttpStatus.BAD_REQUEST)
        }
    }

    @Query(() => [Post], { name: "search_post" })
    @UseGuards(TokenSecretGuard)
    async searchPost(
        @Args('searchString', { nullable: true }) searchString: string | null,
        @Args('selectedTagId', { type: () => Int, nullable: true }) selectedTagId: number | null,
        @Args('offset', {type: () => Int}) offset:number,
        @Args('sortType', {type: () => Int}) sortType:number,
        @Context() context
    ) {
        try {
            const uid_token: string | null = context.req.idTokenUser?.user_id 
            //引数の整形 : ( 引数のString => lowerケース変換 => 空白で分類配列化 => exclude wordを除外 )
            const excludes = ["a", "and", "the", "are", "is"]
            const words = searchString 
            ? searchString.toLowerCase().replace(/　/g, ' ').split(' ').filter( word => word && !excludes.includes(word) )
            : []
            //posts search from title & selected tags 
            let res_posts = await this.postService.searchPostFromTitleAndTags(words, selectedTagId, offset, sortType, uid_token);

            return res_posts
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to search Post by title", HttpStatus.BAD_REQUEST)
            
        }
    }

    @Query(() => Int, { name: "count_total_posts" })
    async countTotalPosts(
        @Args('searchString', { nullable: true }) searchString: string,
        @Args('selectedTagId', { type: () => Int, nullable: true }) selectedTagId: number
    ) {
        try {
            //引数の整形 : ( 引数のString => lowerケース変換 => 空白で分類配列化 => exclude wordを除外 )
            const excludes = ["a", "and", "the", "are", "is"]
            const words = searchString 
            ? searchString.toLowerCase().replace(/　/g, ' ').split(' ').filter( word => word && !excludes.includes(word) )
            : []

            //posts count from title & selected tags 
            return await this.postService.countTotalPosts(words, selectedTagId);
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to search Post by title", HttpStatus.BAD_REQUEST)
            
        }
    }

    @Query(() => [Post], { name: "get_posts_made_by_user" })
    @UseGuards(TokenSecretGuard)
    async getPostsMadeByUser (
        @Args('uuid_uid', { type: () => String }) uuid_uid: string,
        @Args('selectedTagIds', { type: () => [Int], nullable: 'itemsAndList' }) selectedTagIds: number[] | null,
        @Args('offset', { type: () => Int }) offset: number,
        @Args('no_pagenation', { type: () => Boolean }) no_pagenation: boolean,
        @Context() context
    ) {
        try {
            const uid_token: string | null = context.req.idTokenUser?.user_id

            const selectedTids = selectedTagIds ? selectedTagIds : []
            return await this.postService.findPostsMadeByUser(uuid_uid, selectedTids, offset, no_pagenation, uid_token)
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to get Post made by user", HttpStatus.BAD_REQUEST)
        }
    }

    @Query(() => Int, { name: "count_posts_made_by_user" })
    @UseGuards(TokenSecretGuard)
    async countPostsMadeByUser (
        @Args('uuid_uid', { type: () => String }) uuid_uid: string,
        @Args('selectedTagIds', { type: () => [Int], nullable: 'itemsAndList' }) selectedTagIds: number[] | null,
        @Context() context
    ) {
        try {
            const uid_token: string | null = context.req.idTokenUser?.user_id

            const selectedTids = selectedTagIds ? selectedTagIds : []
            return await this.postService.countTotalPostsMadeByUser(uuid_uid, selectedTids, uid_token)
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to count Post made by user", HttpStatus.BAD_REQUEST)
        }
    }


    @Query(() => [Post],{ name: "get_posts_user_liked" })
    @UseGuards(TokenGuard)
    async getPostUserLiked (
        @Args('selectedTagIds', { type: () => [Int], nullable: 'itemsAndList' }) selectedTagIds: number[] | null,
        @Args('offset', { type: () => Int }) offset: number,
        @Context() context
    ) {
        try {
            const uid_token: string | null = context.req.idTokenUser?.user_id

            const selectedTids = selectedTagIds ? selectedTagIds : []
            return await this.postService.getPostUserLiked(selectedTids, offset, uid_token)
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to get Post liked by user", HttpStatus.BAD_REQUEST)
        }
    }

    @Query(() => Int, { name: "count_posts_user_liked" })
    @UseGuards(TokenGuard)
    async countPostUserLiked (
        @Args('selectedTagIds', { type: () => [Int], nullable: 'itemsAndList' }) selectedTagIds: number[] | null,
        @Context() context
    ) {
        try {
            const uid_token: string | null = context.req.idTokenUser?.user_id

            const selectedTids = selectedTagIds ? selectedTagIds : []
            return await this.postService.countTotalPostsUserLiked(selectedTids, uid_token)
        } catch (error) {
            console.error(error)
            throw new HttpException("Faild to count Post user liked", HttpStatus.BAD_REQUEST)
        }
    }

    @Query(() => [Post],{ name: "get_posts_user_follow" })
    @UseGuards(TokenGuard)
    async getPostsUserFollow (
        @Args('offset', { type: () => Int }) offset: number,
        @Context() context
    ) {
        try {
            const uid_token: string | null = context.req.idTokenUser?.user_id
            return await this.postService.getPostUserFollow( offset, uid_token )
        } catch (error) {
            console.error(error);
            throw new HttpException("Faild to get Post liked by user", HttpStatus.BAD_REQUEST)
        }
    }
} 
