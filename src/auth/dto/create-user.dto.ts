/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class registerUser {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}