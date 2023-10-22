import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {AuthDto, ChangePwdDto, LoginDto, ResetPwdDto} from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { isAfter, parseISO } from 'date-fns';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}
    async signUp(authDto: AuthDto) {
        const hash = await argon.hash(authDto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: authDto.email,
                    hashedPassword: hash,
                    name: authDto.name,
                },
            });
            return this.signToken(user.id, user.email);
        } catch (e) {
            console.log(e);
        }
    }

    async signToken(id: string, email: string) {
        const payload = {
            sub: id,
            email,
        };
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            secret: secret,
        });

        return {
            access_token: token,
        };
    }

    async signIn(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });
        if (!user) {
            throw new ForbiddenException('없는 계정');
        }
        const pwMatches = await argon.verify(user.hashedPassword, loginDto.password);
        if (!pwMatches) {
            throw new ForbiddenException('비밀번호 틀림');
        }

        if(user.releaseAt && isAfter(user.releaseAt, new Date())) {
            throw new ForbiddenException('정지된 계정');
        }

        return this.signToken(user.id, user.email);
    }

    async sendResetPasswordMail(email: string) {
        const user = await this.prisma.user.findFirst({
           where: {
               email: email,
           },
        });

        if (!user) {
            throw new ForbiddenException('없는 계정');
        }

        const token = await this.signToken(user.id, user.email);
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 30);

        await this.prisma.passwordResetToken.upsert({
            where: {userId: user.id},
            create: {
                token: token.access_token,
                expiresAt,
                userId: user.id,
            },
            update:{
                token:token.access_token,
                expiresAt,
            }
        });

        return token;
    }

    async resetPasswordTokenChk(token: string) {
        const pwdResetToken = await this.prisma.passwordResetToken.findFirst({
            where: {
                token,
            }
        });

        if (!pwdResetToken) {
            throw new ForbiddenException('token not found');
        }

        const currentDateTime = new Date();

        console.log(pwdResetToken.expiresAt, currentDateTime);

        if (pwdResetToken.expiresAt <= currentDateTime) {
            throw new ForbiddenException('token is expired');
        }
        
        return pwdResetToken.userId;
    }

    async resetPassword(resetPwdDto: ResetPwdDto) {
        const hash = await argon.hash(resetPwdDto.password);

        await this.prisma.user.update({
            where: {
                id: resetPwdDto.userId,
            },
            data: {
                hashedPassword: hash
            }
        }).catch((err) => {
            throw new ForbiddenException(err.message);
        })

        return Promise.resolve(undefined);
    }

    async changePassword(changePwdDto: ChangePwdDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: changePwdDto.userId
            }
        })

        const pwMatches = await argon.verify(user.hashedPassword, changePwdDto.preventPwd);
        if (!pwMatches) {
            throw new ForbiddenException('비밀번호 틀림');
        }

        const currentDateTime = new Date();

        const hash = await argon.hash(changePwdDto.newPwd);

        await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                hashedPassword: hash,
                updatedAt: currentDateTime,
            }
        })

        return Promise.resolve(undefined);
    }
}