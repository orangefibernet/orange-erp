import {
  IsString,
} from 'class-validator';


export class CreateRadiusUserDto {

  @IsString()
  username: string;


  @IsString()
  password: string;


  @IsString()
  speedProfile: string;


  @IsString()
  customerId: string;


  @IsString()
  connectionId: string;

}