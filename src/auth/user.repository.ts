/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { registerUser } from './dto/create-user.dto';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(registerUserinfo:registerUser):Promise<void>{
        const {username, password} = registerUserinfo;
        const user = this.create({username, password});
        await this.save(user);
    }

}
