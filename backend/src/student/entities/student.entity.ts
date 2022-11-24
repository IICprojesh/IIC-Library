import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Issue } from 'src/issues/entities/issue.entity';
@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  collegeId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  contactNumber: string;

  @OneToMany(() => Issue, (issue) => issue.student, {
    onDelete: 'CASCADE',
  })
  issue: Issue[];
}
