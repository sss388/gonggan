// community.controller.ts

import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityPostDto, UpdateCommunityPostDto } from './community.dto';

@Controller('community')
export class CommunityController {
    constructor(private readonly communityService: CommunityService) {}

    @Get()
    async getAllPosts() {
        const posts = await this.communityService.getAllPosts();
        return posts;
    }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
        const post = await this.communityService.getPostById(id);
        return post;
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        await this.communityService.deletePost(id);
    }

    @Post()
    async createPost(@Body() postData: CreateCommunityPostDto) {
        await this.communityService.createPost(postData);
    }

    @Put(':id')
    async updatePost(@Param('id') id: string, @Body() postData: UpdateCommunityPostDto) {
        await this.communityService.updatePost(id, postData);
    }
}
