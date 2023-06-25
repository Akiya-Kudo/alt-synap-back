import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) {}
    async searchTags() {

    }
}
