import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDTO: CreateBoardDTO): Board {
    const { title, description } = createBoardDTO;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);
    if (board === undefined) {
      throw new NotFoundException("Can't find board with id");
    }
    return board;
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
