import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Issue } from 'src/issues/entities/issue.entity';
@Entity()
export class Student {
  @PrimaryColumn({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  contactNumber: string;

  @OneToMany(() => Issue, (issue) => issue.student)
  issue: Issue[];
}
