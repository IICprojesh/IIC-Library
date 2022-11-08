import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Issue } from 'src/issues/entities/issue.entity';
import { Expose } from 'class-transformer';
import { getDateDifference } from 'src/utils/date-difference';

@Entity()
export class Renew {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  issueId: number;

  @ManyToOne(() => Issue, (issue) => issue.renew)
  @JoinColumn({ name: 'issueId' })
  issue: Issue;

  @Column({ default: 0 })
  fineAmount: number;

  @Column({ default: 0 })
  totalFine: number;

  @CreateDateColumn()
  renewDate: Date;

  @Column({ type: 'datetime' })
  returnDate: Date;

  @Expose()
  totalBorrowedDay() {
    return getDateDifference(this.renewDate, new Date());
  }
  @Expose()
  fined() {
    return getDateDifference(new Date(), this.returnDate) < 0;
  }
  @Column({ default: true })
  active: boolean;
}
