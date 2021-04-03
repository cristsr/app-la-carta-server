import { IsDefined, IsIn, IsString } from 'class-validator';

export class FindOrderParams {
  @IsDefined()
  @IsString()
  @IsIn(['true', 'false'])
  isCompleted: boolean;
}
