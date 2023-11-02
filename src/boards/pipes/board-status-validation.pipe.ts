import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { BoardStatus } from '../types/board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);

    value = value.toUpperCase();

    if (!this.StatusOptions.includes(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }
}
