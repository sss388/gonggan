import { AuthGuard } from '@nestjs/passport';
import {Injectable} from "@nestjs/common";

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}