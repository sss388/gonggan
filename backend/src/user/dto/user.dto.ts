import {IsEmpty, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ChangeUserDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}