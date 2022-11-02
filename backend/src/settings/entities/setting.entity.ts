import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class SettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'iic.edu.np' })
  emailSuffix: string;

  @Column({ default: 2 })
  maxRenew: number;

  @Column({ default: 7 })
  renewDay: number;

  @Column()
  adminProfile: string;

  @Column()
  adminName: string;
}
