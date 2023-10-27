import { Controller, Body, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getBoards(): Board[] {
    return this.boardsService.getBoards();
  }

  @Post('/')
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    return this.boardsService.createBoard(title, description);
  }
}
