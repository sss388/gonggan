import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ChangeUserDto} from "./dto/user.dto";
import {CloudinaryService} from "../cloudinary/cloudinary.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService,
                private cloudinary : CloudinaryService) {}
    findUserById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async changeUserInfo(changeUserDto: ChangeUserDto) {
        await this.prisma.user.update({
            where: {
                id: changeUserDto.id
            },
            data: {
                name: changeUserDto.name
            }
        });
    }

    async changeAvatar(file: Express.Multer.File, id: string) {
        const result = await this.cloudinary.uploadFile(file);

        await this.prisma.user.update({
            where: {
                id
            },
            data: {
                image: result.public_id,
            }
        })

        return result.public_id;
    }

    async getBoughtItemCount(userId, startDate, endDate, method) {
        let count = 0;

        if (!method) {
            count = await this.prisma.boughtItem.count({
                where: {
                    userId
                }
            })
        } else {
            if(isNaN(startDate)){
                startDate = new Date(1970,0,1);
            }

            if(isNaN(endDate)){
                endDate = new Date();
            }

            if (method === '전체') {
                count = await this.prisma.boughtItem.count({
                    where: {
                        userId,
                        orderDate: {
                            gte: startDate,
                            lte: new Date(endDate.getTime() + (24 * 60 * 60 * 1000)),
                        },
                    }
                });
            } else {
                count = await this.prisma.boughtItem.count({
                    where: {
                        userId,
                        orderDate: {
                            gte: startDate,
                            lte: new Date(endDate.getTime() + (24 * 60 * 60 * 1000)),
                        },
                        method,
                    }
                });
            }
        }
        
        return count;
    }

    async getBoughtItemList(userId, page, startDate, endDate, method) {
        let list;

        if(!method){
            list = await this.prisma.boughtItem.findMany({
                where: {
                    userId,
                },
                take: 10,
                skip: 10 * (page - 1),
                orderBy: {id: 'desc'},
                include: {
                    shopping:{
                        include:{
                            product: true,
                        }
                    }
                }
            })

            return list;
        } else {
            if(isNaN(startDate)){
                startDate = new Date(1970,0,1);
            }

            if(isNaN(endDate)){
                endDate = new Date();
            }

            if (method === '전체') {
                list = await this.prisma.boughtItem.findMany({
                    where: {
                        userId,
                        orderDate: {
                            gte: startDate,
                            lte: new Date(endDate.getTime() + (24 * 60 * 60 * 1000)),
                        },
                    },
                    take: 10,
                    skip: 10 * (page - 1),
                    orderBy: {id: 'desc'},
                    include: {
                        shopping:{
                            include:{
                                product: true,
                            }
                        }
                    }
                })
            } else {
                list = await this.prisma.boughtItem.findMany({
                    where: {
                        userId,
                        orderDate: {
                            gte: startDate,
                            lte: new Date(endDate.getTime() + (24 * 60 * 60 * 1000)),
                        },
                        method
                    },
                    take: 10,
                    skip: 10 * (page - 1),
                    orderBy: {id: 'desc'},
                    include: {
                        shopping:{
                            include:{
                                product: true,
                            }
                        }
                    }
                })
            }
        }

        return list;
    }

    async getFavoritesList(userId) {
        const list = await this.prisma.favorite.findMany({
            where: {
                userId,
            },
            include: {
                shopping: true,
            }
        })

        return list;
    }

    async deleteFavorite(userId, favoriteId) {
        await this.prisma.favorite.delete({
            where:{
                userId,
                id: parseInt(favoriteId)
            }
        })
    }

    async getCartItems(userId) {
        const cart = await this.prisma.cart.findUnique({
            where: {
                userId,
            }
        });

        const items = await this.prisma.cartItem.findMany({
            where: {
                cartId: cart.id,
            },
            include: {
                product: {
                    include: {
                        Shopping: true,
                    }
                }
            }
        })

        return items;
    }

    async setCartItemQty(itemId: number, qty: number) {
        await this.prisma.cartItem.update({
            where: {
                id: itemId,
            },
            data: {
                qty,
            }
        })
    }

    async deleteCartItem(itemId) {
        await this.prisma.cartItem.delete({
            where: {
                id: parseInt(itemId),
            }
        })
    }

    async getBoards(userId, page: number) {
        const list =  await this.prisma.board.findMany({
            where: {
                userId,
            },
            take: 10,
            skip: 10 * (page - 1),
            orderBy: {id: 'desc'},
        })

        return list;
    }

    async getBoardCount(userId) {
        const count = await this.prisma.board.count({
            where: {
                userId,
            }
        });

        return count;
    }

    // 배송지 정보 추가
    async addDeliveryInfo(deliveryInfo: any, userId: string) {
        try {
            const createdDelivery = await this.prisma.delivery.create({
                data: {
                    ...deliveryInfo,
                    userId,
                },
            });
            return createdDelivery;
        } catch (error) {
            console.error('배송 정보를 추가하는 데 문제가 발생했습니다.', error);
            throw error;
        }
    }

    // 배송지 정보 가져옴
    async getDeliveryInfo(userId: string) {
        const deliveries = await this.prisma.delivery.findMany({
            where: {
                userId,
            },
        });
        return deliveries;
    }
}
