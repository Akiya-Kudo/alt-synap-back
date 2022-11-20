import { Injectable } from '@nestjs/common';
import { posts_tags, Prisma } from '@prisma/client';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class PostsTagService {
  constructor(private prismaService: PrismaService) {}
  async posts_tag(
    pid: Prisma.posts_tagsWhereUniqueInput,
  ): Promise<posts_tags | null> {
    return this.prismaService.posts_tags.findUnique({
      where: pid,
    });
  }

  async createPost_tag(
    data: Prisma.posts_tagsCreateInput,
  ): Promise<posts_tags> {
    return this.prismaService.posts_tags.create({ data });
  }

  async updatePosts_tags(params: {
    where: Prisma.posts_tagsWhereUniqueInput;
    data: Prisma.posts_tagsUpdateInput;
  }): Promise<posts_tags> {
    const { where, data } = params;
    return this.prismaService.posts_tags.update({
      data,
      where,
    });
  }

  async deletePosts_tags(
    where: Prisma.posts_tagsWhereUniqueInput,
  ): Promise<posts_tags> {
    return this.prismaService.posts_tags.delete({
      where,
    });
  }
}
