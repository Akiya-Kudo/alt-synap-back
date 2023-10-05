import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { Link } from "src/link/link.model";

const prisma = new PrismaClient();
async function main() {

// create official tipsy user
    const image_path_u = "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/" + 2 + ".jpg?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357"
    const uuid_official = "c12cd1fe-85ff-4fd3-8d67-3d1cd12b91bb"
    const user_official = await prisma.users.create({
        data: {
            uid: faker.string.alphanumeric(28),
            uuid_uid: uuid_official,
            user_name: "Tipsy - official -",
            user_image: "/tipsy_logo.ico",
            comment: 'Tipsy公式アカウントになります。Tipsyをお使いいただきありがとうございます! 新しいコンテンツやアップデートをお待ちください！ This is Tipsy Official account. Thank you for always enjoying with us. Stay tuned for exciting new content and updates!  ',
        }
    })
//add default links
    default_links.forEach( async(link: Link) => {
        const link_def = await prisma.links.create({ data: {
            uuid_uid: uuid_official,
            link_name: link.link_name,
            image_path:link.image_path, 
            explanation: link.explanation,
            url_scheme: link.url_scheme,
            query: link.query,
            joint: link.joint,
            other_queries: link.other_queries,
            genre: link.genre,
            is_path_search: link.is_path_search,
            publish: link.publish,
        }})
    })
// add dfault collections
    default_collections.forEach(async (col) => {
        const col_def = await prisma.collections.create({
            data: {
                uuid_uid: uuid_official,
                collection_name: col.collection_name
            }
        })
    })
// have to create link_collection records　later

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

// //link collections 前処理 user追加
//     const users_uuid = "c93cd1fe-85ff-4fd3-8d67-3d1cd12b91bb"
//     const user = await prisma.users.create({
//         data: {
//             uid: faker.string.alphanumeric(28),
//             uuid_uid: users_uuid,
//             user_name: faker.person.fullName(),
//             user_image: image_path_u,
//             comment: faker.word.words(2),
//         }
//     })
// // link
//     for (let index = 0; index < 40; index++) {
//         const link = await prisma.links.create({
//             data: {
//                 uuid_uid: users_uuid,
//                 link_name: faker.animal.cat(),
//                 image_path: "https://th.bing.com/th/id/OIP.Zqez7MQnPnxA_ivGrJjF0QHaHa?pid=ImgDet&rs=1", 
//                 explanation: faker.company.name(),
//                 url_scheme: "https://www.pinterest.jp/search",
//                 query: "q",
//                 joint: "%20",
//                 other_queries: null,
//                 genre: 0,
//                 is_path_search: false,
//                 publish: true,
//             }
//         })
//     }
// // collection
//     for (let index=0; index < 8; index++) {
//         const collection = await prisma.collections.create({
//             data: {
//                 uuid_uid: users_uuid,
//                 collection_name: faker.airline.airplane.name,
//             }
//         })
// // link collection
//         for (let i=0; i < 5; i++) {
//             const link_collection = await prisma.link_collections.create({
//                 data: {
//                     cid: index + 1,
//                     lid: (5*index) + (i+1),
//                     uuid_uid: users_uuid,
//                     deleted: false,
//                 }
//             })
//         }
//     }

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

const default_collections = [
    { collection_name: "Shopping", lids: [11,12,13,14] },
    { collection_name: "Social Media", lids: [1,2,3,4] },
    { collection_name: "Searching", lids: [6,7,9,10] },
    { collection_name: "Map", lids: [8] },
    { collection_name: "Enginnering", lids: [5] },
]

const default_links = [
    {
        link_name: "Pinterest",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/pinterest_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Pinterestサイトに進み検索が可能です。",
        url_scheme: "https://www.pinterest.jp/search",
        query: "q",
        joint: "%20",
        other_queries: null,
        genre: 0,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "YouTube",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/youtube_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "YouTubeサイトに進み検索が可能です。",
        url_scheme: "https://www.youtube.com/results",
        query: "search_query",
        joint: "+",
        other_queries: null,
        genre: 2,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "Twitter",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/twitter_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Twitterサイトに進み検索が可能です。",
        url_scheme: "https://twitter.com/search",
        query: "q",
        joint: "%20",
        other_queries: null,
        genre: 3,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "TikTok",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/tiktok_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "TikTokサイトに進み検索が可能です。",
        url_scheme: "https://www.tiktok.com/search",
        query: "q",
        joint: "%20",
        other_queries: null,
        genre: 3,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "Stack Overflow",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/stackoverflow_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Stack Overflowサイトに進み検索が可能です。",
        url_scheme: "https://www.tiktok.com/search",
        query: "q",
        joint: "+",
        other_queries: null,
        genre: 4,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "Bing",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/bing_icon.jpeg?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Bingサイトに進み検索が可能です。",
        url_scheme: "https://www.bing.com/search",
        query: "q",
        joint: "+",
        other_queries: null,
        genre: 0,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "Google",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/google_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Googleサイトに進み検索が可能です。",
        url_scheme: "https://www.google.co.jp/search",
        query: "q",
        joint: "+",
        other_queries: null,
        genre: 0,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "Google Maps",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/google_map_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Google Mapsサイトに進み検索が可能です。",
        url_scheme: "https://www.google.co.jp/maps/search",
        query: null,
        joint: "+",
        other_queries: null,
        genre: 5,
        is_path_search: true,
        publish: true,
    },
    {
        link_name: "Yahoo! Japan",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/yahoo_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Yahoo!サイトに進み検索が可能です。",
        url_scheme: "https://search.yahoo.co.jp/search",
        query: "q",
        joint: "+",
        other_queries: null,
        genre: 0,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "Wikipedia",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/wiki_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Wikipediaサイトに進み検索が可能です。",
        url_scheme: "https://ja.wikipedia.org/w/index.php",
        query: "search",
        joint: "+",
        other_queries: null,
        genre: 5,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "メルカリ",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/merukari_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "メルカリサイトに進み検索が可能です。",
        url_scheme: "https://jp.mercari.com/search",
        query: "keyword",
        joint: "%20",
        other_queries: null,
        genre: 1,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "Amazon",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/amazon_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "Amazonサイトに進み検索が可能です。",
        url_scheme: "https://www.amazon.co.jp/s",
        query: "k",
        joint: "+",
        other_queries: null,
        genre: 1,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "eBay",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/ebay_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "eBayサイトに進み検索が可能です。",
        url_scheme: "https://www.ebay.com/sch/i.html",
        query: "_nkw",
        joint: "+",
        other_queries: null,
        genre: 1,
        is_path_search: false,
        publish: true,
    },
    {
        link_name: "Rakuten",
        image_path: "https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/rakuten_icon.png?alt=media&token=fa85de29-6f27-4d9e-bae5-eac4f8e24357", 
        explanation: "楽天サイトに進み検索が可能です。",
        url_scheme: "https://search.rakuten.co.jp/search/mall",
        query: null,
        joint: "+",
        other_queries: null,
        genre: 1,
        is_path_search: true,
        publish: true,
    },

]