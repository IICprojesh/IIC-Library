import { Issue } from 'src/issues/entities/issue.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
@Entity()
export class Book {
  @PrimaryColumn()
  isbn: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  summary?: string;

  @Column()
  authors: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Issue, (issue) => issue.book)
  issue: Issue[];
}
