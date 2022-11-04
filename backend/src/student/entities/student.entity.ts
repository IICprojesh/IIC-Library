import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity()
export class Student {
  @PrimaryColumn({ unique: true, primary: true })
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  contactNumber: string;

  @Column({ nullable: true })
  email?: string;
}
