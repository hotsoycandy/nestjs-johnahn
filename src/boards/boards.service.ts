import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './types/board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async createBoard(
    createBoardDTO: CreateBoardDTO,
    user: User,
  ): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDTO, user);
  }

  async getAllBoards(user: User): Promise<Board[]> {
    return this.boardRepository
      .createQueryBuilder('board')
      .where('board.userId = :userId', { userId: user.id })
      .getMany();
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (board === null) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const { affected } = await this.boardRepository.delete({
      id,
      user: { id: user.id },
    });

    if (affected === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    this.boardRepository.save(board);
    return board;
  }
}
