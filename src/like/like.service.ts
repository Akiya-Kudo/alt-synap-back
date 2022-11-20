import { Injectable } from '@nestjs/common';
import { likes, Prisma } from '@prisma/client';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prismaService: PrismaService) {}
  async like(id: Prisma.likesWhereUniqueInput): Promise<likes | null> {
    return this.prismaService.likes.findUnique({
      where: id,
    });
  }

  async likes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.likesWhereUniqueInput;
    where?: Prisma.likesWhereInput;
    orderBy?: Prisma.likesOrderByWithRelationInput;
  }): Promise<likes[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.likes.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createLike(data: Prisma.likesCreateInput): Promise<likes> {
    return this.prismaService.likes.create({ data });
  }

  async updateLike(params: {
    where: Prisma.likesWhereUniqueInput;
    data: Prisma.likesUpdateInput;
  }): Promise<likes> {
    const { where, data } = params;
    return this.prismaService.likes.update({
      data,
      where,
    });
  }

  async deleteLike(where: Prisma.likesWhereUniqueInput): Promise<likes> {
    return this.prismaService.likes.delete({
      where,
    });
  }
}
