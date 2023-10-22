import {Body, Controller, Get, Put, Query} from '@nestjs/common';
import {AdminService} from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('users')
    getAllUsers(@Query('page') page: number) {
        return this.adminService.getAllUsers(page || 1);
    }

    @Put('freezeAccount')
    freezeAccount(@Body('userId') userId: string,
                  @Body('days') days: number) {
        return this.adminService.freezeAccount(userId, days);
    }

    @Put('releaseAccount')
    releaseAccount(@Body('userId') userId: string) {
        return this.adminService.releaseAccount(userId);
    }

    @Get('shopping')
    getAllShopping(@Query('page') page: number,
                   @Query('keyword') keyword: string,
                   @Query('category') category: string,
    ) {
        return this.adminService.getAllShopping(
            page || 1, keyword || "", category || ""
        );
    }

    @Get('shoppingCount')
    getShoppingCount(@Query('keyword') keyword: string,
                     @Query('category') category: string,) {
        return this.adminService.getShoppingCount(keyword || "", category || "");
    }

    @Put('setDiscount')
    setDiscount(@Body('id') id: number,
                @Body('discount') discount: number,) {
        return this.adminService.setDiscount(id, discount);
    }

    @Put('setShoppingStatus')
    setStatus(@Body('status') status: string,
              @Body('id') id: number) {
        return this.adminService.setStatus(id, status);
    }

    @Get('board')
    getBoards(@Query('page') page: number,
              @Query('keyword') keyword: string,
              @Query('category') category: string,
    ) {
        return this.adminService.getBoards(
            page || 1, keyword || "", category || ""
        );
    }

    @Get('boardCount')
    getBoardsCount(@Query('keyword') keyword: string,
                   @Query('category') category: string,
                   ) {
        return this.adminService.getBoardsCount(keyword || "", category || "");
    }

    @Put('setBoardStatus')
    setBoardStatus(@Body('status') status: string,
              @Body('id') id: number) {
        return this.adminService.setBoardStatus(id, status);
    }
}
