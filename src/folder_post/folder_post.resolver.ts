import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { FolderPostService } from './folder_post.service';
import { FolderPost } from './folder_post.model';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/token.guard';

@Resolver()
export class FolderPostResolver {
    constructor(
        private folderPostService: FolderPostService,
        private authServise: AuthService
    ) {}
    
    @Mutation(() => [FolderPost], { name: "add_posts_to_folder"})
    @UseGuards(TokenGuard)
    async addPostsToFolder(
        @Args('fid', {type: () => Int}) fid: number,
        @Args('uuid_pids', { type: () => [String] }) uuid_pids: string[],
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.folderPostService.createFolderPosts(fid, uuid_pids, uid_token )
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to add posts to Folder", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => Int, { name: "delete_posts_from_folder"})
    @UseGuards(TokenGuard)
    async deletePostsFromFolder(
        @Args('fid', {type: () => Int}) fid: number,
        @Args('uuid_pids', { type: () => [String] }) uuid_pids: string[],
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.folderPostService.deleteFolderPosts(fid, uuid_pids, uid_token )
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to delete posts from Folder", HttpStatus.BAD_REQUEST)
        }
    }
}
