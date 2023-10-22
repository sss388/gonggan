import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService,) {}

    async getAllUsers(page: number) {
        const list = await this.prisma.user.findMany({
            take: 10,
            skip: 10 * (page - 1),
        });

        return list;
    }

    async freezeAccount(userId: string, days: number) {
        let releaseAt = new Date();
        releaseAt.setDate(releaseAt.getDate() + Number(days));

        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                releaseAt,
            }
        });

        return releaseAt;
    }

    async releaseAccount(id: string) {
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                releaseAt: null,
            }
        })
    }

    async getAllShopping(page: number, keyword: string, category: string) {
        console.log(page);
        if(category === '제목'){
            const list = await this.prisma.shopping.findMany({
                take: 10,
                skip: 10 * (page - 1),
                include: {
                    user: true,
                },
                where: {
                  title: {
                      contains: keyword,
                  }
                }
            });

            return list;

        } else if(category === '작성자') {
            const list = await this.prisma.shopping.findMany({
                take: 10,
                skip: 10 * (page - 1),
                include: {
                    user: true,
                },
                where: {
                    user: {
                        name: {
                            contains: keyword,
                        }
                    }
                }
            });

            return list;
        } else if(category === '카테고리') {
            const list = await this.prisma.shopping.findMany({
                take: 10,
                skip: 10 * (page - 1),
                include: {
                    user: true,
                },
                where: {
                    category: {
                        contains: keyword,
                    }
                }
            });

            return list;
        } else {
            const list = await this.prisma.shopping.findMany({
                take: 10,
                skip: 10 * (page - 1),
                include: {
                    user: true,
                },
            });

            return list;
        }
        return null;
    }

    async setDiscount(id: number, discount: number) {
        await this.prisma.shopping.update({
            where: {
                id,
            },
            data: {
                discount,
            }
        })
    }

    async setStatus(id: number, status: string) {
        await this.prisma.shopping.update({
            where: {
                id,
            },
            data: {
                status,
            }
        })
    }

    async getBoards(page: number, keyword: string, category: string) {
        if(category === '제목'){
            const list = await this.prisma.board.findMany({
                take: 10,
                skip: 10 * (page - 1),
                include: {
                    user: true,
                },
                where: {
                    title: {
                        contains: keyword,
                    }
                }
            });
            return list;
        } else if(category === '작성자'){
            const list = await this.prisma.board.findMany({
                take: 10,
                skip: 10 * (page - 1),
                include: {
                    user: true,
                },
                where: {
                    user: {
                        name: {
                            contains: keyword,
                        }
                    }
                }
            });
            return list;
        } else if(category === '종류'){
            const list = await this.prisma.board.findMany({
                take: 10,
                skip: 10 * (page - 1),
                include: {
                    user: true,
                },
                where: {
                    kind: {
                        contains: keyword,
                    }
                }
            });
            return list;
        } else {
            const list = await this.prisma.board.findMany({
                take: 10,
                skip: 10 * (page - 1),
                include: {
                    user: true,
                }
            });

            return list;
        }
        return null;
    }

    async getBoardsCount(keyword: string, category: string) {
        let count = 0;

        if(category === '제목'){
            count = await this.prisma.board.count({
               where: {
                   title: {
                       contains: keyword,
                   }
               }
            });
        } else if(category === '작성자'){
            count = await this.prisma.board.count({
                where: {
                    user: {
                        name: {
                            contains: keyword,
                        }
                    }
                }
            });
        } else if(category === '종류'){
            count = await this.prisma.board.count({
                where: {
                    kind: {
                        contains: keyword,
                    }
                }
            });
        } else {
            count = await this.prisma.board.count();
        }

        return count;
    }

    async getShoppingCount(keyword: string, category: string) {
        let count = 0;

        if(category === '제목'){
            count = await this.prisma.shopping.count({
                where: {
                    title: {
                        contains: keyword,
                    }
                }
            });
        } else if(category === '작성자'){
            count = await this.prisma.shopping.count({
                where: {
                    user: {
                        name: {
                            contains: keyword,
                        }
                    }
                }
            });
        } else if(category === '카테고리'){
            count = await this.prisma.shopping.count({
                where: {
                    category: {
                        contains: keyword,
                    }
                }
            });
        } else {
            count = await this.prisma.shopping.count();
        }

        return count;
    }

    async setBoardStatus(id: number, status: string) {
        await this.prisma.board.update({
            where: {
                id,
            },
            data: {
                status,
            }
        })
    }
}
