import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Collection } from './collection.model';

@Resolver()
export class CollectionResolver {
    constructor( private collectionService: CollectionService) {} 

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
}
