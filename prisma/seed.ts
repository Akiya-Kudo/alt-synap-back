import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {

//tag
    for (let index = 0; index < 300; index++) {
        const tag_name = faker.word.noun() + faker.number.int({ max: 100 }) + faker.number.int({ max: 10 })
        const tag = await prisma.tags.create({
            data: {
                tag_name: tag_name,
                display_name: tag_name,
                tag_image: faker.datatype.boolean() ? 'https://bit.ly/sage-adebayo' : null,
            }
        })
    }

//link collections 前処理 user追加
const image_path_u = "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/" + 2 + ".jpg?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357"
        const user = await prisma.users.create({
            data: {
                uid: faker.string.alphanumeric(28),
                uuid_uid: "c93cd1fe-85ff-4fd3-8d67-3d1cd12b91bb",
                user_name: faker.person.fullName(),
                user_image: image_path_u,
                comment: faker.word.words(2),
            }
        })
// link
    for (let index = 0; index < 10; index++) {
        const link = await prisma.links.create({
            data: {
                uuid_uid: "c93cd1fe-85ff-4fd3-8d67-3d1cd12b91bb",
                link_name: faker.animal.cat(),
                image_path: "https://th.bing.com/th/id/OIP.Zqez7MQnPnxA_ivGrJjF0QHaHa?pid=ImgDet&rs=1", 
                explanation: faker.company.name(),
                url_scheme: "https://www.pinterest.jp/search",
                query: "q",
                joint: "%20",
                other_queries: null,
                genre: 0,
                is_path_search: false,
                publish: true,
            }
        })
    }
// collection
    for (let index=0; index < 2; index++) {
        const collection = await prisma.collections.create({
            data: {
                uuid_uid: "c93cd1fe-85ff-4fd3-8d67-3d1cd12b91bb",
                collection_name: faker.airline.airplane.name,
            }
        })
// link collection
        for (let i=0; i < 5; i++) {
            const link_collection = await prisma.link_collections.create({
                data: {
                    cid: index + 1,
                    lid: (index + 1)*(i+1),
                    uuid_uid: "c93cd1fe-85ff-4fd3-8d67-3d1cd12b91bb",
                    deleted: false,
                }
            })
        }
    }

    for (let index = 0; index < 10; index++) {
//user
        const user_uuid = faker.string.uuid()
        const ramnum = faker.number.int(31)
        const image_path = "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/" + ramnum + ".jpg?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357"
        await prisma.users.create({
            data: {
                uid: faker.string.alphanumeric(28),
                uuid_uid: user_uuid,
                user_name: faker.person.fullName(),
                user_image: image_path,
                comment: faker.word.words(2),
            }
        })

//posts
        for (let index = 0; index < 100; index++) {
            const street = faker.location.streetAddress();
            const street_lower = street.toLowerCase();
            const image_bool = faker.datatype.boolean();
            let image_path = "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/0.jpg?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357"
            if (image_bool) {
                const ramnum = faker.number.int(31)
                image_path = "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/" + ramnum + ".jpg?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357"
            } 

            const tids = [faker.number.int(99), faker.number.int(99) + 100, faker.number.int(99) + 200]
            const tags = await prisma.tags.findMany({
                where: {
                    tid: {
                        in: tids
                    }
                }
            })
            const tag_datas = tags.map(tag => ({tid: tag.tid}))
            const tag_names = tags.map(tag => tag.tag_name)

            const title_tags_text = street_lower + tag_names.join(" , ")

            await prisma.posts.create({
                    data: {
                        uuid_pid: faker.string.uuid(),
                        users: {
                            connect: {
                                uuid_uid: user_uuid
                            }
                        },
                        title: street,
                        title_lower: street_lower,
                        title_tags_search_text: title_tags_text,
                        top_image: image_bool ? image_path : null,
                        top_link: faker.datatype.boolean() ? faker.internet.url() : null,
                        content_type: 1,
                        publish: faker.datatype.boolean(),
                        deleted: faker.datatype.boolean(),
                        likes_num: faker.number.int({ max: 1000 }),
                        article_contents: { 
                            create: { content: {sample: faker.animal.lion()} } 
                        },
                        post_tags: {
                            createMany: {
                                data: tag_datas
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