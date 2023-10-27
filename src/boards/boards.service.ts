import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string): Board {
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
}
