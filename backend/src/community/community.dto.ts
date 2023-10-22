// community.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommunityPostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    kind: string;

    @IsString()
    @IsNotEmpty()
    content: string; // CKEditor의 내용은 여기에 저장됩니다.
}

export class UpdateCommunityPostDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    kind?: string;

    @IsString()
    @IsOptional()
    content?: string; // CKEditor의 내용은 여기에 저장됩니다.
}