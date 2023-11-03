import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Patch,
  UseGuards,
  Logger,
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
  private logger = new Logger('BoardsController');

  constructor(private boardsService: BoardsService) {}

  @Post('/')
  createBoard(
    @Body() createBoardDTO: CreateBoardDTO,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${
        user.username
      } creating a new board. Payload ${createBoardDTO.toString()}`,
    );
    return this.boardsService.createBoard(createBoardDTO, user);
  }

  @Get('/')
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
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
  deleteBoard(
    @Param('boardId') boardId: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(boardId, user);
  }
}
