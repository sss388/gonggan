// community.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {CreateCommunityPostDto, UpdateCommunityPostDto} from "./community.dto";

@Injectable()
export class CommunityService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllPosts() {
        const posts = await this.prisma.board.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return posts;
    }

    async getPostById(id: string) {
        const post = await this.prisma.board.findUnique({
            where: { id: parseInt(id) },
        });

        if (!post) {
            throw new NotFoundException('게시물을 찾을 수 없습니다.');
        }

        return post;
    }

    async deletePost(id: string) {
        await this.prisma.board.delete({
            where: { id: parseInt(id) },
        });
    }

    async createPost(postData: CreateCommunityPostDto) {
        await this.prisma.board.create({
            data: postData,
        });
    }

    async updatePost(id: string, postData: UpdateCommunityPostDto) {
        await this.prisma.board.update({
            where: { id: parseInt(id) },
            data: postData,
        });
    }
}
