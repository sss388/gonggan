import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService, private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('KAKAO_CLIENT_ID'),
            clientSecret: '', // Kakao Passport Strategy에는 clientSecret 필드가 없습니다.
            callbackURL: `${configService.get<string>('FRONTEND_BASE_URL')}/login/kakao`,
            scope: 'profile_nickname profile_image account_email',
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void,
    ) {
        try {
            const { _json } = profile;
            const user = {
                email: _json.kakao_account.email,
                nickname: _json.properties.nickname,
                photo: _json.properties.thumbnail_image,
            };
            done(null, user);
        } catch (error) {
            done(error);
        }
    }
}