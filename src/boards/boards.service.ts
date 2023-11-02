import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (board === null) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return board;
  }
}
