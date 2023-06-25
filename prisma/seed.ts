import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();
async function main() {
    const tag1 = await prisma.tags.create({
        data: {
            tag_name: faker.word.noun() + faker.music.genre()
        }
    })
    const tag2 = await prisma.tags.create({
        data: {
            tag_name: faker.word.noun() + faker.music.genre()
        }
    })
    for (let index = 0; index < 100; index++) {
        const user_uuid = faker.string.uuid()
        await prisma.users.create({
            data: {
                uid: faker.string.alphanumeric(28),
                uuid_uid: user_uuid,
                comment: faker.word.words(2),
            }
        })

        const tag = await prisma.tags.create({
            data: {
                tag_name: faker.word.noun() + faker.number.int({ max: 100 }) + faker.number.int({ max: 10 }),
            }
        })

        for (let index = 0; index < 50; index++) {
            const street = faker.location.streetAddress();
            const street_lower = street.toLowerCase()
            await prisma.posts.create({
                    data: {
                        uuid_pid: faker.string.uuid(),
                        users: {
                            connect: {
                                uuid_uid: user_uuid
                            }
                        },
                        // title: faker.word.words({ count: 7 }),
                        title: street,
                        title_lower: street_lower,
                        top_image: faker.internet.url(),
                        top_link: faker.internet.url(),
                        content_type: 1,
                        publish: faker.datatype.boolean(),
                        deleted: faker.datatype.boolean(),
                        likes_num: faker.number.int({ max: 1000 }),
                        article_contents: { 
                            create: { content: {sample: faker.animal.lion()} } 
                        },
                        post_tags: {
                            createMany: {
                                data: [
                                    {tid: tag.tid},
                                    { tid: tag.tid -1 },
                                    { tid: tag.tid -2 }
                                ]
                            }
                        }
                    }
            })
        }
    }
}
main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})