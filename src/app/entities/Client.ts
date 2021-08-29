import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column()
  name: string

  @Index({ unique: true })
  @Column()
  email: string
}
