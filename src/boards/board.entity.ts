import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './types/board-status.enum';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    enum: Object.values(BoardStatus),
    default: BoardStatus.PUBLIC,
  })
  status: BoardStatus;
}
