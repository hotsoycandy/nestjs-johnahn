import { Controller, Param, Body, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('/')
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO);
  }

  @Get('/:boardId')
  getBoardById(@Param('boardId') boardId: number): Promise<Board> {
    return this.boardsService.getBoardById(boardId);
  }
}
