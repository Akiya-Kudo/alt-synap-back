// import { Module } from '@nestjs/common';
// import { createClient } from 'redis';

// @Module({
//     providers: [
//         {
//             provide: 'REDIS_OPTIONS',
//             useValue: {
//                 url: 'redis://localhost:6379'
//             }
//         },
//         {
//             inject: ['REDIS_OPTIONS'],
//             provide: 'REDIS_CLIENT',
//             useFactory: async (options: { url: string }) => {
//                 const client = createClient({
//                     password: 'A8xMFwhCX7hemeEs6Zr1J0nGO4zLRWdy',
//                     socket: {
//                         host: 'redis-18857.c299.asia-northeast1-1.gce.cloud.redislabs.com',
//                         port: 18857
//                     }
//                 });
//                 await client.connect();
//                 return client;
//             }
//         }
//     ],
//     exports: ['REDIS_CLIENT'],
// })
// export class RedisModule {}

import { Module } from '@nestjs/common';
import Redis from 'ioredis'; // ioredisをインポート

@Module({
    providers: [
        // {
        //     provide: 'REDIS_OPTIONS',
        //     useValue: {
        //         url: 'redis://localhost:6379'
        //     }
        // },
        {
            // inject: ['REDIS_OPTIONS'],
            provide: 'REDIS_CLIENT',
            useFactory: async (options: { url: string }) => {
                const client = new Redis({
                    password: 'A8xMFwhCX7hemeEs6Zr1J0nGO4zLRWdy',
                    host: 'redis-18857.c299.asia-northeast1-1.gce.cloud.redislabs.com',
                    port: 18857
                });
                try {
                    await client.connect();
                } catch (error) { console.error('Redis connection error:', error.message) }
            
                return client;
            }
        }
    ],
    exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
