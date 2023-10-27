import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

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
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Board {
    return this.boardsService.createBoard(createBoardDTO);
  }

  @Patch('/:boardId/status')
  updateBoardStatus(
    @Param('boardId') boardId: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(boardId, status);
  }

  @Delete('/:boardId')
  deleteBoard(@Param('boardId') boardId: string): void {
    this.boardsService.deleteBoard(boardId);
  }
}
