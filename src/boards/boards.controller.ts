import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatus } from './types/board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('/')
  createBoard(
    @Body() createBoardDTO: CreateBoardDTO,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO, user);
  }

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
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
