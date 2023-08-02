import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { LinkService } from './link.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Link } from './link.model';
import { Query } from '@nestjs/graphql';

@Resolver()
export class LinkResolver {
    constructor(private linkService: LinkService) {} 

    @Query( () => [Link], { name: 'get_published_links', nullable: true })
    async getAllPublishedLinks() {
        try {
            return await this.linkService.getAllPublishedLinks()
        } catch (error) {
            throw new HttpException("Faild to get published links", HttpStatus.BAD_REQUEST)
        }
    }
    
    @Query( () => [Link], { name: 'get_link_made_by_user', nullable: true })
    async getLinkMadeByUser(
        @Args('uuid_uid') uuid_uid: string
    ) {
        try {
            return  await this.linkService.getUserLink(uuid_uid)
        } catch (error) {
            throw new HttpException("Faild to get links user made", HttpStatus.BAD_REQUEST)
        }
    }

    @Mutation(() => Link, { name: "delete_link"})
    async deleteLink(
        @Args('lid', { type: () => Int! }) lid: number
    ) {
        try {
            return  await this.linkService.deleteLink(lid)
        } catch (error) {
            throw new HttpException("Faild to delete link", HttpStatus.BAD_REQUEST)
        }
    }
}
