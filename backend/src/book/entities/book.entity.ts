import { Issue } from 'src/issues/entities/issue.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
@Entity()
export class Book {
  @PrimaryColumn()
  isbn: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column()
  authors: string;

  // @Column({ type: 'text' })
  // totalBooks: number;

  // @Column()
  // availableBooks: number;

  @Column({
    default:
      'https://assets.prod.abebookscdn.com/cdn/com/images/servlets/shared/search/no-image.gif',
  })
  image: string;

  @OneToMany(() => Issue, (issue) => issue.book, {
    onDelete: 'CASCADE',
  })
  issue: Issue[];
}
