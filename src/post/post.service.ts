import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';
import { posts, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async post(id: Prisma.postsWhereUniqueInput): Promise<posts | null> {
    return this.prismaService.posts.findUnique({
      where: id,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.postsWhereUniqueInput;
    where?: Prisma.postsWhereInput;
    orderBy?: Prisma.postsOrderByWithRelationInput;
  }): Promise<posts[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.posts.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.postsCreateInput): Promise<posts> {
    return this.prismaService.posts.create({ data });
  }

  async updatePost(params: {
    where: Prisma.postsWhereUniqueInput;
    data: Prisma.postsUpdateInput;
  }): Promise<posts> {
    const { where, data } = params;
    return this.prismaService.posts.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.postsWhereUniqueInput): Promise<posts> {
    return this.prismaService.posts.delete({
      where,
    });
  }
}
