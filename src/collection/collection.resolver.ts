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
}
