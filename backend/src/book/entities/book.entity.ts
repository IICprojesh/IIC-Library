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

  @Column({
    default:
      'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
  })
  image: string;

  @OneToMany(() => Issue, (issue) => issue.book, {
    onDelete: 'RESTRICT',
  })
  issue: Issue[];
}
