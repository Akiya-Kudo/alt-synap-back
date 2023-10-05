import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Collection } from './collection.model';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.model';
import { log } from 'console';
import { TokenGuard } from 'src/auth/token.guard';

@Resolver()
export class CollectionResolver {
    constructor( 
        private collectionService: CollectionService,
        private authServise: AuthService
        ) {} 

    @Mutation(() => Collection, { name: "remove_collection"})
    async removeCollection(
        @Args('cid', { type: () => Int! }) cid: number
    ) {
        try {
            return await this.collectionService.updateCollectionToDeleted(cid)
        } catch (error) {
            throw new HttpException("Faild to remove collection", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => Collection, { name: "create_collection" })
    async createCollection(
        @Args('collection_name', { type: () => String! }) collection_name: string,
        @Args('uuid_uid', { type: () => String! }) uuid_uid: string,
    ) {
        try {
            return await this.collectionService.createCollection(collection_name, uuid_uid)
        } catch (error) {
            throw new HttpException("Faild to create collection: " + error , HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => User, { name: 'set_top_collection' })
    @UseGuards(TokenGuard)
    async setTopCollection(
        @Args('cid', { type: () => Int! }) cid: number,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return await this.collectionService.setTopCollection(cid, uid_token)
        } catch (error) {
            throw new HttpException("Faild to set top collection: " + error , HttpStatus.BAD_REQUEST)
        }
    }

    @Query(() => [Collection], { name: 'get_guest_collections' })
    async getGuestCollection() {
        try {
            return await this.collectionService.getGuestCollection()
        } catch (error) {
            throw new HttpException("Faild to get guest collections: " + error , HttpStatus.BAD_REQUEST)
        }
    }
}
