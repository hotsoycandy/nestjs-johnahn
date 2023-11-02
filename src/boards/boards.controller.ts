import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatus } from './types/board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

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

  @Patch('/:boardId')
  updateBoardStatus(
    @Param('boardId') boardId: number,
    @Body('boardStatus', BoardStatusValidationPipe) boardStatus: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(boardId, boardStatus);
  }

  @Delete('/:boardId')
  deleteBoard(@Param('boardId') boardId: number): Promise<void> {
    return this.boardsService.deleteBoard(boardId);
  }
}
