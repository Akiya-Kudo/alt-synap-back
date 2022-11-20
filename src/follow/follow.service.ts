import { Injectable } from '@nestjs/common';
import { follows, Prisma } from '@prisma/client';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prismaService: PrismaService) {}

  async follow(id: Prisma.followsWhereUniqueInput): Promise<follows | null> {
    return this.prismaService.follows.findUnique({
      where: id,
    });
  }

  async follows(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.followsWhereUniqueInput;
    where?: Prisma.followsWhereInput;
    orderBy?: Prisma.followsOrderByWithRelationInput;
  }): Promise<follows[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.follows.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createFollow(data: Prisma.followsCreateInput): Promise<follows> {
    return this.prismaService.follows.create({ data });
  }

  async updateFollow(params: {
    where: Prisma.followsWhereUniqueInput;
    data: Prisma.followsUpdateInput;
  }): Promise<follows> {
    const { where, data } = params;
    return this.prismaService.follows.update({
      data,
      where,
    });
  }

  async deletefollow(where: Prisma.followsWhereUniqueInput): Promise<follows> {
    return this.prismaService.follows.delete({
      where,
    });
  }
}
