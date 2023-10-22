import {
    Body,
    Controller,
    Delete,
    Get,
    Param, Post,
    Put,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {JwtGuard} from "../auth/guard";
import {UserService} from "./user.service";
import {ChangeUserDto} from "./dto/user.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {CloudinaryService} from "../cloudinary/cloudinary.service";

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    getMe(@Req() request) {
        return this.userService.findUserById(request.user.id);
    }

    @Put('changeInfo')
    ChangeInfo(@Body() changeUserDto: ChangeUserDto
    ){
        return this.userService.changeUserInfo(changeUserDto);
    }

    @Put('changeAvatar')
    @UseInterceptors(FileInterceptor('file'))
    ChangeAvatar(@UploadedFile() file: Express.Multer.File,
                 @Req() request) {
        return this.userService.changeAvatar(file, request.user.id);
    }

    @Get('boughtItemCount')
    getBoughtItemCount(@Req() request,
                       @Query('startdate') startDate: Date,
                       @Query('enddate') endDate: Date,
                       @Query('method') method: string) {

        return this.userService.getBoughtItemCount(request.user.id, startDate, endDate, method);
    }

    @Get('boughtItemList')
    getBoughtItemList(@Req() request,
                      @Query('page') page: number,
                      @Query('startdate') startDate: Date,
                      @Query('enddate') endDate: Date,
                      @Query('method') method: string) {

        return this.userService.getBoughtItemList(
            request.user.id, page || 1, startDate, endDate, method
        );
    }

    @Get('favoriteList')
    getFavoritesList(@Req() request){
        return this.userService.getFavoritesList(request.user.id)
    }

    @Delete('deleteFavorite')
    deleteFavorite(@Req() request,
                      @Query('id') favoriteId: number) {
        return this.userService.deleteFavorite(request.user.id, favoriteId);
    }

    @Get('cart')
    getCartItems(@Req() request) {
        return this.userService.getCartItems(request.user.id);
    }

    @Post('setCartItemQty')
    setCartItemQty(@Body('itemId') itemId: number,
                   @Body('qty') qty: number ) {
        return this.userService.setCartItemQty(itemId, qty);
    }

    @Delete('delCartItem')
    delCartItem(@Query('itemId') itemId: number) {
        return this.userService.deleteCartItem(itemId);
    }

    @Get('boards')
    getBoards(@Req() request,
              @Query('page') page: number) {
        return this.userService.getBoards(request.user.id, page || 1);
    }

    @Get('boardCount')
    getBoardCount(@Req() request) {
        return this.userService.getBoardCount(request.user.id);
    }

    // 배송지 관련
    @Get('deliveryInfo')
    async getDeliveryInfo(@Req() request) {
        const userId = request.user.id;
        return this.userService.getDeliveryInfo(userId);
    }

    // 배송지 정보 추가
    @Post('addDeliveryInfo')
    async addDeliveryInfo(@Body() deliveryInfo: any, @Req() request) {
        const userId = request.user.id;
        const newDelivery = await this.userService.addDeliveryInfo(deliveryInfo, userId);
        return newDelivery;
    }


}
