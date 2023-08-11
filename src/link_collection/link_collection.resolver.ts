import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LinkCollectionService } from './link_collection.service';
import { LinkCollection } from './link_collection.model';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class LinkCollectionResolver {
    constructor(private linkCollectionService: LinkCollectionService) {}

    @Query( type => [LinkCollection], { name: 'get_link_collections_used', nullable: true })
    async getLinkCollectionUsed(
        @Args('uuid_uid') uuid_uid: string
    ) {
        try {
            return await this.linkCollectionService.getUserLinkCollection(uuid_uid)
        } catch (error) {
            throw new HttpException("Faild to get link_collections", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => LinkCollection, { name: "add_link_to_collection"})
    async upsertLinkCollecion(
        @Args('lid', { type: () => Int! }) lid: number,
        @Args('cid', { type: () => Int! }) cid: number,
        @Args('uuid_uid') uuid_uid: string,
    ) {
        try {
            return await this.linkCollectionService.upsertLinkCollection(lid, cid, uuid_uid)
        } catch (error) {
            throw new HttpException("Faild to add link to user's collection", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation( () => LinkCollection, { name: "remove_link_from_collection" } )
    async removeLinkFromCollection(
        @Args('lid', { type: () => Int! }) lid: number,
        @Args('cid', { type: () => Int! }) cid: number,
    ) {
        try {
            return await this.linkCollectionService.updateLinkCollectionToDeleted(lid, cid)
        } catch (error) {
            throw new HttpException("Faild to remove link from collection", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation( () => [LinkCollection], { name: "delete_link_collection" } )
    async deleteLinkCollection(
        @Args('lid', { type: () => Int! }) lid: number,
        @Args('uuid_uid') uuid_uid: string,
    ) {
        try {
            return await this.linkCollectionService.deleteLinkCollection(lid, uuid_uid)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
