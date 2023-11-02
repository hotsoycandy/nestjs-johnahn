import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (board === null) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return board;
  }
}
