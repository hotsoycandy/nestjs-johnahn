import { Controller, Param, Body, Get, Post, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getBoards(): Board[] {
    return this.boardsService.getBoards();
  }

  @Get('/:boardId')
  getBoardById(@Param('boardId') boardId: string): Board {
    return this.boardsService.getBoardById(boardId);
  }

  @Post('/')
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Board {
    return this.boardsService.createBoard(createBoardDTO);
  }

  @Delete('/:boardId')
  deleteBoard(@Param('boardId') boardId: string): void {
    this.boardsService.deleteBoard(boardId);
  }
}
