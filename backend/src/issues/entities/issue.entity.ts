import { Book } from 'src/book/entities/book.entity';
import { Student } from 'src/student/entities/student.entity';
import { Renew } from 'src/renew/entities/renew.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  studentId: string;

  @Column()
  bookId: string;

  @ManyToOne(() => Book, (book) => book.issue, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Student, (student) => student.issue, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @OneToMany(() => Renew, (renew) => renew.issue, {
    onDelete: 'CASCADE',
  })
  renew: Renew[];

  @Column({ default: false })
  returned: boolean;

  @Column()
  maxIssue: number;

  @CreateDateColumn()
  issueDate: Date;
}
