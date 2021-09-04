import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'integration_id', unique: true })
  integrationId: string

  @Column()
  title: string

  @Column({ type: 'decimal' })
  price: number

  @Column()
  image: string
}
