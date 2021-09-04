import RabbitmqServer from '../../config/setup-rabbitmq'

export default (server: RabbitmqServer): void => {
  server.start().then(async () => {
    await server.consume('product-external', (message) => console.log(message.content.toString()))
  }).catch(err => {
    console.log(err)
  })
}
