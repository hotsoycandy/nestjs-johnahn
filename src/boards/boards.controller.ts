import { Controller, Body, Get, Post } from '@nestjs/common';
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

  @Post('/')
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Board {
    return this.boardsService.createBoard(createBoardDTO);
  }
}
