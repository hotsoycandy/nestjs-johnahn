import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    const repository = dataSource.getRepository(Board);
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createBoard(
    createBoardDTO: CreateBoardDTO,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDTO;

    const board = this.create({
      title,
      description,
      user,
    });

    await this.save(board);

    return board;
  }
}
