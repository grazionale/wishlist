import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from 'typeorm'
import { Client } from './client'

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ name: 'external_product_id' })
  externalProductId: string

  @Column({ name: 'client_id' })
  clientId: number

  @ManyToOne(() => Client, client => client.favorites)
  @JoinColumn({ name: 'client_id' })
  client: Client
}
