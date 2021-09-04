import { Connection, Channel, connect, Message, Replies } from 'amqplib'

export default class RabbitmqServer {
  private conn: Connection
  private channel: Channel

  constructor (private readonly uri: string) {}

  async start (): Promise<void> {
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
  }

  async publishInQueue (queue: string, message: string): Promise<boolean> {
    return this.channel.sendToQueue(queue, Buffer.from(message))
  }

  async publishInExchange (
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message))
  }

  async consume (queue: string, callback: (message: Message) => void): Promise<Replies.Consume> {
    return await this.channel.consume(queue, (message: Message | null) => {
      message && callback(message)
      message && this.channel.ack(message)
    })
  }
}
