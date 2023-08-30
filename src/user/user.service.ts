import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { users, Prisma } from '@prisma/client';
import { User } from './user.model';
import { updateUserInput } from 'src/custom_models/mutation.model';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<users> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    // orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<users[]> {
    const { skip, take, cursor, where } = params;
    return await this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async usersAll() {
    return this.prisma.users.findMany();
  }

  async createUser(data: Prisma.usersCreateInput): Promise<users> {
    console.log(data)
    return this.prisma.users.create({ data });
  }

  async updateUser(userData: updateUserInput, uid_token: string) {
    try {
      const { uuid_uid } = await this.prisma.users.findUniqueOrThrow({
        where: { uid: uid_token},
        select: { uuid_uid: true }
      })
      return await this.prisma.users.update({
        where: { uuid_uid: uuid_uid },
        data: {
          user_name: userData.user_name,
          user_image: userData.user_image,
          comment: userData.comment
        },
        select: {
          uuid_uid: true,
          user_name: true,
          user_image: true,
          comment: true,
        }
      })
    } catch (error) {throw error}
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<users> {
    return this.prisma.users.delete({
      where,
    });
  }
}
