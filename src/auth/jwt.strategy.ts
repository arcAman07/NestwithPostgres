/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { InjectRepository} from '@nestjs/typeorm';
import { payloadToken } from './jwt-payload.interface';
import { User} from './user.entity';
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private userRepository:UserRepository) {
        super({
            secretOrKey: 'topSecret21',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(payload:payloadToken): Promise<User> {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username: username})
        if (!user) {
            throw new UnauthorizedException();
        }
        else{
            return user;
        }
    }
}
