import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBoardDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
