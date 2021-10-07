/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { registerUser } from './dto/create-user.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(registerUserinfo:registerUser):Promise<void>{
        const {username, password} = registerUserinfo;
        const salt  = await bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt); 
        const user = this.create({username, password:hashedPassword});
        try {
            await this.save(user);
        } catch(error) {
            console.log(error.code, error.message);
            if (error.code === "23505") {
                throw new ConflictException("username already exists");
            }
            else {
                throw new InternalServerErrorException();
            }
        }
        
    }

}
