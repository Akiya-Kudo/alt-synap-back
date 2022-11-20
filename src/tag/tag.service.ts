import { Injectable } from '@nestjs/common';
import { Prisma, tags } from '@prisma/client';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async tag(id: Prisma.tagsWhereUniqueInput): Promise<tags | null> {
    return this.prismaService.tags.findUnique({
      where: id,
    });
  }

  async tags(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.tagsWhereUniqueInput;
    where?: Prisma.tagsWhereInput;
    orderBy?: Prisma.tagsOrderByWithRelationInput;
  }): Promise<tags[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.tags.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTag(data: Prisma.tagsCreateInput): Promise<tags> {
    return this.prismaService.tags.create({ data });
  }

  async updateTag(params: {
    where: Prisma.tagsWhereUniqueInput;
    data: Prisma.tagsUpdateInput;
  }): Promise<tags> {
    const { where, data } = params;
    return this.prismaService.tags.update({
      data,
      where,
    });
  }

  async deleteTag(where: Prisma.tagsWhereUniqueInput): Promise<tags> {
    return this.prismaService.tags.delete({
      where,
    });
  }
}
