/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class registerUser {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}