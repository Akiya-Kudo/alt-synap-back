import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { LinkService } from './link.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Link } from './link.model';
import { Query } from '@nestjs/graphql';
import { createLinkInput } from 'src/custom_models/mutation.model';
import { TokenGuard } from 'src/auth/token.guard';

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

    @Mutation(() => Link, { name: "create_link" })
    @UseGuards(TokenGuard)
    async createLink(
        @Args('linkData') linkData: createLinkInput,
        @Context() context
    ) {
        try {
            const uid_token = context.req.idTokenUser.user_id
            return  await this.linkService.createLink(linkData, uid_token)
        } catch (error) {
            throw new HttpException("Faild to create new link", HttpStatus.BAD_REQUEST)
        }
    }
}
