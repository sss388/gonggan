import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {AuthDto, ChangePwdDto, LoginDto, ResetPwdDto} from "./dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signUp(
        @Body() authDto: AuthDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return await this.authService.signUp(authDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return await this.authService.signIn(loginDto);
    }

    @Post('sendResetPwdMail')
    async sendResetPwdMail(
        @Body('email') email: string,
    ) {
        return await this.authService.sendResetPasswordMail(email);
    }

    @Get('resetPwd')
    async resetPasswordTokenChk(
        @Param('token') token: string,
    ) {
        return await this.authService.resetPasswordTokenChk(token);
    }

    @Put('resetPwd')
    async resetPassword(
        @Body() resetPwdDto: ResetPwdDto,
    ) {
        return await this.authService.resetPassword(resetPwdDto);
    }

    @Put('changePwd')
    async changePwd(
        @Body() changePwdDto: ChangePwdDto,
    ) {


        return await this.authService.changePassword(changePwdDto);
    }
}
