import { PipeTransform, BadRequestException } from '@nestjs/common';
import { BoardStatus } from '../types/board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.StatusOptions.includes(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }
}
