import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { TokenGuard } from '../auth/token.guard';
import { Folder } from './folder.model';
import { AuthService } from '../auth/auth.service';
import { FolderService } from './folder.service';
import { upsertFolderInput } from '../custom_models/mutation.model';
import { log } from 'console';

@Resolver()
export class FolderResolver {
    constructor(
        private folderService: FolderService,
        private authServise: AuthService
    ) {}

    @Mutation(() => Folder, { name: "upsert_folder"})
    @UseGuards(TokenGuard)
    async upsertFolder(
        @Args('folderData') folderData: upsertFolderInput,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.folderService.upsertFolder(folderData, uid_token)
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to Upsert Folder", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => Folder, { name: "delete_folder"})
    @UseGuards(TokenGuard)
    async deleteFolder(
        @Args('fid', {type: () => Int}) fid: number,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.folderService.deleteFolder(fid, uid_token)
        } catch (error) {
            console.log(error);
            throw new HttpException("Faild to delete Folder", HttpStatus.BAD_REQUEST)
        }
    }
}
