import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}
}
