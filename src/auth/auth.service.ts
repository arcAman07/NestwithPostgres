import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerUser } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async signUp(registerUserinfo: registerUser): Promise<void> {
    await this.userRepository.createUser(registerUserinfo);
  }
  async signIn(registerUserinfo: registerUser): Promise<string> {
    const { username, password } = registerUserinfo;
    const foundUser = await this.userRepository.findOne({ username });
    if (foundUser && (await bcrypt.compareSync(password, foundUser.password))) {
      return 'User signed in';
    } else {
      throw new UnauthorizedException('Enter a valid username and password');
    }
  }
}
