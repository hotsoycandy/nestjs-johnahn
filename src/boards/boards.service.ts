import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './types/board-status.enum';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDTO);
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (board === null) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const { affected } = await this.boardRepository.delete(id);
    if (affected === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
  }
}
