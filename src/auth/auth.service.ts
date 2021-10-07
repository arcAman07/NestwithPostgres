import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerUser } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { payloadToken } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(registerUserinfo: registerUser): Promise<void> {
    await this.userRepository.createUser(registerUserinfo);
  }
  async signIn(
    registerUserinfo: registerUser,
  ): Promise<{ accessToken: string }> {
    const { username, password } = registerUserinfo;
    const foundUser = await this.userRepository.findOne({ username });
    if (foundUser && (await bcrypt.compareSync(password, foundUser.password))) {
      const payload: payloadToken = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Enter a valid username and password');
    }
  }
}
