import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { log } from 'console';
import admin from 'firebase-admin'
import { PrismaService } from 'src/_prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async validateIdToken(idToken: string): Promise<any> {
        try {
            if (!idToken) throw new UnauthorizedException("Bearer Token is not found")
            const user = await admin.auth().verifyIdToken(idToken);
            return user;
        } catch (e) {
            console.error(e)
            throw new UnauthorizedException("Faild verifing Token",e)
        }
    }
}
