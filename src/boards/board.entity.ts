import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BoardStatus } from './types/board-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Object.values(BoardStatus),
    default: BoardStatus.PUBLIC,
  })
  status: BoardStatus;

  @ManyToOne(() => User, (user) => user.boards, { eager: false })
  user: User;
}
